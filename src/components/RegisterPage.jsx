import React from 'react';
import Sidebar from './Sidebar';
import AuthForm from './AuthForm';

const RegisterPage = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="flex w-full max-w-4xl rounded-lg shadow-lg bg-white">
                <div className="w-1/2">
                    <Sidebar />
                </div>
                <div className="w-1/2">
                    <AuthForm formType="register" />
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;