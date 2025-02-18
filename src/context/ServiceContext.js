import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const ServiceContext = createContext();

export const ServiceProvider = ({ children }) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if services are already in localStorage
    const cachedServices = JSON.parse(localStorage.getItem("services"));

    if (cachedServices) {
      setServices(cachedServices);
      setLoading(false);
      return;
    }

    const fetchServices = async () => {
      try {
        const response = await axios.get("https://www.hpgautorepair.com/api/home/header_values");
        const servicesData = response.data.services || [];
        setServices(servicesData);
        localStorage.setItem("services", JSON.stringify(servicesData)); 
      } catch (err) {
        console.error("Error fetching services:", err);
        setError("Failed to fetch services.");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <ServiceContext.Provider value={{ services, loading, error }}>
      {children}
    </ServiceContext.Provider>
  );
};

export const useServices = () => useContext(ServiceContext);
