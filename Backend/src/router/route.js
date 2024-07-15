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
    const collectionName = 'SidebarData';
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
      const student = await Student.findOne(req.params.username);
      if (!student) return res.status(404).json({ error: 'Student not found' });
      student.units.push(req.params.unit);
      await student.save();
      res.status(200).json(student);
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
});

// Route to update a subunit score
router.put('/units/:unitId/subunits/:subunitId/score', async (req, res) => {
  try {
      const unit = await Unit.findById(req.params.unitId);
      if (!unit) return res.status(404).json({ error: 'Unit not found' });

      const subunit = unit.subunits.id(req.params.subunitId);
      if (!subunit) return res.status(404).json({ error: 'Subunit not found' });

      subunit.quiz.score = req.body.score;
      subunit.quiz.attempts.push(req.body.score);

      await unit.save();
      res.status(200).json(subunit);
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
});

// Route to get all subunit scores for a student
router.get('/students/:studentId/scores', async (req, res) => {
  try {
      const student = await Student.findById(req.params.studentId).populate('units');
      if (!student) return res.status(404).json({ error: 'Student not found' });

      const scores = student.units.map(unit => {
          return {
              unitName: unit.name,
              subunits: unit.subunits.map(subunit => ({
                  subunitName: subunit.name,
                  score: subunit.quiz.score,
                  attempts: subunit.quiz.attempts
              }))
          };
      });

      res.status(200).json(scores);
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
});

// ############## unit routes begin
// Create a new unit
router.post('/createunit', async (req, res) => {
  const { newUnit } = req.body;

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