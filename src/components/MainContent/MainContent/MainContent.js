import React from 'react';
import './MainContent.css';
import ManagerInfo from '../ManagerInfo/ManagerInfo';
import Employees from '../Employees/Employees';
import Reports from '../Reports/Reports';
import Analytics from '../Analytics/Analytics';
import Calendar from '../Calendar/Calendar'; 

function MainContent({ selectedItem }) {
  let content;
  switch (selectedItem) {
    case 'Employees':
      content = <Employees />;
      break;
    case 'Reports':
      content = <Reports />;
      break;
    case 'Analytics':
      content = <Analytics />;
      break;
    case 'Calendar':
      content = <Calendar />;
      break;
    case 'ManagerInfo':
    default:
      content = <ManagerInfo />;
      break;
  }

  return (
    <div className="main-content">
      {content}
    </div>
  );
}

export default MainContent;
