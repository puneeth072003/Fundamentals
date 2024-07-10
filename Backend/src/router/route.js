const express = require("express");
const getHome =require("../controller/tasks.js");
const { login, signin, getCurrentUser } = require("../controller/db.js");
const bcrypt = require('bcrypt');
const User = require('../controller/models/UserModel.js')
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;

router.get("/", getHome);

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send({ message: 'Email not found' });
    }
    const isMatch = await bcrypt.compare(password, hashedPassword);
    if (!isMatch) {
      return res.status(401).send({ message: 'Incorrect password' });
    }
    res.send({ message: 'User logged successfully' });
  });


router.post('/signin', async (req, res) => {
    const { email, password , asTeacher} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password with a salt of 10
    const user = new User({ email, password: hashedPassword , asTeacher});
    try {
      await user.save();
      res.send({ message: 'User registered successfully' });
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

router.get('/getuser',getCurrentUser);

module.exports = router;