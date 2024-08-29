import React, { useEffect, useState } from 'react';
// import React from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const ProtectedRoute = ({ element: Component, roles, ...rest }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          await axios.get('http://localhost:5000/auth/verifyToken', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Token verification failed:', error);
          setIsAuthenticated(false);
          localStorage.removeItem('token');
          localStorage.removeItem('role');
        }
      } else {
        setIsAuthenticated(false);
      }
      setLoading(false);
    };
    verifyToken();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Render the passed component as a JSX element
  return <Component {...rest} />;
};

export default ProtectedRoute;
