const AssessmentSubmission = require('../models/submissions');

// Function to create a new assessment submission
const createAssessmentSubmission = async (req, res) => {
    try {
        const { Assessment, githubURL, student, score, evaluatedBy } = req.body;

        console.log('Received data:', req.body); // Add this line for debugging

        const newSubmission = new AssessmentSubmission({
            Assessment,
            githubURL,
            student,
            score,
            evaluatedBy,
        });

        console.log('New submission data:', newSubmission); // Add this line for debugging

        await newSubmission.save();

        res.status(201).json({ message: 'Assessment submission created successfully' });
    } catch (error) {
        console.error('Error creating assessment submission:', error); // Add this line for detailed error information
        res.status(500).json({ error: 'Failed to create assessment submission' });
    }
};



// Function to get assessment submissions by student
const getAssessmentSubmissionsByStudent = async (req, res) => {
    try {
        const { studentID } = req.params;
        const submissions = await AssessmentSubmission.find({ student: studentID });
        res.status(200).json(submissions);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get assessment submissions by student' });
    }
};

// Function to get assessment submissions by assessment
const getAssessmentSubmissionsByAssessment = async (req, res) => {
    try {
        const { assessmentID } = req.params;
        const submissions = await AssessmentSubmission.find({ assessment: assessmentID });
        res.status(200).json(submissions);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get assessment submissions by assessment' });
    }
};

// Function to delete an assessment submission by ID
const deleteAssessmentSubmission = async (req, res) => {
    try {
        const deletedSubmission = await AssessmentSubmission.findByIdAndDelete(req.params.id);
        if (!deletedSubmission) {
            res.status(404).json({ error: 'Assessment submission not found' });
        } else {
            res.status(200).json({ message: 'Assessment submission deleted successfully' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete assessment submission' });
    }
};
const getAllAssessmentSubmissions = async (req, res) => {
    try {
        const submissions = await AssessmentSubmission.find();
        res.status(200).json(submissions);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get all assessment submissions' });
    }
};
// Function to update an assessment submission by ID
const updateAssessmentSubmission = async (req, res) => {
    try {
        const { id } = req.params; // Get the ID of the assessment submission to update
        const { evaluatedBy, score } = req.body; // Update fields

        const updatedSubmission = await AssessmentSubmission.findByIdAndUpdate(
            id,
            { evaluatedBy, score },
            { new: true }
        );

        if (!updatedSubmission) {
            res.status(404).json({ error: 'Assessment submission not found' });
        } else {
            res.status(200).json({ message: 'Assessment submission updated successfully', updatedSubmission });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update assessment submission' });
    }
};

module.exports = { createAssessmentSubmission, getAssessmentSubmissionsByStudent, getAssessmentSubmissionsByAssessment,updateAssessmentSubmission, deleteAssessmentSubmission, getAllAssessmentSubmissions };
