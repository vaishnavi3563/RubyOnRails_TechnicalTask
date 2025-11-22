import React, { useState } from 'react';
import EmployeesPage from './pages/EmployeesPage';
import DepartmentsPage from './pages/DepartmentsPage';

export default function App() {
  const [route, setRoute] = useState('employees');
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <a className="navbar-brand" href="#!">EmployeeManagement</a>
          <div>
            <button className="btn btn-link" onClick={() => setRoute('employees')}>Employees</button>
            <button className="btn btn-link" onClick={() => setRoute('departments')}>Departments</button>
          </div>
        </div>
      </nav>

      {route === 'employees' ? <EmployeesPage /> : <DepartmentsPage />}
    </div>
  );
}
