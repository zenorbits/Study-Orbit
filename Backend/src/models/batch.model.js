const mongoose = require('mongoose');

const batchSchema = new mongoose.Schema({
    batchname: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    description: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

    
});

const batchModel = mongoose.model('Batch', batchSchema);

module.exports = batchModel;