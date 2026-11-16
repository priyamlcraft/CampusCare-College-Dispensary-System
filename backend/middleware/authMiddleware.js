
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

// Verify User Authentication
const protect = async (req, res, next) => {
  try {
    let token;

    // Check Authorization Header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized. Please login first."
      });
    }

    // Verify JWT Token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // Find Admin
    const admin = await Admin.findById(decoded.id).select(
      "-password"
    );

    if (!admin || !admin.isActive) {
      return res.status(401).json({
        success: false,
        message: "User not found or account is inactive."
      });
    }

    req.admin = admin;

    next();

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token."
    });
  }
};

// Check Admin Role
const adminOnly = (req, res, next) => {
  if (req.admin && req.admin.role === "Admin") {
    return next();
  }

  return res.status(403).json({
    success: false,
    message: "Access denied. Admin permission required."
  });
};

module.exports = {
  protect,
  adminOnly
};
