import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Logo from '../../assets/plainlogo.png';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/v1/login', {
        email,
        password,
      });

      // Assuming the response contains a status or message field to indicate success
      console.log('Login successful', response.data);

      if (response.data.message === "User logged successfully") {
        navigate('/teacher');
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error('There was an error logging in!', error);
      alert('There was an error logging in. Please try again.');
    }
  };

  return (
    <div className="log-body">
      <div className="auth-container">
        {/* <h2>Login</h2> */}
        <img className="logo" src={Logo} alt="Logo" />
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account? <a href="/signup">Sign Up</a>
        </p>
      </div>
    </div>
  );
}

export default Login;