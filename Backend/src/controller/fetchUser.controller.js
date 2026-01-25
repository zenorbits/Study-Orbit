const userModel = require('../models/user.model');

const fetchStudent = async (req, res) => {
    try {
        const students = await userModel.find({ role: 'student' });

        if (students.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No students found',
                studentCount: 0,
                students: []
            });
        }

        res.status(200).json({
            success: true,
            message: 'Students fetched successfully',
            students,
            studentCount: students.length
        });
    } catch (error) {
        console.error("Fetch student count error:", error);
        res.status(500).json({
            success: false,
            message: 'Error fetching students',
            error: error.message
        });
    }
};

const fetchTeacher = async (req, res) => {
    try {
        const teachers = await userModel.find({ role: 'teacher' });

        if (teachers.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No teachers found',
                teacherCount: 0,
                teachers: []
            });
        }

        res.status(200).json({
            success: true,
            message: 'Teachers fetched successfully',
            teachers,
            teacherCount: teachers.length
        });
    } catch (error) {
        console.error("Fetch teacher count error:", error);
        res.status(500).json({
            success: false,
            message: 'Error fetching teachers',
            error: error.message
        });
    }
};

module.exports = { fetchStudent,fetchTeacher }