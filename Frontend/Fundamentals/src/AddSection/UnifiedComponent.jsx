import React, { useState } from 'react';
import './Addsection.css';
import Logo from "../assets/plainlogo.png";

const UnifiedComponent = () => {
  const [title1, setTitle1] = useState('');
  const [title2, setTitle2] = useState('');
  const [quizForms, setQuizForms] = useState([]);
  const [videoForms, setVideoForms] = useState([]);
  const [unitForms, setUnitForms] = useState([]);

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

  const addQuizForm = () => {
    setQuizForms([...quizForms, { subUnit: '', questions: [{ question: '', options: ['', '', '', ''], correctOption: '', solution: '' }] }]);
  };

  const addVideoForm = () => {
    setVideoForms([...videoForms, { videoURL: '' }]);
  };

  const addUnitForm = () => {
    setUnitForms([...unitForms, { questions: [{ question: '', options: ['', '', '', ''], correctOption: '', solution: '' }] }]);
  };

  const handleQuizSubUnitChange = (formIndex, event) => {
    const newQuizForms = [...quizForms];
    newQuizForms[formIndex].subUnit = event.target.value;
    setQuizForms(newQuizForms);
  };

  const handleVideoSubUnitChange = (formIndex, event) => {
    const newQuizForms = [...quizForms];
    newQuizForms[formIndex].subUnit = event.target.value;
    setQuizForms(newQuizForms);
  };

  const handleUnitTestSubUnitChange = (formIndex, event) => {
    const newQuizForms = [...quizForms];
    newQuizForms[formIndex].subUnit = event.target.value;
    setQuizForms(newQuizForms);
  };

  const handleQuestionChange = (formIndex, questionIndex, event) => {
    const newQuizForms = [...quizForms];
    newQuizForms[formIndex].questions[questionIndex].question = event.target.value;
    setQuizForms(newQuizForms);
  };

  const handleOptionChange = (formIndex, questionIndex, optionIndex, event) => {
    const newQuizForms = [...quizForms];
    newQuizForms[formIndex].questions[questionIndex].options[optionIndex] = event.target.value;
    setQuizForms(newQuizForms);
  };

  const handleCorrectOptionChange = (formIndex, questionIndex, event) => {
    const newQuizForms = [...quizForms];
    newQuizForms[formIndex].questions[questionIndex].correctOption = event.target.value;
    setQuizForms(newQuizForms);
  };

  const handleSolutionChange = (formIndex, questionIndex, event) => {
    const newQuizForms = [...quizForms];
    newQuizForms[formIndex].questions[questionIndex].solution = event.target.value;
    setQuizForms(newQuizForms);
  };

  const handleVideoURLChange = (formIndex, event) => {
    const newVideoForms = [...videoForms];
    newVideoForms[formIndex].videoURL = event.target.value;
    setVideoForms(newVideoForms);
  };

  const addQuestionToQuizForm = (formIndex) => {
    const newQuizForms = [...quizForms];
    newQuizForms[formIndex].questions.push({ question: '', options: ['', '', '', ''], correctOption: '', solution: '' });
    setQuizForms(newQuizForms);
  };

  const handleQuizSubmit = async (event, formIndex) => {
    event.preventDefault();
    const { subUnit, questions } = quizForms[formIndex];

    if (questions.length < 10) {
      console.error('Please add at least 10 questions.');
      return;
    }

    const newQuiz = {
      unit: title1,
      subunit: subUnit,
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

        // Remove submitted form
        setQuizForms(quizForms.filter((_, index) => index !== formIndex));
      } else {
        console.error('Failed to add quiz');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleVideoSubmit = async (event, formIndex) => {
    event.preventDefault();
    const { videoURL } = videoForms[formIndex];

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

        // Remove submitted form
        setVideoForms(videoForms.filter((_, index) => index !== formIndex));
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
          <div className="button-group">
            <button
              type="button"
              className="sub-button"
              onClick={addQuizForm}
              disabled={!title1 || !title2}
            >
              Add Quiz
            </button>
            <button
              type="button"
              className="sub-button"
              onClick={addVideoForm}
              disabled={!title1 || !title2}
            >
              Add Video
            </button>
            <button
              type="button"
              className="sub-button"
              onClick={addUnitForm}
              disabled={!title1 || !title2}
            >
              Add Units
            </button>
          </div>
          <button
            type="submit"
            className="form-button"
            disabled={!title1 || !title2 || (quizForms.length === 0 && videoForms.length === 0 && unitForms.length === 0)}
          >
            Submit
          </button>
        </div>
      </form>

      {quizForms.map((quizForm, formIndex) => (
        <div key={formIndex} className="section-container">
          <h2 className="section-title">Add Quiz</h2>
          <input
            type="text"
            placeholder="Sub-Unit Name"
            value={quizForm.subUnit}
            onChange={(event) => handleQuizSubUnitChange(formIndex, event)}
            className="form-input"
          />
          <form onSubmit={(event) => handleQuizSubmit(event, formIndex)}>
            {quizForm.questions.map((q, qIndex) => (
              <div key={qIndex} className="question-container">
                <textarea
                  placeholder={`Question ${qIndex + 1}`}
                  value={q.question}
                  onChange={(event) => handleQuestionChange(formIndex, qIndex, event)}
                  className="form-textarea"
                />
                <div className="option-container">
                  {q.options.map((option, oIndex) => (
                    <input
                      key={oIndex}
                      type="text"
                      placeholder={`Option ${oIndex + 1}`}
                      value={option}
                      onChange={(event) => handleOptionChange(formIndex, qIndex, oIndex, event)}
                      className="form-input"
                    />
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="Correct Option"
                  value={q.correctOption}
                  onChange={(event) => handleCorrectOptionChange(formIndex, qIndex, event)}
                  className="form-input"
                />
                <input
                  type="text"
                  placeholder="Solution"
                  value={q.solution}
                  onChange={(event) => handleSolutionChange(formIndex, qIndex, event)}
                  className="form-input"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() => addQuestionToQuizForm(formIndex)}
              className="form-button"
            >
              Add Question
            </button>
            <button
              type="submit"
              className="form-button"
              disabled={quizForm.questions.length < 10}
            >
              Submit Quiz
            </button>
          </form>
        </div>
      ))}

      {videoForms.map((videoForm, formIndex) => (
        <div key={formIndex} className="section-container">
          <h2 className="section-title">Add Video</h2>
          <input
            type="text"
            placeholder="Sub-Unit Name"
            value={videoForm.subUnit}
            onChange={(event) => handleVideoSubUnitChange(formIndex, event)}
            className="form-input"
          />
          <form onSubmit={(event) => handleVideoSubmit(event, formIndex)}>
            <input
              type="text"
              placeholder="Enter YouTube Video URL"
              value={videoForm.videoURL}
              onChange={(e) => handleVideoURLChange(formIndex, e)}
              className="form-input"
            />
            <button
              type="submit"
              className="form-button"
              disabled={!videoForm.videoURL}
            >
              Submit Video
            </button>
          </form>
        </div>
      ))}

      {unitForms.map((unitForm, formIndex) => (
        <div key={formIndex} className="section-container">
          <h2 className="section-title">Add Unit-Test</h2>
          <input
            type="text"
            placeholder="Sub-Unit Name"
            value={unitForm.subUnit}
            onChange={(event) => handleUnitTestSubUnitChange(formIndex, event)}
            className="form-input"
          />
          <form onSubmit={(event) => handleQuizSubmit(event, formIndex)}>
            {unitForm.questions.map((q, qIndex) => (
              <div key={qIndex} className="question-container">
                <textarea
                  placeholder={`Question ${qIndex + 1}`}
                  value={q.question}
                  onChange={(event) => handleQuestionChange(formIndex, qIndex, event)}
                  className="form-textarea"
                />
                <div className="option-container">
                  {q.options.map((option, oIndex) => (
                    <input
                      key={oIndex}
                      type="text"
                      placeholder={`Option ${oIndex + 1}`}
                      value={option}
                      onChange={(event) => handleOptionChange(formIndex, qIndex, oIndex, event)}
                      className="form-input"
                    />
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="Correct Option"
                  value={q.correctOption}
                  onChange={(event) => handleCorrectOptionChange(formIndex, qIndex, event)}
                  className="form-input"
                />
                <input
                  type="text"
                  placeholder="Solution"
                  value={q.solution}
                  onChange={(event) => handleSolutionChange(formIndex, qIndex, event)}
                  className="form-input"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() => addQuestionToQuizForm(formIndex)}
              className="form-button"
            >
              Add Question
            </button>
            <button
              type="submit"
              className="form-button"
              disabled={unitForm.questions.length < 10}
            >
              Submit Units
            </button>
          </form>
        </div>
      ))}
    </div>
  );
};

export default UnifiedComponent;
