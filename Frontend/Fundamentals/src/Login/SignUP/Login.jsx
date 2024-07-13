import React, { useState ,useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Logo from '../../assets/plainlogo.png';
import { UserContext } from '../../redux/user-context';
import "./Login.css"

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { userData, setUserData } = useContext(UserContext);
  const navigate = useNavigate();

  const handleStudentLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/v1/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password, asTeacher: false })
      });
      const data = await response.json();
      console.log('Login successful', data);
      if (data.message === "User logged successfully") {
        setUserData({ state: data.state, username: data.username });
        navigate('/class11');
      } else {
        alert("Access denied");
      }
    } catch (error) {
      console.error('There was an error logging in!', error);
      alert('There was an error logging in. Please try again.');
    }
  };

const handleTeacherLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/v1/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password, asTeacher: true })
      });
      const data = await response.json();
      console.log('Login successful', data);
      if (data.message === "User logged successfully") {
        setUserData({ state: data.state, username: data.username });
        navigate('/teacher');
      } else {
        alert(data.error);
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
        <form>
          <div>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className='btn-ctn'>
            <button onClick={handleStudentLogin}>Login as Student</button>
            <button onClick={handleTeacherLogin}>Login as Teacher</button>
          </div>
        </form>
        {/* <p>
          Don't have an account? <a href="/signup">Sign Up</a>
        </p> */}
      </div>
    </div>
  );
}

export default Login;
