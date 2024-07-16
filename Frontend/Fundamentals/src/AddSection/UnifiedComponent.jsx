import React, { useState } from 'react';
import './AddSection.css';
import Logo from "../assets/plainlogo.png";

const UnifiedComponent = () => {
  const [title1, setTitle1] = useState('');
  const [title2, setTitle2] = useState('');
  const [quizForms, setQuizForms] = useState([]);
  const [videoForms, setVideoForms] = useState([]);
  const [unitForms, setUnitForms] = useState([]);
  const [addUnitsClicked, setAddUnitsClicked] = useState(false);
  const [finalForm, setFinalForm] = useState([]);

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
      subunits: finalForm
    };

    try {
      const response = await fetch('http://localhost:3000/api/v1/createunit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUnit),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Unit added:', result);
        setTitle1('');
        setTitle2('');
        setQuizForms([]);
        setVideoForms([]);
        setUnitForms([]);
        setFinalForm([]);
        setAddUnitsClicked(false);
      } else {
        console.error('Failed to add unit');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const addQuizForm = () => {
    setQuizForms([...quizForms, { name: '', questions: [{ question: '', options: ['', '', '', ''], correctOption: '', solution: '' }] }]);
    setFinalForm([...finalForm, { type: 'quiz', quiz: { name: '', questions: [{ question: '', options: ['', '', '', ''], correctOption: '', solution: '' }] } }]);
  };

  const addVideoForm = () => {
    setVideoForms([...videoForms, { name: '', videoUrl: '' }]);
    setFinalForm([...finalForm, { type: 'video', video: { name: '', videoUrl: '' } }]);
  };

  const addUnitForm = () => {
    setUnitForms([...unitForms, { name: '', questions: [{ question: '', options: ['', '', '', ''], correctOption: '', solution: '' }] }]);
    setFinalForm([...finalForm, { type: 'unitTest', unitTest: { name: '', questions: [{ question: '', options: ['', '', '', ''], correctOption: '', solution: '' }] } }]);
  };

  const handleQuizChange = (formIndex, event) => {
    const newQuizForms = [...quizForms];
    newQuizForms[formIndex].name = event.target.value;
    setQuizForms(newQuizForms);

    const newFinalForm = [...finalForm];
    newFinalForm[formIndex].quiz.name = event.target.value;
    setFinalForm(newFinalForm);
  };

  const handleVideoChange = (formIndex, event) => {
    const newVideoForms = [...videoForms];
    newVideoForms[formIndex].name = event.target.value;
    setVideoForms(newVideoForms);

    const newFinalForm = [...finalForm];
    newFinalForm[formIndex + quizForms.length].video.name = event.target.value;
    setFinalForm(newFinalForm);
  };

  const handleUnitChange = (formIndex, event) => {
    const newUnitForms = [...unitForms];
    newUnitForms[formIndex].name = event.target.value;
    setUnitForms(newUnitForms);

    const newFinalForm = [...finalForm];
    newFinalForm[formIndex + quizForms.length + videoForms.length].unitTest.name = event.target.value;
    setFinalForm(newFinalForm);
  };

  const handleQuestionChange = (formIndex, questionIndex, event) => {
    const newQuizForms = [...quizForms];
    newQuizForms[formIndex].questions[questionIndex].question = event.target.value;
    setQuizForms(newQuizForms);

    const newFinalForm = [...finalForm];
    newFinalForm[formIndex].quiz.questions[questionIndex].question = event.target.value;
    setFinalForm(newFinalForm);
  };

  const handleOptionChange = (formIndex, questionIndex, optionIndex, event) => {
    const newQuizForms = [...quizForms];
    newQuizForms[formIndex].questions[questionIndex].options[optionIndex] = event.target.value;
    setQuizForms(newQuizForms);

    const newFinalForm = [...finalForm];
    newFinalForm[formIndex].quiz.questions[questionIndex].options[optionIndex] = event.target.value;
    setFinalForm(newFinalForm);
  };

  const handleCorrectOptionChange = (formIndex, questionIndex, event) => {
    const newQuizForms = [...quizForms];
    newQuizForms[formIndex].questions[questionIndex].correctOption = event.target.value;
    setQuizForms(newQuizForms);

    const newFinalForm = [...finalForm];
    newFinalForm[formIndex].quiz.questions[questionIndex].correctOption = event.target.value;
    setFinalForm(newFinalForm);
  };

  const handleSolutionChange = (formIndex, questionIndex, event) => {
    const newQuizForms = [...quizForms];
    newQuizForms[formIndex].questions[questionIndex].solution = event.target.value;
    setQuizForms(newQuizForms);

    const newFinalForm = [...finalForm];
    newFinalForm[formIndex].quiz.questions[questionIndex].solution = event.target.value;
    setFinalForm(newFinalForm);
  };

  const handleVideoURLChange = (formIndex, event) => {
    const newVideoForms = [...videoForms];
    newVideoForms[formIndex].videoUrl = event.target.value;
    setVideoForms(newVideoForms);

    const newFinalForm = [...finalForm];
    newFinalForm[formIndex + quizForms.length].video.videoUrl = event.target.value;
    setFinalForm(newFinalForm);
  };

  const addQuestionToQuizForm = (formIndex) => {
    const newQuizForms = [...quizForms];
    newQuizForms[formIndex].questions.push({ question: '', options: ['', '', '', ''], correctOption: '', solution: '' });
    setQuizForms(newQuizForms);

    const newFinalForm = [...finalForm];
    newFinalForm[formIndex].quiz.questions.push({ question: '', options: ['', '', '', ''], correctOption: '', solution: '' });
    setFinalForm(newFinalForm);
  };

  const handleCloseSection = (sectionIndex) => {
    if (sectionIndex < quizForms.length) {
      setQuizForms((prevForms) => {
        const updatedForms = [...prevForms];
        updatedForms.splice(sectionIndex, 1);
        return updatedForms;
      });

      setFinalForm((prevForms) => {
        const updatedForms = [...prevForms];
        updatedForms.splice(sectionIndex, 1);
        return updatedForms;
      });
    } else if (sectionIndex < quizForms.length + videoForms.length) {
      const adjustedIndex = sectionIndex - quizForms.length;
      setVideoForms((prevForms) => {
        const updatedForms = [...prevForms];
        updatedForms.splice(adjustedIndex, 1);
        return updatedForms;
      });

      setFinalForm((prevForms) => {
        const updatedForms = [...prevForms];
        updatedForms.splice(sectionIndex, 1);
        return updatedForms;
      });
    } else if (sectionIndex < quizForms.length + videoForms.length + unitForms.length) {
      const adjustedIndex = sectionIndex - quizForms.length - videoForms.length;
      setUnitForms((prevForms) => {
        const updatedForms = [...prevForms];
        updatedForms.splice(adjustedIndex, 1);
        return updatedForms;
      });

      setFinalForm((prevForms) => {
        const updatedForms = [...prevForms];
        updatedForms.splice(sectionIndex, 1);
        return updatedForms;
      });
    }
  };

  const logFormData = () => {
    const final = {
      newUnit: {
        title1,
        title2,
        subunits: finalForm
      }
    };
    console.log(JSON.stringify(final, null, 2));
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
              disabled={!title1 || !title2 || addUnitsClicked}
            >
              Add Units
            </button>
          </div>
          <button
            type="submit"
            className="form-button"
            onClick={logFormData}
            disabled={!title1 || !title2 || finalForm.length === 0}
          >
            Submit
          </button>
        </div>
      </form>

      {quizForms.map((quizForm, formIndex) => (
        <div key={formIndex} className="section-container">
          <div className="close-btn" onClick={() => handleCloseSection(formIndex)}>X</div>
          <h2 className="section-title">Add Quiz</h2>
          <input
            type="text"
            placeholder="Sub-Unit Name"
            value={quizForm.name}
            onChange={(event) => handleQuizChange(formIndex, event)}
            className="form-input"
          />
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
        </div>
      ))}

      {videoForms.map((videoForm, formIndex) => (
        <div key={formIndex} className="section-container">
          <div className="close-btn" onClick={() => handleCloseSection(formIndex + quizForms.length)}>X</div>
          <h2 className="section-title">Add Video</h2>
          <input
            type="text"
            placeholder="Sub-Unit Name"
            value={videoForm.name}
            onChange={(event) => handleVideoChange(formIndex, event)}
            className="form-input"
          />
          <input
            type="text"
            placeholder="Enter YouTube Video URL"
            value={videoForm.videoUrl}
            onChange={(event) => handleVideoURLChange(formIndex, event)}
            className="form-input"
          />
        </div>
      ))}

      {unitForms.map((unitForm, formIndex) => (
        <div key={formIndex} className="section-container">
          <div className="close-btn" onClick={() => handleCloseSection(formIndex + quizForms.length + videoForms.length)}>X</div>
          <h2 className="section-title">Add Unit-Test</h2>
          <input
            type="text"
            placeholder="Sub-Unit Name"
            value={unitForm.name}
            onChange={(event) => handleUnitChange(formIndex, event)}
            className="form-input"
          />
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
        </div>
      ))}
    </div>
  );
};

export default UnifiedComponent;
