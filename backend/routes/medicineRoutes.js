
const express = require("express");
const router = express.Router();

const {
  getMedicines,
  getMedicineById,
  addMedicine,
  updateMedicine,
  deleteMedicine
} = require("../controllers/medicineController");

const { protect } = require("../middleware/authMiddleware");

// Protected Medicine Routes
router.get("/", protect, getMedicines);
router.get("/:id", protect, getMedicineById);
router.post("/", protect, addMedicine);
router.put("/:id", protect, updateMedicine);
router.delete("/:id", protect, deleteMedicine);

module.exports = router;

