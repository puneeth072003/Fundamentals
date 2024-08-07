import React, { useState, useEffect, useContext } from 'react';
import './sidebar.css';
import { UserContext } from '../redux/user-context';
import LatexRenderer from '../AddSection/LatexRenderer';
import Button from '@mui/material/Button';
import welldoneImg from '../assets/welldone.png';

const QuizComponent = ({ questions, classNo, subject, unitName, subunitName }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [resetCount, setResetCount] = useState(0);
  const [showWellDone, setShowWellDone] = useState(false);
  const [score, setScore] = useState(0);
  const [attendedQuestions, setAttendedQuestions] = useState([]);
  const [message, setMessage] = useState('');
  const [showSolution, setShowSolution] = useState(false);
  const [showTeacherMessage, setShowTeacherMessage] = useState(false);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);

  const maxResets = 3;
  const maxQuestions = 10;
  const totalQuestions = 10;

  const { userData } = useContext(UserContext);

  useEffect(() => {
    shuffleQuestions();
  }, [questions]);

  const shuffleQuestions = () => {
    const shuffled = questions.sort(() => 0.5 - Math.random()).slice(0, maxQuestions);
    setShuffledQuestions(shuffled);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setAttendedQuestions([]);
    setMessage('');
    setShowSolution(false);
    setShowTeacherMessage(false);
    setIsAnswerSubmitted(false);
  };

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleSubmitAnswer = () => {
    const currentQuestion = shuffledQuestions[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.correctOption;
    if (isCorrect) {
      setScore(score + 1);
      setMessage('Right Answer!');
    } else {
      setMessage('Wrong Answer!');
    }
    setAttendedQuestions([
      ...attendedQuestions,
      {
        questionNumber: currentQuestionIndex + 1,
        userAnswer: selectedAnswer,
        isCorrect: isCorrect,
      },
    ]);
    setIsAnswerSubmitted(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < shuffledQuestions.length - 1 && resetCount < maxResets) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setMessage('');
      setShowSolution(false);
      setIsAnswerSubmitted(false);
    } else {
      setShowSolution(false);
      setShowWellDone(true);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0 && resetCount < maxResets) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedAnswer(null);
      setMessage('');
      setShowSolution(false);
      setIsAnswerSubmitted(false);
    }
  };

  const handleResetQuiz = () => {
    if (resetCount < maxResets) {
      shuffleQuestions();
      setResetCount(resetCount + 1);
      setShowWellDone(false);
    } else {
      setShowTeacherMessage(true);
    }
  };

  const handleShowSolution = () => {
    setShowSolution(!showSolution);
  };

  const handleSubmitScore = () => {
    const username = userData.username;
    const data = {
      name: unitName,
      subunits: [
        {
          name: subunitName,
          cls: classNo,
          subject: subject,
          score: score
        }
      ]
    };
  
    console.log('Submitting data:', JSON.stringify(data));
    fetch(`http://localhost:3000/api/v1/${username}/addscore`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => console.log('Updated data:', data));
  };

  const handleSubmitQuestion = () => {
    if (currentQuestionIndex < shuffledQuestions.length - 1) {
      handleNextQuestion();
    } else {
      handleSubmitScore();
      setShowWellDone(true);
    }
  };

  if (shuffledQuestions.length === 0) return null;

  const currentQuestion = shuffledQuestions[currentQuestionIndex];

  const renderQuestionText = (text) => {
    const parts = text.split('$');
    return parts.map((part, index) => {
      return index % 2 === 0 ? part : <LatexRenderer key={index} latex={part} />;
    });
  };

  return (
    <div className="quiz-wrapper">
      {showWellDone ? (
        <div className="well-done-message">
          <img src={welldoneImg} alt="well done image" style={{height:"110px",width:"100px",paddingBottom:"20px"}}/>
          <h2 style={{ fontFamily:"'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif",color:"black"}}>GoodWork!!</h2>
          <p>Your score: {score} / {maxQuestions}</p>
          <div>
            <Button variant="contained" onClick={handleResetQuiz} style={{fontFamily:"'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif",background:"red"}} >Retake quiz</Button>
          </div>
        </div>
      ) : (
        <div className="quiz-container">
          <div className="quiz-question">
            <p style={{ fontFamily:"'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif", marginBottom:"5px"}}>Question {currentQuestionIndex + 1} of {maxQuestions}</p>
            <h3 style={{ fontFamily:"'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif", marginTop:"0"}}>{renderQuestionText(currentQuestion.question)}</h3>
          </div>
          <div className="quiz-options">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                className={`quiz-option ${
                  isAnswerSubmitted && (option === currentQuestion.correctOption ? 'quiz-correct' : 'quiz-incorrect')
                } ${selectedAnswer === option ? 'quiz-selected' : ''}`}
                onClick={() => handleAnswerClick(option)}
                disabled={isAnswerSubmitted}
              >
                {renderQuestionText(option)}
              </button>
            ))}
          </div>
          {selectedAnswer && !isAnswerSubmitted && (
            <div className="quiz-submit">
              <button className="show-solution-button" onClick={handleSubmitAnswer}>
                Submit Answer
              </button>
            </div>
          )}
          {isAnswerSubmitted && (
            <div className="quiz-answer">
              <p>{message}</p>
              <button className="show-solution-button" onClick={handleShowSolution}>
                {showSolution ? 'Hide Solution' : 'Show Solution'}
              </button>
            </div>
          )}
          <div className="quiz-navigation">
            <button className="quiz-next" onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0}>
              Previous Question
            </button>
            <button className="quiz-next" onClick={handleSubmitQuestion} disabled={!isAnswerSubmitted}>
              {currentQuestionIndex === shuffledQuestions.length - 1 ? 'Submit Quiz' : 'Next Question'}
            </button>
          </div>
          <div className="quiz-reset-container">
            <Button variant="contained" onClick={handleResetQuiz} style={{fontFamily:"'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif",background:"red"}} >Reset Quiz</Button>
          </div>
          <div className="qt-attended-questions">
            <h3 className="qt-heading">Attended Questions:</h3>
            <ul className="qt-questions-list">
              {[...Array(totalQuestions)].map((_, index) => {
                const attendedQuestion = attendedQuestions.find(item => item.questionNumber === index + 1);
                let circleClass = 'qt-circle';

                if (attendedQuestion) {
                  circleClass += attendedQuestion.isCorrect ? ' qt-correct-answer' : ' qt-incorrect-answer';
                }

                return (
                  <li key={index} className={circleClass}></li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
      {showSolution && (
        <div className="quiz-solution">
          <p>Solution: {renderQuestionText(currentQuestion.solution)}</p>
        </div>
      )}
      {showTeacherMessage && (
        <div className="quiz-solution">
          <p>For mastering the topic you need to contact the respective teacher.</p>
        </div>
      )}
    </div>
  );
};

export default QuizComponent;