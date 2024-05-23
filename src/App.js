import React, { useState } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import MainContent from './components/MainContent/MainContent/MainContent';
import './App.css';

function App() {
  const [selectedItem, setSelectedItem] = useState('ManagerInfo'); // Default to ManagerInfo

  const handleSidebarClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <div className="app-container">
      <Sidebar onSelectItem={handleSidebarClick} /> 
      <MainContent selectedItem={selectedItem} />
    </div>
  );
}

export default App;
