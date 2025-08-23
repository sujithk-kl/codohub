import React from 'react';
import { Link } from 'react-router-dom';

const Errorpage = () => {
  return (
    <div className="container" style={{ paddingTop: '100px', paddingBottom: '100px' }}>
      <div className="text-center">
        <div className="card" style={{ maxWidth: '500px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '72px', color: '#667eea', margin: '0' }}>404</h1>
          <h2 style={{ margin: '20px 0' }}>Page Not Found</h2>
          <p style={{ color: '#e0e0e0', marginBottom: '30px' }}>
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link to="/" className="btn btn-primary">
            Go Back Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Errorpage;
