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

router.get('/class11', async (req, res) => {
  try {
    const url = 'mongodb+srv://pyd773:pyd773@cluster0.i0exuyl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
    const dbName = 'test';
    const collectionName = 'sidebardatas';
    const client = new MongoClient(url);
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const sidebarData = await collection.findOne();
    const class11 = sidebarData.class11;

    res.json({"content": class11});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching class11 data' });
  }
});

router.post('/create', async (req, res) => {
  try {
    const newStudent = new Student(req.body);
    await newStudent.save();
    res.status(201).send({message:'Student added'});
  } catch (error) {
    res.status(400).send({ error: 'Error creating Student', details: error.message });
  }
});

router.get('/getall',async (req, res) => {
  try {
    const students = await Student.find({});
    res.status(200).send(students);
  } catch (error) {
    res.status(500).send({ error: 'Error fetching students', details: error.message });
  }
});

router.put('/modifygrade/:id', async (req, res) => {
  try {
    const studentId = req.params.id;
    const { unitNo, newGrade } = req.body;

    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).send({ error: 'Student not found' });
    }

    const unit = student.units.find((unit) => unit.no === unitNo);
    if (!unit) {
      return res.status(404).send({ error: 'Unit not found' });
    }

    unit.grade = newGrade;

    await student.save();

    res.send({ message: 'Grade updated successfully', student });
  } catch (error) {
    res.status(400).send({ error: 'Error updating grade', details: error.message });
  }
});

// Route to add a new unit with subunits
router.post('/units', async (req, res) => {
  try {
      const newUnit = new Unit({
          name: req.body.name,
          subunits: req.body.subunits.map(subunitName => ({ name: subunitName }))
      });
      await newUnit.save();
      res.status(201).json(newUnit);
  } catch (error) {
      res.status(400).json({ error: error.message });
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
  const { name, subunits } = req.body;

  try {
    // Find the student by username
    const student = await Student.findOne({ username: username });

    if (!student) {
      return res.status(404).send('Student not found');
    }

    // Add the new subunits to the existing units array
    student.units.push({ name: name, subunits: subunits });

    // Save the updated student document
    await student.save();

    res.status(200).send('Score unit added successfully');

  } catch (error) {
    console.error('Error adding score unit:', error);
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
  const { title1, title2, subunits } = newUnit;
  if (!title1 || !title2 || !Array.isArray(subunits)) {
    return res.status(400).send('Invalid newUnit structure');
  }
  next();
};

router.post('/createunit', validateNewUnit, async (req, res) => {
  const { newUnit } = req.body;// Log the incoming data
  try {
    const sidebarData = await SidebarData.findOne({ _id: "668fa8131b239a3ed858b6bd" });
    if (!sidebarData) {
      return res.status(404).send('Document not found');
    }
    sidebarData.class11.push(newUnit);
    await sidebarData.save();
    res.status(200).send('New unit added successfully');
  } catch (error) {
    console.error('Error adding new unit:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;