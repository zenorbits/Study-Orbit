const batchModel = require('../models/batch.model');
const mongoose = require("mongoose");

const createBatch = async (req, res) => {
    try {
        const { batchname, description } = req.body;

        const generateUniqueBatchCode = async () => {
            let code;
            let exists = true;
            while (exists) {
                code = Math.random().toString(36).substring(2, 8).toUpperCase();
                exists = await batchModel.findOne({ code });
            }
            return code;
        };


        // Create new batch with default status "pending"
        const batch = await batchModel.create({
            batchname,
            description,
            createdBy: req.user.id, //  comes from auth middleware
            status: "pending",
            code: await generateUniqueBatchCode()
        });

        res.status(201).json({
            message: "Batch created successfully",
            batch,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error creating batch",
            error: error.message
        });
    }
};

const fetchTeacherBatch = async (req, res) => {
    try {
        // fetch all batches regardless of who created them
        const batches = await batchModel.find().populate("createdBy", "name email");
        res.status(200).json({
            message: "Fetched all batches successfully",
            batches,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching batches",
            error: error.message,
        });
    }
};

const fetchPendingBatch = async (req, res) => {
    try {
        const batches = await batchModel.find({ status: 'pending' });

        res.status(200).json({
            message: 'Fetched Pending batches successfully',
            batches,
            count: batches.length
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error while fetching batches",
            error: process.env.NODE_ENV === "development" ? error.message : undefined,
        });
    }
};


const updateBatchStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const batch = await batchModel.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!batch) return res.status(404).json({ message: "Batch not found" });
        res.status(200).json({ message: "Status updated", batch });
    } catch (error) {
        console.error("Update request failed:", req.params, req.body, error);
        res.status(500).json({ message: "Error updating batch status", error: error.message });
    }
};

const fetchVerifiedBatch = async (req, res) => {
    try {
        const studentId = req.user?._id || req.user?.id;

        if (!studentId) {
            return res.status(401).json({ success: false, message: "Unauthorized: no student ID" });
        }

        // Find verified batches where studentId is NOT in the students array
        const batches = await batchModel.find({
            status: "verified",
            students: { $ne: studentId }
        });

        if (!batches || batches.length === 0) {
            return res.status(200).json({
                success: false,
                message: "No unjoined verified batches found",
                batches: []
            });
        }

        res.status(200).json({
            success: true,
            message: "Fetched unjoined verified batches successfully",
            batches
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching batches",
            error: error.message
        });
    }
};
const joinBatch = async (req, res) => {
    try {
        const { batchId, batchCode } = req.body;
        const studentId = req.user?._id || req.user?.id;

        if (!batchId || !batchCode) {
            return res.status(400).json({ success: false, message: "Batch ID and code are required" });
        }

        const batch = await batchModel.findOne({ _id: batchId, code: batchCode, status: "verified" });
        if (!batch) {
            return res.status(404).json({ success: false, message: "Invalid or unverified batch code for this batch" });
        }

        const alreadyJoined = batch.students.some(s => s && s.equals(studentId));
        if (alreadyJoined) {
            return res.status(200).json({ success: false, message: "You have already joined this batch", batch });
        }

        batch.students.push(studentId);
        await batch.save();

        const updatedBatch = await batchModel.findById(batch._id).populate("students", "username email");
        return res.status(200).json({ success: true, message: "Joined batch successfully", batch: updatedBatch });
    } catch (error) {
        console.error("Join batch error:", error);
        return res.status(500).json({ success: false, message: "Error joining batch", error: error.message });
    }
};

const fetchJoinedBatch = async (req, res) => {
    try {
        const studentId = req.user?._id || req.user?.id;

        if (!studentId) {
            return res.status(401).json({ message: 'Unauthorized: no student ID' })
        }

        const joinedBatch = await batchModel.find({ students: studentId, status: 'verified' });

        res.status(200).json({ success: true, batches: joinedBatch });
    } catch (error) {
        console.error("Fetch joined batches error:", error);
        res.status(500).json({ success: false, message: "Error fetching joined batches", error: error.message });

    }
}

// DELETE /batches/:id
const deleteBatch = async (req, res) => {
    try {
        const { id } = req.params;

        // Ensure user is authenticated
        if (!req.user) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        // Role check
        if (req.user.role !== "admin" && req.user.role !== "teacher") {
            return res.status(403).json({ success: false, message: "Not authorized to delete batches" });
        }

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid batch ID" });
        }

        const batch = await batchModel.findByIdAndDelete(id);

        if (!batch) {
            return res.status(404).json({ success: false, message: "Batch not found" });
        }

        res.status(200).json({ success: true, message: "Batch deleted successfully", batch });
    } catch (error) {
        console.error("DeleteBatch error:", error); // 👈 log exact error
        res.status(500).json({ success: false, message: "Error deleting batch", error: error.message });
    }
};

module.exports = { createBatch, fetchTeacherBatch, fetchPendingBatch, updateBatchStatus, fetchVerifiedBatch, joinBatch, fetchJoinedBatch, deleteBatch };