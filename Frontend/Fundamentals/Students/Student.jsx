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
    navigate(`/${selectedClass.toLowerCase()}/${subject.toLowerCase()}`);
  };

  return (
    <div className="student-container">
      <div className="sidebar">
        <h2>Classes: </h2>
        <button className="class-button" onClick={() => handleClassClick('Class 11')}>Class 11</button>
        <button className="class-button" onClick={() => handleClassClick('Class 12')}>Class 12</button>
      </div>
      <div className="content">
        {/* <img src="computer.css" alt="Sample" className="center-image" /> */}
        <div className="button-container">
          {selectedClass && (
            <>
              <button className="subject-button" onClick={() => handleSubjectClick('Physics')}>Physics</button>
              <button className="subject-button" onClick={() => handleSubjectClick('Chemistry')}>Chemistry</button>
              <button className="subject-button" onClick={() => handleSubjectClick('Maths')}>Maths</button>
              <button className="subject-button" onClick={() => handleSubjectClick('Biology')}>Biology</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default StudentDashBoard;
