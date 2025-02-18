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
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div role="status">
          <svg
            aria-hidden="true"
            className="w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-red-800"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
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
