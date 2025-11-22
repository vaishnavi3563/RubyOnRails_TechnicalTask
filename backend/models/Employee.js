const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  first_name: { type: String, required: true, trim: true },
  last_name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  salary: { type: Number, required: true, min: [0.01, 'Salary must be > 0'] },
  department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true }
}, { timestamps: true });

EmployeeSchema.virtual('fullName').get(function() {
  return `${this.first_name} ${this.last_name}`;
});

module.exports = mongoose.model('Employee', EmployeeSchema);
