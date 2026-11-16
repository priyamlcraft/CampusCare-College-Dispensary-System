

const express = require("express");
const router = express.Router();

const {
  getVisits,
  getVisitById,
  addVisit,
  updateVisit,
  deleteVisit
} = require("../controllers/visitController");

const { protect } = require("../middleware/authMiddleware");

// Protected Visit Routes
router.get("/", protect, getVisits);
router.get("/:id", protect, getVisitById);
router.post("/", protect, addVisit);
router.put("/:id", protect, updateVisit);
router.delete("/:id", protect, deleteVisit);

module.exports = router;
