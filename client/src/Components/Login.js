import "./Login.css";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/auth/login', { employeeId, password });
      const { token, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('role', user.role);
      localStorage.setItem('employeeId', employeeId);

      if (user.role === 'admin') {
        navigate('/AdminHome');
      } else {
        navigate(`/dashboard`);
      }
    } catch (error) {
      console.error('Error during login:', error);
      if (error.response) {
        setLoginError(error.response.data.message || 'Invalid credentials. Please try again.');
      } else {
        setLoginError('Something went wrong. Please try again later.');
      }
    }
  };

  return (
    <div className="-container">
      <div className="main-container">
        <img src="/logo.png" alt="Logo" className="logo" />
        <div className="login-form">
          <h2 className="title">Login</h2>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label className="label">Employee ID:</label>
              <input
                type="text"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                required
                className="input"
                placeholder="Enter Employee ID"
                autoComplete="off"
              />
            </div>
            <div className="form-group">
              <label className="label">Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="input"
                placeholder="Enter Password"
                autoComplete="off"
              />
            </div>
            {loginError && <div className="error-message">{loginError}</div>}
            <button type="submit" className="button">
              Login
            </button>
            <div className="forgot-password">
              <a href="http://localhost:3000/ChangePassword">
                Forgot Password? Reset it here.
              </a>
            </div>
          </form>
        </div>
      </div>
      <img className="footer-icon" alt="" src="/vectors.svg" />
    </div>
  );
};

export default Login;
