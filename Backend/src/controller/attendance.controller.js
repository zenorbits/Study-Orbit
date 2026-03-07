const Attendance = require('../models/attendance.model');

// POST /attendance/batch/:batchId
const markAttendance = async (req, res) => {
    try {
        const { batchId } = req.params;
        const { records } = req.body; // array of { studentId, status }

        // Normalize today's date (midnight)
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Save attendance for each student
        const saved = await Promise.all(
            records.map(r =>
                Attendance.findOneAndUpdate(
                    { student: r.studentId, batch: batchId, date: today },
                    { status: r.status },
                    { upsert: true, new: true }
                )
            )
        );

        res.json({ success: true, data: saved });
    } catch (error) {
        console.error("Error marking attendance:", error);
        res.status(500).json({ success: false, message: "Failed to mark attendance" });
    }
};

const getAttendance = async (req, res) => {
    const records = await Attendance.find({ student: req.params.studentId });
    const totalDays = records.length;
    const presentDays = records.filter(r => r.status === "present").length;
    const percentage = totalDays > 0 ? (presentDays / totalDays) * 100 : 0;
    res.json({ success: true, percentage });
}

module.exports = {markAttendance,getAttendance}