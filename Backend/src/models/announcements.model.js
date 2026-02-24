const mongoose = require('mongoose');

const announcementsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    message: String,
    createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const announcementsModel = mongoose.model('Announcements',announcementsSchema);

module.exports = announcementsModel;