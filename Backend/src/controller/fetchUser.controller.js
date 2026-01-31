const userModel = require('../models/user.model');

const fetchStudent = async (req, res) => {
    try {
        const students = await userModel.find({ role: 'student' });

        res.status(200).json({
            success: true,
            message: students.length > 0 ? 'Students fetched successfully' : 'No students found',
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

        res.status(200).json({
            success: true,
            message: teachers.length > 0 ? 'Teachers fetched successfully' : 'No teachers found',
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

const fetchUserInfo = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await userModel.findById(id);

        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            })
        }

        res.status(200).json({
            success: true,
            message: 'User Found Successfully',
            user
        })
    } catch (error) {
        console.error("Error fetching user Info", error);
        res.status(500).json({
            success: false,
            message: 'Error fetching user'
        })
    }
}

module.exports = { fetchStudent, fetchTeacher, fetchUserInfo };