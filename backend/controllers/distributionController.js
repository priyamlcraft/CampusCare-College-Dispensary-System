

const Distribution = require("../models/Distribution");
const Medicine = require("../models/Medicine");

// Update medicine stock status
const updateMedicineStatus = async (medicineId) => {
  const medicine = await Medicine.findById(medicineId);

  if (!medicine) return;

  let status = "Available";

  if (medicine.quantity <= 0) {
    status = "Out of Stock";
  } else if (medicine.quantity <= medicine.minimumStock) {
    status = "Low Stock";
  }

  medicine.status = status;
  await medicine.save();
};

// Get all distributions
exports.getDistributions = async (req, res) => {
  try {
    const distributions = await Distribution.find()
      .populate("student", "studentId name department")
      .populate("medicine", "medicineName category")
      .populate("visit", "visitId visitDate")
      .sort({ distributedAt: -1 });

    res.status(200).json({
      success: true,
      count: distributions.length,
      data: distributions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Add new distribution and reduce medicine stock
exports.addDistribution = async (req, res) => {
  let stockUpdated = false;
  let medicineId = null;
  let quantity = Number(req.body.quantity);

  try {
    const {
      distributionId,
      student,
      medicine,
      visit,
      distributedAt,
      remarks
    } = req.body;

    medicineId = medicine;

    if (!distributionId || !student || !medicine) {
      return res.status(400).json({
        success: false,
        message: "Distribution ID, student and medicine are required"
      });
    }

    if (!Number.isInteger(quantity) || quantity < 1) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be a positive whole number"
      });
    }

    // Reduce stock only when sufficient stock is available
    const updatedMedicine = await Medicine.findOneAndUpdate(
      {
        _id: medicineId,
        quantity: { $gte: quantity }
      },
      {
        $inc: { quantity: -quantity }
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!updatedMedicine) {
      const existingMedicine = await Medicine.findById(medicineId);

      if (!existingMedicine) {
        return res.status(404).json({
          success: false,
          message: "Medicine not found"
        });
      }

      return res.status(400).json({
        success: false,
        message: "Insufficient stock. Available quantity: " +
          existingMedicine.quantity
      });
    }

    stockUpdated = true;

    await updateMedicineStatus(medicineId);

    // Save distribution record
    const distribution = await Distribution.create({
      distributionId,
      student,
      medicine: medicineId,
      visit: visit || undefined,
      quantity,
      distributedAt,
      remarks,
      stockAdjusted: true
    });

    res.status(201).json({
      success: true,
      message: "Distribution recorded and stock updated successfully",
      data: distribution
    });

  } catch (error) {
    // Restore stock if distribution creation fails
    if (stockUpdated && medicineId) {
      try {
        await Medicine.findByIdAndUpdate(
          medicineId,
          { $inc: { quantity: quantity } }
        );

        await updateMedicineStatus(medicineId);
      } catch (restoreError) {
        console.error("Stock restoration failed:", restoreError.message);
      }
    }

    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Get distribution by ID
exports.getDistributionById = async (req, res) => {
  try {
    const distribution = await Distribution.findById(req.params.id)
      .populate("student", "studentId name department")
      .populate("medicine", "medicineName category")
      .populate("visit", "visitId visitDate");

    if (!distribution) {
      return res.status(404).json({
        success: false,
        message: "Distribution record not found"
      });
    }

    res.status(200).json({
      success: true,
      data: distribution
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Delete distribution and restore stock when applicable
exports.deleteDistribution = async (req, res) => {
  try {
    const distribution = await Distribution.findById(req.params.id);

    if (!distribution) {
      return res.status(404).json({
        success: false,
        message: "Distribution record not found"
      });
    }

    // Delete the record first
    await Distribution.findByIdAndDelete(req.params.id);

    // Restore stock only for records that reduced stock
    if (distribution.stockAdjusted === true) {
      await Medicine.findByIdAndUpdate(
        distribution.medicine,
        {
          $inc: { quantity: distribution.quantity }
        }
      );

      await updateMedicineStatus(distribution.medicine);
    }

    res.status(200).json({
      success: true,
      message: "Distribution deleted and stock updated successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
