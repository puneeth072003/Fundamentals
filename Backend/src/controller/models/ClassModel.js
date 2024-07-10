// models/Class11.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const questionSchema = new Schema({
  question: String,
  options: [String],
  correctAnswer: String,
  solution: String,
});

const subunitSchema = new Schema({
  name: String,
  type: String,
  videoUrl: String,
  quizTitle: String,
  questions: [questionSchema],
});

const class11ItemSchema = new Schema({
  title1: String,
  title2: String,
  subunits: [subunitSchema],
});

const class11Schema = new Schema({
  class11: [class11ItemSchema],
});

module.exports = mongoose.model('Class11', class11Schema);
