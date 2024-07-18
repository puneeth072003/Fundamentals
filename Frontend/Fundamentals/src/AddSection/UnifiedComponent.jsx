import React, { useState, useEffect } from 'react';
import './AddSection.css';
import Logo from "../assets/plainlogo.png";

const UnifiedComponent = () => {
  const [classOptions] = useState([11, 12]);
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
      setSubjectOptions(['physics', 'chemistry', 'maths', 'biology']);
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
    } else if (sectionIndex === quizForms.length + videoForms.length) {
      setUnitForm(null);

      setFinalForm((prevForms) => {
        const updatedForms = [...prevForms];
        updatedForms.splice(sectionIndex, 1);
        return updatedForms;
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const finalFormData = {
      newUnit: {
        title1: title1,
        title2: title2,
        class: Number(selectedClass),
        subject: selectedSubject,
        subunits: []
      }
    };

    quizForms.forEach((quizForm) => {
      finalFormData.newUnit.subunits.push({
        type: 'quiz',
        quiz: {
          name: quizForm.name,
          questions: quizForm.questions.map((question) => ({
            question: question.question,
            options: question.options,
            correctOption: question.correctOption,
            solution: question.solution
          }))
        }
      });
    });

    videoForms.forEach((videoForm) => {
      finalFormData.newUnit.subunits.push({
        type: 'video',
        video: {
          name: videoForm.name,
          videoUrl: videoForm.videoUrl
        }
      });
    });

    if (unitForm) {
      finalFormData.newUnit.subunits.push({
        type: 'unitTest',
        unitTest: {
          name: unitForm.name,
          questions: unitForm.questions.map((question) => ({
            question: question.question,
            options: question.options,
            correctOption: question.correctOption,
            solution: question.solution
          }))
        }
      });
    }

    console.log(JSON.stringify(finalFormData, null, 2));

    try {
      const response = await fetch('http://localhost:3000/api/v1/createunit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(finalFormData),
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

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="add-section-form">
      <img src={Logo} alt="Logo" className="navbar-logo" />
      <h2 className="title">Add Section</h2>
        <div className="form-group">
          <label htmlFor="classSelect">Class</label>
          <select id="classSelect" value={selectedClass} onChange={handleClassChange} required>
            <option value="">Select a class</option>
            {classOptions.map((classOption) => (
              <option key={classOption} value={classOption}>{classOption}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="subjectSelect">Subject</label>
          <select id="subjectSelect" value={selectedSubject} onChange={handleSubjectChange} required>
            <option value="">Select a subject</option>
            {subjectOptions.map((subjectOption) => (
              <option key={subjectOption} value={subjectOption}>{subjectOption}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="title1">Title 1</label>
          <input type="text" id="title1" value={title1} onChange={handleTitle1Change} required />
        </div>
        <div className="form-group">
          <label htmlFor="title2">Title 2</label>
          <input type="text" id="title2" value={title2} onChange={handleTitle2Change} required />
        </div>
        {quizForms.map((quizForm, formIndex) => (
          <div key={formIndex} className="quiz-form">
            <h3>Quiz Form {formIndex + 1}</h3>
            <button type="button" className="close-button" onClick={() => handleCloseSection(formIndex)}>X</button>
            <div className="form-group">
              <label htmlFor={`quizName${formIndex}`}>Quiz Name</label>
              <input type="text" id={`quizName${formIndex}`} value={quizForm.name} onChange={(event) => handleQuizChange(formIndex, event)} required />
            </div>
            {quizForm.questions.map((question, questionIndex) => (
              <div key={questionIndex} className="question-form">
                <div className="form-group">
                  <label htmlFor={`question${formIndex}-${questionIndex}`}>Question</label>
                  <input type="text" id={`question${formIndex}-${questionIndex}`} value={question.question} onChange={(event) => handleQuestionChange(formIndex, questionIndex, event)} required />
                </div>
                {question.options.map((option, optionIndex) => (
                  <div key={optionIndex} className="form-group">
                    <label htmlFor={`option${formIndex}-${questionIndex}-${optionIndex}`}>Option {optionIndex + 1}</label>
                    <input type="text" id={`option${formIndex}-${questionIndex}-${optionIndex}`} value={option} onChange={(event) => handleOptionChange(formIndex, questionIndex, optionIndex, event)} required />
                  </div>
                ))}
                <div className="form-group">
                  <label htmlFor={`correctOption${formIndex}-${questionIndex}`}>Correct Option</label>
                  <input type="text" id={`correctOption${formIndex}-${questionIndex}`} value={question.correctOption} onChange={(event) => handleCorrectOptionChange(formIndex, questionIndex, event)} required />
                </div>
                <div className="form-group">
                  <label htmlFor={`solution${formIndex}-${questionIndex}`}>Solution</label>
                  <input type="text" id={`solution${formIndex}-${questionIndex}`} value={question.solution} onChange={(event) => handleSolutionChange(formIndex, questionIndex, event)} required />
                </div>
              </div>
            ))}
            <button type="button" className="add-question-button" onClick={() => addQuestionToQuizForm(formIndex)}>Add Question</button>
          </div>
        ))}
        {videoForms.map((videoForm, formIndex) => (
          <div key={formIndex} className="video-form">
            <h3>Video Form {formIndex + 1}</h3>
            <button type="button" className="close-button" onClick={() => handleCloseSection(formIndex + quizForms.length)}>X</button>
            <div className="form-group">
              <label htmlFor={`videoName${formIndex}`}>Video Name</label>
              <input type="text" id={`videoName${formIndex}`} value={videoForm.name} onChange={(event) => handleVideoChange(formIndex, event)} required />
            </div>
            <div className="form-group">
              <label htmlFor={`videoURL${formIndex}`}>Video URL</label>
              <input type="text" id={`videoURL${formIndex}`} value={videoForm.videoUrl} onChange={(event) => handleVideoURLChange(formIndex, event)} required />
            </div>
          </div>
        ))}
        {unitForm && (
          <div className="unit-form">
            <h3>Unit Test</h3>
            <button type="button" className="close-button" onClick={() => handleCloseSection(quizForms.length + videoForms.length)}>X</button>
            <div className="form-group">
              <label htmlFor="unitTestName">Unit Test Name</label>
              <input type="text" id="unitTestName" value={unitForm.name} onChange={handleUnitChange} required />
            </div>
            {unitForm.questions.map((question, questionIndex) => (
              <div key={questionIndex} className="question-form">
                <div className="form-group">
                  <label htmlFor={`unitQuestion${questionIndex}`}>Question</label>
                  <input type="text" id={`unitQuestion${questionIndex}`} value={question.question} onChange={(event) => handleUnitQuestionChange(questionIndex, event)} required />
                </div>
                {question.options.map((option, optionIndex) => (
                  <div key={optionIndex} className="form-group">
                    <label htmlFor={`unitOption${questionIndex}-${optionIndex}`}>Option {optionIndex + 1}</label>
                    <input type="text" id={`unitOption${questionIndex}-${optionIndex}`} value={option} onChange={(event) => handleUnitOptionChange(questionIndex, optionIndex, event)} required />
                  </div>
                ))}
                <div className="form-group">
                  <label htmlFor={`unitCorrectOption${questionIndex}`}>Correct Option</label>
                  <input type="text" id={`unitCorrectOption${questionIndex}`} value={question.correctOption} onChange={(event) => handleUnitCorrectOptionChange(questionIndex, event)} required />
                </div>
                <div className="form-group">
                  <label htmlFor={`unitSolution${questionIndex}`}>Solution</label>
                  <input type="text" id={`unitSolution${questionIndex}`} value={question.solution} onChange={(event) => handleUnitSolutionChange(questionIndex, event)} required />
                </div>
              </div>
            ))}
            <button type="button" className="add-question-button" onClick={addQuestionToUnitForm}>Add Question</button>
          </div>
        )}
        <div className="form-group">
          <button type="button" className="add-quiz-button" onClick={addQuizForm}>Add Quiz Form</button>
          <button type="button" className="add-video-button" onClick={addVideoForm}>Add Video Form</button>
          {!unitForm && <button type="button" className="add-unit-button" onClick={addUnitForm}>Add Unit Test</button>}
        </div>
        <div className="form-group">
          <button type="submit" className="submit-button">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default UnifiedComponent;
