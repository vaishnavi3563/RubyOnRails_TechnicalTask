require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const departmentsRoutes = require('./routes/departments');
const employeesRoutes = require('./routes/employees');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
connectDB(process.env.MONGO_URI || 'mongodb://localhost:27017/employee_management_dev');

app.use('/api/departments', departmentsRoutes);
app.use('/api/employees', employeesRoutes);

app.get('/', (req, res) => res.send('Employee Management API running'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
