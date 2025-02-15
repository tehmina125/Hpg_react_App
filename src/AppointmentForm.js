import React, { useState } from "react";

const AppointmentForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      {isSubmitted ? (
        <div className="text-center bg-opacity-70 p-6 rounded-lg">
          <h2 className="text-xl font-bold text-white">Thank You!</h2>
          <p className="mt-4 text-white">
            Your appointment has been successfully submitted. We will get back to you shortly.
          </p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg bg-transparent rounded-lg p-4 space-y-4 border border-gray-300"
        >
          <div className="text-center rounded-lg bg-gradient-to-r from-red-700 to-red-900 text-white ">
            <h2 className="text-2xl font-bold">4.9/5</h2>
            <div className="flex justify-center space-x-1 my-2">
              <span className="text-yellow-400 text-2xl">★</span>
              <span className="text-yellow-400 text-2xl">★</span>
              <span className="text-yellow-400 text-2xl">★</span>
              <span className="text-yellow-400 text-2xl">★</span>
              <span className="text-yellow-400 text-2xl">★</span>
            </div>
            <h2 className="text-lg">Google Rating</h2>
          </div>

          <div className="text-center rounded-lg bg-gray-200 p-3 mt-3">
            <div className="flex justify-between">
              <div className="text-left">
                <h3 className="text-xl font-bold text-gray-800">400+</h3>
                <p className="text-sm text-gray-600">Google Reviews</p>
              </div>
              <div className="text-right">
                <h3 className="text-xl font-bold text-gray-800">3,000+</h3>
                <p className="text-sm text-gray-600">Happy Customers</p>
              </div>
            </div>
          </div>

          <h1 className="text-xl font-bold text-red-800 text-center mt-4">
            Best Car Repairs and Maintenance in Dubai
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              className="w-full p-2 text-sm border border-gray-300 rounded-lg bg-transparent text-white placeholder-gray-400 focus:ring focus:ring-blue-300 focus:outline-none"
              placeholder="Name"
            />
            <input
              type="email"
              className="w-full p-2 text-sm border border-gray-300 rounded-lg bg-transparent text-white placeholder-gray-400 focus:ring focus:ring-blue-300 focus:outline-none"
              placeholder="Email"
            />
            <input
              type="tel"
              className="w-full p-2 text-sm border border-gray-300 rounded-lg bg-transparent text-white placeholder-gray-400 focus:ring focus:ring-blue-300 focus:outline-none"
              placeholder="Phone Number"
            />
            <input
              type="text"
              className="w-full p-2 text-sm border border-gray-300 rounded-lg bg-transparent text-white placeholder-gray-400 focus:ring focus:ring-blue-300 focus:outline-none"
              placeholder="Vehicle Type"
            />
            <input
              type="text"
              className="w-full p-2 text-sm border border-gray-300 rounded-lg bg-transparent text-white placeholder-gray-400 focus:ring focus:ring-blue-300 focus:outline-none"
              placeholder="Model"
            />
            <input
              type="number"
              className="w-full p-2 text-sm border border-gray-300 rounded-lg bg-transparent text-white placeholder-gray-400 focus:ring focus:ring-blue-300 focus:outline-none"
              placeholder="Vehicle Year"
            />
          </div>

          <textarea
            rows="4"
            className="w-full mt-4 p-2 text-sm border border-gray-300 rounded-lg bg-transparent text-white placeholder-gray-400 focus:ring focus:ring-blue-300 focus:outline-none"
            placeholder="Write your message"
          ></textarea>

          <button
            type="submit"
            className="w-full bg-red-800 text-white py-2 px-4 rounded-lg hover:bg-pink-700 focus:outline-none focus:ring focus:ring-pink-300"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default AppointmentForm;
