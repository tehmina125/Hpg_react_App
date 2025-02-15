import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header1 from "./components/Header1";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import ServiceDetail from "./components/ServiceDetail";
import { ServiceProvider } from "./context/ServiceContext";
import SpecializeDetail from "./components/SpecializeDetail";
import { SpecializeProvider } from "./context/SpecializeContext";
import BlogDetail from "./components/BlogDetail";
import { BlogProvider } from "./context/BlogContext";
import Appointment from "./pages/Appointment"; // 

function App() {
  return (
    <ServiceProvider>
      <SpecializeProvider>
        <BlogProvider>
        <div className="flex flex-col min-h-screen">
          <Router>
            <Header1 />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/services/:slug" element={<ServiceDetail />} />
                <Route path="/specializes/:slug" element={<SpecializeDetail />} />
                <Route path="/blogs/:slug" element={<BlogDetail />} />
                <Route path="/appointment" element={<Appointment />} /> 

              </Routes>
            </main>
            <Footer />
          </Router>
        </div>
        </BlogProvider>
        </SpecializeProvider>
    </ServiceProvider>
  );
}

export default App;
