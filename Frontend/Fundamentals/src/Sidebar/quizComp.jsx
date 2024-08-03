import React, { useState, useEffect, useContext } from 'react';
import './sidebar.css';
import { UserContext } from '../redux/user-context'; // Adjust this import according to your file structure

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
    setShowSolution(true);
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

  return (
    <div className="quiz-wrapper">
      <div className="quiz-container">
        {showWellDone ? (
          <div className="well-done-message">
            <h2>Well done!</h2>
            <p>Your score: {score} / {maxQuestions}</p>
            <button className="quiz-rst" onClick={handleResetQuiz}>
              Reset Quiz
            </button>
          </div>
        ) : (
          <>
            <div className="quiz-question">
              <h2>{currentQuestion.question}</h2>
              <p>Question {currentQuestionIndex + 1} of {maxQuestions}</p>
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
                  {option}
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
                  Show Solution
                </button>
              </div>
            )}
            <div className="quiz-navigation">
              <button className="quiz-prev" onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0}>
                Previous Question
              </button>
              <button className="quiz-next" onClick={handleSubmitQuestion} disabled={!isAnswerSubmitted}>
                {currentQuestionIndex === shuffledQuestions.length - 1 ? 'Submit' : 'Next Question'}
              </button>
            </div>
            <div className="quiz-reset">
              <button onClick={handleResetQuiz}>
                Reset Quiz
              </button>
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
          </>
        )}
      </div>
      {showSolution && (
        <div className="quiz-solution">
          <p>Solution: {currentQuestion.solution}</p>
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
