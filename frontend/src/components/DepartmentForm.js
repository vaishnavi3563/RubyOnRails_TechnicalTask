import React, { useEffect, useState } from "react";
import fetchJSON from "../api";

export default function DepartmentForm({ department = {}, onClose }) {
  const [form, setForm] = useState({ name: "", budget: "" });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setForm({
      name: department.name || "",
      budget: department.budget || ""
    });
  }, [department]);

  function validate() {
    const newErrors = {};

    if (!form.name.trim()) newErrors.name = "Department name is required";
    else if (form.name.length < 3) newErrors.name = "Name must be at least 3 characters";

    if (!form.budget) newErrors.budget = "Budget is required";
    else if (Number(form.budget) <= 0) newErrors.budget = "Budget must be greater than 0";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    try {
      const method = department._id ? "PUT" : "POST";
      const url = department._id ? `/departments/${department._id}` : "/departments";

      await fetchJSON(url, { method, body: JSON.stringify(form) });
      onClose();
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h4>{department._id ? "Edit Department" : "New Department"}</h4>

      <div className="mb-3">
        <label className="form-label">Name</label>
        <input
          className="form-control"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        {errors.name && <div className="text-danger">{errors.name}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">Budget</label>
        <input
          className="form-control"
          type="number"
          value={form.budget}
          onChange={(e) => setForm({ ...form, budget: e.target.value })}
        />
        {errors.budget && <div className="text-danger">{errors.budget}</div>}
      </div>

      <button className="btn btn-primary">Save</button>
      <button className="btn btn-secondary ms-2" onClick={onClose}>Cancel</button>
    </form>
  );
}
