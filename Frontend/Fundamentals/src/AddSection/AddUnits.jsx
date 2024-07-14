import React, { useState } from 'react';
import AddSection from './AddSection';
import './AddSection.css'; // Import the CSS file
import Logo from "../assets/plainlogo.png";

const AddUnits = () => {
  const [title1, setTitle1] = useState('');
  const [title2, setTitle2] = useState('');

  const handleTitle1Change = (event) => {
    setTitle1(event.target.value);
  };

  const handleTitle2Change = (event) => {
    setTitle2(event.target.value);
  };

  const handleSubmit = async (event) => {
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

  return (
    <div className='modhak'>
      <AddSection />
      <div className="unit-container">
        <h1 className="unit-title">Add Unit</h1>
        <form className="unit-form" onSubmit={handleSubmit}>
          <img src={Logo} alt="Logo" className="unit-logo" />
          <div className='unit-cont'>
            <input
              type="text"
              placeholder="Title 1"
              value={title1}
              onChange={handleTitle1Change}
              className="unit-input"
            />
            <input
              type="text"
              placeholder="Title 2"
              value={title2}
              onChange={handleTitle2Change}
              className="unit-input"
            />
            <button
              type="submit"
              className="unit-button"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUnits;