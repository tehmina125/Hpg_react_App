import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const storedServices = JSON.parse(localStorage.getItem("services"));
    if (storedServices) {
      setServices(storedServices);
    }
  }, []);

  const saveToLocalStorage = (updatedServices) => {
    localStorage.setItem("services", JSON.stringify(updatedServices));
  };

  const [newService, setNewService] = useState({
    title: "",
    description: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [editingValue, setEditingValue] = useState({
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    setNewService({ ...newService, [e.target.name]: e.target.value });
  };

  const handleEditorChange = (content) => {
    setNewService((prev) => ({ ...prev, description: content }));
  };

  const handleEditEditorChange = (content) => {
    setEditingValue((prev) => ({ ...prev, description: content }));
  };

  const addService = () => {
    if (newService.title.trim() === "" || newService.description.trim() === "") return;
    const newEntry = { id: Date.now(), ...newService };
    const updatedServices = [...services, newEntry];
    setServices(updatedServices);
    saveToLocalStorage(updatedServices);
    setNewService({ title: "", description: "" });
  };

  const deleteService = (id) => {
    const updatedServices = services.filter((service) => service.id !== id);
    setServices(updatedServices);
    saveToLocalStorage(updatedServices);
  };

  const startEditing = (service) => {
    setEditingId(service.id);
    setEditingValue({
      title: service.title,
      description: service.description,
    });
  };

  const updateService = (id) => {
    const updatedServices = services.map((service) =>
      service.id === id ? { ...service, ...editingValue } : service
    );
    setServices(updatedServices);
    saveToLocalStorage(updatedServices);
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

        <ReactQuill
          value={newService.description}
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
              <th className="border p-2 w-1/2">Description</th>
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
                          onChange={(e) =>
                            setEditingValue({ ...editingValue, title: e.target.value })
                          }
                          className="border p-1 rounded w-full"
                        />
                      </td>
                      <td className="border p-2 w-1/2">
                        <ReactQuill
                          value={editingValue.description}
                          onChange={handleEditEditorChange}
                        />
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
                      <td className="border p-2 w-1/2 prose">
                        <div dangerouslySetInnerHTML={{ __html: service.description }}></div>
                      </td>
                      <td className="border p-2 flex gap-2">
                        <button onClick={() => startEditing(service)} className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600">Edit</button>
                        <button onClick={() => deleteService(service.id)} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">Delete</button>
                      </td>
                    </>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center p-4 text-gray-500">No services added yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Services;
