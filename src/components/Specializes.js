import { useState, useEffect } from "react";

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
    image: null,
  });

  const [editingId, setEditingId] = useState(null);
  const [editingValue, setEditingValue] = useState({
    title: "",
    description: "",
    image: null,
  });

  const handleChange = (e) => {
    setNewSpecialize({ ...newSpecialize, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setNewSpecialize({ ...newSpecialize, image: imageUrl });
    }
  };

  const addSpecialize = () => {
    if (newSpecialize.title.trim() === "" || newSpecialize.description.trim() === "" || !newSpecialize.image) return;
    const newEntry = { id: Date.now(), ...newSpecialize };
    const updatedSpecializes = [...specializes, newEntry];
    setSpecializes(updatedSpecializes);
    saveToLocalStorage(updatedSpecializes);
    setNewSpecialize({ title: "", description: "", image: null });
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
      image: specialize.image,
    });
  };

  const handleEditChange = (e) => {
    setEditingValue({ ...editingValue, [e.target.name]: e.target.value });
  };

  const handleEditImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setEditingValue({ ...editingValue, image: imageUrl });
    }
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
        <textarea
          name="description"
          value={newSpecialize.description}
          onChange={handleChange}
          placeholder="Enter specialization description"
          className="border p-2 rounded w-full h-24 resize-none"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="border p-2 rounded w-full"
        />
        {newSpecialize.image && (
          <img src={newSpecialize.image} alt="Preview" className="w-32 h-32 object-cover rounded mt-2" />
        )}
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
              <th className="border p-2">Image</th>
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
                          onChange={handleEditChange}
                          className="border p-1 rounded w-full"
                        />
                      </td>
                      <td className="border p-2">
                        <textarea
                          name="description"
                          value={editingValue.description}
                          onChange={handleEditChange}
                          className="border p-1 rounded w-full h-24 resize-none"
                        />
                      </td>
                      <td className="border p-2">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleEditImageUpload}
                          className="border p-1 rounded"
                        />
                        {editingValue.image && (
                          <img src={editingValue.image} alt="Preview" className="w-20 h-20 object-cover rounded mt-2" />
                        )}
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
                      <td className="border p-2">{specialize.description}</td>
                      <td className="border p-2">
                        <img src={specialize.image} alt={specialize.title} className="w-20 h-20 object-cover rounded" />
                      </td>
                      <td className="border p-2 flex gap-2">
                        <button
                          onClick={() => startEditing(specialize)}
                          className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteSpecialize(specialize.id)}
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
                <td colSpan="4" className="text-center p-4 text-gray-500">
                  No specializations added yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Specializes;
