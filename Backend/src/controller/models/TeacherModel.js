const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subunitSchema = new Schema({
    name: { type: String, required: true },
    class: { type: Number },
    subject: { type: String, enum: ['physics', 'chemistry', 'maths','biology']},
    score: { type: Number, default: 0 }
});

const unitSchema = new Schema({
    name: { type: String, required: true },
    subunits: [subunitSchema]
});

const studentSchema = new Schema({
    username: { type: String, required: true, unique: true },
    units: [unitSchema]
});

const Student = mongoose.model('Student', studentSchema);

module.exports = { Student };
