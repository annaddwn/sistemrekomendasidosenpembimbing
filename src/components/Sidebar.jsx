import React from 'react';
import {assets} from '../assets/assets'

const Sidebar = () => {
    return (
        <div className="flex flex-col w-full p-8 bg-indigo-700 text-white">
            <h1 className="text-2xl font-bold mb-4">
                Selamat Datang di <span className="text-yellow-400">Sistem Rekomendasi</span>
            </h1>
            <div className="flex-1">
                <img
                    src={assets.ipb_icon}
                    alt="Description"
                    className="w-full h-auto rounded-lg mb-4"
                />
            </div>
        </div>
    );
};

export default Sidebar;
