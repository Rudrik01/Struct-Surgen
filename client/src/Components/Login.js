import "./Login.css";
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form submission
    try {
      const response = await axios.post('http://localhost:5000/auth/login', {
        employeeId,
        password,
      });

      console.log('Response Data:', response.data); // Log response data to the console
      setLoggedIn(true);
      setLoginError('');

      // Optionally, redirect to another page upon successful login
      // navigate('/dashboard');

    } catch (error) {
      console.error('Error during login:', error);

      if (error.response) {
        console.error('Error response data:', error.response.data);
        setLoginError(error.response.data.message || 'Invalid credentials. Please try again.');
      } else {
        setLoginError('Something went wrong. Please try again later.');
      }

      setLoggedIn(false);
    }
  };

  return (
    <div className="login">
      <section className="login-inner">
        <div className="frame-parent">
          <div className="whatsapp-image-2024-03-05-at-3-wrapper">
            <img
              className="whatsapp-image-2024-03-05-at-3-icon"
              loading="lazy"
              alt=""
              src="/logo.png"
            />
          </div>
          <form className="rectangle-parent" onSubmit={handleLogin}>
            <div className="frame-child" />
            <div className="login-button-area">
              <h1 className="login1">Login</h1>
            </div>
            <div className="input-labels">
              <div className="employee-id">Employee ID</div>
              <input
                className="input-fields"
                type="text"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                required
              />
            </div>
            <div className="input-labels1">
              <div className="password">Password</div>
              <input
                className="input-fields"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="password-reset">
              <div className="reset-area">
                <div className="reset-link-area">
                  <button className="reset-button-area" type="submit">
                    <div className="login2">Login</div>
                  </button>
                </div>
                {loginError && <div className="error-message">{loginError}</div>}
                {loggedIn && <div className="success-message">Login successful!</div>}
                <div className="forgot-password-reset">
                  <a href="http://localhost:3000/ChangePassword">Forgot Password? Reset it here.</a>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
      <img className="vectors-icon" alt="" src="/vectors.svg" />
    </div>
  );
};

export default Login;
