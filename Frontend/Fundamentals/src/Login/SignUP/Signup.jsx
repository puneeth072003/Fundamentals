import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Signup.css";
import Logo from '../../assets/plainlogo.png';

function Signup() {
  const[username,setUsername]= useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [asTeacher,setasTeacher]=useState(true);

  const handleStudentClick = async (e) => {
    e.preventDefault();
    setasTeacher(false);
    try {
      const response = await fetch('http://localhost:3000/api/v1/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password, asTeacher })
      });
      const data = await response.json();
      console.log('Login successful', data);
      if (data.message === "Student registered successfully") {
        alert(data.message);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('There was an error registering!', error);
      alert('There was an error registering. Please try again.');
    }
  };
  
  const handleTeacherClick = async (e) => {
    e.preventDefault();
    setasTeacher(true);
    try {
      const response = await fetch('http://localhost:3000/api/v1/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password, asTeacher })
      });
      const data = await response.json();
      console.log('Login successful', data);
      if (data.message === "Teacher registered successfully") {
        alert(data.message);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('There was an error registering!', error);
      alert('There was an error registering. Please try again.');
    }
  };
  
  return (
    <div className="log-body">
      <div className="auth-container">
        <img className="logo" src={Logo} alt="Logo" />
        <form>
        <div>
            <input type="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div>
            <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          </div>
          <div className='btn-ctn'>
            <button onClick={handleStudentClick}>Create Student Account</button>
            <button onClick={handleTeacherClick}>Create Teacher Account</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;