
require("dotenv").config();

async function testLogin() {
  try {
    const response = await fetch("http://localhost:5000/api/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD
      })
    });

    const data = await response.json();

    console.log("HTTP Status:", response.status);
    console.log("Success:", data.success);
    console.log("Message:", data.message);

  } catch (error) {
    console.log("API Error:", error.message);
  }
}

testLogin();
