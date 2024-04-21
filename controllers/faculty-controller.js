const bcrypt = require('bcrypt');
const Faculty = require('../models/FacultySchema');
const sendRegistrationEmail =require('./nodemailer')
const facultyRegister = async (req, res) => {
    try {
        const faculty = new Faculty({
            ...req.body
        });

        const existingFacultyByEmail = await Faculty.findOne({ email: req.body.email });
        const existingSchool = await Faculty.findOne({ schoolName: req.body.schoolName });

        if (existingFacultyByEmail) {
            res.send({ message: 'Email already exists' });
        }
        else if (existingSchool) {
            res.send({ message: 'College name already exists' });
        }
        else {
            let result = await faculty.save();
            result.password = undefined;

            // Send a registration email to the faculty
            const registrationEmailSubject = 'Welcome to GCC Faculty Team - Congratulations on Your Registration';
            const registrationEmailText = `Congratulations ${req.body.name}! You have successfully registered as a Faculty member on our GCC website. Your credentials have been verified and approved.

            Email: ${req.body.email}
            Password: ${req.body.password}

            Welcome to our Faculty team. We look forward to working with you and achieving great success together.

            Regards,
            Team GCC.`;

            // Send the registration email with custom subject and text
            sendRegistrationEmail(req.body.email, registrationEmailSubject, registrationEmailText);
            res.send(result);
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const facultyLogIn = async (req, res) => {
    if (req.body.email && req.body.password) {
        let faculty = await Faculty.findOne({ email: req.body.email });
        if (faculty) {
            if (req.body.password === faculty.password) {
                faculty.password = undefined;
                res.send(faculty);
            } else {
                res.send({ message: "Invalid password" });
            }
        } else {
            res.send({ message: "User not found" });
        }
    } else {
        res.send({ message: "Email and password are required" });
    }
};

const getFacultyDetail = async (req, res) => {
    try {
        let faculty = await Faculty.findById(req.params.id);
        if (faculty) {
            faculty.password = undefined;
            res.send(faculty);
        }
        else {
            res.send({ message: "No faculty found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

const getFacultyById = async (req, res) => {
    try {
        let faculty = await Faculty.findById(req.params.id);
        if (faculty) {
            faculty.password = undefined;
            res.send(faculty);
        }
        else {
            res.send({ message: "Faculty not found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

const getFacultyByBranch = async (req, res) => {
    try {
        const branchName = req.params.branchName;
        const facultyList = await Faculty.find({ BranchName: branchName });
        if (facultyList.length > 0) {
            // Remove passwords from the response
            const facultyWithoutPasswords = facultyList.map(faculty => {
                const { password, ...facultyWithoutPassword } = faculty._doc;
                return facultyWithoutPassword;
            });
            res.send(facultyWithoutPasswords);
        }
        else {
            res.send({ message: `No faculty found in branch ${branchName}` });
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports = {
    facultyRegister,
    facultyLogIn,
    getFacultyDetail,
    getFacultyById,
    getFacultyByBranch
};
