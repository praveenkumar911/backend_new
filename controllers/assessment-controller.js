const Assessment = require('../models/assessment');

// Function to create a new assessment
const createAssessment = async (req, res) => {
    try {
        const { classID, Name, Description, Deadline } = req.body;

        const newAssessment = new Assessment({
            class: classID,
            Name,
            Description,
            deadline:Deadline,
        });

        await newAssessment.save();

        res.status(201).json({ message: 'Assessment created successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create assessment' });
    }
};

// Function to get assessments by class
const getAssessmentsByClass = async (req, res) => {
    try {
        const { classId } = req.params;
        const assessments = await Assessment.find({ class: classId });
        res.status(200).json(assessments);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get assessments by class' });
    }
};

// Function to get all assessments
const getAllAssessments = async (req, res) => {
    try {
        const assessments = await Assessment.find();
        res.status(200).json(assessments);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get all assessments' });
    }
};

// Function to delete an assessment by ID
const deleteAssessment = async (req, res) => {
    try {
        const deletedAssessment = await Assessment.findByIdAndDelete(req.params.id);
        if (!deletedAssessment) {
            res.status(404).json({ error: 'Assessment not found' }); 
        } else {
            res.status(200).json({ message: 'Assessment deleted successfully' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete assessment' });
    }
};


// Function to get assessments by subject
const getAssessmentsBySubject = async (req, res) => {
    try {
        const { subjectId } = req.params;
        const assessments = await Assessment.find({ subject: subjectId });
        res.status(200).json(assessments);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get assessments by subject' });
    }
};

// Function to get assessments by student
const getAssessmentsByStudent = async (req, res) => {
    try {
        const { studentId } = req.params;
        const assessments = await Assessment.find({ student: studentId });
        res.status(200).json(assessments);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get assessments by student' });
    }
};



module.exports = { createAssessment, getAssessmentsByClass, getAllAssessments, deleteAssessment ,getAssessmentsByStudent,getAssessmentsBySubject };
// controllers/assessment-controller.js
