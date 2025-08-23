import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Welcome to <span className="gradient-text">CodeHub</span>
            </h1>
            <p className="hero-subtitle">
              The ultimate online code editor with multi-language support, 
              voice-to-text conversion, and real-time collaboration features.
            </p>
            <div className="hero-buttons">
              <Link to="/register" className="btn btn-primary btn-large">
                Get Started
              </Link>
              <Link to="/login" className="btn btn-secondary btn-large">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2 className="section-title">Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">💻</div>
              <h3>Multi-Language Editor</h3>
              <p>Support for JavaScript, Python, HTML/CSS with syntax highlighting and real-time execution.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎤</div>
              <h3>Voice-to-Text</h3>
              <p>Convert your voice to code with intelligent symbol mapping and real-time speech recognition.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📷</div>
              <h3>Image-to-Text (OCR)</h3>
              <p>Extract text from images using advanced OCR technology with confidence scoring.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Real-time Preview</h3>
              <p>See your HTML/CSS changes instantly with live preview and split-view editing.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Secure Authentication</h3>
              <p>Safe and secure user authentication with JWT tokens and encrypted passwords.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📁</div>
              <h3>File Management</h3>
              <p>Download your code files and share them easily with copy-to-clipboard functionality.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Start Coding?</h2>
            <p>Join thousands of developers who trust CodeHub for their coding needs.</p>
            <Link to="/register" className="btn btn-primary btn-large">
              Create Free Account
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
