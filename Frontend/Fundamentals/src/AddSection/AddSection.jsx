import React from 'react';
import { Link } from 'react-router-dom';
import './AddSection.css'; // Create and import a CSS file for styling

const AddSection = () => {
  return (
    // <div className='main-container'>
    <div className="add-sidebar">
      <h2>Sections</h2>
      <ul>
        <li>
          <Link to="/add-units">Add Units</Link>
        </li>
        <li>
          <Link to="/add-video-subunit">Add Video Sub-unit</Link>
        </li>
        <li>
          <Link to="/add-quiz-subunit">Add Quiz Sub-Unit</Link>
        </li>
        <li>
          <Link to="/add-unit-test">Add Unit Test</Link>
        </li>
      </ul>
    </div>
    // </div>
  );
};

export default AddSection;