import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthPage from './components/AuthPage';
import ProfilePage from './components/ProfilePage'; 


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/home" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;
