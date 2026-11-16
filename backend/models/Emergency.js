
const mongoose = require("mongoose");

const emergencySchema = new mongoose.Schema(
  {
    emergencyId: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    personName: {
      type: String,
      required: true,
      trim: true
    },

    studentId: {
      type: String,
      trim: true
    },

    department: {
      type: String,
      trim: true
    },

    emergencyType: {
      type: String,
      required: true
    },

    description: {
      type: String,
      required: true,
      trim: true
    },

    actionTaken: {
      type: String,
      trim: true
    },

    referredTo: {
      type: String,
      trim: true
    },

    emergencyDate: {
      type: Date,
      default: Date.now
    },

    status: {
      type: String,
      enum: ["Open", "Resolved", "Referred"],
      default: "Open"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Emergency", emergencySchema);
