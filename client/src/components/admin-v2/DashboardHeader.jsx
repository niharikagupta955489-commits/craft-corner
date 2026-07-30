import {
  FaBell,
  FaSearch,
  FaChevronDown,
} from "react-icons/fa";

export default function DashboardHeader() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm px-8 py-6">

      <div className="flex items-center justify-between">

        {/* Left */}

        <div>

          <p className="text-sm text-gray-500">
            {today}
          </p>

          <h1 className="mt-2 text-4xl font-bold text-[#132715]">
            Welcome Back 👋
          </h1>

          <p className="mt-2 text-gray-500">
            Here's what's happening with your store today.
          </p>

        </div>

        {/* Right */}

        <div className="flex items-center gap-5">

          {/* Search */}

          <div className="hidden lg:flex items-center bg-[#F7F8FA] rounded-2xl px-5 py-3 w-80">

            <FaSearch className="text-gray-400" />

            <input
              type="text"
              placeholder="Search..."
              className="ml-3 w-full bg-transparent outline-none"
            />

          </div>

          {/* Notification */}

          <button className="relative h-12 w-12 rounded-2xl bg-[#F7F8FA] hover:bg-gray-100 transition flex items-center justify-center">

            <FaBell />

            <span className="absolute top-2 right-2 h-2.5 w-2.5 rounded-full bg-red-500"></span>

          </button>

          {/* Profile */}

          <button className="flex items-center gap-3 rounded-2xl border border-gray-200 px-4 py-2 hover:shadow-md transition">

            <img
              src="https://ui-avatars.com/api/?name=Admin&background=4B7B37&color=fff"
              alt="Admin"
              className="w-12 h-12 rounded-full"
            />

            <div className="text-left hidden md:block">

              <h3 className="font-semibold">
                Admin
              </h3>

              <p className="text-sm text-gray-500">
                Super Admin
              </p>

            </div>

            <FaChevronDown className="text-gray-400" />

          </button>

        </div>

      </div>

    </div>
  );
}