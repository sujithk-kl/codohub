import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from './Header.jsx';
import Homepage from './Screens/Homepage.jsx';
import Login from './Screens/Login.jsx';
import Register from './Screens/Register.jsx';
import Errorpage from './Screens/Errorpage.jsx';
import Logout from './Screens/Logout.jsx';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Homepage key="homepage" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<Errorpage />} />
        </Routes>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#1a1a2e',
              color: '#ffffff',
              border: '1px solid #16213e',
            },
          }}
        />
      </div>
    </Router>
  );
}

export default App;
