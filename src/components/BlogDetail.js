import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useBlogs } from "../context/BlogContext"; 
const stripHtmlTags = (html) => {
  if (!html) return "";
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
};

const BlogDetail = () => {
  const { id, slug } = useParams();
  const { blogs } = useBlogs();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const foundBlog = blogs.find((s) => s.id.toString() === id && s.slug === slug);

    if (foundBlog) {
      setBlog(foundBlog);
      setLoading(false);
    } else {
      axios.get(`https://www.hpgautorepair.com/api/home/${id}/blogs/${slug}`)
        .then(response => {
          setBlog(response.data);
        })
        .catch(error => {
          setError(error.response?.data?.error || "Blog not found.");
        })
        .finally(() => setLoading(false));
    }
  }, [id, slug, blogs]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!blog) return <p>No blog found.</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">{blog.title || "No Title"}</h1>
      <div className="mt-4 text-justify">{stripHtmlTags(blog.description) || "No Description Available"}</div>
    </div>
  );
};

export default BlogDetail;
