import {
  FaBars,
  FaBell,
  FaUserShield,
} from "react-icons/fa";

export default function Topbar({ toggleSidebar }) {
  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-gray-200 bg-white px-8">

      {/* Mobile Menu */}
      <button
        onClick={toggleSidebar}
        className="rounded-xl p-2 hover:bg-gray-100 lg:hidden"
      >
        <FaBars size={22} />
      </button>

      {/* Left */}
      <div className="hidden lg:block">
        <h2 className="text-2xl font-bold text-gray-800">
          Welcome Back 👋
        </h2>

        <p className="mt-1 text-gray-500">
          Manage your Craft Corner Store
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-5">

        <button className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-gray-200 bg-white hover:shadow-md">

          <FaBell size={20} />

          <span className="absolute right-3 top-3 h-2.5 w-2.5 rounded-full bg-red-500"></span>

        </button>

        <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-3 py-2 shadow-sm">

          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#4B7B37] text-white">

            <FaUserShield />

          </div>

          <div className="hidden sm:block">

            <h4 className="font-semibold">
              Admin
            </h4>

            <p className="text-sm text-gray-500">
              Super Admin
            </p>

          </div>

        </div>

      </div>

    </header>
  );
}