const batchModel = require('../models/batch.model');

const createBatch = async (req, res) => {
    try {
        const { batchname, description } = req.body;

        // Create new batch with default status "pending"
        const batch = await batchModel.create({
            batchname,
            description,
            createdBy: req.user.id, // comes from auth middleware
            status: "pending"
        });

        res.status(201).json({
            message: "Batch created successfully",
            batch
        });
    } catch (error) {
        res.status(500).json({
            message: "Error creating batch",
            error: error.message
        });
    }
};

module.exports = { createBatch };