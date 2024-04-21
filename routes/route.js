const router = require('express').Router();

// const { adminRegister, adminLogIn, deleteAdmin, getAdminDetail, updateAdmin } = require('../controllers/admin-controller.js');


// Faculty
const { facultyRegister, facultyLogIn, getFacultyDetail, getFacultyById, getFacultyByBranch } = require('../controllers/faculty-controller.js');

const { adminRegister, adminLogIn, getAdminDetail} = require('../controllers/admin-controller.js');
const{getLeaveRequests, createLeaveRequest, updateFacultyApproval, updateCoordinatorApproval} =require('../controllers/leave-controller.js')
const {
    createAssessmentSubmission,
    getAssessmentSubmissionsByStudent,
    getAssessmentSubmissionsByAssessment,
    deleteAssessmentSubmission, // Added deleteAssessmentSubmission import
    getAllAssessmentSubmissions,
    updateAssessmentSubmission
} = require('../controllers/submission-controller.js');
const {
    createAssessment,
    getAssessmentsByClass,
    getAssessmentsBySubject,
    getAssessmentsByStudent,
    getAllAssessments,
    deleteAssessment, // Added deleteAssessment import
} = require('../controllers/assessment-controller');
const { sclassCreate, sclassList, deleteSclass, deleteSclasses, getSclassDetail, getSclassStudents } = require('../controllers/class-controller.js');
const { complainCreate, complainList } = require('../controllers/complain-controller.js');
const { noticeCreate, noticeList, deleteNotices, deleteNotice, updateNotice } = require('../controllers/notice-controller.js');
const {
    studentRegister,
    studentLogIn,
    getStudents,
    getStudentDetail,
    deleteStudents,
    deleteStudent,
    updateStudent,
    studentAttendance,
    deleteStudentsByClass,
    updateExamResult,
    clearAllStudentsAttendanceBySubject,
    clearAllStudentsAttendance,
    removeStudentAttendanceBySubject,
    getAllStudents,
    removeStudentAttendance } = require('../controllers/student_controller.js');
const { subjectCreate, classSubjects, deleteSubjectsByClass, getSubjectDetail, deleteSubject, freeSubjectList, allSubjects, deleteSubjects } = require('../controllers/subject-controller.js');
const { teacherRegister, teacherLogIn, getTeachers, getTeacherDetail, deleteTeachers, deleteTeachersByClass, deleteTeacher, updateTeacherSubject, teacherAttendance } = require('../controllers/teacher-controller.js');

// Admin
router.post('/AdminReg', adminRegister);
router.post('/AdminLogin', adminLogIn);

router.get("/Admin/:id", getAdminDetail)
// router.delete("/Admin/:id", deleteAdmin)

// router.put("/Admin/:id", updateAdmin)

// Student

router.post('/StudentReg', studentRegister);
router.post('/StudentLogin', studentLogIn)

router.get("/Students/:id", getStudents)
router.get("/Student/:id", getStudentDetail)
router.get('/Students',getAllStudents)

router.delete("/Students/:id", deleteStudents)
router.delete("/StudentsClass/:id", deleteStudentsByClass)
router.delete("/Student/:id", deleteStudent)

router.put("/Student/:id", updateStudent)

router.put('/UpdateExamResult/:id', updateExamResult)

router.put('/StudentAttendance/:id', studentAttendance)

router.put('/RemoveAllStudentsSubAtten/:id', clearAllStudentsAttendanceBySubject);
router.put('/RemoveAllStudentsAtten/:id', clearAllStudentsAttendance);

router.put('/RemoveStudentSubAtten/:id', removeStudentAttendanceBySubject);
router.put('/RemoveStudentAtten/:id', removeStudentAttendance)

// Teacher

router.post('/TeacherReg', teacherRegister);
router.post('/TeacherLogin', teacherLogIn)

router.get("/Teachers/:id", getTeachers)
router.get("/Teacher/:id", getTeacherDetail)

router.delete("/Teachers/:id", deleteTeachers)
router.delete("/TeachersClass/:id", deleteTeachersByClass)
router.delete("/Teacher/:id", deleteTeacher)

router.put("/TeacherSubject", updateTeacherSubject)

router.post('/TeacherAttendance/:id', teacherAttendance)

// Notice

router.post('/NoticeCreate', noticeCreate);

router.get('/NoticeList/:id', noticeList);

router.delete("/Notices/:id", deleteNotices)
router.delete("/Notice/:id", deleteNotice)

router.put("/Notice/:id", updateNotice)

// Complain

router.post('/ComplainCreate', complainCreate);

router.get('/ComplainList/:id', complainList);

// Sclass

router.post('/SclassCreate', sclassCreate);

router.get('/SclassList/:id', sclassList);
router.get("/Sclass/:id", getSclassDetail)
router.get('/SclassLists', sclassList);
router.get("/Sclass/Students/:id", getSclassStudents)

router.delete("/Sclasses/:id", deleteSclasses)
router.delete("/Sclass/:id", deleteSclass)

// Subject
 
router.post('/SubjectCreate', subjectCreate);

router.get('/AllSubjects/:id', allSubjects);
router.get('/ClassSubjects/:id', classSubjects);
router.get('/FreeSubjectList/:id', freeSubjectList);
router.get("/Subject/:id", getSubjectDetail)

router.delete("/Subject/:id", deleteSubject)
router.delete("/Subjects/:id", deleteSubjects)
router.delete("/SubjectsClass/:id", deleteSubjectsByClass)
// Assessments
router.post('/Assessment', createAssessment);
router.get('/Assessment/ByClass/:classId', getAssessmentsByClass);
router.get('/Assessment/BySubject/:subjectId', getAssessmentsBySubject);
router.get('/Assessment/ByStudent/:studentId', getAssessmentsByStudent);
router.get('/assessments', getAllAssessments);
router.delete('/Assessment/:id', deleteAssessment);
//Leave
router.get('/LeaveRequests', getLeaveRequests); // Get leave requests
router.post('/CreateLeaveRequest', createLeaveRequest); // Create a new leave request
router.put('/UpdateFacultyApproval/:id', updateFacultyApproval); // Update faculty approval and name for a leave request
router.put('/UpdateCoordinatorApproval/:id', updateCoordinatorApproval); // Update coordinator approval and name for a leave request
//submissions

router.post('/AssessmentSubmission', createAssessmentSubmission);

// Get assessment submissions by student
router.get('/AssessmentSubmission/ByStudent/:studentId', getAssessmentSubmissionsByStudent);

// Get assessment submissions by assessment
router.get('/AssessmentSubmission/ByAssessment/:assessmentId', getAssessmentSubmissionsByAssessment);

// Delete an assessment submission
router.delete('/AssessmentSubmission/:id', deleteAssessmentSubmission);
//get all submissions
router.get('/AssessmentSubmission/getallass',  getAllAssessmentSubmissions);
//put score and evalutor
router.put('/AssessmentSubmission/update/:id',updateAssessmentSubmission)
//faculty routes
router.post('/FacultyReg', facultyRegister);
router.post('/FacultyLogin', facultyLogIn);
router.get("/Faculty/:id", getFacultyDetail);
router.get("/FacultyById/:id", getFacultyById);
router.get("/FacultyByBranch/:branchName", getFacultyByBranch);
module.exports = router;