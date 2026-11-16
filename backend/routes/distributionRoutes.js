
const express = require("express");
const router = express.Router();

const {
  getDistributions,
  addDistribution,
  getDistributionById,
  deleteDistribution
} = require("../controllers/distributionController");

const { protect } = require("../middleware/authMiddleware");

// Protected Distribution Routes
router.get("/", protect, getDistributions);
router.get("/:id", protect, getDistributionById);
router.post("/", protect, addDistribution);
router.delete("/:id", protect, deleteDistribution);

module.exports = router;
