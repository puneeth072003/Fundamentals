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
    try {
      await user.save();
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

router.get('/getuser',getCurrentUser);

module.exports = router;