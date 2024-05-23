import React, { useState, useEffect } from 'react';
import moment from 'moment';
import './Calendar.css'; 
import calendarData from './CalendarData.json';

const Calendar = () => {
 
  const years = [2023, 2024];
  const months = moment.months();

  // State variables for selected year, month, date, and hovered cell
  const [selectedYear, setSelectedYear] = useState(moment().year());
  const [selectedMonth, setSelectedMonth] = useState(moment().month());
  const [selectedDate, setSelectedDate] = useState(null);
  const [hoveredCell, setHoveredCell] = useState(null);

  // Function to handle year change
  const handleYearChange = (year) => {
    setSelectedYear(year);
  };

  // Function to handle month change
  const handleMonthChange = (month) => {
    setSelectedMonth(month);
  };

  // Function to handle cell click
  const handleCellClick = (date) => {
    setSelectedDate(date);
  };

  // Function to generate calendar cells based on month and year
  const generateCalendarCells = () => {
    const daysInMonth = moment().year(selectedYear).month(selectedMonth).daysInMonth();
    const firstDayOfMonth = moment().year(selectedYear).month(selectedMonth).startOf('month');
    const calendarCells = [];
    const currentDate = moment().year(selectedYear).month(selectedMonth).date(1);

    for (let i = 1; i <= daysInMonth; i++) {
      const currentDay = currentDate.clone().date(i);
      const isToday = currentDay.isSame(moment(), 'day');
      const isCurrentMonth = currentDay.isSame(firstDayOfMonth, 'month');

      // Find tasks and events for the current date
      const tasks = calendarData.filter((item) => moment(item.date).isSame(currentDay, 'day')).flatMap((item) => item.tasks);
      const events = calendarData.filter((item) => moment(item.date).isSame(currentDay, 'day')).flatMap((item) => item.events);

      calendarCells.push(
        <div
          key={i}
          className={`calendar-cell ${isToday ? 'today' : ''} ${isCurrentMonth ? '' : 'disabled'}`}
          onClick={() => handleCellClick(currentDay)}
          onMouseEnter={() => setHoveredCell(currentDay)}
          onMouseLeave={() => setHoveredCell(null)}
        >
          {i}
          {tasks.length > 0 && (
            <div className="task-list">
              {tasks.map((task, index) => (
                <div key={index} className="task">
                  <span className="task-name">{task.name}</span> - {task.status}
                </div>
              ))}
            </div>
          )}
          {events.length > 0 && (
            <div className="event-list">
              {events.map((event, index) => (
                <div key={index} className="event">
                  <span className="event-name">{event.name}</span> - {event.time}
                </div>
              ))}
            </div>
          )}
          {hoveredCell && hoveredCell.isSame(currentDay, 'day') && (
            <div className="info-box">
              <h3>Event Information</h3>
              <p><strong>Tasks:</strong></p>
              <ul>
                {tasks.map((task, index) => (
                  <li key={index}>
                    <strong>Name:</strong> {task.name}, <strong>Assignee:</strong> {task.assignee}, <strong>Status:</strong> {task.status}
                  </li>
                ))}
              </ul>
              <p><strong>Events:</strong></p>
              <ul>
                {events.map((event, index) => (
                  <li key={index}>
                    <strong>Name:</strong> {event.name}, <strong>Time:</strong> {event.time}, <strong>Attendees:</strong> {event.attendees.join(', ')}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      );
    }
    return calendarCells;
  };

  return (
    <div className="calendar-container">
      <div className="dropdowns">
        <select value={selectedYear} onChange={(e) => handleYearChange(parseInt(e.target.value))}>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <select value={selectedMonth} onChange={(e) => handleMonthChange(parseInt(e.target.value))}>
          {months.map((month, index) => (
            <option key={index} value={index}>
              {month}
            </option>
          ))}
        </select>
      </div>
      <div className="calendar-grid">
        {/* Render calendar cells */}
        {generateCalendarCells()}
      </div>
    </div>
  );
};

export default Calendar;
