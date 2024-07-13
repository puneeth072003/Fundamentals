import React, { useEffect, useState } from 'react';
import "./sidebar.css";
import QuizComponent from './quizComp';
import axios from 'axios';

const StudentApp = () => {
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [selectedSubunit, setSelectedSubunit] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [status,setStatus]=useState("Click on a subunit to continue");
  const [flag,setFlag]=useState(false);
  const [unitno,setUnitno]=useState(1);

  useEffect(() => {
    const fetchData = async () => {
      setStatus("Loading....")
      try {
        const response = await axios.get('http://localhost:3000/api/v1/class11');
        if (Array.isArray(response.data.content)) {
          setData(response.data.content);
          setStatus("Click on a subunit to continue");
        } else {
          console.error('Response data is not an array:', response.data);
          setStatus(error.message);
        }
      } catch (err) {
        setError(err);
      }
    };

    fetchData();
  }, []);


  const handleUnitClick = (unit) => {
    setSelectedUnit(unit);
    setSelectedSubunit(null); 
  };

  const handleSubunitClick = (subunit) => {
    setUnitno(subunit.no)
    setSelectedSubunit(subunit);
    if (subunit.type === 'quiz') {
      setQuestions(subunit.questions);
    } else {
      setQuestions([]); 
    }
    if (subunit.name === 'Unit test') {
      setFlag(true);
    } else {
      setFlag(false); 
    }
  };

  return (
    <div className="student_app">
      <div className="sidebar">
        <ul className="sidebar-list">
          {data.map((unit, unitIndex) => (
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
                  <li><button className="finish-button">Finish</button></li>
                </ul>
              )}
            </li>
          ))}
        </ul>
        <ul>
            
        </ul>
      </div>
      <div className="main-content">
        {!selectedSubunit && (
          <div className="content-placeholder">
            {status}
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
            <QuizComponent  questions={questions} flag={flag} unitno={unitno}/>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentApp;
