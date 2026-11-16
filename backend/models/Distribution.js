
const mongoose = require("mongoose");

const distributionSchema = new mongoose.Schema(
  {
    distributionId: {
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

    visit: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Visit"
    },

    medicine: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Medicine",
      required: true
    },

    quantity: {
      type: Number,
      required: true,
      min: 1
    },

    stockAdjusted: {
      type: Boolean,
      default: false
    },

    distributedAt: {
      type: Date,
      default: Date.now
    },

    remarks: {
      type: String,
      trim: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "Distribution",
  distributionSchema
);
