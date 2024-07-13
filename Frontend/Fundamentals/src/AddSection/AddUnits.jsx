import React, { useState } from 'react';
import AddSection from './AddSection';

const AddUnits = () => {
  const [unitName, setUnitName] = useState('');

  const handleInputChange = (event) => {
    setUnitName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newUnit = {
      name: unitName,
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
        setUnitName(''); // Clear the input field after successful submission
      } else {
        console.error('Failed to add unit');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
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
    },
    input: {
      padding: '10px',
      margin: '10px 0',
      border: '1px solid #ccc',
      borderRadius: '4px',
      width: '200px',
    },
    button: {
      padding: '10px 20px',
      backgroundColor: '#007BFF',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    },
    buttonHover: {
      backgroundColor: '#0056b3',
    },
    title: {
      marginBottom: '20px',
      color: '#333',
    },
  };

  return (
    <div>
      <AddSection/>
      <div style={styles.container}>
        <h1 style={styles.title}>Add Unit</h1>
        <form style={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Unit name"
            value={unitName}
            onChange={handleInputChange}
            style={styles.input}
          />
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

export default AddUnits;