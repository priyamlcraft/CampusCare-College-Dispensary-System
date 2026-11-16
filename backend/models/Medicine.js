
const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema(
  {
    medicineName: {
      type: String,
      required: true,
      trim: true
    },

    category: {
      type: String,
      required: true
    },

    batchNumber: {
      type: String,
      required: true,
      trim: true
    },

    quantity: {
      type: Number,
      required: true,
      min: 0,
      default: 0
    },

    unit: {
      type: String,
      default: "Tablets"
    },

    expiryDate: {
      type: Date,
      required: true
    },

    minimumStock: {
      type: Number,
      default: 10,
      min: 0
    },

    supplier: {
      type: String,
      trim: true
    },

    status: {
      type: String,
      enum: ["Available", "Low Stock", "Out of Stock"],
      default: "Available"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Medicine", medicineSchema);
