import React from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';

const Login = () => {
    const navigate = useNavigate();

    return (
        <div className="flex justify-center items-center min-h-screen bg-blue-100">
            <div className="flex flex-col w-full p-8 bg-indigo-700 text-white max-w-xl rounded-lg">
                <h1 className="text-3xl font-bold mb-10 text-center">
                    Selamat Datang di <span className="text-yellow-400">Sistem Rekomendasi Dosen Pembimbing dan Tugas Akhir</span>
                </h1>
                <div className="flex flex-row items-center">
                    <div className="flex-1">
                        <img
                            src={assets.ipb_icon}
                            alt="Description"
                            className="w-full h-auto rounded-lg"
                        />
                    </div>
                    <div className="flex-1 ml-4">
                        <div className="flex flex-col space-y-4">
                            <strong>Silahkan Login Sebagai:</strong>
                            <button
                                onClick={() => navigate('/Mahasiswa')}
                                className="bg-blue-100 text-indigo-700 py-2 px-4 rounded-lg font-semibold hover:bg-yellow-400 transition duration-300"
                            >
                                Mahasiswa
                            </button>
                            <button
                                onClick={() => navigate('/dosen')}
                                className="bg-blue-100 text-indigo-700 py-2 px-4 rounded-lg font-semibold hover:bg-yellow-400 transition duration-300"
                            >
                                Dosen
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;