import React from 'react';

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 text-center">
      <div className="max-w-md w-full p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-6xl font-bold text-red-600">404</h1>
        <p className="text-xl text-gray-600 mb-4">Oops! The page you are looking for does not exist.</p>
        <a href="/" className="text-indigo-600 hover:text-indigo-800 text-lg">Go back to Home</a>
      </div>
    </div>
  );
}

export default NotFound;
