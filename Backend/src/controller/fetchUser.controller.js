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

module.exports = { fetchStudent }