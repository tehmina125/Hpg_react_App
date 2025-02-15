import React from "react";
import { Link } from "react-router-dom";
import { useServices } from "../context/ServiceContext"; // Adjust the import path as needed

const Services = () => {
  const { services, loading, error } = useServices();

  if (loading) {
    return <p className="text-center text-gray-600">Loading services...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600">{error}</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-red-800">
          A Glimpse of Our Recent Services
        </h1>
        <p className="text-lg text-gray-600 mt-4">
          Discover the services we offer to make your experience memorable.
        </p>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <div key={service.id} className="bg-white p-4 rounded-lg shadow-lg  border border-black">
              
              <div className="flex justify-center items-center mb-4">
                <img 
                  src={service.image_url} 
                  alt={service.title} 
                  className="w-26 h-24 object-cover shadow-lg"
                />
              </div>

              <h3 className="text-xl font-semibold text-center text-gray-800">
              <Link 
                  to={`/services/${service.slug}`}  // Remove ID
                  className="hover:underline text-red-600"
                >
                  {service.title}
                </Link>

              </h3>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
