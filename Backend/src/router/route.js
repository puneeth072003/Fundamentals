const express = require("express");
const getHome =require("../controller/tasks.js");
const { login, signin, getCurrentUser } = require("../controller/db.js");
const bcrypt = require('bcrypt');
const User = require('../controller/models/UserModel.js')
const router = express.Router();
const { MongoClient, ObjectId } = require('mongodb');
const {fetchClass11Element} = require("../controller/tasks.js")
const Class11 = require('../controller/models/ClassModel.js'); 

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
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password with a salt of 10
    const user = new User({ email, password: hashedPassword });
    try {
      await user.save();
      res.send({ message: 'User registered successfully' });
    } catch (err) {
      res.status(400).send({ message: 'Error registering user' });
    }
  });

  router.get('/class/:className', async (req, res) => {
    try {
      const className = req.params.className;
      const class11Element = await Class11.findOne({ title1: className }, 'class11');
  
      if (class11Element) {
        res.json(class11Element);
      } else {
        res.status(404).send('Class not found');
      }
    } catch (error) {
      res.status(500).send('Error fetching class11 element');
    }
  });
router.get('/getuser',getCurrentUser);

module.exports = router;