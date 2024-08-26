import React from 'react';

const AuthForm = ({ formType, onToggleForm }) => {
    const isRegister = formType === "register";

    return (
        <div className="flex flex-col w-full px-8 pt-5">
            <h2 className="text-2xl font-bold mb-6 text-center">
                {isRegister ? "Register for Recommendation System" : "Login to Recommendation System"}
            </h2>
            <form className="space-y-6">
                {isRegister && (
                    <div>
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="fullName"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Full Name"
                        />
                    </div>
                )}
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Email"
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Password"
                    />
                </div>
                {isRegister && (
                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Confirm Password"
                        />
                    </div>
                )}
                <div>
                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        {isRegister ? "Register" : "Login"}
                    </button>
                </div>
            </form>
            <p className="text-center text-sm text-gray-500 mt-4">
                {isRegister ? (
                    <>
                        Already have an account?{" "}
                        <button
                            onClick={onToggleForm}
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                            Login here
                        </button>
                    </>
                ) : (
                    <>
                        Don't have an account?{" "}
                        <button
                            onClick={onToggleForm}
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                            Register here
                        </button>
                    </>
                )}
            </p>
        </div>
    );
};

export default AuthForm;
