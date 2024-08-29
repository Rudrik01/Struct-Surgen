import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './EmployeeProfile.css';

const EmployeeProfile = () => {
    const [profile, setProfile] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const employeeId = localStorage.getItem('employeeId');
                const response = await axios.get(`http://localhost:5000/api/employee/profile/${employeeId}`);
                setProfile(response.data);
            } catch (error) {
                console.error('Error fetching profile', error);
            }
        };

        fetchProfile();
    }, []);

    if (!profile) return <p className="loading-spinner">Loading...</p>;

    return (
        <div className="profile-page">
            <nav className="profile-nav">
                <button onClick={() => navigate('/dashboard')} className="back-button">Back to Dashboard</button>
                <button onClick={() => navigate('/change-password')} className="change-password-button">Change Password</button>
            </nav>
            <div className="profile-card">
                <img src="/logo.png" alt="Company Logo" className="company-logo" />
                <div className="profile-header">
                    <img src="/avtar.jpg" alt="Avatar" className="profile-avatar" />
                    <h2 className="profile-name">{profile.name}</h2>
                </div>
                <div className="profile-details">
                    <p><strong>Employee ID:</strong> {profile.employeeId}</p>
                    <p><strong>Email:</strong> {profile.email}</p>
                    <p><strong>Role:</strong> {profile.role}</p>
                </div>
            </div>
        </div>
    );
};

export default EmployeeProfile;
