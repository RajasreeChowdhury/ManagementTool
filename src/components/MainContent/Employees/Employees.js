import React, { useEffect, useState } from 'react';
import './Employees.css';
import employeesData from './employees.json'; 

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
const employeesPerPage = 5; // Number of employees per page
const indexOfLastEmployee = currentPage * employeesPerPage;
const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
const currentEmployees = employees.slice(indexOfFirstEmployee, indexOfLastEmployee);

  useEffect(() => {
  
    setEmployees(employeesData);
  }, []);

  return (
    <div className="employees">
      <h2>Employee List</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>DOB</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Position</th>
            <th>Department</th>
            <th>Reporting Manager</th>
            <th>Projects</th>
            <th>Experience</th>
            <th>Feedback</th>
          </tr>
        </thead>
        <tbody>
        {currentEmployees.map((employee) => (
  <tr key={employee.id}>
    <td>{employee.id}</td>
    <td>{employee.name}</td>
    <td>{employee.dob}</td>
    <td>{employee.phone}</td>
    <td>{employee.email}</td>
    <td>{employee.position}</td>
    <td>{employee.department}</td>
    <td>{employee.reportingManager}</td>
    <td>{employee.projects.join(', ')}</td>
    <td>{employee.experience}</td>
    <td>{employee.feedback}</td>
  </tr>
))}
        </tbody>
      </table>
      <div className="pagination">
  <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
    Previous
  </button>
  <span>
    Page {currentPage} of {Math.ceil(employees.length / employeesPerPage)}
  </span>
  <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === Math.ceil(employees.length / employeesPerPage)}>
    Next
  </button>
</div>
    </div>
  );
}

export default Employees;
