import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Logo from '../../assets/plainlogo.png';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setasTeacher(false)
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/v1/login', {email,password,asTeacher:false});
      console.log('Login successful', response.data);
      if (response.data.message === "User logged successfully") {
        localStorage.setItem("state",response.data.state);
        localStorage.setItem("username",response.data.username);
        navigate('/class11');
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error('There was an error logging in!', error);
      alert('There was an error logging in. Please try again.');
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/v1/login', {email,password,asTeacher:true});
      console.log('Login successful', response.data);
      if (response.data.message === "User logged successfully") {
        localStorage.setItem("state",response.data.state);
        localStorage.setItem("username",response.data.username);
        navigate('/teacher');
      } else {
        alert("Access denied");
      }
    } catch (error) {
      console.error('There was an error logging in!', error);
      alert('There was an error logging in. Please try again.');
    }
  }

  return (
    <div className="log-body">
      <div className="auth-container">
        <img className="logo" src={Logo} alt="Logo" />
        <form onSubmit={handleSubmit}>
          <div>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className='btn-ctn'>
            <button type="submit">Login as student</button>
            <button onClick={handleClick}>Login as a Teacher</button>
          </div>
        </form>
        <p>
          Don't have an account? <a href="/signup">Sign Up</a>
        </p>
      </div>
    </div>
  );
}

export default Login;