const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
      id: String,
      name: String,
      units: [{
        no: Number,
        quizScore: Number,
        grade: String,
        unitTest:Number,
      }]
    }
  );

  
const Student = mongoose.model('Student', studentSchema);

module.exports = Student;