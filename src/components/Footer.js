import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhoneAlt, faClock, faEnvelope, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="relative flex flex-col items-center text-center text-white dark:bg-neutral-700 lg:text-left">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('footer.png')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-60"></div> 
      </div>

      <div className="container p-6 relative z-10">
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
          <div className="mb-6 md:mb-0 flex flex-col sm:items-start space-y-4">
            <div className="flex justify-center sm:justify-start">
              <img src="200.png" alt="Contact Icon" className="w-40 h-30 object-cover" />
            </div>
            <div className="text-center sm:text-left">
              <div className="flex flex-col space-y-2">
                {[...Array(5)].map((_, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <FontAwesomeIcon icon={faPhoneAlt} className="text-xl text-red-600" />
                    <h5 className="font-medium uppercase">+971 52 169 7565</h5>
                  </div>
                ))}
              </div>

              <div className="flex items-center space-x-2 mt-3">
                <FontAwesomeIcon icon={faEnvelope} className="text-xl text-red-600" />
                <h5 className="font-medium uppercase">info@hpgautorepair.com</h5>
              </div>

              <div className="flex items-center space-x-2 mt-2">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="text-xl text-red-800" />
                <h5 className="font-medium uppercase">WH#1 Building#6 Zedklym Warehouse Opposite Dubai Refreshment DIP2, Dubai, UAE</h5>
              </div>
            </div>
          </div>

          <div className="mb-6 md:mb-0 flex flex-col sm:items-start items-center h-full justify-center">
            <h3 className="mb-2 text-2xl text-red-800 font-medium uppercase">Work Hours</h3>
            <div className="flex items-center space-x-2">
              <FontAwesomeIcon icon={faClock} className="text-xl text-red-800" />
              <h4 className="mb-4">Monday to Saturday 8am to 8pm</h4>
            </div>
            <div className="flex items-center space-x-2">
              <FontAwesomeIcon icon={faClock} className="text-xl text-red-800" />
              <h4 className="mb-4">Sunday 9am to 6pm</h4>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full bg-black/50 p-4 text-center z-20 text-gray-500">
  Copyrights © 2021 - {new Date().getFullYear()} All Rights Reserved by 
  {/* <a href="https://www.hpgautorepair.com/" className="text-white no-underline ml-1"> */}
    <span className="text-white ml-1">HPG Auto Repair</span>
</div>


      <div className="fixed bottom-5 right-5 flex flex-col space-y-3 z-50">
        <a
          href="tel:+971529773887"
          className="bg-red-800 text-white p-4 rounded-full shadow-lg hover:bg-pink-700 transition duration-300"
        >
          <FontAwesomeIcon icon={faPhoneAlt} className="text-2xl" />
        </a>

        <a
          href="https://wa.me/971529773887"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition duration-300"
        >
          <FontAwesomeIcon icon={faWhatsapp} className="text-2xl" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
