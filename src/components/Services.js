import { useState } from "react";

const Services = () => {
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState({
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
    setNewService({ ...newService, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setNewService({ ...newService, image: imageUrl });
    }
  };

  const addService = () => {
    if (newService.title.trim() === "" || newService.description.trim() === "" || !newService.image) return;
    const newEntry = { id: Date.now(), ...newService };
    setServices([...services, newEntry]);
    setNewService({ title: "", description: "", image: null });
  };

  const deleteService = (id) => {
    setServices(services.filter((service) => service.id !== id));
  };

  const startEditing = (service) => {
    setEditingId(service.id);
    setEditingValue({
      title: service.title,
      description: service.description,
      image: service.image,
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

  const updateService = (id) => {
    setServices(
      services.map((service) =>
        service.id === id ? { ...service, ...editingValue } : service
      )
    );
    setEditingId(null);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Services</h1>

      <div className="flex flex-col gap-2 mb-4">
        <input
          type="text"
          name="title"
          value={newService.title}
          onChange={handleChange}
          placeholder="Enter service title"
          className="border p-2 rounded w-full"
        />
        <textarea
          name="description"
          value={newService.description}
          onChange={handleChange}
          placeholder="Enter service description"
          className="border p-2 rounded w-full h-24 resize-none"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="border p-2 rounded w-full"
        />
        {newService.image && (
          <img src={newService.image} alt="Preview" className="w-32 h-32 object-cover rounded mt-2" />
        )}
        <button
          onClick={addService}
          className="bg-blue-500 text-white px-1 py-2 rounded hover:bg-blue-600 w-24"
        >
          Add Service
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
            {services.length > 0 ? (
              services.map((service) => (
                <tr key={service.id} className="border">
                  {editingId === service.id ? (
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
                          onClick={() => updateService(service.id)}
                          className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                        >
                          Save
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="border p-2">{service.title}</td>
                      <td className="border p-2">{service.description}</td>
                      <td className="border p-2">
                        <img src={service.image} alt={service.title} className="w-20 h-20 object-cover rounded" />
                      </td>
                      <td className="border p-2 flex gap-2">
                        <button
                          onClick={() => startEditing(service)}
                          className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteService(service.id)}
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
                  No services added yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Services;
