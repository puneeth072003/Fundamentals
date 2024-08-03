import React, { useState, useEffect, useContext } from 'react';
import './teachers.css';
import { UserContext } from '../redux/user-context';
import { useNavigate } from 'react-router-dom';
import PositionedMenu from './Menu';

const TeacherComp = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [selectedSubunit, setSelectedSubunit] = useState(null);
  const [selectedGrade, setSelectedGrade] = useState('');
  const { userData } = useContext(UserContext);

  const [selectedClassName, setSelectedClassName] = useState('');
  const [selectedClassSubject, setSelectedClassSubject] = useState('');

  const [hasConfirmed, setHasConfirmed] = useState(false);
  const isLoggedIn = userData.state;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn && !hasConfirmed) {
      navigate('/login');
      setHasConfirmed(true);
    }
  }, [isLoggedIn, hasConfirmed, navigate]);

  useEffect(() => {
    const fetchStudents = async () => {
      if (selectedClassName && selectedClassSubject) {
        try {
          const classNo = Number(selectedClassName);
          const response = await fetch(`http://localhost:3000/api/v1/getall/${classNo}/${selectedClassSubject}`);
          const data = await response.json();
          setStudents(data);
        } catch (error) {
          console.error('Error fetching students:', error);
        }
      }
    };

    fetchStudents();
  }, [selectedClassName, selectedClassSubject]);

  const handleStudentClick = (student) => {
    setSelectedStudent(student);
    setSelectedUnit(null);
    setSelectedSubunit(null);
  };

  const handleUnitSelect = (unit) => {
    setSelectedUnit(unit);
    setSelectedSubunit(null);
  };

  const handleSubunitSelect = (subunit) => {
    setSelectedSubunit(subunit);
    setSelectedGrade(subunit.score);
  };

  const calculateGrade = (score) => {
    if (score >= 1 && score <= 3) {
      return 'Need to Work Hard';
    } else if (score >= 4 && score <= 6) {
      return 'Average';
    } else if (score >= 7 && score <= 8) {
      return 'Good';
    } else if (score >= 9 && score <= 10) {
      return 'Excellent';
    } else {
      return 'Not Graded';
    }
  };

  return (
    <div className='teach-main'>
      <div className='new-usr'>
        <h1 className='teach-head'>Welcome, {userData.username}!</h1>
        <PositionedMenu />
      </div>
      <div className="teach-container">
        <div className="teach-sidebar">
          <h2>Class Details</h2>
          <select
            className="teach-classname-dropdown"
            value={selectedClassName}
            onChange={(e) => setSelectedClassName(e.target.value)}
          >
            <option value="">Select a class name</option>
            <option value="11">Class 11</option>
            <option value="12">Class 12</option>
          </select>
          {selectedClassName && (
            <select
              className="teach-classsubject-dropdown"
              value={selectedClassSubject}
              onChange={(e) => setSelectedClassSubject(e.target.value)}
            >
              <option value="">Select a class subject</option>
              <option value="physics">Physics</option>
              <option value="chemistry">Chemistry</option>
              <option value="maths">Maths</option>
              <option value="biology">Biology</option>
            </select>
          )}
          {selectedClassName && selectedClassSubject && (
            <>
              <h2>Students</h2>
              <ul className="teach-students">
                {students.map((student) => (
                  <li
                    key={student._id}
                    className={`teach-student ${selectedStudent === student ? 'selected' : ''}`}
                    onClick={() => handleStudentClick(student)}
                  >
                    {student.username}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
        <div className="teach-content">
          {selectedStudent && (
            <>
              <div className="teach-units">
                <h2>Units for {selectedStudent.username}</h2>
                <select
                  className="teach-unit-dropdown"
                  onChange={(e) => handleUnitSelect(selectedStudent.units.find(unit => unit._id === e.target.value))}
                >
                  <option value="">Select a unit</option>
                  {selectedStudent.units.map((unit) => (
                    <option key={unit._id} value={unit._id}>{`Unit ${unit.name}`}</option>
                  ))}
                </select>
                {selectedUnit && (
                  <div className="teach-subunits">
                    <h3>Subunits for {selectedUnit.name}</h3>
                    <select
                      className="teach-subunit-dropdown"
                      onChange={(e) => handleSubunitSelect(selectedUnit.subunits.find(subunit => subunit._id === e.target.value))}
                    >
                      <option value="">Select a subunit</option>
                      {selectedUnit.subunits.map((subunit) => (
                        <option key={subunit._id} value={subunit._id}>{subunit.name}</option>
                      ))}
                    </select>
                    {selectedSubunit && (
                      <div className="teach-scores">
                        <h3>Scores for {selectedSubunit.name}</h3>
                        <p>Score: {selectedSubunit.score}</p>
                        <p>Grade: {calculateGrade(selectedSubunit.score)}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherComp;
