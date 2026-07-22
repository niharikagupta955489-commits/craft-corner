import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FAF7F0] flex items-center justify-center px-6">

      <div className="text-center max-w-xl">

        <h1 className="text-8xl font-extrabold text-[#556B2F]">
          404
        </h1>

        <h2 className="text-4xl font-bold text-[#2F3A2D] mt-4">
          Oops! Page Not Found
        </h2>

        <p className="text-gray-500 mt-4">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">

          <Link
            to="/"
            className="bg-[#556B2F] text-white px-6 py-3 rounded-xl hover:bg-[#445625]"
          >
            Go Home
          </Link>

          <Link
            to="/marketplace"
            className="border-2 border-[#556B2F] text-[#556B2F] px-6 py-3 rounded-xl hover:bg-[#556B2F] hover:text-white"
          >
            Continue Shopping
          </Link>

        </div>

      </div>

    </div>
  );
}