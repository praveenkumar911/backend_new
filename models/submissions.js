const mongoose = require('mongoose');

const assessmentSubmissionSchema = new mongoose.Schema({
    Assessment: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    githubURL: {
        type: String, // Assuming the GitHub URL is a string
        required: true,
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student', // Reference to the Student model
        required: true,
    },
    score: {
        type: Number, // You can adjust the data type as needed
        //required: true,
    },
    evaluatedBy: {
        type: String,
        ref: 'Teacher', // Reference to a "Teacher" model, assuming teachers evaluate assessments
       // required: true,
    },
    submittedAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('AssessmentSubmission', assessmentSubmissionSchema);
