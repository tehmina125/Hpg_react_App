import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Specializes = () => {
  const sliderRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [specializes, setSpecializes] = useState([]);
  const navigate = useNavigate(); // Initialize navigate

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

  // Function to navigate to specialization detail page
  const goToDetailPage = (id, slug) => {
    navigate(`/specializes/${id}/${slug}`);
  };

  return (
    <div className="w-full relative" onMouseEnter={stopSlider} onMouseLeave={resumeSlider}>
      <Slider ref={sliderRef} {...settings}>
        {specializes.map((item, index) => (
          <div
            key={index}
            className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-red-300 mt-2 mb-2 border border-black mx-1 rounded-lg overflow-hidden flex items-center justify-center cursor-pointer"
            onClick={() => goToDetailPage(item.id, item.slug)} // Make clickable
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
