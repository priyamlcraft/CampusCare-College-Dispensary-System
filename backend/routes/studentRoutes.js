
const express = require("express");
const router = express.Router();

const {
  getStudents,
  getStudentById,
  addStudent,
  updateStudent,
  deleteStudent
} = require("../controllers/studentController");

const { protect } = require("../middleware/authMiddleware");

// Protected Student Routes
router.get("/", protect, getStudents);
router.get("/:id", protect, getStudentById);
router.post("/", protect, addStudent);
router.put("/:id", protect, updateStudent);
router.delete("/:id", protect, deleteStudent);

module.exports = router;

