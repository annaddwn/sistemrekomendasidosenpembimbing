import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Mahasiswa from './components/Mahasiswa';
import Dosen from './components/Dosen';

const App = () => {
    return (
        <Router basename="/sistemrekomendasidosen">
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/mahasiswa" element={<Mahasiswa />} />
                <Route path="/dosen" element={<Dosen />} />
            </Routes>
        </Router>
    );
};

export default App;