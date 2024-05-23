import React from 'react';
import './ManagerInfo.css';
import {
  Person as PersonIcon,
  Mail as MailIcon,
  Phone as PhoneIcon,
  Business as BusinessIcon,
  Report as ReportIcon,
  BarChart as BarChartIcon,
  Event as EventIcon,
  Star as StarIcon,
  Work as WorkIcon,
  Build as BuildIcon,
  Assignment as AssignmentIcon,
} from '@mui/icons-material';
import { Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

const performanceData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Performance',
      data: [75, 89, 95, 100, 42, 55],
      fill: false,
      backgroundColor: '#42A5F5',
      borderColor: '#42A5F5',
    },
  ],
};

const projectData = {
  labels: ['Completed', 'In Progress', 'Upcoming'],
  datasets: [
    {
      data: [10, 5, 3],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
    },
  ],
};

function ManagerInfo() {
  return (
    <div className="manager-info-container">
      <div className="manager-info">
        <h2>Manager Information</h2>
        <ul>
          <li>
            <PersonIcon /> <strong>Manager Name:</strong>{' '}
            <span>Ritik Purbey</span>
          </li>
          <li>
            <WorkIcon /> <strong>Position/Title:</strong>{' '}
            <span>Sales Manager</span>
          </li>
          <li>
            <MailIcon /> <strong>Contact Information:</strong>{' '}
            <span>ritikpurbey@apiccc.com</span> | <PhoneIcon />{' '}
            <br/>
            <span>+1234567890</span>
          </li>
          <li>
            <BusinessIcon /> <strong>Department/Team:</strong>{' '}
            <span>ApicInsta</span>
          </li>
          <li>
            <ReportIcon /> <strong>Direct Reports:</strong>{' '}
            <span>Varun Agarwal</span>
          </li>
          <li>
            <BarChartIcon /> <strong>Performance Metrics:</strong>{' '}
            <span>
              Sales targets achieved, Customer satisfaction, Revenue growth
            </span>
          </li>
          <li>
            <EventIcon /> <strong>Experience:</strong> <span>6+ years</span>
          </li>
          <li>
            <BuildIcon /> <strong>Skills:</strong>{' '}
            <span>Sales Funnel, Marketing, Negotiation, Communication</span>
          </li>
          <li>
            <AssignmentIcon /> <strong>Projects/Initiatives:</strong>{' '}
            <span>InstaProject</span>
          </li>
          <li>
            <StarIcon /> <strong>Feedback/Reviews:</strong>{' '}
            <span>Best employee of the year</span>
          </li>
        </ul>
      </div>
      <div className="charts-container">
        <div className="chart">
          <h3>Performance Chart</h3>
          <div className="chart-content">
          <Line
  data={performanceData}
  options={{
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        min: 0,
      },
    },
  }}
/>
          </div>
        </div>
        <div className="chart">
          <h3>Projects Status</h3>
          <div className="chart-content">
            <Pie data={projectData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManagerInfo;
