import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const SpecializeContext = createContext();

export const SpecializeProvider = ({ children }) => {
  const [specializes, setSpecializes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpecializes = async () => {
      try {
        const response = await axios.get("https://www.hpgautorepair.com/api/home/header_values");
        setSpecializes(response.data.specializes || []);
      } catch (err) {
        console.error("Error fetching specializes:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSpecializes();
  }, []);

  return (
    <SpecializeContext.Provider value={{ specializes, loading }}>
      {children}
    </SpecializeContext.Provider>
  );
};

export const useSpecializes = () => useContext(SpecializeContext);
