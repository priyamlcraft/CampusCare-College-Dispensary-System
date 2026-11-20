
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./config/db");

// Import Routes
const studentRoutes = require("./routes/studentRoutes");
const visitRoutes = require("./routes/visitRoutes");
const medicineRoutes = require("./routes/medicineRoutes");
const distributionRoutes = require("./routes/distributionRoutes");
const emergencyRoutes = require("./routes/emergencyRoutes");
const reportsRoutes = require("./routes/reportsRoutes");
const adminRoutes = require("./routes/adminRoutes");

// Import Error Middleware
const {
  notFound,
  errorHandler
} = require("./middleware/errorMiddleware");

const app = express();

// Middleware
app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5175",
    "https://campus-care-dispensary-syst.vercel.app"
  ]
}));

app.use(express.json());

// Home Route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "CampusCare Backend is Running!"
  });
});

// Health Check Route
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "CampusCare API is healthy"
  });
});

// API Routes
app.use("/api/students", studentRoutes);
app.use("/api/visits", visitRoutes);
app.use("/api/medicines", medicineRoutes);
app.use("/api/distributions", distributionRoutes);
app.use("/api/emergencies", emergencyRoutes);
app.use("/api/reports", reportsRoutes);
app.use("/api/admin", adminRoutes);

// Error Handling
app.use(notFound);
app.use(errorHandler);

// Server Configuration
const PORT = process.env.PORT || 5000;

// Start Server after MongoDB connects
const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`CampusCare Backend running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Backend startup failed:", error.message);
    process.exit(1);
  }
};

startServer();

