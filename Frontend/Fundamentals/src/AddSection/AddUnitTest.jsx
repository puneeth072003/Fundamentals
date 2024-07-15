import React, { useState, useEffect } from 'react';
import './AddSection.css';
import AddSection from './AddSection';

const AddUnitTest = () => {
  const [unit, setUnit] = useState('');
  const [questions, setQuestions] = useState([
    { question: '', options: ['', '', '', ''], correctOption: '', solution: '' },
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
        setUnits(data.units); // Assuming the response has a 'units' array
      } else {
        console.error('Failed to fetch units');
        // Handle error scenario
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle error scenario
    }
  };

  const handleUnitChange = (event) => {
    setUnit(event.target.value);
  };

  const handleQuestionChange = (index, event) => {
    const newQuestions = [...questions];
    newQuestions[index].question = event.target.value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (qIndex, oIndex, event) => {
    const newQuestions = [...questions];
    if (oIndex < 4) {
      newQuestions[qIndex].options[oIndex] = event.target.value;
    } else {
      newQuestions[qIndex].correctOption = event.target.value;
    }
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newQuiz = {
      unit,
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

        // Log the filled form data in JSON format
        console.log('Filled Form Data:', JSON.stringify(newQuiz, null, 2));

        setUnit('');
        setQuestions([{ question: '', options: ['', '', '', ''], correctOption: '', solution: '' }]);
        // Optionally, you can add success feedback or redirect to another page
      } else {
        console.error('Failed to add quiz');
        // Handle error scenario
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle error scenario
    }
  };

  return (
    <div className='modhak'>
      <AddSection />
      <div className="main-container">
        <div className="unit-test-container">
          <h1 className="unit-test-title">Add Unit Test</h1>
          <form className="unit-test-form" onSubmit={handleSubmit}>
            <select
              value={unit}
              onChange={handleUnitChange}
              className="unit-test-select"
            >
              <option value="" disabled>Select Unit</option>
              {units.map((unit, index) => (
                <option key={index} value={unit}>{unit}</option>
              ))}
            </select>
            {questions.map((q, qIndex) => (
              <div key={qIndex} className="unit-test-question-container">
                <div className="unit-test-divider"></div>
                <textarea
                  placeholder={`Question ${qIndex + 1}`}
                  value={q.question}
                  onChange={(event) => handleQuestionChange(qIndex, event)}
                  className="unit-test-textarea"
                />
                <div className="unit-test-option-container">
                  {q.options.map((option, oIndex) => (
                    <input
                      key={oIndex}
                      type="text"
                      placeholder={`Option ${oIndex + 1}`}
                      value={option}
                      onChange={(event) => handleOptionChange(qIndex, oIndex, event)}
                      className="unit-test-input"
                    />
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="Correct Option"
                  value={q.correctOption}
                  onChange={(event) => handleOptionChange(qIndex, 4, event)} // Index 4 for the correct option
                  className="unit-test-input"
                />
                <input
                  type="text"
                  placeholder="Solution"
                  value={q.solution}
                  onChange={(event) => handleSolutionChange(qIndex, event)}
                  className="unit-test-input"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={addQuestion}
              className="unit-test-button"
            >
              Add Question
            </button>
            <button
              type="submit"
              className="unit-test-button"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddUnitTest;