import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp, faYoutube, faFacebook, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import ServiceDropdown from "./ServiceDropdown";
import SpecializesDropdown from "./SpecializesDropdown";
import BlogsDropdown from "./BlogsDropdown";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [services, setServices] = useState([]);
  const [specializes, setSpecializes] = useState([]);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://www.hpgautorepair.com/api/home/header_values");
        const data = await response.json();
        setServices(data.services || []);
        setSpecializes(data.specializes || []);
        setBlogs(data.blogs || []);
      } catch (error) {
        console.error("Error fetching header data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <header className="bg-red-800 p-4 relative z-50">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <img src="195.png" alt="Logo" className="h-12 mr-5" />
          </div>

          <div className="flex flex-col md:items-start lg:items-center md:flex-row md:space-x-6 ml-auto">
            <div className="flex flex-col md:flex-row md:space-x-6 items-center text-center lg:text-left">
              <a href="tel:+1234567890" className="text-white flex items-center">
                <FontAwesomeIcon icon={faWhatsapp} className="text-lg md:text-xl lg:text-2xl text-green-500 mr-2" />
                <span>+971 52 977 3887</span>
              </a>
              <a href="tel:+0987654321" className="text-white flex items-center mt-2 md:mt-0">
                <FontAwesomeIcon icon={faWhatsapp} className="text-lg md:text-xl lg:text-2xl text-green-500 mr-2" />
                <span>+971 52 782 9699</span>
              </a>
            </div>

            <div className="flex flex-wrap justify-center md:justify-start lg:justify-center md:mt-0 mt-3 space-x-4">
              <a href="https://www.youtube.com/channel/UCYwb71aR205TgPs-jE5YnTw" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faYoutube} className="text-white text-base md:text-lg lg:text-xl hover:text-gray-300" />
              </a>
              <a href="https://www.facebook.com/hpgautorepair/" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faFacebook} className="text-white text-base md:text-lg lg:text-xl hover:text-gray-300" />
              </a>
              <a href="https://www.instagram.com/hpgautorepair/" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faInstagram} className="text-white text-base md:text-lg lg:text-xl hover:text-gray-300" />
              </a>
              <a href="https://www.twitter.com/hpgautorepair/" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faTwitter} className="text-white text-base md:text-lg lg:text-xl hover:text-gray-300" />
              </a>
            </div>
          </div>

          {/* Navigation - Hidden for md to xl screens */}
          <nav className="hidden md:hidden xl:flex flex-col xl:flex-row xl:ml-10 w-full xl:w-auto mt-4 xl:mt-0">
            <ul className="flex items-center space-x-6">
              <li className="flex items-center">
                <NavLink to="/" className="text-white hover:text-gray-300">
                  Home
                </NavLink>
              </li>
              <li className="flex items-center">
                <ServiceDropdown services={services} isMobile={false} />
              </li>
              <li className="flex items-center">
                <SpecializesDropdown specializes={specializes} isMobile={false} />
              </li>
              <li className="flex items-center">
                <BlogsDropdown blogs={blogs} isMobile={false} />
              </li>
              <li className="flex items-center">
                <NavLink to="/appointment" className="text-white hover:text-gray-300">
                  Appointment
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Mobile Menu Toggle - Hidden on xl screens */}
      <div className="bg-red-900 p-3 flex justify-end xl:hidden">
        <button onClick={() => setMenuOpen(!menuOpen)} className="text-white text-2xl">
          <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
        </button>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="bg-red-800 flex flex-col items-center text-center">
          <ul className="w-full flex flex-col items-center">
            <li className="w-full">
              <NavLink to="/" className="block text-white hover:text-gray-300 py-2 w-full">
                Home
              </NavLink>
            </li>
            <ServiceDropdown services={services} isMobile={true} />
            <SpecializesDropdown specializes={specializes} isMobile={true} />
            <BlogsDropdown blogs={blogs} isMobile={true} />
            <li className="w-full">
              <NavLink to="/appointment" className="block text-white hover:text-gray-300 py-2 w-full">
                Appointment
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default Header;
