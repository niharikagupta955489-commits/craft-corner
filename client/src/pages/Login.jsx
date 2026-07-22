import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
const { login } = useAuth();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const { data } = await api.post("/auth/login", formData);

   login(data.user, data.token);

      toast.success(data.message);

      navigate("/");

    } catch (error) {

      toast.error(
        error.response?.data?.message || "Login Failed"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F0] flex items-center justify-center px-6">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8">

        <h1 className="text-3xl font-bold text-center text-[#2F3A2D]">
          Welcome Back
        </h1>

        <p className="text-center text-gray-500 mt-2">
          Login to your CraftCorner account
        </p>

        <form
          className="mt-8 space-y-5"
          onSubmit={handleSubmit}
        >
          <div>
            <label className="block mb-2 font-medium">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#556B2F]"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#556B2F]"
            />
          </div>

          <div className="flex justify-between text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" />
              Remember Me
            </label>

            <button
              type="button"
              className="text-[#556B2F]"
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#556B2F] text-white py-3 rounded-xl hover:bg-[#445625] disabled:opacity-50"
          >
            {loading ? "Logging In..." : "Login"}
          </button>
        </form>

        <p className="text-center mt-6">
          Don't have an account?

          <Link
            to="/register"
            className="ml-2 text-[#556B2F] font-semibold"
          >
            Register
          </Link>
        </p>

      </div>
    </div>
  );
}