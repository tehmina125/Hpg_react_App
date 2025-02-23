import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Header1 from "./Header1";
import Footer from "./Footer";

const SigninForm = () => {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    signIn(email, password);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header1 />
      <main className="flex-grow flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
          <h1 className="text-xl font-bold text-center text-gray-900 dark:text-white">
            Sign in to your account
          </h1>
          <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Your email
              </label>
              <input
                type="email"
                className="w-full p-2.5 border rounded-lg text-sm bg-gray-50 dark:bg-gray-700"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Password
              </label>
              <input
                type="password"
                className="w-full p-2.5 border rounded-lg text-sm bg-gray-50 dark:bg-gray-700"
                placeholder="password123"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full text-white bg-blue-600 hover:bg-blue-700 rounded-lg px-5 py-2.5"
            >
              Sign in
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SigninForm;
