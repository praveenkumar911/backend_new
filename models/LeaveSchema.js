const mongoose = require("mongoose");

const leaveSchema = new mongoose.Schema({
    Subject: {
        type: String,
        required: true
    },
    
    description: {
        type: String,
        required: true
    },
    BranchName: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    CoderID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'student'
    },
    Faculty: {
        Approval: {
            type: String,
            enum: ['Approved', 'Pending', 'Not Approved'],
        },
        Name: {
            type: String
        }
    },
    Coordinator: {
        Approval: {
            type: String,
            enum: ['Approved', 'Pending', 'Not Approved'],
        },
        Name: {
            type: String
        }
    },
   /*  FinalStatus: {
        type: String,
        enum: ['Approved', 'Pending', 'Not Approved'],
        default: 'Pending'
    } */
}, { timestamps: true });

module.exports = mongoose.model("leave", leaveSchema);
