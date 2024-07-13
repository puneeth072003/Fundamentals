import React, { useState } from 'react';

const AddVideo = () => {
  const [unit, setUnit] = useState('');
  const [subunit, setSubunit] = useState('');
  const [videoUrl, setVideoUrl] = useState('');

  const units = [
    'Unit 1', 'Unit 2', 'Unit 3', 'Unit 4', 'Unit 5', 
    'Unit 6', 'Unit 7', 'Unit 8', 'Unit 9', 'Unit 10', 
    'Unit 11', 'Unit 12'
  ];

  const handleUnitChange = (event) => {
    setUnit(event.target.value);
  };

  const handleSubunitChange = (event) => {
    setSubunit(event.target.value);
  };

  const handleVideoUrlChange = (event) => {
    setVideoUrl(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newVideo = {
      unit,
      subunit,
      videoUrl,
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
        setUnit('');
        setSubunit('');
        setVideoUrl(''); // Clear the input fields after successful submission
      } else {
        console.error('Failed to add video');
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
      width: '300px',
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
    divider: {
      width: '100%',
      height: '1px',
      backgroundColor: '#ccc',
      margin: '20px 0',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Add Video</h1>
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
        <div style={styles.divider}></div>
        <input
          type="text"
          placeholder="Subunit name"
          value={subunit}
          onChange={handleSubunitChange}
          style={styles.input}
        />
        <div style={styles.divider}></div>
        <input
          type="text"
          placeholder="Video URL"
          value={videoUrl}
          onChange={handleVideoUrlChange}
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
  );
};

export default AddVideo;