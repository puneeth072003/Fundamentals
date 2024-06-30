import React, { useState } from 'react';
import "./sidebar.css";
import { sidebarData } from './sidebarData';
import QuizComponent from './quizComp';

const StudentApp = () => {
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [selectedSubunit, setSelectedSubunit] = useState(null);
  const [questions, setQuestions] = useState([]);

  const handleUnitClick = (unit) => {
    setSelectedUnit(unit);
    setSelectedSubunit(null); // Reset selected subunit when a new unit is clicked
  };

  const handleSubunitClick = (subunit) => {
    setSelectedSubunit(subunit);
    if (subunit.type === 'quiz') {
      setQuestions(subunit.questions);
    } else {
      setQuestions([]); // Clear questions if the subunit is not a quiz
    }
  };

  return (
    <div className="student_app">
      <div className="sidebar">
        <ul className="sidebar-list">
          {sidebarData.map((unit, unitIndex) => (
            <li key={unitIndex} className="sidebar-item">
              <div className="sidebar-item-title" onClick={() => handleUnitClick(unit)}>
                {unit.title1}: {unit.title2}
              </div>
              {selectedUnit === unit && (
                <ul className="subunit-list">
                  {unit.subunits.map((subunit, subunitIndex) => (
                    <li key={subunitIndex} className="subunit-item" onClick={() => handleSubunitClick(subunit)}>
                      {subunit.name}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="main-content">
        {!selectedSubunit && (
          <div className="content-placeholder">
            Click on a subunit to continue
          </div>
        )}
        {selectedSubunit && selectedSubunit.type === 'video' && (
          <div className="video-container">
            <iframe
              width="1000"
              height="550"
              src={selectedSubunit.videoUrl}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}
        {selectedSubunit && selectedSubunit.type === 'quiz' && (
          <div className="quiz-box">
            <h1>Quiz: {selectedSubunit.quizTitle}</h1>
            <QuizComponent  questions={questions}/>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentApp;
