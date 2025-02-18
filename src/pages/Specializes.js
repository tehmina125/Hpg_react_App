import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Specializes = () => {
  const sliderRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [specializes, setSpecializes] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchSpecializes = async () => {
      try {
        const response = await fetch("https://www.hpgautorepair.com/api/home/header_values");
        const data = await response.json();
        if (data.specializes) {
          console.log("Fetched Specializes:", data.specializes);
          setSpecializes(data.specializes);
        }
      } catch (error) {
        console.error("Error fetching specializes:", error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchSpecializes();
  }, []);

  const settings = {
    infinite: true,
    speed: 2000,
    slidesToShow: 10,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 100,
    cssEase: "linear",
    draggable: false,
    swipe: false,
    arrows: false,
    dots: false,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 8 } },
      { breakpoint: 1024, settings: { slidesToShow: 6 } },
      { breakpoint: 768, settings: { slidesToShow: 4 } },
      { breakpoint: 480, settings: { slidesToShow: 3 } },
    ],
  };

  const moveToLeft = () => sliderRef.current?.slickPrev();
  const moveToRight = () => sliderRef.current?.slickNext();
  const stopSlider = () => {
    sliderRef.current?.slickPause();
    setIsPaused(true);
  };
  const resumeSlider = () => {
    sliderRef.current?.slickPlay();
    setIsPaused(false);
  };

  const goToDetailPage = (slug) => {
    navigate(`/specializes/${slug}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div role="status">
          <svg
            aria-hidden="true"
            className="w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-red-600"
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

  return (
    <div className="w-full relative" onMouseEnter={stopSlider} onMouseLeave={resumeSlider}>
      <Slider ref={sliderRef} {...settings}>
        {specializes.map((item, index) => (
          <div
            key={index}
            className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-red-300 mt-2 mb-2 border border-black mx-1 rounded-lg overflow-hidden flex items-center justify-center cursor-pointer"
            onClick={() => goToDetailPage(item.slug)} // Make clickable
          >
            <img
              src={item.image_url}
              alt={item.name}
              className="w-full h-full object-contain"
            />
          </div>
        ))}
      </Slider>

      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-4">
        <button onClick={() => { moveToLeft(); stopSlider(); }} className="w-8 h-8 bg-pink-600 text-white rounded-full flex justify-center items-center">&lt;</button>
        <button onClick={() => { isPaused ? resumeSlider() : stopSlider(); }} className="w-8 h-8 bg-pink-600 text-white rounded-full flex justify-center items-center">
          {isPaused ? "▶️" : "⏸️"}
        </button>
        <button onClick={() => { moveToRight(); stopSlider(); }} className="w-8 h-8 bg-pink-600 text-white rounded-full flex justify-center items-center">&gt;</button>
      </div>
    </div>
  );
};

export default Specializes;
