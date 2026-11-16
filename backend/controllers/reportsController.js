
const Student = require("../models/Student");
const Visit = require("../models/Visit");
const Medicine = require("../models/Medicine");
const Distribution = require("../models/Distribution");
const Emergency = require("../models/Emergency");

// Get Reports and Analytics
exports.getReports = async (req, res) => {
  try {
    // Total counts
    const totalStudents = await Student.countDocuments();
    const totalVisits = await Visit.countDocuments();
    const totalMedicines = await Medicine.countDocuments();
    const totalDistributions = await Distribution.countDocuments();
    const totalEmergencies = await Emergency.countDocuments();

    // Medicine stock summary
    const medicines = await Medicine.find();

    const totalStockUnits = medicines.reduce(
      (total, medicine) => total + medicine.quantity,
      0
    );

    const lowStockItems = medicines.filter(
      (medicine) => medicine.status === "Low Stock"
    ).length;

    const outOfStockItems = medicines.filter(
      (medicine) => medicine.status === "Out of Stock"
    ).length;

    // Visit status summary
    const completedVisits = await Visit.countDocuments({
      status: "Completed"
    });

    const pendingVisits = await Visit.countDocuments({
      status: "In Progress"
    });

    // Emergency status summary
    const openEmergencies = await Emergency.countDocuments({
      status: "Open"
    });

    const resolvedEmergencies = await Emergency.countDocuments({
      status: "Resolved"
    });

    const referredEmergencies = await Emergency.countDocuments({
      status: "Referred"
    });

    // Distribution quantity summary
    const distributionSummary = await Distribution.aggregate([
      {
        $group: {
          _id: null,
          totalQuantityDistributed: {
            $sum: "$quantity"
          }
        }
      }
    ]);

    const totalQuantityDistributed =
      distributionSummary.length > 0
        ? distributionSummary[0].totalQuantityDistributed
        : 0;

    res.status(200).json({
      success: true,
      data: {
        overview: {
          totalStudents,
          totalVisits,
          totalMedicines,
          totalDistributions,
          totalEmergencies
        },

        inventory: {
          totalStockUnits,
          lowStockItems,
          outOfStockItems
        },

        visits: {
          completedVisits,
          pendingVisits
        },

        emergencies: {
          openEmergencies,
          resolvedEmergencies,
          referredEmergencies
        },

        distributions: {
          totalQuantityDistributed
        }
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
