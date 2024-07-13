import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./Signup.css";
import Logo from '../../assets/plainlogo.png';

function Signup() {
  const[username,setUsername]= useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [asTeacher,setasTeacher]=useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setasTeacher(false);
    try {
      const response = await axios.post('http://localhost:3000/api/v1/signin', {username,email,password,asTeacher});
      console.log('Login successful', response.data);
      if (response.data.message === "User registered successfully") {
        alert('Student user created')
      } else {
        alert(response.error);
      }
    } catch (error) {
      console.error('There was an error logging in!', error);
      alert('There was an error logging in. Please try again.');
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setasTeacher(true);
    try {
      const response = await axios.post('http://localhost:3000/api/v1/signin', {username,email,password,asTeacher});
      console.log('Login successful', response.data);
      if (response.data.message === "User registered successfully") {
        alert('Teacher user created')
      } else {
        alert(response.error);
      }
    } catch (error) {
      console.error('There was an error logging in!', error);
      alert('There was an error logging in. Please try again.');
    }
  };
  return (
    <div className="log-body">
      <div className="auth-container">
        <img className="logo" src={Logo} alt="Logo" />
        <form onSubmit={handleSubmit}>
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
            <button type="submit">Create Student Account</button>
            <button onClick={handleClick}>Create Teacher Account</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;