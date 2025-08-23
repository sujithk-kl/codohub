import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import './Voice2Text.css';

const Voice2Text = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [convertedText, setConvertedText] = useState('');
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    // Check if browser supports speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = 'en-US';

      recognitionInstance.onstart = () => {
        setIsListening(true);
        toast.success('Voice recognition started!');
      };

      recognitionInstance.onresult = (event) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        setTranscript(finalTranscript + interimTranscript);
      };

      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        toast.error(`Speech recognition error: ${event.error}`);
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
        toast.info('Voice recognition stopped');
      };

      setRecognition(recognitionInstance);
    } else {
      toast.error('Speech recognition is not supported in this browser');
    }
  }, []);

  const startListening = () => {
    if (recognition) {
      recognition.start();
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
    }
  };

  const convertToCode = () => {
    let converted = transcript;
    
    // Symbol mapping for programming
    const symbolMap = {
      'semicolon': ';',
      'colon': ':',
      'equals': '=',
      'plus': '+',
      'minus': '-',
      'asterisk': '*',
      'slash': '/',
      'backslash': '\\',
      'period': '.',
      'comma': ',',
      'question mark': '?',
      'exclamation mark': '!',
      'at symbol': '@',
      'hash': '#',
      'dollar sign': '$',
      'percent': '%',
      'caret': '^',
      'ampersand': '&',
      'pipe': '|',
      'tilde': '~',
      'underscore': '_',
      'hyphen': '-',
      'open parenthesis': '(',
      'close parenthesis': ')',
      'open bracket': '[',
      'close bracket': ']',
      'open brace': '{',
      'close brace': '}',
      'less than': '<',
      'greater than': '>',
      'quote': '"',
      'single quote': "'",
      'backtick': '`',
      'new line': '\n',
      'tab': '\t',
      'space': ' ',
      'double space': '  ',
      'triple space': '   ',
      'function': 'function',
      'if': 'if',
      'else': 'else',
      'for': 'for',
      'while': 'while',
      'return': 'return',
      'const': 'const',
      'let': 'let',
      'var': 'var',
      'console dot log': 'console.log',
      'document dot': 'document.',
      'window dot': 'window.',
      'true': 'true',
      'false': 'false',
      'null': 'null',
      'undefined': 'undefined'
    };

    // Apply symbol mapping
    Object.entries(symbolMap).forEach(([spoken, symbol]) => {
      const regex = new RegExp(`\\b${spoken}\\b`, 'gi');
      converted = converted.replace(regex, symbol);
    });

    setConvertedText(converted);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(convertedText || transcript);
      toast.success('Text copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy text');
    }
  };

  const clearAll = () => {
    setTranscript('');
    setConvertedText('');
  };

  return (
    <div className="voice2text-container">
      <div className="voice2text-header">
        <h2>🎤 Voice to Text Converter</h2>
        <div className="voice-controls">
          <button
            className={`btn ${isListening ? 'btn-danger' : 'btn-primary'}`}
            onClick={isListening ? stopListening : startListening}
            disabled={!recognition}
          >
            {isListening ? '⏹️ Stop' : '🎤 Start'}
          </button>
          <button className="btn btn-secondary" onClick={convertToCode}>
            🔄 Convert
          </button>
          <button className="btn btn-secondary" onClick={copyToClipboard}>
            📋 Copy
          </button>
          <button className="btn btn-secondary" onClick={clearAll}>
            🗑️ Clear
          </button>
        </div>
      </div>

      <div className="voice2text-content">
        <div className="voice-panel">
          <h3>Voice Input</h3>
          <div className="voice-status">
            {isListening && <div className="listening-indicator">🎤 Listening...</div>}
          </div>
          <textarea
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            placeholder="Your voice input will appear here..."
            className="voice-textarea"
            rows="10"
          />
        </div>

        <div className="voice-panel">
          <h3>Converted Code</h3>
          <div className="conversion-info">
            <p>Symbols like "semicolon", "equals", "open parenthesis" will be automatically converted.</p>
          </div>
          <textarea
            value={convertedText}
            onChange={(e) => setConvertedText(e.target.value)}
            placeholder="Converted code will appear here..."
            className="voice-textarea"
            rows="10"
          />
        </div>
      </div>

      <div className="voice-help">
        <h3>Voice Commands Guide</h3>
        <div className="help-grid">
          <div className="help-section">
            <h4>Symbols</h4>
            <ul>
              <li>"semicolon" → ;</li>
              <li>"equals" → =</li>
              <li>"open parenthesis" → (</li>
              <li>"close parenthesis" → )</li>
              <li>"open brace" → {'{'}</li>
              <li>"close brace" → {'}'}</li>
            </ul>
          </div>
          <div className="help-section">
            <h4>Keywords</h4>
            <ul>
              <li>"function" → function</li>
              <li>"if" → if</li>
              <li>"else" → else</li>
              <li>"for" → for</li>
              <li>"while" → while</li>
              <li>"return" → return</li>
            </ul>
          </div>
          <div className="help-section">
            <h4>Common Phrases</h4>
            <ul>
              <li>"console dot log" → console.log</li>
              <li>"document dot" → document.</li>
              <li>"new line" → \n</li>
              <li>"tab" → \t</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Voice2Text;
