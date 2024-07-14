import React, { useState, useEffect } from 'react';
import './AddSection.css'; // Import the CSS file
import AddSection from './AddSection';

const AddVideo = () => {
  const [unit, setUnit] = useState('');
  const [subunit, setSubunit] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [units, setUnits] = useState([]);

  useEffect(() => {
    const fetchUnits = async () => {
      try {
        const response = await fetch('YOUR_BACKEND_URL/units');
        if (response.ok) {
          const data = await response.json();
          setUnits(data);
        } else {
          console.error('Failed to fetch units');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchUnits();
  }, []);

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

  return (
    <div className='modhak'>
      <AddSection />
    <div className="add-vid-container">
      <h1 className="add-vid-title">Add Video</h1>
      <form className="add-vid-form" onSubmit={handleSubmit}>
        <select
          value={unit}
          onChange={handleUnitChange}
          className="add-vid-select"
        >
          <option value="" disabled>Select Unit</option>
          {units.map((unit, index) => (
            <option key={index} value={unit}>{unit}</option>
          ))}
        </select>
        <div className="add-vid-divider"></div>
        <input
          type="text"
          placeholder="Subunit name"
          value={subunit}
          onChange={handleSubunitChange}
          className="add-vid-input"
        />
        <div className="add-vid-divider"></div>
        <input
          type="text"
          placeholder="Video URL"
          value={videoUrl}
          onChange={handleVideoUrlChange}
          className="add-vid-input"
        />
        <button
          type="submit"
          className="add-vid-button"
        >
          Submit
        </button>
      </form>
    </div>
    </div>
  );
};

export default AddVideo;