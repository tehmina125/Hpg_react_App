import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState([]);
  const navigate = useNavigate();

  const signIn = (email, password) => {
    if (email === "admin@example.com" && password === "password123") {
      setAuthState([1]); 
      navigate("/admin"); 
    } else {
      alert("Invalid credentials");
    }
  };

  const logout = () => {
    setAuthState([]); 
    navigate("/signin");
  };

  return (
    <AuthContext.Provider value={{ authState, signIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
