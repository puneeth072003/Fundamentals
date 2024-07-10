const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function login(req, res) {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }
  const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
  res.json({ token });
}

async function signin(req, res, next) {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user) {
    return res.status(401).send({ message: 'Invalid username or password' });
  }

  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);

  if (await bcrypt.compare(password, user.password)) {
    // Password is correct, return the user
    return res.send({ user });
  } else {
    // Password is incorrect, return an error
    return res.status(401).send({ message: 'Invalid username or password' });
  }
}

async function getCurrentUser(req, res) {
  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const decoded = jwt.verify(token, process.env.SECRET_KEY);
  const user = await User.findById(decoded.userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.json({ user });
}

module.exports={getCurrentUser,login,signin}