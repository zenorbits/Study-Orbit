const announcementsModel = require('../models/announcements.model');

//create announcemnets

const createAnnouncements = async (req, res) => {

    try {

        const { title, message } = req.body;

        if (!title || !message) {
            return res.status(400).json({ message: "Title and message are required" });
        }

        const announcement = await announcementsModel.create({
            title,
            message,
            createdBy: req.user._id
        });

        res.status(201).json({
            success: true,
            data: announcement,
            message: "Announcement created successfully"
        });


    } catch (error) {
        res.status(500).json({ message: "Server error" });

    }

};


const getAnnouncements = async (req, res) => {
    try {
        const announcements = await announcementsModel.find().populate('createdBy').sort({ createdAt: -1 });

        res.json({
            success: true,
            data: announcements
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

const deleteAnnouncements = async (req, res) => {
    try {
        const { id } = req.body;

        const deletedAnnouncement = await announcementsModel.findByIdAndDelete(id);

        if (!deletedAnnouncement) {
            return res.status(404).json({ success: false, message: 'Announcement not found' });
        }


        res.json({
            success: true,
            message: 'Announcement deleted successfully'
        })
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}


module.exports = { createAnnouncements, getAnnouncements,deleteAnnouncements }