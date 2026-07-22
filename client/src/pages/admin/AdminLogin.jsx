import { Link } from "react-router-dom";

export default function AdminLogin() {
  return (
    <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center px-6">

      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-8">

        <h1 className="text-3xl font-bold text-center text-[#2F3A2D]">
          Admin Login
        </h1>

        <p className="text-center text-gray-500 mt-2">
          Login to CraftCorner Admin Panel
        </p>

        <form className="mt-8 space-y-5">

          <input
            type="email"
            placeholder="Admin Email"
            className="w-full border rounded-xl px-4 py-3"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border rounded-xl px-4 py-3"
          />

          <button
            className="w-full bg-[#2F3A2D] text-white py-3 rounded-xl hover:bg-[#445625]"
          >
            Login
          </button>

        </form>

        <Link
          to="/"
          className="block text-center mt-6 text-[#556B2F]"
        >
          Back to Website
        </Link>

      </div>

    </div>
  );
}