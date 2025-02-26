import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Specializes = () => {
  const [specializes, setSpecializes] = useState([]);

  useEffect(() => {
    const storedSpecializes = JSON.parse(localStorage.getItem("specializes"));
    if (storedSpecializes) {
      setSpecializes(storedSpecializes);
    }
  }, []);

  const saveToLocalStorage = (updatedSpecializes) => {
    localStorage.setItem("specializes", JSON.stringify(updatedSpecializes));
  };

  const [newSpecialize, setNewSpecialize] = useState({
    title: "",
    description: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [editingValue, setEditingValue] = useState({
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    setNewSpecialize({ ...newSpecialize, [e.target.name]: e.target.value });
  };

  const handleEditorChange = (content) => {
    setNewSpecialize((prev) => ({ ...prev, description: content }));
  };

  const handleEditEditorChange = (content) => {
    setEditingValue((prev) => ({ ...prev, description: content }));
  };

  const addSpecialize = () => {
    if (newSpecialize.title.trim() === "" || newSpecialize.description.trim() === "") return;
    const newEntry = { id: Date.now(), ...newSpecialize };
    const updatedSpecializes = [...specializes, newEntry];
    setSpecializes(updatedSpecializes);
    saveToLocalStorage(updatedSpecializes);
    setNewSpecialize({ title: "", description: "" });
  };

  const deleteSpecialize = (id) => {
    const updatedSpecializes = specializes.filter((specialize) => specialize.id !== id);
    setSpecializes(updatedSpecializes);
    saveToLocalStorage(updatedSpecializes);
  };

  const startEditing = (specialize) => {
    setEditingId(specialize.id);
    setEditingValue({
      title: specialize.title,
      description: specialize.description,
    });
  };

  const updateSpecialize = (id) => {
    const updatedSpecializes = specializes.map((specialize) =>
      specialize.id === id ? { ...specialize, ...editingValue } : specialize
    );
    setSpecializes(updatedSpecializes);
    saveToLocalStorage(updatedSpecializes);
    setEditingId(null);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Specializations</h1>

      <div className="flex flex-col gap-2 mb-4">
        <input
          type="text"
          name="title"
          value={newSpecialize.title}
          onChange={handleChange}
          placeholder="Enter specialization title"
          className="border p-2 rounded w-full"
        />
        <ReactQuill
          value={newSpecialize.description}
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
            ],
          }}
        />

        <button
          onClick={addSpecialize}
          className="bg-blue-500 text-white px-1 py-2 rounded hover:bg-blue-600 w-24"
        >
          Add Specialization
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
            {specializes.length > 0 ? (
              specializes.map((specialize) => (
                <tr key={specialize.id} className="border">
                  {editingId === specialize.id ? (
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
                        />
                      </td>
                      <td className="border p-2 flex gap-2">
                        <button
                          onClick={() => updateSpecialize(specialize.id)}
                          className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                        >
                          Save
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="border p-2">{specialize.title}</td>
                      <td className="border p-2 prose">
                        <div dangerouslySetInnerHTML={{ __html: specialize.description }}></div>
                      </td>
                      <td className="border p-2 flex gap-2">
                        <button onClick={() => startEditing(specialize)} className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600">Edit</button>
                        <button onClick={() => deleteSpecialize(specialize.id)} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">Delete</button>
                      </td>
                    </>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center p-4 text-gray-500">No specializations added yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Specializes;
