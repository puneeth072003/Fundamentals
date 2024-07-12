const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subunitSchema = new Schema({
    name: { type: String, required: true },
    quiz: {
        score: { type: Number, default: 0 },
        attempts: [{ type: Number }]
    }
});

const unitSchema = new Schema({
    name: { type: String, required: true },
    subunits: [subunitSchema]
});

const studentSchema = new Schema({
    username: { type: String, required: true },
    units: [{ type: Schema.Types.ObjectId, ref: 'Unit' }]
});

const Student = mongoose.model('Student', studentSchema);
const Unit = mongoose.model('Unit', unitSchema);

module.exports = { Student, Unit };