const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const videoSubunitSchema = new Schema({
  name: { type: String, required: true },
  videoUrl: { type: String, required: true }
});

const quizSubunitSchema = new Schema({
  name: { type: String, required: true },
  quizTitle: { type: String, required: true },
  questions: [{
    question: { type: String, required: true },
    options: [{ type: String, required: true }],
    correctAnswer: { type: String, required: true },
    solution: { type: String, required: true }
  }]
});

const unitTestSubunitSchema = new Schema({
  name: { type: String, required: true }
});

const subunitSchema = new Schema({
  type: { type: String, required: true, enum: ['video', 'quiz', 'unitTest'] },
  video: { type: videoSubunitSchema, required: function() { return this.type === 'video'; } },
  quiz: { type: quizSubunitSchema, required: function() { return this.type === 'quiz'; } },
  unitTest: { type: unitTestSubunitSchema, required: function() { return this.type === 'unitTest'; } }
});

const unitSchema = new Schema({
  title1: { type: String, required: true },
  title2: { type: String, required: true },
  subunits: [subunitSchema]
});

const class11Schema = new Schema({
  class11: [unitSchema]
});

const Class11 = mongoose.model('Class11', class11Schema);

module.exports = { Class11 };