import React, { useState, useEffect } from 'react';
import './AddSection.css'; 
import AddSection from './AddSection';

const AddQuizComp = () => {
  const [unit, setUnit] = useState('');
  const [subunit, setSubunit] = useState('');
  const [questions, setQuestions] = useState([
    { question: '', options: ['', '', '', ''], solution: '' },
  ]);
  const [units, setUnits] = useState([]);

  useEffect(() => {
    // Fetch units from backend when component mounts
    fetchUnits();
  }, []);

  const fetchUnits = async () => {
    try {
      const response = await fetch('YOUR_BACKEND_URL/units');
      if (response.ok) {
        const data = await response.json();
        setUnits(data.units); // Assuming backend returns an object with units array
      } else {
        console.error('Failed to fetch units');
      }
    } catch (error) {
      console.error('Error fetching units:', error);
    }
  };

  const handleUnitChange = (event) => {
    setUnit(event.target.value);
  };

  const handleSubunitChange = (event) => {
    setSubunit(event.target.value);
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

  const handleSolutionChange = (index, event) => {
    const newQuestions = [...questions];
    newQuestions[index].solution = event.target.value;
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, { question: '', options: ['', '', '', ''], solution: '' }]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newQuiz = {
      unit,
      subunit,
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
        setUnit('');
        setSubunit('');
        setQuestions([{ question: '', options: ['', '', '', ''], solution: '' }]); // Clear the form after successful submission
        fetchUnits(); // Refresh units list after adding new quiz
      } else {
        console.error('Failed to add quiz');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='modhak'>
      <AddSection />
    <div className="quiz-container">
      <h1 className="quiz-title">Add Quiz</h1>
      <form className="quiz-form" onSubmit={handleSubmit}>
        <select
          className="quiz-select"
          value={unit}
          onChange={handleUnitChange}
        >
          <option value="" disabled>Select Unit</option>
          {units.map((unit, index) => (
            <option key={index} value={unit}>{unit}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Subunit name"
          value={subunit}
          onChange={handleSubunitChange}
          className="quiz-input"
        />
        {questions.map((q, qIndex) => (
          <div key={qIndex} className="quiz-question-container">
            <div className="quiz-divider"></div>
            <textarea
              placeholder="Question"
              value={q.question}
              onChange={(event) => handleQuestionChange(qIndex, event)}
              className="quiz-textarea"
            />
            <div className="quiz-option-container">
              {q.options.map((option, oIndex) => (
                <input
                  key={oIndex}
                  type="text"
                  placeholder={`Option ${oIndex + 1}`}
                  value={option}
                  onChange={(event) => handleOptionChange(qIndex, oIndex, event)}
                  className="quiz-input"
                />
              ))}
            </div>
            <input
              type="text"
              placeholder="Solution"
              value={q.solution}
              onChange={(event) => handleSolutionChange(qIndex, event)}
              className="quiz-input"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={addQuestion}
          className="quiz-button"
        >
          Add Question
        </button>
        <button
          type="submit"
          className="quiz-button"
        >
          Submit
        </button>
      </form>
    </div>
    </div>
  );
};

export default AddQuizComp;