import React, { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import axios from 'axios';
import toast from 'react-hot-toast';
import './Editor.css';

const Python = () => {
  const [code, setCode] = useState(`# Welcome to Python Editor
print("Hello, World!")

# Try some Python code here
for i in range(5):
    print(f"Number: {i}")

# Calculate fibonacci
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

print(f"Fibonacci of 10: {fibonacci(10)}")`);

  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRun = async () => {
    setLoading(true);
    setOutput('');
    setError('');

    try {
      const response = await axios.post('/api/execute/python/execute', { code }, {
        withCredentials: true
      });

      if (response.data.success) {
        setOutput(response.data.output);
      } else {
        setError(response.data.error);
      }
    } catch (err) {
      const message = err.response?.data?.error || 'Execution failed';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
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
    a.download = 'python_code.py';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Code downloaded!');
  };

  return (
    <div className="editor-container">
      <div className="editor-header">
        <h2>🐍 Python Editor</h2>
        <div className="editor-controls">
          <button 
            className="btn btn-primary" 
            onClick={handleRun}
            disabled={loading}
          >
            {loading ? 'Running...' : '▶ Run'}
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
            extensions={[python()]}
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
            {loading && <div className="loading">Running code...</div>}
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
            {!loading && !output && !error && (
              <div className="output-placeholder">
                Run your Python code to see the output here...
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Python;
