import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useServices } from "../context/ServiceContext"; 

const stripHtmlTags = (html) => {
  if (!html) return "";
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
};

const ServiceDetail = () => {
  const { slug } = useParams(); 
  const { services, loading } = useServices();
  const [service, setService] = useState(null);

  useEffect(() => {
    const foundService = services.find((s) => s.slug === slug);

    if (foundService) {
      setService(foundService);
    } else {
      setService(null); 
      axios.get(`https://www.hpgautorepair.com/api/home/services/${slug}`)
        .then(response => {
          setService(response.data); 
        })
        .catch(error => {
          console.error(error.response?.data?.error || "Service not found.");
        });
    }
  }, [slug, services]);

  if (loading) return <p>Loading...</p>;
  if (!service) return <p>No service found.</p>; 

  const imageUrl = service.image || "https://res.cloudinary.com/hpggarage/image/upload/hpg_production/Service";

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">{service.title || "No Title"}</h1>
      
      <div className="flex flex-col md:flex-row mt-4 gap-8">
        
        <div className="w-full md:w-1/2 order-1 md:order-2">
          <img 
            src={imageUrl} 
            alt={service.title || "Service Image"} 
            className="w-full md:w-3/4 lg:w-1/2 max-h-64 md:max-h-80 lg:max-h-96 rounded-lg shadow-lg object-cover"
          />
        </div>

        <div className="w-full md:w-1/2 text-justify order-2 md:order-1">
          {stripHtmlTags(service.description) || "No Description Available"}
        </div>

      </div>
    </div>
  );
};

export default ServiceDetail;
