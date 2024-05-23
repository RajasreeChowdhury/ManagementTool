import React, { useState } from 'react';
import './Reports.css';
import reportsData from './ReportsData.json';
import { Bar, Pie, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement
);

function Reports() {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [sortCriteria, setSortCriteria] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleEmployeeClick = (id) => {
    setSelectedEmployee(reportsData.find((report) => report.id === id));
  };

  const handleBackClick = () => {
    setSelectedEmployee(null);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleSortClick = (criteria) => {
    setSortCriteria(criteria);
    setDropdownOpen(false);
  };

  const getSortedEmployees = () => {
    if (!sortCriteria) return reportsData;
    const sorted = [...reportsData];
    sorted.sort((a, b) => {
      switch (sortCriteria) {
        case 'performance':
          return b.performanceReport.taskCompletionRate - a.performanceReport.taskCompletionRate;
        case 'workload':
          return b.workloadReport.currentTaskLoad - a.workloadReport.currentTaskLoad;
        case 'productivity':
          return b.productivityReport.tasksCompletedPerMonth.reduce((sum, val) => sum + val, 0) -
            a.productivityReport.tasksCompletedPerMonth.reduce((sum, val) => sum + val, 0);
        default:
          return 0;
      }
    });
    return sorted;
  };

  const pieData = (taskPriorityDistribution) => ({
    labels: ['High', 'Medium', 'Low'],
    datasets: [
      {
        label: 'Task Priority Distribution',
        data: [
          taskPriorityDistribution.high,
          taskPriorityDistribution.medium,
          taskPriorityDistribution.low,
        ],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  });

  const barData = (tasksCompletedPerMonth) => ({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Tasks Completed',
        data: tasksCompletedPerMonth,
        backgroundColor: '#36A2EB',
      },
    ],
  });

  const lineData = (hoursLogged) => ({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Hours Logged',
        data: hoursLogged,
        borderColor: '#36A2EB',
        fill: false,
      },
    ],
  });

  return (
    <div className="reports">
      <div className="reportsTitleContainer">
        <div className="reportsTitle">
          <h2>Reports</h2>
        </div>
      </div>

      {!selectedEmployee && (
        <div className="sort-dropdown">
          <button className="sort-button" onClick={toggleDropdown}>Sort</button>
          {dropdownOpen && (
            <div className="sort-options">
              <button onClick={() => handleSortClick('performance')}>Performance</button>
              <button onClick={() => handleSortClick('workload')}>Workload</button>
              <button onClick={() => handleSortClick('productivity')}>Productivity</button>
            </div>
          )}
        </div>
      )}

      {!selectedEmployee ? (
        <div className="employee-list">
          {getSortedEmployees().map((employee) => (
            <button
              key={employee.id}
              onClick={() => handleEmployeeClick(employee.id)}
            >
              {employee.id} - {employee.name}
            </button>
          ))}
        </div>
      ) : (
        <div className="report-details">
          <button className="back-button" onClick={handleBackClick}>
            Back to Employee List
          </button>
          <h3>Employee Performance Report</h3>
          <p>
            Task Completion Rate:{' '}
            {selectedEmployee.performanceReport.taskCompletionRate}
          </p>
          <p>
            Average Task Completion Time:{' '}
            {selectedEmployee.performanceReport.avgTaskCompletionTime}
          </p>
          <p>
            Task Overdue Rate:{' '}
            {selectedEmployee.performanceReport.taskOverdueRate}
          </p>

          <h3>Workload Distribution Report</h3>
          <p>
            Current Task Load: {selectedEmployee.workloadReport.currentTaskLoad}
          </p>
          <div className="chartReport">
            <Pie
              data={pieData(
                selectedEmployee.workloadReport.taskPriorityDistribution
              )}
              options={{ maintainAspectRatio: false }}
            />
          </div>

          <h3>Productivity Report</h3>
          <div className="chartReport">
            <Bar
              data={barData(
                selectedEmployee.productivityReport.tasksCompletedPerMonth
              )}
              options={{ maintainAspectRatio: false }}
            />
          </div>
          <div className="chartReport">
            <Line
              data={lineData(selectedEmployee.productivityReport.hoursLogged)}
              options={{ maintainAspectRatio: false }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Reports;
