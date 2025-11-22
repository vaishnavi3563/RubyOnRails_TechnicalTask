import React, { useEffect, useState } from 'react';
import fetchJSON from '../api';
import DepartmentForm from '../components/DepartmentForm';

export default function DepartmentsPage() {
  const [depts, setDepts] = useState([]);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState('');

  async function load() {
    setLoading(true);
    try {
      const data = await fetchJSON('/departments');
      setDepts(data);
    } catch (err) {
      console.error(err);
      setNotice('Failed to load departments: ' + err.message);
      setTimeout(() => setNotice(''), 4000);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function handleDelete(id) {
    if (!window.confirm('Delete department and its employees?')) return;
    try {
      await fetchJSON(`/departments/${id}`, { method: 'DELETE' });
      setNotice('Department deleted');
      setTimeout(()=>setNotice(''), 3000);
      await load();
    } catch (err) {
      setNotice('Delete failed: ' + err.message);
      setTimeout(()=>setNotice(''), 4000);
    }
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Departments</h3>
        <button className="btn btn-success" onClick={() => setEditing({})}>+ New Department</button>
      </div>

      {notice && <div className="alert alert-info">{notice}</div>}

      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-light">
            <tr><th>Name</th><th>Budget</th><th style={{width:160}}>Actions</th></tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="3">Loading...</td></tr>
            ) : depts.length === 0 ? (
              <tr><td colSpan="3">No departments found.</td></tr>
            ) : (
              depts.map(d => (
                <tr key={d._id}>
                  <td>{d.name}</td>
                  <td>{d.budget}</td>
                  <td>
                    <button className="btn btn-warning btn-sm me-2" onClick={() => setEditing(d)}>Edit</button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(d._id)}>Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {editing && (
        <div className="modal fade show d-block" style={{ background: 'rgba(0,0,0,0.4)' }}>
          <div className="modal-dialog">
            <div className="modal-content p-3">
              <DepartmentForm department={editing} onClose={() => { setEditing(null); load(); }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
