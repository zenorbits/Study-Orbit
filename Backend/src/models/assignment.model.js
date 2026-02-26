const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    dueDate: {
        type: Date,
        required: true
    }
}, { timestamps: true });

const assignmentModel = mongoose.model('Assignment', assignmentSchema);

module.exports = assignmentModel