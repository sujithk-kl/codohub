import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-content">
              <h1 className="hero-title">
                Code faster with <span className="gradient-text">CodeHub</span>
              </h1>
              <p className="hero-subtitle">
                A powerful online code studio for JavaScript, Python, and HTML/CSS —
                with real‑time preview, voice & image to text utilities, and a delightful UI.
              </p>
              <div className="hero-buttons">
                <Link to="/register" className="btn btn-primary btn-large" aria-label="Create your free CodeHub account">
                  Get Started Free
                </Link>
                <Link to="/login" className="btn btn-secondary btn-large" aria-label="Sign in to CodeHub">
                  Sign In
                </Link>
              </div>
              <div className="hero-stats" aria-hidden="true">
                <div className="stat"><span>3+</span> languages</div>
                <div className="stat"><span>Live</span> preview</div>
                <div className="stat"><span>OCR</span> & Voice</div>
              </div>
            </div>
            <div className="hero-preview" role="img" aria-label="Code preview panel">
              <div className="preview-window">
                <div className="preview-window-header">
                  <span className="dot" />
                  <span className="dot" />
                  <span className="dot" />
                </div>
                <pre className="preview-code">
{`function greet(name) {
  const time = new Date().toLocaleTimeString();
  return 'Hello, ' + name + '!\\nIt\\'s ' + time + '. Happy coding with CodeHub.';
}

console.log(greet('Developer'));`}
                </pre>
              </div>
            </div>
          </div>
          <div className="trusted-by">
            <span>Trusted by developers using</span>
            <div className="logo-row" aria-hidden="true">
              <span className="logo-badge">React</span>
              <span className="logo-badge">Vite</span>
              <span className="logo-badge">Node</span>
              <span className="logo-badge">MongoDB</span>
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
