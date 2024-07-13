import React, { useState } from 'react';
import AddSection from './AddSection';

const AddUnitTest = () => {
  const [unit, setUnit] = useState('');
  const [questions, setQuestions] = useState([
    { question: '', options: ['', '', '', ''], solution: '' },
  ]);

  const units = [
    'Unit 1', 'Unit 2', 'Unit 3', 'Unit 4', 'Unit 5', 
    'Unit 6', 'Unit 7', 'Unit 8', 'Unit 9', 'Unit 10', 
    'Unit 11', 'Unit 12'
  ];

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
    newQuestions[qIndex].options[oIndex] = event.target.value;
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
      { question: '', options: ['', '', '', ''], solution: '' },
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
        setUnit('');
        setQuestions([{ question: '', options: ['', '', '', ''], solution: '' }]);
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

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: "end",
      justifyContent: 'center',
      width: "70%",
      height: '80%',
      backgroundColor: '#f5f5f5',
      padding: '20px',
      boxSizing: 'border-box',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: '#fff',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      width: '60%',
    },
    select: {
      padding: '10px',
      margin: '10px 0',
      border: '1px solid #ccc',
      borderRadius: '4px',
      width: '100%',
    },
    input: {
      padding: '10px',
      margin: '10px 0',
      border: '1px solid #ccc',
      borderRadius: '4px',
      width: '100%',
    },
    textarea: {
      padding: '10px',
      margin: '10px 0',
      border: '1px solid #ccc',
      borderRadius: '4px',
      width: '100%',
      minHeight: '60px',
    },
    button: {
      padding: '10px 20px',
      backgroundColor: '#007BFF',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
      margin: '10px 0',
      width: "30%",
    },
    buttonHover: {
      backgroundColor: '#0056b3',
    },
    title: {
      marginBottom: '20px',
      color: '#333',
      alignItems: "center",
    },
    divider: {
      width: '100%',
      height: '1px',
      backgroundColor: '#ccc',
      margin: '20px 0',
    },
    questionContainer: {
      width: '100%',
    },
    optionContainer: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
    },
  };

  return (
    <div>
        <AddSection/>
    <div style={styles.container}>
      <h1 style={styles.title}>Add Unit Test </h1>
      <form style={styles.form} onSubmit={handleSubmit}>
        <select
          value={unit}
          onChange={handleUnitChange}
          style={styles.select}
        >
          <option value="" disabled>Select Unit</option>
          {units.map((unit, index) => (
            <option key={index} value={unit}>{unit}</option>
          ))}
        </select>
        {questions.map((q, qIndex) => (
          <div key={qIndex} style={styles.questionContainer}>
            <div style={styles.divider}></div>
            <textarea
              placeholder={`Question ${qIndex + 1}`}
              value={q.question}
              onChange={(event) => handleQuestionChange(qIndex, event)}
              style={styles.textarea}
            />
            <div style={styles.optionContainer}>
              {q.options.map((option, oIndex) => (
                <input
                  key={oIndex}
                  type="text"
                  placeholder={`Option ${oIndex + 1}`}
                  value={option}
                  onChange={(event) => handleOptionChange(qIndex, oIndex, event)}
                  style={styles.input}
                />
              ))}
            </div>
            <input
              type="text"
              placeholder="Solution"
              value={q.solution}
              onChange={(event) => handleSolutionChange(qIndex, event)}
              style={styles.input}
            />
          </div>
        ))}
        <button
          type="button"
          onClick={addQuestion}
          style={styles.button}
          onMouseEnter={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
          onMouseLeave={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
        >
          Add Question
        </button>
        <button
          type="submit"
          style={styles.button}
          onMouseEnter={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
          onMouseLeave={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
        >
          Submit
        </button>
      </form>
    </div>
    </div>
  );
};

export default AddUnitTest;