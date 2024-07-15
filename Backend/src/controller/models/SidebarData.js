const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const videoSubunitSchema = new Schema({
  name: { type: String, required: true },
  videoUrl: { type: String, required: true }
});

const quizSubunitSchema = new Schema({
  name: { type: String, required: true },
  questions: [{
    question: { type: String, required: true },
    options: [{ type: String, required: true }],
    correctOption: { type: String, required: true },
    solution: { type: String, required: true }
  }]
});

const unitTestSubunitSchema = new Schema({
  name: { type: String, required: true },
  questions: [{
    question: { type: String, required: true },
    options: [{ type: String, required: true }],
    correctOption: { type: String, required: true },
    solution: { type: String, required: true }
  }]
});

const subunitSchema = new Schema({
  type: { type: String, required: true, enum: ['video', 'quiz', 'unitTest'] },
  video: videoSubunitSchema,
  quiz: quizSubunitSchema,
  unitTest: unitTestSubunitSchema
});

const unitSchema = new Schema({
  title1: { type: String, required: true },
  title2: { type: String, required: true },
  subunits: [subunitSchema]
});

const sidebarSchema = new Schema({
  class11: [unitSchema]
});

const SidebarData = mongoose.model('SidebarData', sidebarSchema);
module.exports = { SidebarData };
