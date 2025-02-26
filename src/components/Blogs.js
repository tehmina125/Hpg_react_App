import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; 

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({ title: "", description: "" });
  const [editingId, setEditingId] = useState(null);
  const [editingValue, setEditingValue] = useState({ title: "", description: "" });

  useEffect(() => {
    const storedBlogs = JSON.parse(localStorage.getItem("blogs"));
    if (storedBlogs) {
      setBlogs(storedBlogs);
    }
  }, []);

  const saveToLocalStorage = (updatedBlogs) => {
    localStorage.setItem("blogs", JSON.stringify(updatedBlogs));
  };

  const handleChange = (e) => {
    setNewBlog({ ...newBlog, [e.target.name]: e.target.value });
  };

  const handleEditorChange = (content) => {
    setNewBlog((prev) => ({ ...prev, description: content }));
  };

  const addBlog = () => {
    if (newBlog.title.trim() === "" || newBlog.description.trim() === "") return;
    const newEntry = { id: Date.now(), ...newBlog };
    const updatedBlogs = [...blogs, newEntry];
    setBlogs(updatedBlogs);
    saveToLocalStorage(updatedBlogs);
    setNewBlog({ title: "", description: "" });
  };

  const deleteBlog = (id) => {
    const updatedBlogs = blogs.filter((blog) => blog.id !== id);
    setBlogs(updatedBlogs);
    saveToLocalStorage(updatedBlogs);
  };

  const startEditing = (blog) => {
    setEditingId(blog.id);
    setEditingValue({
      title: blog.title,
      description: blog.description,
    });
  };

  const handleEditEditorChange = (content) => {
    setEditingValue((prev) => ({ ...prev, description: content }));
  };

  const updateBlog = (id) => {
    const updatedBlogs = blogs.map((blog) =>
      blog.id === id ? { ...blog, ...editingValue } : blog
    );
    setBlogs(updatedBlogs);
    saveToLocalStorage(updatedBlogs);
    setEditingId(null);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Blogs</h1>
      <div className="flex flex-col gap-2 mb-4">
        <input
          type="text"
          name="title"
          value={newBlog.title}
          onChange={handleChange}
          placeholder="Enter blog title"
          className="border p-2 rounded w-full"
        />

        <ReactQuill
          value={newBlog.description}
          onChange={handleEditorChange}
          modules={{
            toolbar: [
              [{ header: [1, 2, false] }],
              ["bold", "italic", "underline"],
              ["link", "image", "blockquote", "code-block"],
              [{ list: "ordered" }, { list: "bullet" }],
              [{ script: "sub" }, { script: "super" }],
              [{ indent: "-1" }, { indent: "+1" }],
              [{ direction: "rtl" }],
              [{ size: ["small", false, "large", "huge"] }],
              [{ color: [] }, { background: [] }],
              [{ align: [] }],
              ["clean"],
              ["table"], 
            ],
          }}
          formats={[
            "header",
            "bold",
            "italic",
            "underline",
            "link",
            "image",
            "blockquote",
            "code-block",
            "list",
            "bullet",
            "script",
            "indent",
            "direction",
            "size",
            "color",
            "background",
            "align",
            "table", 
          ]}
        />

        <button
          onClick={addBlog}
          className="bg-blue-500 text-white px-1 py-2 rounded hover:bg-blue-600 w-24"
        >
          Add Blog
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Title</th>
              <th className="border p-2">Description</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.length > 0 ? (
              blogs.map((blog) => (
                <tr key={blog.id} className="border">
                  {editingId === blog.id ? (
                    <>
                      <td className="border p-2">
                        <input
                          type="text"
                          name="title"
                          value={editingValue.title}
                          onChange={(e) =>
                            setEditingValue({ ...editingValue, title: e.target.value })
                          }
                          className="border p-1 rounded w-full"
                        />
                      </td>
                      <td className="border p-2">
                        <ReactQuill
                          value={editingValue.description}
                          onChange={handleEditEditorChange}
                          modules={{
                            toolbar: [
                              [{ header: [1, 2, false] }],
                              ["bold", "italic", "underline"],
                              ["link", "image", "blockquote", "code-block"],
                              [{ list: "ordered" }, { list: "bullet" }],
                              [{ script: "sub" }, { script: "super" }],
                              [{ indent: "-1" }, { indent: "+1" }],
                              [{ direction: "rtl" }],
                              [{ size: ["small", false, "large", "huge"] }],
                              [{ color: [] }, { background: [] }],
                              [{ align: [] }],
                              ["clean"],
                              ["table"],
                            ],
                          }}
                        />
                      </td>
                      <td className="border p-2 flex gap-2">
                        <button
                          onClick={() => updateBlog(blog.id)}
                          className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                        >
                          Save
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="border p-2">{blog.title}</td>
                      <td className="border p-2 prose">
                        <div
                          className="prose max-w-full"
                          dangerouslySetInnerHTML={{ __html: blog.description }}
                        ></div>
                      </td>
                      <td className="border p-2 flex gap-2">
                        <button
                          onClick={() => startEditing(blog)}
                          className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteBlog(blog.id)}
                          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center p-4 text-gray-500">No blogs added yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <style>
        {`
          .prose img {
            max-width: 150px; /* Set max image width */
            height: auto; /* Maintain aspect ratio */
            border-radius: 8px; /* Optional: Rounded corners */
          }
        `}
      </style>
    </div>
  );
};

export default Blogs;
