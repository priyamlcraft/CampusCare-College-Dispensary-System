
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("./models/Admin");
require("dotenv").config();

const createAdmin = async () => {
  try {
    const { ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;

    if (!ADMIN_NAME || !ADMIN_EMAIL || !ADMIN_PASSWORD) {
      throw new Error("Admin details are missing.");
    }

    if (ADMIN_PASSWORD.length < 8) {
      throw new Error("Password must contain at least 8 characters.");
    }

    await mongoose.connect(process.env.MONGO_URI);

    const email = ADMIN_EMAIL.toLowerCase().trim();
    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 12);

    const admin = await Admin.findOneAndUpdate(
      { email },
      {
        name: ADMIN_NAME.trim(),
        email,
        password: hashedPassword,
        role: "Admin",
        isActive: true
      },
      {
        new: true,
        upsert: true,
        runValidators: true
      }
    );

    console.log("Admin account updated successfully!");
    console.log("Admin email:", admin.email);

  } catch (error) {
    console.error("Admin update failed:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

createAdmin();
