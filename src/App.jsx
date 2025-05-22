import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Mahasiswa from './pages/Mahasiswa';
import Dosen from './pages/Dosen';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/Mahasiswa" element={<Mahasiswa />} />
      <Route path="/Dosen" element={<Dosen />} />
    </Routes>
  );
}

export default App;
