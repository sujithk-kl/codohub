import React, { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { html } from '@codemirror/lang-html';
import { javascript } from '@codemirror/lang-javascript';
import toast from 'react-hot-toast';
import './Editor.css';

const Html = () => {
  const [htmlCode, setHtmlCode] = useState(`<div class="container">
  <h1>Hello from HTML</h1>
  <p>Edit HTML, CSS and JavaScript, then click Preview.</p>
</div>`);
  const [cssCode, setCssCode] = useState(`body { font-family: Arial, sans-serif; margin: 0; padding: 24px; }
.container { max-width: 800px; margin: 0 auto; text-align: center; }
h1 { color: #667eea; }
button { padding: 8px 12px; border-radius: 6px; }`);
  const [jsCode, setJsCode] = useState(`console.log('Hello from JavaScript');`);

  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const sanitizeHtml = (html) => {
    // Safely remove relative <script src> tags using DOM parsing
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const scripts = Array.from(doc.querySelectorAll('script[src]'));
      scripts.forEach((s) => {
        const src = s.getAttribute('src') || '';
        const isAbsolute = /^(https?:)?\/\//i.test(src);
        if (!isAbsolute) {
          s.remove();
        }
      });
      return doc.body ? doc.body.innerHTML : html;
    } catch (_) {
      return html;
    }
  };

  const buildDocument = () => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Preview</title>
  <style>${cssCode}\n</style>
</head>
<body>
${sanitizeHtml(htmlCode)}
<script>(function(){\n${jsCode}\n})();<\/script>
</body>
</html>`;
  };

  const handleRun = () => {
    setOutput('');
    setError('');

    try {
      // Update the embedded iframe preview in the same page
      const previewFrame = document.getElementById('preview-frame');
      if (previewFrame) {
        const doc = previewFrame.contentDocument || previewFrame.contentWindow.document;
        doc.open();
        doc.write(buildDocument());
        doc.close();
      }
    } catch (err) {
      setError(err.message);
      toast.error('HTML preview error');
    }
  };

  const handleClear = () => {
    setHtmlCode('');
    setCssCode('');
    setJsCode('');
    setOutput('');
    setError('');
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(buildDocument());
      toast.success('Code copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy code');
    }
  };

  const handleDownload = () => {
    const blob = new Blob([buildDocument()], { type: 'text/html' });
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
        <h2>🌐 HTML/CSS/JS Editor</h2>
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
          <h4 style={{margin: '8px 0'}}>HTML</h4>
          <CodeMirror
            value={htmlCode}
            height="200px"
            extensions={[html()]}
            onChange={(value) => setHtmlCode(value)}
            theme="dark"
            options={{
              lineNumbers: true,
              lineWrapping: true,
            }}
          />
          <h4 style={{margin: '16px 0 8px'}}>CSS</h4>
          <CodeMirror
            value={cssCode}
            height="160px"
            onChange={(value) => setCssCode(value)}
            theme="dark"
            options={{
              lineNumbers: true,
              lineWrapping: true,
            }}
          />
          <h4 style={{margin: '16px 0 8px'}}>JavaScript</h4>
          <CodeMirror
            value={jsCode}
            height="160px"
            extensions={[javascript()]}
            onChange={(value) => setJsCode(value)}
            theme="dark"
            options={{
              lineNumbers: true,
              lineWrapping: true,
            }}
          />
        </div>

        <div className="output-panel">
          <h3>Live Preview</h3>
          <div className="output-content" style={{ padding: 0, height: '100%' }}>
            <iframe
              id="preview-frame"
              srcDoc={buildDocument()}
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
                background: 'white'
              }}
              title="HTML Preview"
              sandbox="allow-scripts allow-forms"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Html;
