import React, { useEffect, useRef, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import './Editor.css';

// Lightweight SQL playground using sql.js (SQLite compiled to WebAssembly)
// We load it from a CDN so no new npm deps are required.

const defaultSql = `-- Welcome to the in-browser SQL editor (SQLite)
-- Define a table
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY,
  name TEXT,
  role TEXT
);

-- Seed data
INSERT INTO users (name, role) VALUES ('Ada', 'admin');
INSERT INTO users (name, role) VALUES ('Linus', 'maintainer');
INSERT INTO users (name, role) VALUES ('Grace', 'researcher');

-- Query
SELECT id, name, role FROM users ORDER BY id;`;

const Sql = () => {
  const [sqlCode, setSqlCode] = useState(defaultSql);
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const dbRef = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const loadViaScriptTag = () => new Promise((resolve, reject) => {
      if (window.initSqlJs) {
        resolve(window.initSqlJs);
        return;
      }
      const existing = document.querySelector('script[data-sqljs]');
      if (existing) {
        existing.addEventListener('load', () => resolve(window.initSqlJs));
        existing.addEventListener('error', () => reject(new Error('Network error loading sql.js')));
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/sql.js@1.10.2/dist/sql-wasm.js';
      script.async = true;
      script.defer = true;
      script.setAttribute('data-sqljs', 'true');
      script.onload = () => resolve(window.initSqlJs);
      script.onerror = () => reject(new Error('Network error loading sql.js'));
      document.head.appendChild(script);
    });

    const load = async () => {
      try {
        const initSqlJs = await loadViaScriptTag();
        const SQL = await initSqlJs({
          locateFile: (file) => `https://cdn.jsdelivr.net/npm/sql.js@1.10.2/dist/${file}`,
        });
        if (!cancelled) {
          dbRef.current = new SQL.Database();
        }
      } catch (err) {
        if (!cancelled) setError('Failed to load SQL engine: ' + err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const toMarkdownTable = (columns, values) => {
    if (!columns || columns.length === 0) return 'OK';
    const header = `| ${columns.join(' | ')} |`;
    const sep = `| ${columns.map(() => '---').join(' | ')} |`;
    const rows = values.map((row) => `| ${row.join(' | ')} |`);
    return [header, sep, ...rows].join('\n');
  };

  const handleRun = () => {
    setOutput('');
    setError('');
    if (!dbRef.current) {
      setError('SQL engine not ready yet.');
      return;
    }
    try {
      const results = dbRef.current.exec(sqlCode); // executes multiple statements
      if (!results || results.length === 0) {
        setOutput('OK');
        return;
      }
      // Show only the last result set for simplicity
      const last = results[results.length - 1];
      setOutput(toMarkdownTable(last.columns, last.values));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleClear = () => {
    setSqlCode('');
    setOutput('');
    setError('');
  };

  return (
    <div className="editor-container">
      <div className="editor-header">
        <h2>🗄️ SQL (SQLite) Editor</h2>
        <div className="editor-controls">
          <button className="btn btn-primary" onClick={handleRun} disabled={loading}>
            ▶ Run
          </button>
          <button className="btn btn-secondary" onClick={handleClear}>
            🗑️ Clear
          </button>
        </div>
      </div>

      <div className="editor-content">
        <div className="code-editor">
          <CodeMirror
            value={sqlCode}
            height="320px"
            onChange={(value) => setSqlCode(value)}
            theme="dark"
            options={{
              lineNumbers: true,
              lineWrapping: true,
            }}
          />
        </div>

        <div className="output-panel">
          <h3>Result</h3>
          <div className="output-content">
            {loading && <div className="loading">Loading SQL engine…</div>}
            {!loading && error && <pre className="output-error">{error}</pre>}
            {!loading && !error && output && <pre className="output-success">{output}</pre>}
            {!loading && !error && !output && (
              <div className="output-placeholder">Run a query to see results.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sql;


