import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import './sidebar.css';
import QuizComponent from './quizComp';
import axios from 'axios';
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import robImg from '../assets/rob.png';
import { colors } from '@mui/material';

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0
  },
  "&::before": {
    display: "none",
  },
  fontSize: "50px"
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)"
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1)
  },
  padding: "10px 15px",
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)"
}));

const StudentApp = () => {
  const { className, subject } = useParams();
  const [expandedUnit, setExpandedUnit] = useState(null);
  const [selectedSubunit, setSelectedSubunit] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("Click on a subunit to continue");
  const [flag, setFlag] = useState(false);
  const [unitno, setUnitno] = useState(1);
  const classNo = Number(className);
  const unitCache = useRef({}); // Cache for unit data

  useEffect(() => {
    const fetchData = async () => {
      setStatus("Loading....");
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/${classNo}/${subject}`);
        if (Array.isArray(response.data.content)) {
          setData(response.data.content);
          setStatus("Click on a subunit to continue");
        } else {
          console.error('Response data is not an array:', response.data);
          setStatus("Error loading data");
        }
      } catch (err) {
        setError(err);
        setStatus("Error loading data");
      }
    };

    fetchData();
  }, [classNo, subject]);

  const handleUnitClick = async (unit) => {
    setExpandedUnit(prevUnit => (prevUnit === unit ? null : unit));
    setSelectedSubunit(null);
};

  const handleSubunitClick = (subunit) => {
    setUnitno(subunit.no);
    setSelectedSubunit(subunit);
    if (subunit.type === 'quiz') {
      setQuestions(subunit.quiz.questions);
      if (subunit.quiz.quizTitle === 'Unit test') {
        setFlag(true);
      } else {
        setFlag(false);
      }
    } else {
      setQuestions([]); // Clear questions
      setFlag(false); // Reset flag
    }
  };

  function convertToCamelCase(subject) {
    return subject.toLowerCase().replace(/\b\w+/g, (word) => word.charAt(0).toUpperCase() + word.slice(1));
  }

  return (
    <>
    <h1 style={{ fontFamily:"'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif",paddingLeft:"5%",paddingBottom:"2%"}}>Class {className} : {convertToCamelCase(subject)} Student Dashboard</h1>
    <div className="student_app">
      <div className="stu-sidebar">
        {data.map((unit, unitIndex) => (
          <Accordion key={unitIndex} expanded={expandedUnit === unit} onChange={() => handleUnitClick(unit)}>
            <AccordionSummary>
              <Typography sx={{ fontFamily:"'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif",color:"#1e90ff",fontSize:"1.3rem"}}>{unit.title1}: {unit.title2}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List>
                {unit.subunits.map((subunit, subunitIndex) => (
                  <React.Fragment key={subunitIndex}>
                    <ListItem style={{ cursor: 'pointer'}} onClick={() => handleSubunitClick(subunit)}>
                      <ListItemText
                        className="custom-list-item-text"
                        primary={subunit.quiz ? <h3 style={{fontFamily:"'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif",color:"black"}}>{subunit.quiz.name}</h3> : subunit.video ? <h3 style={{fontFamily:"'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif",color:"black"}}>{subunit.video.name}</h3> : 'Unknown Subunit'}
                      />              
                    </ListItem>
                    {subunitIndex < unit.subunits.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
      <div className="main-content">
        {!selectedSubunit && (
          <div style={{ display: 'flex',flexDirection:'column', alignItems: 'center', height: '100%' }}>
            <img src={robImg} alt="well done image" style={{height:"300px",width:"250px",paddingBottom:"20px"}}/>
            <h3 style={{color:"black", fontFamily:"monospace"}}>rob: {status}</h3>
          </div>
        )}
        {selectedSubunit && selectedSubunit.type === 'video' && (
          <div className="video-container">
            <iframe
              width="100%"
              height="100%"
              src={selectedSubunit.video.videoUrl}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}
        {selectedSubunit && selectedSubunit.type === 'quiz' && (
          <div className="quiz-box">
            <h1 style={{fontFamily:"'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif",color:"black"}}>Quiz: {selectedSubunit.quiz.name}</h1>
            <QuizComponent questions={questions} classNo={classNo} subject={subject} unitName={expandedUnit.title2} subunitName={selectedSubunit.quiz.name} />
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default StudentApp;