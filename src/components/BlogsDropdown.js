import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const BlogsDropdown = ({ blogs, isMobile }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <li
      className={`relative ${isMobile ? "w-full text-center" : ""}`}
      onMouseEnter={() => !isMobile && setDropdownOpen(true)}
      onMouseLeave={() => !isMobile && setDropdownOpen(false)}
    >
      <button
        className="text-white hover:text-gray-300 py-2"
        onClick={() => isMobile && setDropdownOpen(!dropdownOpen)}
      >
        Blogs <span className="ml-1">&#9660;</span>
      </button>

      {dropdownOpen && blogs.length > 0 && (
        <div
          className={`absolute left-0 mt-[-4px] bg-white text-black w-60 py-2 rounded-lg shadow-lg z-50 
          max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200
          ${isMobile ? "static w-full mt-0" : "mt-[-6px]"}`}
        >
          {blogs.map((blog) => (
            <NavLink
              key={blog.slug}
              to={`/blogs/${blog.slug}`}
              className="block px-4 py-2 hover:bg-gray-200"
              onClick={() => isMobile && setDropdownOpen(false)}
            >
              {blog.title}
            </NavLink>
          ))}
        </div>
      )}
    </li>
  );
};

export default BlogsDropdown;
