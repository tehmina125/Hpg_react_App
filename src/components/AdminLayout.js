import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link, Outlet } from "react-router-dom";

const AdminLayout = () => {
  const { authState, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (authState.length === 0) {
      navigate("/signin");
    }
  }, [authState, navigate]);

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-gray-900 text-white p-6 flex flex-col">
        <Link to="/admin" className="text-xl font-bold mb-6 hover:text-yellow-500">
          Dashboard
        </Link>
        
        <nav className="flex flex-col gap-4">
          <Link to="/admin/services" className="text-white hover:text-blue-600">
            Services
          </Link>
          <Link to="/admin/specializes" className="text-white hover:text-green-600">
            Specializes
          </Link>
          <Link to="/admin/blogs" className="text-white hover:text-purple-600">
            Blogs
          </Link>
        </nav>

        <button
          onClick={logout}
          className="mt-auto bg-red-800 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </aside>

      <div className="flex flex-col flex-grow h-screen">
        <header className="bg-red-800 shadow p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">
            WELCOME TO HPG AUTO REPAIR L.L.C
          </h1>
        </header>
        <main className="flex-grow p-6 bg-white shadow-md overflow-auto">
          <Outlet /> 
        </main>
        <footer className="bg-gray-900 text-white p-4 text-center">
          &copy; {new Date().getFullYear()} All Rights Reserved by HPG Auto Repair
        </footer>
      </div>
    </div>
  );
};

export default AdminLayout;
