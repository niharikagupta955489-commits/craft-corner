import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-[#EEF2EC]">
      <Sidebar />

<main
  className="min-h-screen overflow-x-hidden"
  style={{
    marginLeft: "265px", // Sidebar jitni width hai
    width: "calc(99% - 260px)",
  }}
>
        <div className="relative min-h-screen overflow-hidden">

          {/* Background */}

          <div className="relative p-8 lg:p-10">
            <Outlet />
          </div>

        </div>
      </main>
    </div>
  );
}