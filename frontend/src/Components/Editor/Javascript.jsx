import React, { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import toast from 'react-hot-toast';
import './Editor.css';

const Javascript = () => {
  const [code, setCode] = useState(`// Welcome to JavaScript Editor
console.log("Hello, World!");

// Try some JavaScript code here
for (let i = 0; i < 5; i++) {
    console.log(\`Number: \${i}\`);
}

// Calculate fibonacci
function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(\`Fibonacci of 10: \${fibonacci(10)}\`);

// Array operations
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
console.log("Doubled numbers:", doubled);`);

  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const handleRun = () => {
    setOutput('');
    setError('');

    try {
      // Capture console.log output
      const originalLog = console.log;
      const logs = [];
      
      console.log = (...args) => {
        logs.push(args.map(arg => 
          typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
        ).join(' '));
        originalLog.apply(console, args);
      };

      // Execute the code
      const result = eval(code);
      
      // Restore console.log
      console.log = originalLog;

      // Display output
      if (logs.length > 0) {
        setOutput(logs.join('\n'));
      } else if (result !== undefined) {
        setOutput(String(result));
      } else {
        setOutput('Code executed successfully (no output)');
      }
    } catch (err) {
      setError(err.message);
      toast.error('JavaScript execution error');
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
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'javascript_code.js';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Code downloaded!');
  };

  return (
    <div className="editor-container">
      <div className="editor-header">
        <h2>⚡ JavaScript Editor</h2>
        <div className="editor-controls">
          <button className="btn btn-primary" onClick={handleRun}>
            ▶ Run
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
            extensions={[javascript()]}
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
          <h3>Output</h3>
          <div className="output-content">
            {output && (
              <div className="output-success">
                <pre>{output}</pre>
              </div>
            )}
            {error && (
              <div className="output-error">
                <pre>{error}</pre>
              </div>
            )}
            {!output && !error && (
              <div className="output-placeholder">
                Run your JavaScript code to see the output here...
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Javascript;
