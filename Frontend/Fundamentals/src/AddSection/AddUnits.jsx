import React, { useState } from 'react';
import AddSection from './AddSection';
import './AddSection.css'; // Import the CSS file
import Logo from "../assets/plainlogo.png";

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
            placeholder="Unit name"
            value={unitName}
            onChange={handleInputChange}
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