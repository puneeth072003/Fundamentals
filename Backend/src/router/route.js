const express = require("express");
const getHome =require("../controller/tasks.js");
const bcrypt = require('bcrypt');
const User = require('../controller/models/UserModel.js')
const {Student,Unit} = require('../controller/models/TeacherModel.js');
const { SidebarData, Subunit } = require("../controller/models/SidebarData.js");
const router = express.Router();

const MongoClient = require('mongodb').MongoClient;

router.get("/", getHome);

router.post('/login', async (req, res) => {
  try {
    const { email, password, asTeacher } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send({ message: 'Email not found', state: false });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({ message: 'Incorrect password', state: false });
    }
    if (asTeacher) {
      // If logging in as a teacher
      if (!user.asTeacher) {
        return res.status(401).send({ message: 'Permission denied. This is not a teacher account.', state: false });
      }
    } else {
      // If logging in as a student
      if (user.asTeacher) {
        return res.status(401).send({ message: 'Permission denied. This is a teacher account.', state: false });
      }
    }
    res.send({ message: 'User logged in successfully', username: user.username, state: true });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

  router.post('/signin', async (req, res) => {
    const { username, email, password, asTeacher } = req.body;
    const user = new User({ username, email, password, asTeacher });
    try {
      if (asTeacher === false) {
        const existingStudent = await Student.findOne({ username: req.body.username });
        if (existingStudent) {
          return res.status(400).send({ message: 'User already registered as a student' });
        }
        const newStudent = new Student({ username: req.body.username });
        await newStudent.save();
        await user.save();
        res.send({ message: 'Student registered successfully', username: username, state: true });
      } else {
        const existingUser = await User.findOne({ username: req.body.username });
        if (existingUser) {
          return res.status(400).send({ message: 'User already registered as a teacher' });
        }
        await user.save();
        res.send({ message: 'Teacher registered successfully', username: username, state: true });
      }
    } catch (err) {
      res.status(400).send({ message: err.message});
    }
  });  

// get specific data
router.get('/:className/:subject', async (req, res) => {
    const { className, subject } = req.params;
    const classNo =Number(className);
    const url = 'mongodb+srv://pyd773:pyd773@cluster0.i0exuyl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
    const dbName = 'test';
    const collectionName = 'sidebardatas';
    const client = new MongoClient(url);
    try {
      await client.connect();
      const db = client.db(dbName);
      const collection = db.collection(collectionName);
  
      const sidebarData = await collection.findOne();
      if (!sidebarData) {
        return res.status(404).json({ message: 'Sidebar data not found' });
      }
      const classData = sidebarData.data;
      if (!classData) {
        return res.status(404).json({ message: `data not found` });
      }
      const finalData = classData.filter(item => item.subject === subject && item.class === classNo);
      if (!finalData.length) {
        return res.status(404).json({ message: `Subject ${subject} not found in class ${className}` });
      }
      res.json({ "content": finalData });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error fetching data' });
    } finally {
      await client.close();
    }
  });

// get all specific students
router.get('/getall/:className/:subject', async (req, res) => {
  try {
    const { className, subject } = req.params;
    const classNo = Number(className);
    const students = await Student.find({
      units: {
        $elemMatch: {
          subunits: {
            $elemMatch: {
              cls: classNo,
              subject: subject
            }
          }
        }
      }
    });
    res.status(200).send(students);
  } catch (error) {
    res.status(500).send({ error: 'Error fetching students', details: error.message });
  }
});


// Route to assign a unit to a student
router.post('/students/:username/units/:unit', async (req, res) => {
  try {
      const student = await Student.findOne({username: req.params.username});
      if (!student) return res.status(404).json({ error: 'Student not found' });
      console.log(req.params.unit);
      student.units.push(req.params.unit);
      await student.save();
      res.status(200).json(student);
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
});

//route to add score
router.post('/:username/addscore', async (req, res) => {
  const { username } = req.params;
  const { name, className, subject, subunits } = req.body;
  const classNo = Number(className);
  try {
    let student = await Student.findOne({ username: username });
    if (!student) {
      student = new Student({ username: username, units: [] });
    }
    let unit = student.units.find(unit => unit.name === name);
    if (unit) {
      // If the unit exists, update the subunits
      subunits.forEach(subunit => {
        const existingSubunit = unit.subunits.find(s => s.name === subunit.name);
        if (existingSubunit) {
          existingSubunit.score = subunit.score;
        } else {
          unit.subunits.push(subunit);
        }
      });
    } else {
      // If the unit doesn't exist, add a new one
      student.units.push({ name: name, class: classNo, subject: subject, subunits: subunits });
    }

    await student.save();
    res.status(200).send('Score unit added/updated successfully');
  } catch (error) {
    console.error('Error adding/updating score unit:', error);
    res.status(500).send('Internal Server Error');
  }
});

// ############## unit routes begin
// Create a new unit
const validateNewUnit = (req, res, next) => {
  const { newUnit } = req.body;
  if (!newUnit) {
    return res.status(400).send('newUnit is required');
  }
  const { title1, title2, subject, subunits } = newUnit;
  if (!title1 || !title2 || !subject || !Array.isArray(subunits)) {
    return res.status(400).send('Invalid newUnit structure');
  }
  next();
};

router.post('/createunit', validateNewUnit, async (req, res) => {
  const { newUnit } = req.body;
  try {
    const sidebarData = await SidebarData.findOne({ _id: "668fa8131b239a3ed858b6bd" });
    if (!sidebarData) {
      return res.status(404).send('Document not found');
    }
    if (!newUnit.subject) {
      unit.subject = 'physics';
    }
    sidebarData.data.push(newUnit);
    await sidebarData.save();
    res.status(200).send('New unit added successfully');
  } catch (error) {
    console.error('Error adding new unit:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;