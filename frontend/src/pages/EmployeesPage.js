import React, { useEffect, useState } from 'react';
import fetchJSON from '../api';
import EmployeeForm from '../components/EmployeeForm';

export default function EmployeesPage() {
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [filterDept, setFilterDept] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState('');

  async function load(deptId = '', search = '') {
    setLoading(true);
    try {
      // fetch departments first (for dropdown)
      const deps = await fetchJSON('/departments');
      setDepartments(deps);

      // build employee URL
      const params = [];
      if (deptId) params.push(`departmentId=${encodeURIComponent(deptId)}`);
      if (search) params.push(`search=${encodeURIComponent(search)}`);
      const url = params.length ? `/employees?${params.join('&')}` : '/employees';
      const emps = await fetchJSON(url);
      setEmployees(emps);
    } catch (err) {
      console.error(err);
      setNotice('Load error: ' + err.message);
      setTimeout(()=>setNotice(''),4000);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function handleFilter(e) {
    if (e && e.preventDefault) e.preventDefault();
    await load(filterDept, searchTerm);
  }

  async function handleDelete(id) {
    if (!window.confirm('Are you sure?')) return;
    try {
      await fetchJSON(`/employees/${id}`, { method: 'DELETE' });
      setNotice('Employee deleted');
      setTimeout(()=>setNotice(''),3000);
      await load(filterDept, searchTerm);
    } catch (err) {
      setNotice('Delete failed: ' + err.message);
      setTimeout(()=>setNotice(''), 4000);
    }
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Employees</h3>
        <button className="btn btn-success" onClick={() => setEditing({})}>+ New Employee</button>
      </div>

      {notice && <div className="alert alert-info">{notice}</div>}

      <form className="row g-2 mb-3" onSubmit={handleFilter}>
        <div className="col-md-5">
          <input
            className="form-control"
            placeholder="Search by name or email"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="col-md-4">
          <select className="form-select" value={filterDept} onChange={e => setFilterDept(e.target.value)}>
            <option value="">All Departments</option>
            {departments.map(d => <option key={d._id} value={d._id}>{d.name}</option>)}
          </select>
        </div>

        <div className="col-md-3 d-flex">
          <button className="btn btn-primary me-2" type="submit">Apply</button>
          <button type="button" className="btn btn-secondary" onClick={() => { setSearchTerm(''); setFilterDept(''); load(); }}>Reset</button>
        </div>
      </form>

      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-light">
            <tr><th>Full Name</th><th>Email</th><th>Department</th><th>Salary</th><th style={{width:140}}>Actions</th></tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="5">Loading...</td></tr>
            ) : employees.length === 0 ? (
              <tr><td colSpan="5">No employees found.</td></tr>
            ) : employees.map(emp => (
              <tr key={emp._id}>
                <td>{emp.first_name} {emp.last_name}</td>
                <td>{emp.email}</td>
                <td>{emp.department?.name || '-'}</td>
                <td>{emp.salary}</td>
                <td>
                  <button className="btn btn-warning btn-sm me-2" onClick={() => setEditing(emp)}>Edit</button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(emp._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editing && (
        <div className="modal fade show d-block" style={{ background: 'rgba(0,0,0,0.4)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content p-3">
              <EmployeeForm
                employee={editing}
                departments={departments}
                onClose={() => { setEditing(null); load(filterDept, searchTerm); }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
