const Leave = require('../models/LeaveSchema');
const Student = require('../models/studentSchema');

// 1. Get leave requests
const getLeaveRequests = async (req, res) => {
    try {
        const leaveRequests = await Leave.find();
        res.send(leaveRequests);
    } catch (err) {
        res.status(500).json(err);
    }
};

// 2. Post a new leave request
const createLeaveRequest = async (req, res) => {
    try {
        const { Subject, description, CoderID, date,BranchName } = req.body;

        const existingStudent = await Student.findOne({ _id: CoderID });

        if (!existingStudent) {
            return res.send({ message: 'Student not found' });
        }

        const leave = new Leave({
            Subject,
            description,
            date,
            CoderID,
            FacultyApproval: 'Pending', // Set FacultyApproval to 'Pending'
            FacultyName: '',
            CoordinatorApproval: 'Pending', // Set CoordinatorApproval to 'Pending'
            CoordinatorName: '',
            FinalStatus: 'Pending',
            BranchName
        });

        let result = await leave.save();
        res.send(result);
    } catch (err) {
        res.status(500).json(err);
    }
};


// 3. Update faculty approval and name for a leave request
const updateFacultyApproval = async (req, res) => {
    try {
        const { approval, name } = req.body;
        const leaveId = req.params.id;

        let leave = await Leave.findById(leaveId);

        if (!leave) {
            return res.send({ message: 'Leave request not found' });
        }

        leave.Faculty = {
            Approval: approval,
            Name: name
        };

        let result = await leave.save();
        res.send(result);
    } catch (err) {
        res.status(500).json(err);
    }
};

// 4. Update coordinator approval and name for a leave request
const updateCoordinatorApproval = async (req, res) => {
    try {
        const { approval, name } = req.body;
        const leaveId = req.params.id;

        let leave = await Leave.findById(leaveId);

        if (!leave) {
            return res.send({ message: 'Leave request not found' });
        }

        leave.Coordinator = {
            Approval: approval,
            Name: name
        };

        let result = await leave.save();
        res.send(result);
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = { getLeaveRequests, createLeaveRequest, updateFacultyApproval, updateCoordinatorApproval };
