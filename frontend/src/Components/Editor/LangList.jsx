import React from 'react';
import './LangList.css';

const LangList = ({ selectedLanguage, onLanguageChange }) => {
  const languages = [
    {
      id: 'python',
      name: 'Python',
      icon: '🐍',
      description: 'Python programming language'
    },
    {
      id: 'javascript',
      name: 'JavaScript',
      icon: '⚡',
      description: 'JavaScript programming language'
    },
    {
      id: 'html',
      name: 'HTML/CSS',
      icon: '🌐',
      description: 'HTML and CSS with live preview'
    },
    {
      id: 'voice2text',
      name: 'Voice to Text',
      icon: '🎤',
      description: 'Convert voice to code'
    },
    {
      id: 'image2text',
      name: 'Image to Text',
      icon: '📷',
      description: 'Extract text from images'
    }
  ];

  return (
    <div className="lang-list">
      <h3 className="lang-list-title">Choose Language</h3>
      <div className="lang-options">
        {languages.map((lang) => (
          <button
            key={lang.id}
            className={`lang-option ${selectedLanguage === lang.id ? 'active' : ''}`}
            onClick={() => onLanguageChange(lang.id)}
          >
            <div className="lang-icon">{lang.icon}</div>
            <div className="lang-info">
              <div className="lang-name">{lang.name}</div>
              <div className="lang-description">{lang.description}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LangList;
