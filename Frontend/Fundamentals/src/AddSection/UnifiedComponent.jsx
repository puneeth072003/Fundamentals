import React, { useState } from 'react';
import './AddSection.css';
import Logo from "../assets/plainlogo.png";

const UnifiedComponent = () => {
  const [title1, setTitle1] = useState('');
  const [title2, setTitle2] = useState('');
  const [showQuizForm, setShowQuizForm] = useState(false);
  const [showVideoForm, setShowVideoForm] = useState(false);
  const [showUnitForm, setShowUnitForm] = useState(false);
  const [videoURL, setVideoURL] = useState('');
  const [questions, setQuestions] = useState([
    { question: '', options: ['', '', '', ''], correctOption: '', solution: '' },
  ]);

  const handleTitle1Change = (event) => {
    setTitle1(event.target.value);
  };

  const handleTitle2Change = (event) => {
    setTitle2(event.target.value);
  };

  const handleUnitSubmit = async (event) => {
    event.preventDefault();

    const newUnit = {
      title1,
      title2,
    };

    try {
      const response = await fetch('YOUR_BACKEND_URL/units', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUnit),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Unit added:', result);

        setTitle1(''); // Clear the input fields after successful submission
        setTitle2('');
      } else {
        console.error('Failed to add unit');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleQuestionChange = (index, event) => {
    const newQuestions = [...questions];
    newQuestions[index].question = event.target.value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (qIndex, oIndex, event) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options[oIndex] = event.target.value;
    setQuestions(newQuestions);
  };

  const handleCorrectOptionChange = (index, event) => {
    const newQuestions = [...questions];
    newQuestions[index].correctOption = event.target.value;
    setQuestions(newQuestions);
  };

  const handleSolutionChange = (index, event) => {
    const newQuestions = [...questions];
    newQuestions[index].solution = event.target.value;
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { question: '', options: ['', '', '', ''], correctOption: '', solution: '' },
    ]);
  };

  const handleQuizSubmit = async (event) => {
    event.preventDefault();

    if (questions.length < 10) {
      console.error('Please add at least 10 questions.');
      return;
    }

    const newQuiz = {
      unit: title1,
      subunit: title2,
      questions,
    };

    try {
      const response = await fetch('YOUR_BACKEND_URL/quizzes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newQuiz),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Quiz added:', result);

        setQuestions([{ question: '', options: ['', '', '', ''], correctOption: '', solution: '' }]); // Clear the form after successful submission
      } else {
        console.error('Failed to add quiz');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleVideoSubmit = async (event) => {
    event.preventDefault();

    // Simple regex pattern to validate YouTube URLs (change as per your requirement)
    const urlPattern = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]{11})$/;

    if (!urlPattern.test(videoURL)) {
      console.error('Please enter a valid YouTube video URL.');
      return;
    }

    const newVideo = {
      unit: title1,
      subunit: title2,
      videoURL,
    };

    try {
      const response = await fetch('YOUR_BACKEND_URL/videos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newVideo),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Video added:', result);

        setVideoURL(''); // Clear the form after successful submission
      } else {
        console.error('Failed to add video');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container">
      <h1 className="section-title">Adding Contents</h1>
      <form className="section-container" onSubmit={handleUnitSubmit}>
        <img src={Logo} alt="Logo" className="section-logo" />
        <div className="form-group">
          <label>Unit Name</label>
          <input
            type="text"
            placeholder="Title 1"
            value={title1}
            onChange={handleTitle1Change}
            className="form-input"
          />
          <input
            type="text"
            placeholder="Title 2"
            value={title2}
            onChange={handleTitle2Change}
            className="form-input"
          />
          <button
            type="submit"
            className="form-button"
            disabled={!title1 || !title2}
          >
            Submit
          </button>
        </div>
        <div className="button-group">
          <button
            type="button"
            className="sub-button"
            onClick={() => {
              setShowQuizForm(true);
              setShowVideoForm(false);
              setShowUnitForm(false);
            }}
            disabled={!title1 || !title2}
          >
            Add Quiz
          </button>
          <button
            type="button"
            className="sub-button"
            onClick={() => {
              setShowQuizForm(false);
              setShowVideoForm(true);
              setShowUnitForm(false);
            }}
            disabled={!title1 || !title2}
          >
            Add Video
          </button>
          <button
            type="button"
            className="sub-button"
            onClick={() => {
              setShowQuizForm(false);
              setShowVideoForm(false);
              setShowUnitForm(true);
            }}
            disabled={!title1 || !title2}
          >
            Add Units
          </button>
        </div>
      </form>

      {showQuizForm && (
        <div className="section-container">
          <h2 className="section-title">Add Quiz</h2>
          <form onSubmit={handleQuizSubmit}>
            {questions.map((q, qIndex) => (
              <div key={qIndex} className="question-container">
                <textarea
                  placeholder={`Question ${qIndex + 1}`}
                  value={q.question}
                  onChange={(event) => handleQuestionChange(qIndex, event)}
                  className="form-textarea"
                />
                <div className="option-container">
                  {q.options.map((option, oIndex) => (
                    <input
                      key={oIndex}
                      type="text"
                      placeholder={`Option ${oIndex + 1}`}
                      value={option}
                      onChange={(event) => handleOptionChange(qIndex, oIndex, event)}
                      className="form-input"
                    />
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="Correct Option"
                  value={q.correctOption}
                  onChange={(event) => handleCorrectOptionChange(qIndex, event)}
                  className="form-input"
                />
                <input
                  type="text"
                  placeholder="Solution"
                  value={q.solution}
                  onChange={(event) => handleSolutionChange(qIndex, event)}
                  className="form-input"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={addQuestion}
              className="form-button"
            >
              Add Question
            </button>
            <button
              type="submit"
              className="form-button"
              disabled={questions.length < 10}
            >
              Submit
            </button>
          </form>
        </div>
      )}

      {showVideoForm && (
        <div className="section-container">
          <h2 className="section-title">Add Video</h2>
          <form onSubmit={handleVideoSubmit}>
            <input
              type="text"
              placeholder="Enter YouTube Video URL"
              value={videoURL}
              onChange={(e) => setVideoURL(e.target.value)}
              className="form-input"
            />
            <button
              type="submit"
              className="form-button"
              disabled={!videoURL}
            >
              Submit
            </button>
          </form>
        </div>
      )}

      {showUnitForm && (
        <div className="section-container">
          <h2 className="section-title">Add Units</h2>
          <form onSubmit={handleQuizSubmit}>
            {questions.map((q, qIndex) => (
              <div key={qIndex} className="question-container">
                <textarea
                  placeholder={`Question ${qIndex + 1}`}
                  value={q.question}
                  onChange={(event) => handleQuestionChange(qIndex, event)}
                  className="form-textarea"
                />
                <div className="option-container">
                  {q.options.map((option, oIndex) => (
                    <input
                      key={oIndex}
                      type="text"
                      placeholder={`Option ${oIndex + 1}`}
                      value={option}
                      onChange={(event) => handleOptionChange(qIndex, oIndex, event)}
                      className="form-input"
                    />
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="Correct Option"
                  value={q.correctOption}
                  onChange={(event) => handleCorrectOptionChange(qIndex, event)}
                  className="form-input"
                />
                <input
                  type="text"
                  placeholder="Solution"
                  value={q.solution}
                  onChange={(event) => handleSolutionChange(qIndex, event)}
                  className="form-input"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={addQuestion}
              className="form-button"
            >
              Add Question
            </button>
            <button
              type="submit"
              className="form-button"
              disabled={questions.length < 10}
            >
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default UnifiedComponent;