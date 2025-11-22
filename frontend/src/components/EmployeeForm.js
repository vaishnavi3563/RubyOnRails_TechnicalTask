import React, { useEffect, useState } from "react";
import fetchJSON from "../api";

export default function EmployeeForm({ employee = {}, departments = [], onClose }) {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    salary: "",
    department: ""
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    setForm({
      first_name: employee.first_name || "",
      last_name: employee.last_name || "",
      email: employee.email || "",
      salary: employee.salary || "",
      department: employee.department?._id || ""
    });
  }, [employee]);

  function validate() {
    const newErrors = {};

    if (!form.first_name.trim()) newErrors.first_name = "First name is required";
    else if (!/^[A-Za-z]+$/.test(form.first_name)) newErrors.first_name = "Only letters allowed";

    if (!form.last_name.trim()) newErrors.last_name = "Last name is required";
    else if (!/^[A-Za-z]+$/.test(form.last_name)) newErrors.last_name = "Only letters allowed";

    if (!form.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Invalid email format";

    if (!form.salary) newErrors.salary = "Salary required";
    else if (Number(form.salary) <= 0) newErrors.salary = "Salary must be > 0";

    if (!form.department) newErrors.department = "Select a department";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    try {
      const method = employee._id ? "PUT" : "POST";
      const url = employee._id ? `/employees/${employee._id}` : "/employees";

      await fetchJSON(url, { method, body: JSON.stringify(form) });
      onClose();
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h4>{employee._id ? "Edit Employee" : "New Employee"}</h4>

      <div className="mb-3">
        <label className="form-label">First Name</label>
        <input
          className="form-control"
          value={form.first_name}
          onChange={(e) => setForm({ ...form, first_name: e.target.value })}
        />
        {errors.first_name && <div className="text-danger">{errors.first_name}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">Last Name</label>
        <input
          className="form-control"
          value={form.last_name}
          onChange={(e) => setForm({ ...form, last_name: e.target.value })}
        />
        {errors.last_name && <div className="text-danger">{errors.last_name}</div>}
      </div>

      <div className="mb-3">
        <label>Email</label>
        <input
          className="form-control"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        {errors.email && <div className="text-danger">{errors.email}</div>}
      </div>

      <div className="mb-3">
        <label>Salary</label>
        <input
          type="number"
          className="form-control"
          value={form.salary}
          onChange={(e) => setForm({ ...form, salary: e.target.value })}
        />
        {errors.salary && <div className="text-danger">{errors.salary}</div>}
      </div>

      <div className="mb-3">
        <label>Department</label>
        <select
          className="form-select"
          value={form.department}
          onChange={(e) => setForm({ ...form, department: e.target.value })}
        >
          <option value="">Select Department</option>
          {departments.map(d => <option key={d._id} value={d._id}>{d.name}</option>)}
        </select>
        {errors.department && <div className="text-danger">{errors.department}</div>}
      </div>

      <button className="btn btn-primary">Save</button>
      <button className="btn btn-secondary ms-2" onClick={onClose}>Cancel</button>
    </form>
  );
}
