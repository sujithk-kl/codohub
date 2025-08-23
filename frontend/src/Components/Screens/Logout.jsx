import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      try {
        await axios.get('/api/auth/logout', { withCredentials: true });
        toast.success('Logged out successfully');
      } catch (error) {
        console.error('Logout error:', error);
        toast.error('Logout failed');
      } finally {
        navigate('/');
      }
    };

    performLogout();
  }, [navigate]);

  return (
    <div className="container" style={{ paddingTop: '100px', paddingBottom: '100px' }}>
      <div className="text-center">
        <div className="card" style={{ maxWidth: '400px', margin: '0 auto' }}>
          <h2>Logging out...</h2>
          <p style={{ color: '#e0e0e0' }}>Please wait while we log you out.</p>
        </div>
      </div>
    </div>
  );
};

export default Logout;
