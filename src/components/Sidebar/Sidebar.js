import React from 'react';
import './Sidebar.css';
import PeopleIcon from '@mui/icons-material/People';
import ReportIcon from '@mui/icons-material/Report';
import AssessmentIcon from '@mui/icons-material/Assessment';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

function Sidebar({ onSelectItem }) {
  return (
    <div className="sidebar">
      <ul>
        <li onClick={() => onSelectItem('Employees')}>
          <PeopleIcon /> Employees
        </li>
        <li onClick={() => onSelectItem('Reports')}>
          <ReportIcon /> Reports
        </li>
        <li onClick={() => onSelectItem('Analytics')}>
          <AssessmentIcon /> Analytics
        </li>
        <li onClick={() => onSelectItem('Calendar')}>
          <CalendarTodayIcon /> Calendar
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
