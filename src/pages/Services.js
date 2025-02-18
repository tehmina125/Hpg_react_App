import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { useServices } from "../context/ServiceContext"; // Adjust the import path as needed

const ServicesSlider = () => {
  const { services, loading, error } = useServices();
  const sliderRef = useRef(null);

  const cardWidth = 270; 
  const gap = 12; 

  
  const visibleCards = {
    sm: 1, 
    md: 2, 
    lg: 3, 
    xl: 4, 
  };

  const containerWidth = (cardWidth + gap) * visibleCards.xl;

  const handleScroll = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = cardWidth + gap;
      if (direction === "left") {
        sliderRef.current.scrollLeft -= scrollAmount;
      } else {
        sliderRef.current.scrollLeft += scrollAmount;
      }
    }
  };

  if (loading) {
    return <p className="text-center text-gray-600">Loading services...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600">{error}</p>;
  }

  return (
    <div className="text-center py-10 px-4 bg-gray-100 relative">
      <h2 className="text-3xl font-bold text-red-800 mb-4">
        A Glimpse of Our Recent Services
      </h2>
      <p className="text-lg text-gray-700">
        Discover the services we offer to make your experience memorable.
      </p>

      <div className="max-w-full mx-auto mt-8 relative">
        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-red-700 text-white p-3 rounded-full shadow-md hover:bg-red-800 z-10"
          onClick={() => handleScroll("left")}
        >
          ←
        </button>

        <div
          ref={sliderRef}
          className="w-full overflow-x-auto scroll-smooth no-scrollbar pb-2"
          style={{ scrollBehavior: "smooth" }}
        >
          <div
            className="flex gap-4"
            style={{ width: containerWidth + "px" }}
          >
            {services.map((service) => (
              <div
                key={service.id}
                className="w-[290px] bg-white shadow-lg rounded-lg p-2 border border-black flex-shrink-0"
              >
                <div className="flex justify-center items-center mb-4">
                  <img
                    src={service.image_url}
                    alt={service.title}
                    className="w-full h-24 object-cover"
                  />
                </div>

                <h3 className="text-xl font-semibold text-center text-gray-800">
                  <Link
                    to={`/services/${service.slug}`}
                    className="hover:underline text-red-600"
                  >
                    {service.title}
                  </Link>
                </h3>
              </div>
            ))}
          </div>
        </div>

        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-red-700 text-white p-3 rounded-full shadow-md hover:bg-red-800 z-10"
          onClick={() => handleScroll("right")}
        >
          →
        </button>
      </div>
    </div>
  );
};

export default ServicesSlider;
