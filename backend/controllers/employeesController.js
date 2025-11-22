const Employee = require('../models/Employee');
const Department = require('../models/Department');

exports.getAll = async (req, res) => {
  try {
    const filter = {};
    if (req.query.departmentId) filter.department = req.query.departmentId;
    const employees = await Employee.find(filter).populate('department').sort('last_name first_name');
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const emp = await Employee.findById(req.params.id).populate('department');
    if (!emp) return res.status(404).json({ message: 'Employee not found' });
    res.json(emp);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const dept = await Department.findById(req.body.department);
    if (!dept) return res.status(400).json({ message: 'Invalid department' });
    const emp = await Employee.create(req.body);
    res.status(201).json(emp);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    if (req.body.department) {
      const exists = await Department.exists({ _id: req.body.department });
      if (!exists) return res.status(400).json({ message: 'Invalid department' });
    }
    const emp = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!emp) return res.status(404).json({ message: 'Employee not found' });
    res.json(emp);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const emp = await Employee.findByIdAndDelete(req.params.id);
    if (!emp) return res.status(404).json({ message: 'Employee not found' });
    res.json({ message: 'Employee deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

