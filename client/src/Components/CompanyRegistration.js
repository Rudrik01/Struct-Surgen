import React, { useState } from 'react';
import axios from 'axios';
import './companyreg.css';

const CompanyRegistration = () => {
  const [companyName, setCompanyName] = useState('');
  const [address, setAddress] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [contactEmail, setContactEmail] = useState('');

  const handleRegisterCompany = (event) => {
    event.preventDefault();

    const token = localStorage.getItem('token'); // Retrieve the token from localStorage

    axios.post('http://localhost:5000/api/new/company/register', {
      companyName,
      address,
      contactPerson,
      contactEmail
    }, {
      headers: { Authorization: `Bearer ${token}` }, // Include token in request headers
    })
    .then((response) => {
      console.log('Company registered:', response.data);
      alert('Company registered successfully');
      // Clear form fields after successful registration
      setCompanyName('');
      setAddress('');
      setContactPerson('');
      setContactEmail('');
    })
    .catch((error) => {
      console.error('Error registering company:', error);
      alert('Failed to register the company. Please try again.');
    });
  };

  return (
    <div className="company-registration-container">
      <div className="company-registration-logo">
        <img src="/logo.png" alt="Logo" />
      </div>
      <div className="company-registration-header">
        <h2>Register a Company</h2>
        <p>Fill out the form below to register a new company.</p>
      </div>
      <form onSubmit={handleRegisterCompany} className="company-registration-form">
        <input 
          value={companyName} 
          onChange={(e) => setCompanyName(e.target.value)} 
          placeholder="Company Name" 
          required 
        />
        <input 
          value={address} 
          onChange={(e) => setAddress(e.target.value)} 
          placeholder="Address" 
        />
        <input 
          value={contactPerson} 
          onChange={(e) => setContactPerson(e.target.value)} 
          placeholder="Contact Person" 
        />
        <input 
          value={contactEmail} 
          onChange={(e) => setContactEmail(e.target.value)} 
          placeholder="Contact Email" 
        />
        <button type="submit">Register Company</button>
      </form>
    </div>
  );
};

export default CompanyRegistration;
