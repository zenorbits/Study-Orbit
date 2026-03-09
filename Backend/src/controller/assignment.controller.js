const assignmentModel = require('../models/assignment.model');

const createAssignment = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, dueDate } = req.body;

    if (!title || !description || !dueDate) {
      return res.status(400).json({
        success: false,
        message: 'Title, description, and due date are required'
      });
    }

    const newAssignment = await assignmentModel.create({
      title,
      description,
      dueDate,
      batch: id,
      createdBy: req.user?._id // if you’re using auth middleware
    });

    res.status(201).json({
      success: true,
      message: 'Assignment created successfully',
      data: newAssignment
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

const getAssignment = async (req, res) => {
  try {
    const assignment = await assignmentModel.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      data: assignment
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteAssignment = async (req, res) => {
  try {
    const { id } = req.body;

    const deleteAssignment = await assignmentModel.findByIdAndDelete(id);

    if (!deleteAssignment) {
      return res.status(404).json({ success: false, message: 'Assignment not found' });
    }

    res.json({
      success: true,
      message: 'Assignment deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ New function: Get assignments by batch ID
const getAssignmentsByBatch = async (req, res) => {
  try {
    const { batchId } = req.params;

    const assignments = await assignmentModel.find({ batch: batchId }).sort({ createdAt: -1 });

    if (!assignments || assignments.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No assignments found for this batch'
      });
    }

    res.json({
      success: true,
      data: assignments
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { 
  createAssignment, 
  getAssignment, 
  deleteAssignment, 
  getAssignmentsByBatch // export new function
};