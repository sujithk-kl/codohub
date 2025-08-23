import React, { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { html } from '@codemirror/lang-html';
import toast from 'react-hot-toast';
import './Editor.css';

const Html = () => {
  const [code, setCode] = useState(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Web Page</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            text-align: center;
        }
        h1 {
            font-size: 3rem;
            margin-bottom: 20px;
        }
        p {
            font-size: 1.2rem;
            line-height: 1.6;
        }
        .button {
            display: inline-block;
            padding: 12px 24px;
            background: rgba(255, 255, 255, 0.2);
            color: white;
            text-decoration: none;
            border-radius: 5px;
            margin: 10px;
            transition: all 0.3s ease;
        }
        .button:hover {
            background: rgba(255, 255, 255, 0.3);
            transform: translateY(-2px);
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Welcome to CodeHub!</h1>
        <p>This is a live HTML preview. Edit the code on the left to see changes instantly.</p>
        <p>You can add any HTML, CSS, and JavaScript here.</p>
        <a href="#" class="button">Get Started</a>
        <a href="#" class="button">Learn More</a>
    </div>
</body>
</html>`);

  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const handleRun = () => {
    setOutput('');
    setError('');

    try {
      // Create a safe preview by using a sandboxed iframe
      const previewFrame = document.getElementById('preview-frame');
      if (previewFrame) {
        const doc = previewFrame.contentDocument || previewFrame.contentWindow.document;
        doc.open();
        doc.write(code);
        doc.close();
      }
    } catch (err) {
      setError(err.message);
      toast.error('HTML preview error');
    }
  };

  const handleClear = () => {
    setCode('');
    setOutput('');
    setError('');
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      toast.success('Code copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy code');
    }
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'webpage.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('HTML file downloaded!');
  };

  return (
    <div className="editor-container">
      <div className="editor-header">
        <h2>🌐 HTML/CSS Editor</h2>
        <div className="editor-controls">
          <button className="btn btn-primary" onClick={handleRun}>
            ▶ Preview
          </button>
          <button className="btn btn-secondary" onClick={handleClear}>
            🗑️ Clear
          </button>
          <button className="btn btn-secondary" onClick={handleCopy}>
            📋 Copy
          </button>
          <button className="btn btn-secondary" onClick={handleDownload}>
            💾 Download
          </button>
        </div>
      </div>

      <div className="editor-content">
        <div className="code-editor">
          <CodeMirror
            value={code}
            height="400px"
            extensions={[html()]}
            onChange={(value) => setCode(value)}
            theme="dark"
            options={{
              lineNumbers: true,
              foldGutter: true,
              gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
              lineWrapping: true,
            }}
          />
        </div>

        <div className="output-panel">
          <h3>Live Preview</h3>
          <div className="output-content" style={{ padding: 0, height: '100%' }}>
            <iframe
              id="preview-frame"
              srcDoc={code}
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
                background: 'white'
              }}
              title="HTML Preview"
              sandbox="allow-scripts allow-same-origin"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Html;
