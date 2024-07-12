const express = require("express");
const getHome =require("../controller/tasks.js");
const { getCurrentUser } = require("../controller/db.js");
const bcrypt = require('bcrypt');
const User = require('../controller/models/UserModel.js')
const {Student,Unit} = require('../controller/models/TeacherModel.js');
const router = express.Router();

const MongoClient = require('mongodb').MongoClient;

router.get("/", getHome);

router.post('/login', async (req, res) => {
    const {email, password, asTeacher } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send({ message: 'Email not found' });
    }
    const isMatch = await bcrypt.compare(password, hashedPassword);
    if (!isMatch) {
      return res.status(401).send({ message: 'Incorrect password' });
    }
    if (asTeacher != user.asTeacher){
      return res.status(401).send({ message: 'Permission denied' });
    }
    res.send({ message: 'User logged successfully', username: user.username ,state: true});
  });


router.post('/signin', async (req, res) => {
    const { username, email, password , asTeacher} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ username, email, password: hashedPassword , asTeacher});
    const count = await Student.countDocuments();
    const student =new Student({id:String(count),name:username,units:[]});
    try {
      await user.save();
      await student.save();
      res.send({ message: 'User registered successfully' , username: username ,state: true});
    } catch (err) {
      res.status(400).send({ message: 'Error registering user' });
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

// student routes begin ############
router.post('/students', async (req, res) => {
  try {
      const newStudent = new Student({ username: req.body.username });
      await newStudent.save();
      res.status(201).json(newStudent);
  } catch (error) {
      res.status(400).json({ error: error.message });
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
router.post('/students/:studentId/units/:unitId', async (req, res) => {
  try {
      const student = await Student.findById(req.params.studentId);
      if (!student) return res.status(404).json({ error: 'Student not found' });

      student.units.push(req.params.unitId);
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

router.get('/getuser',getCurrentUser);

module.exports = router;