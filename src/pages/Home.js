import React, { useState } from "react";
import AppointmentForm from "../AppointmentForm";
import Services from "./Services";
import Specializes from "./Specializes";
import Feedback from "./Feedback";

const Home = () => {
  const [showMore, setShowMore] = useState(false);

  const handleToggle = () => {
    setShowMore(!showMore);
  };

  return (
    <div>
      <div className="relative min-h-screen">
        <div className="absolute inset-0">
          <img src="landing.png" alt="Landing Page" className="w-full h-full object-cover" />
        </div>
        <div className="relative flex items-center justify-center h-full text-white bg-black/50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col-reverse lg:flex-row gap-8 items-center">
              
              <div className="text-center lg:text-left lg:w-2/3">
                <h4 className="text-3xl lg:text-3xl text-red-800 font-bold mb-6">
                  Welcome to HPG Auto Repair L.L.C
                </h4>
                <h5 className="text-2xl text-white font-bold">
                  PROFESSIONAL CAR REPAIR AND MAINTENANCE
                </h5>
                <p className="text-base md:text-lg leading-relaxed mb-6">
                  Your Trusted Destination for Car Repairs and Maintenance in Dubai. 
                  At HPG Auto Repair L.L.C, we provide top-notch automotive services that 
                  keep your vehicle in prime condition. Whether you need routine car maintenance, 
                  minor or major repairs, or even just some auto expert advice, our dedicated team 
                  of automotive technicians are here to assist you.
                  <br />
                  <strong className="font-bold text-lg text-red-800">
                    Why Choose Us for Car Service?
                  </strong>
                  <br />
                  We claim to be a Best Garage in Dubai for Car Repair, if you are looking 
                  for an Auto Workshop in Dubai, we can be your choice for the following reasons...
                  <br />
                  {showMore && (
                    <>
                      <strong className="text-red-800 font-bold text-base">
                        1. Experienced Car Mechanics:
                      </strong>{" "}
                      Our team of skilled and certified auto technicians are passionate about cars 
                      and committed to ensuring your vehicle performs at its optimal level.
                      <br />
                      <strong className="text-red-800 font-bold text-base">
                        2. Transparent Pricing:
                      </strong>{" "}
                      You'll never be caught off guard by hidden fees or unexpected charges. 
                      We provide transparent pricing and offer competitive rates for all our services.
                      <br />
                      <strong className="text-red-800 font-bold text-base">
                        3. Quality Service:
                      </strong>{" "}
                      We take pride in delivering reliable and efficient car repair and maintenance services. 
                      From routine car inspection & check-up to complex repairs, we've got you covered.
                      <br />
                      <strong className="text-red-800 font-bold text-base">
                        4. State-of-the-Art Equipment:
                      </strong>{" "}
                      We use the latest car diagnostic equipment and tools to pinpoint issues accurately 
                      and resolve them efficiently and quickly.
                      <br />
                      <strong className="text-red-800 font-bold text-base">
                        5. Customer Satisfaction:
                      </strong>{" "}
                      Your satisfaction is our top priority. We are always ready to go the extra mile to 
                      ensure you have a hassle-free experience with us. Our Car Workshop is rated 
                      4.9 with over four hundred plus reviews on Google.
                      <br />
                      To request an appointment for your car, WhatsApp/Call on  
                      <span className="bg-red-900 text-white px-2 py-1 rounded">
                      <a href="tel:+971529773887" className="hover:underline">+971 52 977 3887</a> / 
                      <a href="tel:+971521697565" className="hover:underline">+971 52 169 7565</a>
                    </span>

                    </>
                  )}
                </p>

                <button
                  onClick={handleToggle}
                  className="mt-2 px-4 py-2 bg-red-800 hover:bg-black text-white rounded-lg text-lg"
                >
                  {showMore ? "Show Less" : "Read More"}
                </button>
              </div>

              <div className="p-4 rounded-lg bg-opacity-0 lg:w-1/3">
                <AppointmentForm />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Specializes />
      <Services />
      <Feedback />

      <img src="BYD.png" alt="Landing Page" className="w-full h-90 object-cover" />
    </div>
  );
};

export default Home;
