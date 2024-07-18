import React, { useState, useEffect } from 'react';
import './AddSection.css';
import Logo from "../assets/plainlogo.png";

const UnifiedComponent = () => {
  const [classOptions] = useState(['Class 11', 'Class 12']);
  const [subjectOptions, setSubjectOptions] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [title1, setTitle1] = useState('');
  const [title2, setTitle2] = useState('');
  const [quizForms, setQuizForms] = useState([]);
  const [videoForms, setVideoForms] = useState([]);
  const [unitForm, setUnitForm] = useState(null);
  const [finalForm, setFinalForm] = useState([]);

  useEffect(() => {
    if (selectedClass) {
      setSubjectOptions(['Physics', 'Chemistry', 'Maths', 'Biology']);
    }
  }, [selectedClass]);

  const handleClassChange = (event) => {
    setSelectedClass(event.target.value);
    setSelectedSubject(''); // Reset subject when class changes
  };

  const handleSubjectChange = (event) => {
    setSelectedSubject(event.target.value);
  };

  const handleTitle1Change = (event) => {
    setTitle1(event.target.value);
  };

  const handleTitle2Change = (event) => {
    setTitle2(event.target.value);
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
    if (!unitForm) {
      const newUnitForm = { name: '', questions: [{ question: '', options: ['', '', '', ''], correctOption: '', solution: '' }] };
      setUnitForm(newUnitForm);
      setFinalForm([...finalForm, { type: 'unitTest', unitTest: newUnitForm }]);
    }
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

  const handleUnitChange = (event) => {
    const newUnitForm = { ...unitForm, name: event.target.value };
    setUnitForm(newUnitForm);

    const newFinalForm = [...finalForm];
    newFinalForm[quizForms.length + videoForms.length].unitTest.name = event.target.value;
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

  const handleUnitQuestionChange = (questionIndex, event) => {
    const newUnitForm = { ...unitForm };
    newUnitForm.questions[questionIndex].question = event.target.value;
    setUnitForm(newUnitForm);

    const newFinalForm = [...finalForm];
    newFinalForm[quizForms.length + videoForms.length].unitTest.questions[questionIndex].question = event.target.value;
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

  const handleUnitOptionChange = (questionIndex, optionIndex, event) => {
    const newUnitForm = { ...unitForm };
    newUnitForm.questions[questionIndex].options[optionIndex] = event.target.value;
    setUnitForm(newUnitForm);

    const newFinalForm = [...finalForm];
    newFinalForm[quizForms.length + videoForms.length].unitTest.questions[questionIndex].options[optionIndex] = event.target.value;
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

  const handleUnitCorrectOptionChange = (questionIndex, event) => {
    const newUnitForm = { ...unitForm };
    newUnitForm.questions[questionIndex].correctOption = event.target.value;
    setUnitForm(newUnitForm);

    const newFinalForm = [...finalForm];
    newFinalForm[quizForms.length + videoForms.length].unitTest.questions[questionIndex].correctOption = event.target.value;
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

  const handleUnitSolutionChange = (questionIndex, event) => {
    const newUnitForm = { ...unitForm };
    newUnitForm.questions[questionIndex].solution = event.target.value;
    setUnitForm(newUnitForm);

    const newFinalForm = [...finalForm];
    newFinalForm[quizForms.length + videoForms.length].unitTest.questions[questionIndex].solution = event.target.value;
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

  const addQuestionToUnitForm = () => {
    const newUnitForm = { ...unitForm };
    newUnitForm.questions.push({ question: '', options: ['', '', '', ''], correctOption: '', solution: '' });
    setUnitForm(newUnitForm);

    const newFinalForm = [...finalForm];
    newFinalForm[quizForms.length + videoForms.length].unitTest.questions.push({ question: '', options: ['', '', '', ''], correctOption: '', solution: '' });
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
    } else {
      setUnitForm(null);

      setFinalForm((prevForms) => {
        const updatedForms = [...prevForms];
        updatedForms.splice(sectionIndex, 1);
        return updatedForms;
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Process and send the finalForm data to the backend
    console.log(finalForm);
  };

  return (
    <div className="main-content">
      <img className="logo" src={Logo} alt="Logo" />
      <h1>Add Unit, Quiz, Video, and Unit Test</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Select Class:</label>
          <select value={selectedClass} onChange={handleClassChange}>
            <option value="">Select Class</option>
            {classOptions.map((classOption, index) => (
              <option key={index} value={classOption}>
                {classOption}
              </option>
            ))}
          </select>
        </div>
        {selectedClass && (
          <div className="form-group">
            <label>Select Subject:</label>
            <select value={selectedSubject} onChange={handleSubjectChange}>
              <option value="">Select Subject</option>
              {subjectOptions.map((subjectOption, index) => (
                <option key={index} value={subjectOption}>
                  {subjectOption}
                </option>
              ))}
            </select>
          </div>
        )}
        <div className="form-group">
          <label>Title 1:</label>
          <input type="text" value={title1} onChange={handleTitle1Change} />
        </div>
        <div className="form-group">
          <label>Title 2:</label>
          <input type="text" value={title2} onChange={handleTitle2Change} />
        </div>
        {quizForms.map((quizForm, formIndex) => (
          <div key={formIndex} className="quiz-form">
            <div className="form-header">
              <h2>Quiz Form {formIndex + 1}</h2>
              <button type="button" onClick={() => handleCloseSection(formIndex)}>X</button>
            </div>
            <div className="form-group">
              <label>Quiz Name:</label>
              <input type="text" value={quizForm.name} onChange={(event) => handleQuizChange(formIndex, event)} />
            </div>
            {quizForm.questions.map((question, questionIndex) => (
              <div key={questionIndex} className="question-form">
                <div className="form-group">
                  <label>Question {questionIndex + 1}:</label>
                  <input type="text" value={question.question} onChange={(event) => handleQuestionChange(formIndex, questionIndex, event)} />
                </div>
                {question.options.map((option, optionIndex) => (
                  <div key={optionIndex} className="form-group">
                    <label>Option {optionIndex + 1}:</label>
                    <input type="text" value={option} onChange={(event) => handleOptionChange(formIndex, questionIndex, optionIndex, event)} />
                  </div>
                ))}
                <div className="form-group">
                  <label>Correct Option:</label>
                  <input type="text" value={question.correctOption} onChange={(event) => handleCorrectOptionChange(formIndex, questionIndex, event)} />
                </div>
                <div className="form-group">
                  <label>Solution:</label>
                  <input type="text" value={question.solution} onChange={(event) => handleSolutionChange(formIndex, questionIndex, event)} />
                </div>
              </div>
            ))}
            <button type="button" onClick={() => addQuestionToQuizForm(formIndex)}>Add Question</button>
          </div>
        ))}
        {videoForms.map((videoForm, formIndex) => (
          <div key={formIndex} className="video-form">
            <div className="form-header">
              <h2>Video Form {formIndex + 1}</h2>
              <button type="button" onClick={() => handleCloseSection(formIndex + quizForms.length)}>X</button>
            </div>
            <div className="form-group">
              <label>Video Name:</label>
              <input type="text" value={videoForm.name} onChange={(event) => handleVideoChange(formIndex, event)} />
            </div>
            <div className="form-group">
              <label>Video URL:</label>
              <input type="text" value={videoForm.videoUrl} onChange={(event) => handleVideoURLChange(formIndex, event)} />
            </div>
          </div>
        ))}
        {unitForm && (
          <div className="unit-form">
            <div className="form-header">
              <h2>Unit Test Form</h2>
              <button type="button" onClick={() => handleCloseSection(quizForms.length + videoForms.length)}>X</button>
            </div>
            <div className="form-group">
              <label>Unit Test Name:</label>
              <input type="text" value={unitForm.name} onChange={handleUnitChange} />
            </div>
            {unitForm.questions.map((question, questionIndex) => (
              <div key={questionIndex} className="question-form">
                <div className="form-group">
                  <label>Question {questionIndex + 1}:</label>
                  <input type="text" value={question.question} onChange={(event) => handleUnitQuestionChange(questionIndex, event)} />
                </div>
                {question.options.map((option, optionIndex) => (
                  <div key={optionIndex} className="form-group">
                    <label>Option {optionIndex + 1}:</label>
                    <input type="text" value={option} onChange={(event) => handleUnitOptionChange(questionIndex, optionIndex, event)} />
                  </div>
                ))}
                <div className="form-group">
                  <label>Correct Option:</label>
                  <input type="text" value={question.correctOption} onChange={(event) => handleUnitCorrectOptionChange(questionIndex, event)} />
                </div>
                <div className="form-group">
                  <label>Solution:</label>
                  <input type="text" value={question.solution} onChange={(event) => handleUnitSolutionChange(questionIndex, event)} />
                </div>
              </div>
            ))}
            <button type="button" onClick={addQuestionToUnitForm}>Add Question</button>
          </div>
        )}
        <button type="button" onClick={addQuizForm}>Add Quiz</button>
        <button type="button" onClick={addVideoForm}>Add Video</button>
        <button type="button" onClick={addUnitForm}>Add Unit Test</button>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UnifiedComponent;
