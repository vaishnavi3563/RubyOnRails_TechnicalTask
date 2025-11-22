require('dotenv').config();
const connectDB = require('../config/db');
const Department = require('../models/Department');
const Employee = require('../models/Employee');

async function seed() {
  await connectDB(process.env.MONGO_URI || 'mongodb://localhost:27017/employee_management_dev');
  await Employee.deleteMany({});
  await Department.deleteMany({});

  const finance = await Department.create({ name: 'Finance', budget: 200000 });
  const eng = await Department.create({ name: 'Engineering', budget: 500000 });
  const hr = await Department.create({ name: 'HR', budget: 100000 });

  await Employee.create({ first_name: 'John', last_name: 'Doe', email: 'john.doe@example.com', salary: 80000, department: finance._id });
  await Employee.create({ first_name: 'Jane', last_name: 'Smith', email: 'jane.smith@example.com', salary: 95000, department: eng._id });

  console.log('Seed finished');
  process.exit(0);
}

seed().catch(err => { console.error(err); process.exit(1); });
