# Employee & Department Management System (MERN Stack)

This project is a full-stack CRUD-based management system built using the **MERN stack (MongoDB, Express, React, Node.js)**.  
It allows users to manage **Employees and Departments**, similar to the original Rails assignment structure.

---

##  Features

- Create, Read, Update, Delete Departments
- Create, Read, Update, Delete Employees
- Validation for duplicate departments and empty fields
- Fully responsive UI
- Modular backend architecture (models, controllers, routes)
- Seed script for initial database setup

---

##  Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React, Fetch API / Axios |
| Backend | Node.js, Express.js |
| Database | MongoDB + Mongoose |
| Tools | Nodemon, dotenv, CORS |

---

##  Folder Structure

project/
├── backend/
│ ├── models/
│ ├── controllers/
│ ├── routes/
│ ├── seed.js
│ ├── server.js
│ └── .env
└── frontend/
├── src/
├── public/
└── .env

PROJECT SETUP:

```bash
cd backend
npm install
Create .env file:

ini
Copy code
MONGO_URI=your_mongodb_connection_string
Run seed data (optional):

bash
Copy code
npm run seed
Start backend:

bash
Copy code
npm run dev
Backend runs at: http://localhost:5000/api


FRONTEND SETUP:

bash
Copy code
cd frontend
npm install
Create .env file:

bash
Copy code
REACT_APP_API_URL=http://localhost:5000/api
Start frontend:

bash
Copy code
npm start
Frontend runs at: http://localhost:3000


 API Endpoints
 Departments:

Method	Endpoint	Description
GET	/api/departments	Get all departments
POST	/api/departments	Create a department
PUT	/api/departments/:id	Update department
DELETE	/api/departments/:id	Delete department

 Employees:
Method	Endpoint	Description
GET	/api/employees	Get all employees
POST	/api/employees	Create employee
PUT	/api/employees/:id	Update employee
DELETE	/api/employees/:id	Delete employee

Github Repo:
https://github.com/vaishnavi3563/RubyOnRails_TechnicalTask

 Author
Vaishnavi
Full-Stack Web Developer
