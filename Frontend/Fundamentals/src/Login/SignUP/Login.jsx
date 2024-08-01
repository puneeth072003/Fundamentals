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
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

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
      if (data.message === "User logged in successfully") {
        setUserData({ state: data.state, username: data.username });
        navigate('/student');
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert(error.message);
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
      if (data.message === "User logged in successfully") {
        setUserData({ state: data.state, username: data.username });
        navigate('/teacher');
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="log-body">
      <div className="auth-container">
        <img className="logo" src={Logo} alt="Logo" />
        <form>
          <div>
            <input type="email" className="log-email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="pass-container">
            <input
              type={showPassword ? 'text' : 'password'}
              className="log-pass"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="show-pass-button"
              onClick={toggleShowPassword} 
            >
              {showPassword ? <i className="fas fa-eye-slash"></i> : <i className="fas fa-eye"></i>}
            </button>
          </div>
          <div className='lg-btn-ctn'>
            <button className='lg-btn' onClick={handleStudentLogin}>Login as Student</button>
            <button className='lg-btn' onClick={handleTeacherLogin}>Login as Teacher</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
