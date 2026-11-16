# CampusCare – College Dispensary Management System

## 1. Project Overview

CampusCare is a web-based College Dispensary Management System developed to simplify and digitize the daily operations of a college dispensary.

The system provides an integrated platform for managing student records, medical visits, medicine inventory, medicine distribution, emergency cases, and administrative reports.

It is developed using the MERN Stack (MongoDB, Express.js, React.js, and Node.js).

## 2. Project Objectives

- To digitize college dispensary operations.
- To maintain student medical visit records.
- To manage medicine stock and inventory.
- To record medicine distribution.
- To maintain emergency case records.
- To provide an organized dashboard and reports.

## 3. Technology Stack

**Frontend**
- React.js
- Vite
- JavaScript
- HTML5
- CSS3
- Axios
- React Router

**Backend**
- Node.js
- Express.js
- REST API
- JWT Authentication
- bcryptjs

**Database**
- MongoDB
- Mongoose

## 4. Main Features and Modules

### Admin Login
- Secure administrator login.
- JWT-based authentication.
- Protected application routes.

### Dashboard
- Total students
- Total medical visits
- Total medicines
- Total distributions
- Emergency records

### Student Management
- Add, view, update, delete, and search student records.

### Medical Visit Management
- Record student medical visits.
- Maintain visit dates and reasons.
- Store symptoms and remarks.
- Track visit status.

### Medicine Inventory
- Add and manage medicines.
- Track available stock.
- Maintain batch and expiry information.
- Identify low-stock and out-of-stock medicines.

### Medicine Distribution
- Record medicine distribution.
- Track distributed quantities.
- Automatically update medicine stock.

### Emergency Management
- Record and update emergency cases.
- Track Open, Resolved, and Referred statuses.

### Reports and Analytics
- View overall statistics.
- Monitor medicine inventory.
- Analyze medical visits.
- Track emergency cases.
- Review medicine distribution records.

## 5. Project Structure

```text
College-Dispensary-System/
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   ├── seedAdmin.js
│   └── package.json
│
└── README.md
```

## 6. System Requirements

- Node.js
- npm
- MongoDB Atlas or local MongoDB
- Visual Studio Code
- Modern Web Browser

## 7. Installation and Setup

### Step 1: Download the Project

Download the source code and open the project folder in Visual Studio Code.

### Step 2: Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the backend folder:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
ADMIN_NAME=Your Admin Name
ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_admin_password
```

### Step 3: Create Admin Account

```bash
node seedAdmin.js
```

### Step 4: Start Backend Server

```bash
npm run dev
```

Backend runs at:

`http://localhost:5000`

### Step 5: Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL displayed by Vite in your browser.

## 8. API Modules

The backend provides REST API routes for:

- `/api/admin`
- `/api/students`
- `/api/visits`
- `/api/medicines`
- `/api/distributions`
- `/api/emergencies`
- `/api/reports`

## 9. Security

- JWT-based authentication.
- Password hashing using bcryptjs.
- Protected routes for authorized access.
- Environment variables for sensitive configuration.

## 10. Future Enhancements

- Student self-service portal.
- Online appointment booking.
- Automated notifications.
- PDF and Excel report export.
- Advanced analytics.
- Cloud deployment.
- Audit logs and automated backups.

## 11. Project Information

**Project Name:** CampusCare  
**Project Title:** College Dispensary Management System  
**Development Stack:** MERN Stack  
**Project Type:** Full Stack Web Application  
**Internship Domain:** Full Stack Development Using MERN Stack  
**Organization:** Ardent Computech Pvt. Limited  
**Academic Institution:** Bankura Unnayani Institute of Engineering

## 12. Conclusion

CampusCare aims to make college dispensary management more organized, efficient, and accessible through a centralized digital platform. It integrates student records, medical visits, medicine inventory, distribution, emergency management, and reporting into one application.