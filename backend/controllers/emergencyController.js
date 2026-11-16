
const Emergency = require("../models/Emergency");

// Get all emergency records
exports.getEmergencies = async (req, res) => {
  try {
    const emergencies = await Emergency.find().sort({
      emergencyDate: -1
    });

    res.status(200).json({
      success: true,
      count: emergencies.length,
      data: emergencies
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get emergency by ID
exports.getEmergencyById = async (req, res) => {
  try {
    const emergency = await Emergency.findById(req.params.id);

    if (!emergency) {
      return res.status(404).json({
        success: false,
        message: "Emergency record not found"
      });
    }

    res.status(200).json({
      success: true,
      data: emergency
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Add emergency record
exports.addEmergency = async (req, res) => {
  try {
    const emergency = await Emergency.create(req.body);

    res.status(201).json({
      success: true,
      message: "Emergency record added successfully",
      data: emergency
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Update emergency record
exports.updateEmergency = async (req, res) => {
  try {
    const emergency = await Emergency.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!emergency) {
      return res.status(404).json({
        success: false,
        message: "Emergency record not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Emergency record updated successfully",
      data: emergency
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Delete emergency record
exports.deleteEmergency = async (req, res) => {
  try {
    const emergency = await Emergency.findByIdAndDelete(
      req.params.id
    );

    if (!emergency) {
      return res.status(404).json({
        success: false,
        message: "Emergency record not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Emergency record deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
