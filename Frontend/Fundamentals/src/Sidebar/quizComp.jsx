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
  const [message, setMessage] = useState("");

  const maxResets = 3;
  const maxQuestions = 10;

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
    setMessage("");
  };

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
    const currentQuestion = shuffledQuestions[currentQuestionIndex];
    const isCorrect = answer === currentQuestion.correctAnswer;
    if (isCorrect) {
      setScore(score + 1); // Increment score on correct answer
      setMessage("Right Answer!");
    } else {
      setMessage("Wrong Answer!");
    }
    setAttendedQuestions([
      ...attendedQuestions,
      {
        questionNumber: currentQuestionIndex + 1,
        isCorrect: isCorrect,
      },
    ]);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < shuffledQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setMessage("");
    } else {
      setShowWellDone(true);
    }
  };

  const handleResetQuiz = () => {
    if (resetCount < maxResets) {
      shuffleQuestions();
      setResetCount(resetCount + 1);
      setShowWellDone(false);
    } else {
      alert('You have reached the maximum number of resets. Please contact your teacher.');
    }
  };

  if (shuffledQuestions.length === 0) return null;

  const currentQuestion = shuffledQuestions[currentQuestionIndex];

  return (
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
              <button className="quiz-next" onClick={handleNextQuestion}>
                Next Question
              </button>
            </div>
          )}
          <div className="quiz-reset">
            <button onClick={handleResetQuiz}>
              Reset Quiz
            </button>
          </div>
          <div className="attended-questions">
            <h3>Attended Questions:</h3>
            <ul>
              {attendedQuestions.map((item, index) => (
                <li key={index} className={item.isCorrect ? 'correct-answer' : 'incorrect-answer'}>
                  <input
                    type="radio"
                    checked
                    readOnly
                  />
                  Question {item.questionNumber}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default QuizComponent;