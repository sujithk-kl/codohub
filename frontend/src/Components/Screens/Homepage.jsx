import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LandingPage from '../HomepageScreen/LandingPage.jsx';
import CodingPage from '../HomepageScreen/CodingPage.jsx';
import './Homepage.css';

const Homepage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await axios.get('/api/auth/profile', { withCredentials: true });
      if (response.data.user) {
        setIsAuthenticated(true);
        setUser(response.data.user);
      }
    } catch (error) {
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="homepage">
      {isAuthenticated ? <CodingPage user={user} /> : <LandingPage />}
    </div>
  );
};

export default Homepage;
