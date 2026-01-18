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
            createdBy: req.user.id, // comes from auth middleware
            status: "pending",
            code: await generateBatchCode()
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