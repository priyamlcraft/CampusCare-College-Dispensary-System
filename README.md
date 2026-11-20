# CampusCare – College Dispensary Management System

## Acknowledgement

We would like to express our sincere gratitude to **Ardent Computech Pvt. Ltd., Durgapur**, for providing us with the opportunity to undertake this project as part of our Full Stack Development Internship.

We are especially grateful to our project mentor, **Mr. Rahul Sharma**, for his valuable guidance, continuous support, encouragement, and constructive feedback throughout the development process. His guidance helped us strengthen our technical understanding and approach project challenges with confidence.

We would also like to extend our heartfelt thanks to **Bankura Unnayani Institute of Engineering**, our faculty members, and everyone who supported and motivated us during this project.

This internship provided us with an excellent opportunity to apply our theoretical knowledge to practical development. Through this project, we gained valuable experience in MERN stack development, database management, REST API integration, authentication, and collaborative software development.

Finally, we sincerely thank all our team members for their cooperation, dedication, and contributions towards completing this project.

## Contributors

This project was collaboratively developed by the following team members:

1. **Priya Mandal**
2. **Ritwika Maji**
3. **Smriti Gorai**
4. **Sucheta Kar**
5. **Puja Maji**

### Internship & Academic Details

- **Institution:** Bankura Unnayani Institute of Engineering
- **Internship Organization:** Ardent Computech Pvt. Ltd., Durgapur
- **Internship Domain:** Full Stack Development Using MERN Stack
- **Internship Duration:** 21 September 2026 – 20 October 2026
- **Project Mentor:** Mr. Rahul Sharma
- **Academic Session:** 2026–2027

---

## Project Overview

**CampusCare – College Dispensary Management System** is a web-based application designed to digitize and simplify the daily administrative activities of a college dispensary.

The system provides a centralized platform for managing student records, dispensary visits, medicine inventory, medicine distribution, emergency records, and reports. It aims to reduce manual record-keeping, improve data organization, and make dispensary operations more efficient.

**Live Application:** https://campus-care-college-dispensary-syst.vercel.app/

**GitHub Repository:** https://github.com/priyamlcraft/CampusCare-College-Dispensary-System

## Key Features

### 1. Admin Authentication
- Admin login using email and password.
- JWT-based authentication.
- Protected application routes and API requests.

### 2. Dashboard
- Overview of important dispensary information.
- Quick access to different management modules.
- Summary of students, visits, medicines, distributions, and emergency records.

### 3. Student Management
- Add, view, update, and delete student records.
- Maintain student information and unique Student IDs.
- Search and manage student details.

### 4. Dispensary Visit Management
- Create and manage student visit records.
- Maintain visit dates, reasons, symptoms, and remarks.
- Update visit information and status.

### 5. Medicine Inventory Management
- Add, view, update, and delete medicine records.
- Maintain medicine names, categories, batch numbers, and supplier details.
- Track available quantities and expiry dates.
- Monitor minimum stock levels.
- Identify low-stock and out-of-stock medicines.

### 6. Medicine Distribution
- Record medicine distribution to students.
- Select medicines and specify quantities.
- Update inventory quantities after distribution.
- Maintain distribution records.

### 7. Emergency Management
- Create and manage emergency records.
- Maintain student or person details.
- Record emergency type, date, description, and action taken.
- Track emergency status, such as Open, Resolved, or Referred.

### 8. Reports and Analytics
- View summarized dispensary information.
- Monitor medicine stock and distribution records.
- Track student visits and emergency statuses.

## Technology Stack

| Technology | Purpose |
|---|---|
| MongoDB Atlas | Database |
| Express.js | Backend framework |
| React.js | Frontend library |
| Node.js | Server-side runtime |
| JavaScript | Application logic |
| HTML5 | Web page structure |
| CSS3 | Styling and layout |
| Axios | API communication |
| JWT | Authentication |
| Vite | Frontend development and build tool |

## Project Structure

```text
CampusCare-College-Dispensary-System/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── index.html
│   └── vercel.json
│
└── README.md
```

*Note: The structure above provides an overview. Actual files and folders may vary.*

## Installation and Setup

Follow these steps to run the project locally.

### Prerequisites

Make sure the following are installed:

- Node.js and npm
- MongoDB Atlas account
- Git
- Visual Studio Code (recommended)

### 1. Clone the Repository

```bash
git clone https://github.com/priyamlcraft/CampusCare-College-Dispensary-System.git
```

```bash
cd CampusCare-College-Dispensary-System
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder and configure your environment variables:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Use your own MongoDB connection string and a strong secret key. Never upload the `.env` file or expose credentials on GitHub.

Start the backend using the script configured in `backend/package.json`:

```bash
npm run dev
```

### 3. Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

Vite will provide a local development URL in the terminal. Open that URL in your browser to access the application.

## Deployment

The project is deployed using the following services:

| Service | Platform |
|---|---|
| Frontend | Vercel |
| Backend | Render |
| Database | MongoDB Atlas |

**Live Project:** https://campus-care-college-dispensary-syst.vercel.app/

## Security Considerations

- JWT-based authentication for admin access.
- Protected routes and API endpoints.
- Environment variables for sensitive configuration.
- Database connection through MongoDB Atlas.
- Sensitive credentials should never be committed to the repository.

## Project Purpose

The main objective of CampusCare is to provide a digital solution for managing college dispensary activities.

The system aims to:

- Reduce manual paperwork and record-keeping.
- Improve student and dispensary record management.
- Simplify medicine inventory tracking.
- Maintain medicine distribution records.
- Organize emergency information.
- Improve the overall efficiency of dispensary operations.

## Future Scope

The project can be further enhanced with additional features, such as:

- Role-based access for different dispensary staff members.
- Automated low-stock and medicine-expiry notifications.
- Advanced reporting and data export.
- Appointment scheduling.
- Improved analytics and activity monitoring.

---

**Developed as part of the Full Stack Development Using MERN Stack Internship at Ardent Computech Pvt. Ltd., Durgapur.**

