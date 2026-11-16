require("dotenv").config();

const mongoose = require("mongoose");
const Admin = require("./models/Admin");
const bcrypt = require("bcryptjs");

async function checkAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const email = process.env.ADMIN_EMAIL.toLowerCase().trim();
    const admin = await Admin.findOne({ email });

    console.log("Admin found:", !!admin);

    if (admin) {
      console.log("Admin active:", admin.isActive);

      const match = await bcrypt.compare(
        process.env.ADMIN_PASSWORD,
        admin.password
      );

      console.log("Password matches:", match);
    }
  } catch (error) {
    console.log("Error:", error.message);
  } finally {
    await mongoose.disconnect();
  }
}

checkAdmin();