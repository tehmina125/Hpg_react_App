import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSpecializes } from "../context/SpecializeContext"; 

const stripHtmlTags = (html) => {
  if (!html) return "";
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
};

const SpecializeDetail = () => {
  const { slug } = useParams();
  const { specializes } = useSpecializes();
  const [specialize, setSpecialize] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const foundSpecialize = specializes.find((s) => s.slug === slug);

    if (foundSpecialize) {
      setSpecialize(foundSpecialize);
      setLoading(false);
    } else {
      axios.get(`https://www.hpgautorepair.com/api/home/specialize/${slug}`)
        .then(response => {
          setSpecialize(response.data);
        })
        .catch(error => {
          setError(error.response?.data?.error || "Specialization not found.");
        })
        .finally(() => setLoading(false));
    }
  }, [slug, specializes]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-600 font-bold">Error: {error}</p>;
  if (!specialize) return <p>No specialization found.</p>;

  const imageUrl = specialize.image 
    ? specialize.image 
    : "https://res.cloudinary.com/hpggarage/image/upload/hpg_production/Specialization";

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">{specialize.title || "No Title"}</h1>

      <div className="flex flex-col md:flex-row mt-4 gap-8">
        
        <div className="w-full md:w-1/2 order-1 md:order-2">
          <img 
            src={imageUrl} 
            alt={specialize.title || "Specialization Image"} 
            className="w-full md:w-3/4 lg:w-1/2 max-h-64 md:max-h-80 lg:max-h-96 rounded-lg shadow-lg object-cover"
          />
        </div>

        <div className="w-full md:w-1/2 text-justify order-2 md:order-1">
          {stripHtmlTags(specialize.description) || "No Description Available"}
        </div>

      </div>
    </div>
  );
};

export default SpecializeDetail;
