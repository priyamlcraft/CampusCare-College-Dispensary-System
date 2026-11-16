require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("./models/Admin");

async function testAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const email = process.env.ADMIN_EMAIL.toLowerCase().trim();
    const admin = await Admin.findOne({ email });

    console.log("Admin found:", !!admin);
    console.log("Account active:", admin?.isActive);

    if (admin) {
      const matches = await bcrypt.compare(
        process.env.ADMIN_PASSWORD,
        admin.password
      );

      console.log("Password matches:", matches);
    }
  } catch (error) {
    console.log("Error:", error.message);
  } finally {
    await mongoose.disconnect();
  }
}

testAdmin();