# CampusCare – College Dispensary Management System

## Overview

CampusCare is a web-based College Dispensary Management System developed using the MERN Stack. The application is designed to digitize and simplify the management of college dispensary activities through a centralized platform.

It provides an organized interface for managing dispensary operations, student information, and related records. The system uses a React-based frontend, a Node.js and Express.js backend, and MongoDB for data storage.

## Objectives

- To digitize college dispensary management activities.
- To maintain student and dispensary-related records systematically.
- To provide a centralized platform for dispensary operations.
- To simplify administrative tasks through a web-based interface.
- To improve data organization and accessibility.

## Technologies Used

### Frontend
- React.js – Building the user interface.
- Vite – Frontend development and build tool.
- HTML5 – Web page structure.
- CSS3 – Styling and layout.
- JavaScript – Application functionality.

### Backend
- Node.js – JavaScript runtime environment.
- Express.js – Backend framework.
- REST API – Communication between frontend and backend.

### Database
- MongoDB – NoSQL database.
- Mongoose – MongoDB object data modeling.

### Authentication and Security
- JSON Web Token (JWT) – Authentication.
- bcryptjs – Password hashing.

## Key Features

### 1. Admin Authentication
- Admin login functionality.
- Password verification.
- JWT-based authentication.

### 2. Student Management
- Management of student-related information.
- Organized access to student records.

### 3. Dispensary Management
- Management of dispensary-related information and records.
- Centralized handling of dispensary activities.

### 4. Database Management
- MongoDB database integration.
- Mongoose models for structured data handling.

### 5. User Interface
- React-based interface.
- Organized navigation and user-friendly design.
- Responsive layout.

## Project Architecture

The application follows a client-server architecture.

- **Frontend:** Handles the user interface and user interactions.
- **Backend:** Processes API requests and application logic.
- **Database:** Stores and manages application data.

## Project Directory Structure

```text
CampusCare-College-Dispensary-System/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── ...
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── config/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   └── package.json
│
└── README.md
```

## Installation and Setup

### Prerequisites

Make sure the following are installed:

- Node.js
- npm
- MongoDB Atlas account or a MongoDB database
- Git

### Step 1: Clone the Repository

```bash
git clone https://github.com/YOUR-USERNAME/CampusCare-College-Dispensary-System.git
```

Navigate to the project directory:

```bash
cd CampusCare-College-Dispensary-System
```

### Step 2: Backend Configuration

Navigate to the backend folder:

```bash
cd backend
npm install
```

Create a `.env` file inside the backend directory and configure the following variables:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
ADMIN_NAME=your_admin_name
ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_admin_password
```

### Step 3: Start the Backend Server

```bash
npm run dev
```

### Step 4: Frontend Configuration

Open another terminal and navigate to the frontend directory:

```bash
cd frontend
npm install
```

### Step 5: Start the Frontend

```bash
npm run dev
```

Open the local URL displayed in the terminal to access the application.

## Environment Variables

| Variable | Description |
|---|---|
| PORT | Backend server port |
| NODE_ENV | Application environment |
| MONGO_URI | MongoDB connection string |
| JWT_SECRET | Secret key for JWT authentication |
| ADMIN_NAME | Admin name |
| ADMIN_EMAIL | Admin email |
| ADMIN_PASSWORD | Admin password |

## Security Considerations

- Passwords are handled using bcryptjs.
- Authentication uses JSON Web Tokens.
- Sensitive credentials are stored in environment variables.
- Actual `.env` files should never be uploaded to a public repository.

## Future Enhancements

- Online appointment booking.
- Medicine inventory management.
- Prescription management.
- Medical report generation.
- Additional administrative features.

## Project Information

| Details | Description |
|---|---|
| Project Name | CampusCare |
| Project Category | Web Application |
| Project Domain | Full Stack Web Development |
| Development Stack | MERN |
| Frontend | React.js |
| Backend | Node.js and Express.js |
| Database | MongoDB |

## Conclusion

CampusCare provides a digital platform for organizing college dispensary activities. By integrating modern web technologies, the system aims to make dispensary-related operations more structured, accessible, and manageable.

---

**CampusCare – College Dispensary Management System**
