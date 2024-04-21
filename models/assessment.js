// models/assessment-model.js

const mongoose = require('mongoose');

const assessmentSchema = new mongoose.Schema({
    Name: {
        type: String,
    },
    Description: {
        type: String,
    },
    class: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class', // Reference to the Class model
        required: true,
    },
    deadline: {
        type: Date, // Assuming the deadline is a date
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Assessment', assessmentSchema);
