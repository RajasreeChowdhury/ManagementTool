import React, { useState } from 'react';
import './Analytics.css';
import analyticsData from './analyticsData.json';
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
  PointElement,
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

function Analytics() {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [sortCriteria, setSortCriteria] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleEmployeeClick = (id) => {
    const employee = analyticsData.find((employee) => employee.id === id);
    console.log("Selected Employee Data:", employee);
    setSelectedEmployee(employee);
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
    if (!sortCriteria) return analyticsData;
    const sorted = [...analyticsData];
    sorted.sort((a, b) => {
      switch (sortCriteria) {
        case 'performance':
          return b.employeeEngagementAnalytics.engagementScores - a.employeeEngagementAnalytics.engagementScores;
        case 'workload':
          return b.skillAndDevelopmentAnalytics.skillGapAnalysis - a.skillAndDevelopmentAnalytics.skillGapAnalysis;
        case 'productivity':
          return b.diversityAndInclusionAnalytics.monthlyTaskCompletionTrends.reduce((sum, val) => sum + val, 0) -
            a.diversityAndInclusionAnalytics.monthlyTaskCompletionTrends.reduce((sum, val) => sum + val, 0);
        default:
          return 0;
      }
    });
    return sorted;
  };

  const pieData = (careerProgression) => ({
    labels: ['High', 'Medium', 'Low'],
    datasets: [
      {
        label: 'Career Progression',
        data: [
          careerProgression.high,
          careerProgression.medium,
          careerProgression.low,
        ],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  });

  const barData = (monthlyTaskCompletionTrends) => ({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Monthly Task Completion Trends',
        data: monthlyTaskCompletionTrends,
        backgroundColor: '#36A2EB',
      },
    ],
  });

  const lineData = (hourlyEngagementPatterns) => ({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Hourly Engagement Patterns',
        data: hourlyEngagementPatterns,
        borderColor: '#36A2EB',
        fill: false,
      },
    ],
  });

  return (
    <div className="analytics">
      <div className="analyticsTitleContainer">
        <div className="analyticsTitle">
          <h2>Analytics</h2>
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
      ):(
        <div className="analytics-details">
        <button className="back-button" onClick={handleBackClick}>
            Back to Employee List
          </button>
          <h3>Employee Engagement Analytics</h3>
          <p>Engagement Scores: {selectedEmployee.employeeEngagementAnalytics.engagementScores}</p>
          <p>
          Engagement Days: {selectedEmployee.employeeEngagementAnalytics.engagementDays}
          </p>
          <p>Engagement Trends: {selectedEmployee.employeeEngagementAnalytics.EngagementTrends}</p>

          <h3>Skill and Development Analytics</h3>
          <p>Skill Gap Analysis: {selectedEmployee.skillAndDevelopmentAnalytics.skillGapAnalysis}</p>
          <div className="chartAnalytics">
            <Pie data={pieData(selectedEmployee.skillAndDevelopmentAnalytics.careerProgression)} />
          </div>

          <h3>Diversity And Inclusion Analytics</h3>
          <div className="chartAnalytics">
            <Bar data={barData(selectedEmployee.diversityAndInclusionAnalytics.monthlyTaskCompletionTrends)} />
          </div>
          <div className="chartAnalytics">
            <Line data={lineData(selectedEmployee.diversityAndInclusionAnalytics.hourlyEngagementPatterns)} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Analytics;
