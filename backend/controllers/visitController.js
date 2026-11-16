
const Visit = require("../models/Visit");

// Get all visits
exports.getVisits = async (req, res) => {
  try {
    const visits = await Visit.find()
      .populate("student", "studentId name department")
      .sort({ visitDate: -1 });

    res.status(200).json({
      success: true,
      count: visits.length,
      data: visits
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get visit by ID
exports.getVisitById = async (req, res) => {
  try {
    const visit = await Visit.findById(req.params.id)
      .populate("student", "studentId name department");

    if (!visit) {
      return res.status(404).json({
        success: false,
        message: "Visit record not found"
      });
    }

    res.status(200).json({
      success: true,
      data: visit
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Add new visit
exports.addVisit = async (req, res) => {
  try {
    const visit = await Visit.create(req.body);

    res.status(201).json({
      success: true,
      message: "Visit recorded successfully",
      data: visit
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Update visit
exports.updateVisit = async (req, res) => {
  try {
    const visit = await Visit.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!visit) {
      return res.status(404).json({
        success: false,
        message: "Visit record not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Visit updated successfully",
      data: visit
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Delete visit
exports.deleteVisit = async (req, res) => {
  try {
    const visit = await Visit.findByIdAndDelete(req.params.id);

    if (!visit) {
      return res.status(404).json({
        success: false,
        message: "Visit record not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Visit deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
