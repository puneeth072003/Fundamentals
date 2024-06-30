import React, { useState, useEffect } from 'react';
import './sidebar.css';

const QuizComponent = ({ questions }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [resetCount, setResetCount] = useState(0);
  const [showWellDone, setShowWellDone] = useState(false);
  const [score, setScore] = useState(0);

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
  };

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
    const currentQuestion = shuffledQuestions[currentQuestionIndex];
    if (answer === currentQuestion.correctAnswer) {
      setScore(score + 1); // Increment score on correct answer
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < shuffledQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
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
        </>
      )}
    </div>
  );
};

export default QuizComponent;
