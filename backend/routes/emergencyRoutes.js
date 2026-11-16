
const express = require("express");
const router = express.Router();

const {
  getEmergencies,
  getEmergencyById,
  addEmergency,
  updateEmergency,
  deleteEmergency
} = require("../controllers/emergencyController");

const { protect } = require("../middleware/authMiddleware");

// Protected Emergency Routes
router.get("/", protect, getEmergencies);
router.get("/:id", protect, getEmergencyById);
router.post("/", protect, addEmergency);
router.put("/:id", protect, updateEmergency);
router.delete("/:id", protect, deleteEmergency);

module.exports = router;

