
const mongoose = require("mongoose");

const visitSchema = new mongoose.Schema(
  {
    visitId: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true
    },

    visitDate: {
      type: Date,
      default: Date.now
    },

    reason: {
      type: String,
      required: true,
      trim: true
    },

    symptoms: {
      type: String,
      trim: true
    },

    remarks: {
      type: String,
      trim: true
    },

    status: {
      type: String,
      enum: ["In Progress", "Completed"],
      default: "In Progress"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Visit", visitSchema);
