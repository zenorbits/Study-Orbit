const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    batch: { type: mongoose.Schema.Types.ObjectId, ref: "Batch", required: true },
    date: { type: Date, required: true },
    status: { type: String, enum: ["present", "absent"], required: true }
});

const attendanceModel = mongoose.model('Attendance',attendanceSchema);

module.exports = attendanceModel;