import {
  FaHome,
  FaBoxOpen,
  FaShoppingBag,
  FaUsers,
  FaTags,
  FaChartLine,
  FaCog,
  FaUserShield,
  FaSignOutAlt,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo2.png";
import { useAuth } from "../../context/AuthContext";

import React from "react";
import { Link } from "react-router-dom";
const menuItems = [
  {
    title: "Dashboard",
    icon: FaHome,
    path: "/admin-v2",
  },
{
  title: "Admin Management",
  icon: FaUserShield,
  path: "/admin-v2/admin-management",
},
  {
    title: "Products",
    icon: FaBoxOpen,
    path: "/admin-v2/products",
  },
  {
    title: "Orders",
    icon: FaShoppingBag,
    path: "/admin-v2/orders",
  },





  {
    title: "Customers",
    icon: FaUsers,
    path: "/admin-v2/customers",
  },
  {
    title: "Categories",
    icon: FaTags,
    path: "/admin-v2/categories",
  },
  {
    title: "Settings",
    icon: FaCog,
    path: "/admin-v2/settings",
  },

];

export default function Sidebar() {
  const { user } = useAuth();

  const permissions = user?.permissions || [];

  const hasPermission = (permission) => {
    if (user?.role === "superadmin") return true;
    return permissions.includes(permission);
  };

  const visibleMenuItems = menuItems.filter((item) => {
    if (item.title === "Admin Management") {
      return user?.role === "superadmin";
    }
    if (item.title === "Dashboard") return hasPermission("Dashboard");
    if (item.title === "Products") return hasPermission("Products");
    if (item.title === "Orders") return hasPermission("Orders");
    if (item.title === "Customers") return hasPermission("Customers");
    if (item.title === "Categories") return hasPermission("Categories");
    if (item.title === "Settings") return user?.role === "superadmin";
    return false;
  });

  return (
    <aside className="fixed left-0 top-0 z-50 h-screen w-[260px] overflow-hidden bg-gradient-to-b from-[#F7F3E9] via-[#F3EEDF] to-to-[#ECE5D4] text-[#4E4334] shadow-[10px_0_35px_rgba(0,0,0,.35)]">

      {/* Background Decoration */}

      <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[#7CCB5A]/10 blur-3xl"></div>

      <div className="absolute bottom-10 -left-24 h-80 w-80 rounded-full bg-[#4B7B37]/10 blur-3xl"></div>

      <div className="absolute inset-0 opacity-[0.04]">
        <div className="h-full w-full bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] bg-[size:22px_22px]" />
      </div>

      {/* Logo */}

      <div className="relative px-8 pt-8 pb-7">

        <div className="flex items-center gap-4">

          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-lg p-2">
  <img
  src={logo}
  alt="Craft Corner"
  className="h-14 w-14 object-contain drop-shadow-lg"
/>
</div>

          <div>
 <h1 className="text-[30px] font-black leading-[0.9] text-[#FFD54A]">
    Craft
  </h1>

  <h1 className="text-[30px] font-black leading-[0.9] text-[#FFD54A]">
    Corner
  </h1>

  <p className="mt-2 text-[15px] text-[#BFD6B6]">
    Premium Admin
  </p>
          </div>

        </div>

      </div>

      <div className="mx-6 h-px bg-white/10"></div>

      {/* Navigation */}

      <div className="relative flex-1 overflow-y-auto px-5 py-8">

        <p className="mb-6 px-3 text-xs font-semibold uppercase tracking-[4px] text-[#8DB56D] translate-x-10">
          Navigation
        </p>

        <div className="gap-y-12  translate-y-4" >

          {visibleMenuItems.map((item) => {
            const Icon = item.icon;

            return (

              <NavLink
  key={item.title}
  to={item.path}
  end
>
                {({ isActive }) => (

                 <div
  className={`group flex cursor-pointer items-center gap-4 rounded-2xl px-4 py-3 transition-all duration-300
  ${
    isActive
      ? "bg-[#E8D7B3] shadow-xl shadow-black/20"
      : "hover:bg-[#E8DDC8]"
  }`}
  style={{
    marginBottom: "10px",
  }}
>
                    {/* Icon */}

                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-xl transition-all duration-300

                      ${
                        isActive
                          ? "bg-white text-[#214122]"
                          : "bg-white/10 text-[#4E4334] group-hover:bg-white/20"
                      }

                      `}
                    >

                      <Icon size={18} />

                    </div>

                    {/* Title */}

                    <span
                      className={`text-[15px] font-medium transition-all

                      ${
                        isActive
                          ? "text-[#4E4334]"
                          : "text-[#4E4334]"
                      }

                      `}
                    >
                      {item.title}
                    </span>

                    {/* Active Dot */}

                    {isActive && (

                      <span className="ml-auto h-2.5 w-2.5 rounded-full bg-white"></span>

                    )}

                  </div>

                )}

              </NavLink>

            );

          })}

        </div>

      </div>

      {/* Bottom Section */}

<div
  className="relative px-5 pb-5"
  style={{
    transform: "translate(-6px,15px) scale(0.8)",
  }}
>

        {/* Decorative Glow */}

        <div className="absolute -left-24 bottom-10 h-52 w-52 rounded-full bg-[#79C85C]/10 blur-3xl"></div>

        <div className="absolute -right-20 top-0 h-44 w-44 rounded-full bg-[#F5B53D]/10 blur-3xl"></div>

        {/* Profile Card */}

        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur-xl">

          {/* Card Glow */}

          <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-white/10 blur-2xl"></div>







          {/* Profile */}

         <Link

to="/admin-v2/profile"

className="
block
cursor-pointer
hover:bg-[#FFF7E8]
rounded-2xl
p-2
transition
"

style={{
transform:"translateX(0px) translateY(0px)"
}}

>


<div className="flex items-center gap-4">


  <div className="relative">


   <div
className="
flex
h-14
w-14
items-center
justify-center
overflow-hidden
rounded-full
bg-gradient-to-br
from-[#F7C44A]
to-[#D79B1B]
text-xl
font-bold
text-[#17311A]
shadow-lg
"
>

{
  user?.avatar ? (

    <img

    src={user.avatar}

    alt="admin"

    className="
    h-full
    w-full
    object-cover
    "

    />

  ) : (

    user?.name?.charAt(0).toUpperCase() || "A"

  )
}

</div>



    <span className="absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-[#214122] bg-green-400"></span>


  </div>




  <div>


    <h3 className="font-semibold text-[#4E4334]">

  {user?.name || "Admin"}

</h3>



    <p className="text-sm text-green-300">

      Super Admin

    </p>


  </div>


</div>


</Link>



          {/* Small Divider */}

          <div className="my-5 h-px bg-white/10"></div>

          {/* Status */}

          <div className="flex items-center justify-between">

            <span className="text-sm text-gray-300">
              Status
            </span>

            <span className="rounded-full bg-green-500/20 px-3 py-1 text-xs font-semibold text-green-300">

              Online

            </span>

          </div>

          {/* Logout */}

          <button
            className="mt-6 flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-red-500 to-red-600 py-2.5 font-semibold text-[#4E4334] shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-red-500/30"
          >
            <FaSignOutAlt size={17} />

            Logout
          </button>

        </div>




        {/* Version */}

        <div className="mt-5 text-center">

          <p className="text-xs tracking-wider text-[#4E4334]">
            Craft Corner Admin
          </p>

          <p className="mt-1 text-[11px] text-[#4E4334]">
            Version 2.0
          </p>

        </div>

      </div>

    </aside>
  );
}