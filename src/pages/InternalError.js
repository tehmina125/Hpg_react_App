import React from 'react';

const InternalError = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 text-center">
      <div className="max-w-md w-full p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-6xl font-bold text-yellow-600">505</h1>
        <p className="text-xl text-gray-600 mb-4">Oops! There was an internal server error.</p>
        <a href="/" className="text-indigo-600 hover:text-indigo-800 text-lg">Go back to Home</a>
      </div>
    </div>
  );
}

export default InternalError;
