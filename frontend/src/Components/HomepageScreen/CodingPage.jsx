import React, { useState } from 'react';
import LangList from '../Editor/LangList.jsx';
import Python from '../Editor/Python.jsx';
import Javascript from '../Editor/Javascript.jsx';
import Html from '../Editor/Html.jsx';
import Sql from '../Editor/Sql.jsx';
import Voice2Text from '../Editor/Voice2Text.jsx';
import Image2Text from '../Editor/Image2Text.jsx';
import './CodingPage.css';

const CodingPage = ({ user }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('python');

  const renderEditor = () => {
    switch (selectedLanguage) {
      case 'python':
        return <Python />;
      case 'javascript':
        return <Javascript />;
      case 'html':
        return <Html />;
      case 'sql':
        return <Sql />;
      case 'voice2text':
        return <Voice2Text />;
      case 'image2text':
        return <Image2Text />;
      default:
        return <Python />;
    }
  };

  return (
    <div className="coding-page">
      <div className="coding-header">
        <div className="container">
          <div className="coding-header-content">
            <h1>Welcome back, {user?.username}!</h1>
            <p>Choose your preferred language and start coding</p>
          </div>
        </div>
      </div>

      <div className="coding-main">
        <div className="container">
          <div className="coding-layout">
            <div className="language-sidebar">
              <LangList 
                selectedLanguage={selectedLanguage} 
                onLanguageChange={setSelectedLanguage} 
              />
            </div>
            <div className="editor-main">
              {renderEditor()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodingPage;
