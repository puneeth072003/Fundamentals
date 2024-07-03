import React, { useState, useEffect } from 'react';
import './sidebar.css';

const QuizComponent = ({ questions }) => {
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

  const maxResets = 3;
  const maxQuestions = 10;
  const totalQuestions = 10;

  useEffect(() => {
    shuffleQuestions();
  }, []);

  useEffect(() => {
    shuffleQuestions();
  }, [questions]);

  const shuffleQuestions = () => {
    const shuffled = questions.sort(() => 0.5 - Math.random()).slice(0, maxQuestions);
    setShuffledQuestions(shuffled);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0); // Reset score when questions are shuffled
    setAttendedQuestions([]); // Reset attended questions when shuffled
    setMessage('');
    setShowSolution(false); // Reset solution visibility
    setShowTeacherMessage(false); // Reset teacher message visibility
  };

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
    const currentQuestion = shuffledQuestions[currentQuestionIndex];
    const isCorrect = answer === currentQuestion.correctAnswer;
    if (isCorrect) {
      setScore(score + 1); // Increment score on correct answer
      setMessage('Right Answer!');
    } else {
      setMessage('Wrong Answer!');
    }
    setAttendedQuestions([
      ...attendedQuestions,
      {
        questionNumber: currentQuestionIndex + 1,
        userAnswer: answer,
        isCorrect: isCorrect,
      },
    ]);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < shuffledQuestions.length - 1 && resetCount < maxResets) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setMessage('');
      setShowSolution(false); // Reset solution visibility for the next question
    } else {
      setShowWellDone(true);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0 && resetCount < maxResets) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedAnswer(null);
      setMessage('');
      setShowSolution(false); // Reset solution visibility for the previous question
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

  if (shuffledQuestions.length === 0) return null;

  const currentQuestion = shuffledQuestions[currentQuestionIndex];

  return (
    <div className="quiz-wrapper">
      <div className="quiz-container">
        {showWellDone ? (
          <div className="well-done-message">
            <h2>Well done!</h2>
            <p>Your score: {score} / {maxQuestions}</p>
            <button className="well-done-reset" onClick={handleResetQuiz}>
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
                    selectedAnswer && (option === currentQuestion.correctAnswer ? 'quiz-correct' : 'quiz-incorrect')
                  } ${selectedAnswer === option ? 'quiz-selected' : ''}`}
                  onClick={() => handleAnswerClick(option)}
                  disabled={selectedAnswer !== null}
                >
                  {option}
                </button>
              ))}
            </div>
            {selectedAnswer && (
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
              <button className="quiz-next" onClick={handleNextQuestion} disabled={currentQuestionIndex === shuffledQuestions.length - 1}>
                Next Question
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