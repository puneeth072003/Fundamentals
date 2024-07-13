import React, { useState, useEffect ,useContext} from 'react';
import './teachers.css';
import { UserContext } from '../redux/user-context';
import PositionedMenu from './Menu';


const TeacherComp = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [selectedGrade, setSelectedGrade] = useState('');
  const { userData } = useContext(UserContext);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/v1/getall'); // Adjust the endpoint as needed
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, []);

  const handleStudentClick = (student) => {
    setSelectedStudent(student);
    setSelectedUnit(null); // Reset selected unit when a new student is clicked
  };

  const handleUnitSelect = (unit) => {
    setSelectedUnit(unit);
    setSelectedGrade(unit.grade); // Initialize the selected grade with the current grade
  };

  const handleGradeChange = (event) => {
    setSelectedGrade(event.target.value);
  };

  const handleGradeSubmit = async () => {
    try {
      const updatedUnits = selectedStudent.units.map((unit) =>
        unit.no === selectedUnit.no ? { ...unit, grade: selectedGrade } : unit
      );
  
      const updatedStudent = { ...selectedStudent, units: updatedUnits };
  
      // Update student in the backend
      await fetch(`http://localhost:3000/api/v1/modifygrade/${selectedStudent._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          unitNo: selectedUnit.no,
          newGrade: selectedGrade,
        }),
      });
  
      setStudents((prevStudents) =>
        prevStudents.map((student) =>
          student._id === selectedStudent._id ? updatedStudent : student
        )
      );
  
      setSelectedUnit((prevSelectedUnit) => ({
        ...prevSelectedUnit,
        grade: selectedGrade,
      }));
    } catch (error) {
      console.error('Error updating grade:', error);
    }
  };

  return (
    <div className='teach-main'>
      {/* <h1 className='teach-head'>Hello!!! Teacher</h1> */}
      <div className='new-usr'>
        <h1 className='teach-head'>Welcome, {userData.username}!</h1>
        {/* <a href="/signup" className="btn-add-user">Add New User</a> */}
        <PositionedMenu/>
      </div>
      <div className="teach-container">
        <div className="teach-sidebar">
          <h2>Students</h2>
          <ul className="teach-students">
            {students.map((student) => (
              <li
                key={student._id}
                className={`teach-student ${selectedStudent === student ? 'selected' : ''}`}
                onClick={() => handleStudentClick(student)}
              >
                {student.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="teach-content">
          {selectedStudent && (
            <>
              <div className="teach-units">
                <h2>Units for {selectedStudent.name}</h2>
                <select
                  className="teach-unit-dropdown"
                  value={selectedUnit ? selectedUnit.no : ''}
                  onChange={(e) => handleUnitSelect(selectedStudent.units.find(unit => unit.no === parseInt(e.target.value)))}
                >
                  <option value="">Select a unit</option>
                  {selectedStudent.units.map((unit) => (
                    <option key={unit._id} value={unit.no}>{`Unit ${unit.no}`}</option>
                  ))}
                </select>
                {selectedUnit && (
                  <div className="teach-scores">
                    <h3>Scores for Unit {selectedUnit.no}</h3>
                    <p>Quiz Score: {selectedUnit.quizScore}</p>
                    <p>Unit Test Score: {selectedUnit.unitTest}</p>
                  </div>
                )}
              </div>
              {selectedUnit && (
                <div className="teach-grading">
                  <h3>Grade for Unit {selectedUnit.no}</h3>
                  <select
                    className="teach-grade-dropdown"
                    value={selectedGrade}
                    onChange={handleGradeChange}
                  >
                    <option value="Proficient">Proficient</option>
                    <option value="Mastered">Mastered</option>
                    <option value="Average">Average</option>
                    <option value="Need to Work Hard">Need to Work Hard</option>
                  </select>
                  <button className="teach-submit-btn" onClick={handleGradeSubmit}>Submit Grade</button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherComp;
