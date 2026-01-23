const batchModel = require('../models/batch.model');

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

// controllers/batchController.js
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
        const batches = await batchModel.find({ status: 'verified' });

        if (!batches || batches.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No verified batches found",
                batches: []
            });
        }

        res.status(200).json({
            success: true,
            message: "Fetched Verified Batch Successfully",
            batches
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching batches",
            error: error.message,
        });
    }
};

module.exports = { createBatch, fetchTeacherBatch, fetchPendingBatch, updateBatchStatus,fetchVerifiedBatch };