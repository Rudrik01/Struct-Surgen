import React, { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './AdminHome.css';

const AdminHome = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  useEffect(() => {
    const clearLocalStorage = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
    };

    // Clear local storage when the component unmounts
    return () => {
      clearLocalStorage();
    };
  }, []);

  useEffect(() => {
    const handleLocationChange = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
    };

    // Listen for location changes
    return () => {
      // Unsubscribe from location changes when the component unmounts
      handleLocationChange();
    };
  }, [location]);

  return (
    <div className="admin-dashboard">
      <nav className="navbar">
        <h1 className="navbar-title">Admin Dashboard</h1>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </nav>
      <div className="admin-dashboard-inner">
        <div className="welcome-text">
          <h2>Welcome, Admin!</h2>
          <p>Manage tasks, view statistics, and handle employee registrations with ease.</p>
        </div>
        <div className="cards-container">
          <Link to="/AdminDashboard" className="dashboard-card animate">
            <img src="/path/to/image1.jpg" alt="Task Statistics" className="card-image" />
            <div className="card-content">
              <h2>View Task Statistics</h2>
            </div>
          </Link>
          <Link to="/taskall" className="dashboard-card animate">
            <img src="/path/to/image2.jpg" alt="Assign Tasks" className="card-image" />
            <div className="card-content">
              <h2>Assign Tasks</h2>
            </div>
          </Link>
          <Link to="/register" className="dashboard-card animate">
            <img src="/path/to/image3.jpg" alt="Register Employee" className="card-image" />
            <div className="card-content">
              <h2>Register Employee</h2>
            </div>
          </Link>
          <Link to="/ChangePassword" className="dashboard-card animate">
            <img src="/path/to/image4.jpg" alt="Change Password" className="card-image" />
            <div className="card-content">
              <h2>Change Password</h2>
            </div>
          </Link>
          <Link to="/company" className="dashboard-card animate">
            <img src="/path/to/image5.jpg" alt="Register Company" className="card-image" />
            <div className="card-content">
              <h2>Register Company</h2>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
