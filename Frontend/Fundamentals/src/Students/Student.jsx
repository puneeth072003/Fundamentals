import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Student.css';

const StudentDashBoard = () => {
  const navigate = useNavigate();
  const [selectedClass, setSelectedClass] = useState(null);

  const handleClassClick = (className) => {
    setSelectedClass(className);
  };

  const handleSubjectClick = (subject) => {
    navigate(`/${Number(selectedClass)}/${subject.toLowerCase()}`);
  };

  return (
    <div className="student-container">
      <div className="sidebar">
        <h2>Classes: </h2>
        <button className="class-button" onClick={() => handleClassClick('11')}>Class 11</button>
        <button className="class-button" onClick={() => handleClassClick('12')}>Class 12</button>
      </div>
      <div className="content">
        <div className="button-container">
          {selectedClass && (
            <>
              <button className="subject-button" onClick={() => handleSubjectClick('Physics')}>
                Class {selectedClass} Physics
              </button>
              <button className="subject-button" onClick={() => handleSubjectClick('Chemistry')}>
                Class {selectedClass} Chemistry
              </button>
              <button className="subject-button" onClick={() => handleSubjectClick('Maths')}>
                Class {selectedClass} Maths
              </button>
              <button className="subject-button" onClick={() => handleSubjectClick('Biology')}>
                Class {selectedClass} Biology
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default StudentDashBoard;
