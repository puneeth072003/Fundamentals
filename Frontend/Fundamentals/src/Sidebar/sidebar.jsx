import React from 'react'
import "./sidebar.css"
import { sidebarData } from './sidebarData';
import { useState } from 'react';

const StudentApp = () => {
  const [selectedUnit, setSelectedUnit] = useState(null);

  const handleUnitClick = (unit) => {
    setSelectedUnit(unit);
  };

  return (
    <div className="student_app">
      <div className="sidebar">
        <ul className="sidebar-list">
          {sidebarData.map((val, key) => (
            <li key={key} className="sidebar-item" onClick={() => handleUnitClick(val)}>
              <div className="sidebar-item-title">{val.title1}: {val.title2}</div>
            </li>
          ))}
        </ul>
      </div>
      <div className="main-content">
        {!selectedUnit && (
          <div className="video-placeholder">
            Click on a unit to continue
          </div>
        )}
        {selectedUnit && (
          <>
            <div className="video-container">
              <iframe
                width="1000"
                height="550"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="quiz-container">
              <h2>Quiz for {selectedUnit.title1}: {selectedUnit.title2  }</h2>
              <div className="quiz-question">Question 1: What is ...?</div>
              <div className="quiz-question">Question 2: How does ...?</div>
              {/* Add more questions as needed */}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default StudentApp;
