const express = require("express");
const getHome =require("../controller/tasks.js");
const { getCurrentUser } = require("../controller/db.js");
const bcrypt = require('bcrypt');
const User = require('../controller/models/UserModel.js')
const Student = require('../controller/models/TeacherModel.js')
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

    res.json({"content":class11});
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

router.put('/students/:username/units/:unitNo', async (req, res) => {
  const username = "John Doe";
  const unitNo = req.params.unitNo;
  const newData = req.body;

  try {
    // Find student by username
    let student = await Student.findOne({ name: username });

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    // Find the specific unit within the student's units array
    let unitToUpdate = student.units.find(unit => unit.no === parseInt(unitNo));

    if (!unitToUpdate) {
      return res.status(404).json({ error: 'Unit not found for the student' });
    }

    // Update quizScore and unitTest for the found unit
    unitToUpdate.quizScore = newData.quizScore;
    unitToUpdate.unitTest = newData.unitTest;

    // Save the updated student object
    await student.save();

    res.json({ message: 'Student unit data updated successfully', student });
  } catch (error) {
    console.error('Error updating student unit data:', error);
    res.status(500).json({ error: 'Error updating student unit data' });
  }
});

router.get('/getuser',getCurrentUser);

module.exports = router;