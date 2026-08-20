import logo from "../../assets/logo.png";
import { useWishlist } from "../../context/WishlistProvider";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  FaSearch,
  FaHeart,
  FaShoppingCart,
  FaUserCircle,
  FaBox,
  FaUserShield,
  FaStore,
  FaRocket,
  FaBars,
  FaTimes,
  FaHome,
  FaCog,
  FaQuestionCircle,
  FaSignOutAlt,
} from "react-icons/fa";

export default function Navbar() {
  const [search, setSearch] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const { user, isLoggedIn, logout } = useAuth();
  const { wishlist } = useWishlist();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  const handleSearch = (e) => {

    if (e.key === "Enter" && search.trim()) {

      navigate(`/search?query=${search}`);

    }

  };


  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleSidebarLogout = () => {
    closeSidebar();
    logout();
    navigate("/login");
  };

  const sidebarItems = [
    { label: "Home", path: "/", icon: FaHome },
    { label: "Marketplace", path: "/marketplace", icon: FaStore },
    { label: "Wishlist", path: "/wishlist", icon: FaHeart, badge: wishlist.length },
    { label: "Cart", path: "/cart", icon: FaShoppingCart },
    { label: "My Orders", path: "/my-orders", icon: FaBox },
  ];

  return (
    <>
    <nav className="site-navbar sticky top-0 z-50 bg-[#FAF7F0] border-b border-gray-200">

      <div className="site-navbar-inner w-full h-16 px-6 lg:px-12 flex items-center gap-6">

        <button
          type="button"
          onClick={() => setIsSidebarOpen(true)}
          aria-label="Open menu"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl   text-[#3D3023]  transition hover:bg-[#EEF3E8] hover:text-[#556B2F]
" style={{
    transform: "translate(4px,0px) scale(1.3)",
  }}

        >
          <FaBars size={21} />
        </button>

        <Link to="/" className="shrink-0">

          <img
            src={logo}
            alt="Craft Corner"
            className="h-14 w-14 object-contain"
          />

        </Link>

        <div className="flex-1 relative">

          <FaSearch
            className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
            size={16}
          />

          <input
            type="text"
            placeholder="Search handmade products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleSearch}
            style={{
              paddingLeft: "60px"
            }}
            className="w-full h-11 rounded-xl border border-gray-200 bg-white pr-4 outline-none shadow-sm focus:border-[#556B2F]"
          />

        </div>

        <Link
          to="/marketplace"
          className="flex items-center gap-2 hover:text-[#556B2F]"
        >

          <FaStore size={20} />

          <span className="hidden lg:block">
            Marketplace
          </span>

        </Link>

        <div className="flex items-center gap-6">

          <Link
            to="/wishlist"
            className="relative flex items-center gap-2 hover:text-[#556B2F]"
          >
            <FaHeart
              size={20}
              className="text-red-500"
            />

            <span className="hidden lg:block">
              Wishlist
            </span>

            {wishlist.length > 0 && (

              <span
                className="
      absolute
      -top-2
      -right-3
      bg-red-500
      text-white
      w-5
      h-5
      rounded-full
      text-xs
      flex
      items-center
      justify-center
      "
              >
                {wishlist.length}
              </span>

            )}

          </Link>
          <Link
            to="/cart"
            className="flex items-center gap-2 hover:text-[#556B2F]"
          >
            <FaShoppingCart size={20} />
            <span className="hidden lg:block">
              Cart
            </span>
          </Link>
          {isLoggedIn &&
            ["admin", "superadmin"].includes(user?.role) && (

              <Link
                to="/my-orders"
                className="flex items-center gap-2 hover:text-[#556B2F]"
              >
                <FaBox size={20} />

                <span className="hidden lg:block">
                  My Orders
                </span>

              </Link>

            )}

        {isLoggedIn &&
  ["admin", "superadmin", "Super Admin"].includes(user?.role) && (
    <Link
      to="/admin-v2"
      className="flex items-center gap-3 text-[#556B2F] bg-[#EEF3E8] w-44 justify-center px-5 py-2.5 rounded-xl border border-[#D6E2C8] hover:bg-[#E2EBCF] transition"
    >
      <FaRocket />
      <span>Admin Portal</span>
    </Link>
  )}

          {isLoggedIn ? (

            <div className="flex items-center gap-3">

              <Link
                to="/profile"
                className="
    flex
    items-center
    gap-2
    hover:text-[#556B2F]
    cursor-pointer
    "
              >

                {
                  user?.avatar ? (

                    <img

                      src={user.avatar}

                      alt="profile"

                      className="
      h-10
      w-10
      rounded-full
      object-cover
      border
      border-[#C98A3D]
      "

                    />

                  ) : (

                    <FaUserCircle size={22} />

                  )
                }


                <span className="hidden lg:block font-semibold">
                  {user?.name}
                </span>

              </Link>


              <button
                onClick={handleLogout}
                className="
    w-28
    flex
    items-center
    justify-center
    text-red-600
    bg-red-50
    px-5
    py-2.5
    rounded-xl
    border
    border-red-200
    hover:bg-red-100
    transition
    "
              >
                Logout
              </button>

            </div>

          ) : (

            <Link
              to="/login"
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 bg-white hover:border-[#556B2F] hover:text-[#556B2F]"
            >

              <FaUserCircle size={22} />

              <span className="hidden lg:block">
                Login
              </span>

            </Link>

          )}

        </div>

      </div>

    </nav>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/30 backdrop-blur-[1px]"
          style={{

                transform: "translate(0px,0px) scale(1)",
              }}
          onClick={closeSidebar}
       style={{

                transform: "translate(0px,0px) scale(1)",
              }} />
      )}

      <aside
        className={`fixed left-0 top-0 z-[70] h-screen w-[260px] max-w-[88vw] transform bg-[#FAF7F0] shadow-2xl transition-transform duration-300 ease-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col overflow-y-auto"
        style={{

                transform: "translate(0px,20px) scale(1)",
              }}>
          <div className="flex items-center justify-between border-b border-[#E8DDCC] px-6 py-5"
          style={{

                transform: "translate(-20px,-10px) scale(0.8)",
              }}>
            <Link to="/" onClick={closeSidebar} className="flex items-center gap-3"
            style={{

                transform: "translate(0px,0px) scale(1)",
              }}>
              <img src={logo} alt="Craft Corner" className="h-16 w-16 object-contain"
              style={{

                transform: "translate(0px,0px) scale(1)",
              }} />
              <div>
                <div className="text-2xl font-bold text-[#3D3023]"
               style={{

                transform: "translate(0px,0px) scale(1)",
              }} >Craft Corner</div>
                <div className="text-sm text-[#556B2F]"
               style={{

                transform: "translate(0px,0px) scale(1)",
              }} >Handmade with Love</div>
              </div>
            </Link>

            <button
              type="button"
              onClick={closeSidebar}
              aria-label="Close menu"
              className="rounded-full p-2 text-[#3D3023] transition hover:bg-[#EEF3E8]"
              style={{

                transform: "translate(10px,0px) scale(1)",
              }}
            >
              <FaTimes size={20} />
            </button>
          </div>

          <div className="flex-1 px-5 py-6"
          style={{

                transform: "translate(14px,10px) scale(1)",
              }}>
            
            <div className="!space-y-8"
            style={{

                transform: "translate(10px,0px) scale(1)",
              }}>
              {sidebarItems.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.label}
                    to={item.path}
                    onClick={closeSidebar}
                    className="flex items-center gap-8 rounded-xl px-4 py-3. text-[#3D3023] transition hover:bg-[#EEF3E8] hover:text-[#556B2F]"
                  style={{

                transform: "translate(0px,0px) scale(1)",
              }}
 >
                    <Icon size={22} />
                    <span className="flex-1 text-base font-medium"
                     style={{

                transform: "translate(0px,0px) scale(1)",
              }}
>{item.label}</span>

                    {item.badge > 0 && (
                      <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-red-500 px-1.5 text-xs font-bold text-white"
                    style={{

                transform: "translate(-80px,0px) scale(1)",
              }}  >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}

              {isLoggedIn &&
                ["admin", "superadmin", "Super Admin"].includes(user?.role) && (
                  <Link
                    to="/admin-v2"
                    onClick={closeSidebar}
                    className="flex items-center gap-5 rounded-xl px-4 py-3.5 text-[#556B2F] transition hover:bg-[#EEF3E8]"
                  style={{

                transform: "translate(0px,0px) scale(1)",
              }}>
                    <FaRocket size={21} />
                    <span className="flex-1 text-base font-semibold"
                    style={{

                transform: "translate(0px,0px) scale(1)",
              }}>Admin Portal</span>
                  </Link>
                )}
            </div>

            {isLoggedIn && (
              <>
                <div className="my-6 border-t border-[#E8DDCC]"style={{

                transform: "translate(0px,30px) scale(1)",
              }} />

                <div className="!space-y-8">
                  <Link
                    to="/profile"
                    onClick={closeSidebar}
                    className="flex items-center gap-5 rounded-xl px-4 py-3.5 text-[#3D3023] transition hover:bg-[#EEF3E8] hover:text-[#556B2F]"
                  style={{

                transform: "translate(3px,50px) scale(1)",
              }}>
                    <FaUserCircle size={25} style={{

                transform: "translate(-2px,50px) scale(1)",
              }}/>
                    <span className="text-base font-medium"
                    style={{

                transform: "translate(3px,50px) scale(1.1)",
              }}>Profile</span>
                  </Link>

                  <Link
                    to="/settings"
                    onClick={closeSidebar}
                    className="flex items-center gap-5 rounded-xl px-4 py-3.5 text-[#3D3023] transition hover:bg-[#EEF3E8] hover:text-[#556B2F]"style={{

                transform: "translate(3px,0px) scale(1)",
              }}
                  >
                    <FaCog size={21} />
                    <span className="text-base font-medium"style={{

                transform: "translate(3px,0px) scale(1)",
              }}
              >Settings</span>
                  </Link>

                  <Link
                    to="/contact"
                    onClick={closeSidebar}
                    className="flex items-center gap-5 rounded-xl px-4 py-3.5 text-[#3D3023] transition hover:bg-[#EEF3E8] hover:text-[#556B2F]"style={{

                transform: "translate(3px,30px) scale(1)",
              }}
                  >
                    <FaQuestionCircle size={21} style={{

                transform: "translate(0px,0px) scale(1)",
              }}/>
                    <span className="text-base font-medium"
                    style={{

                transform: "translate(0px,0px) scale(1)",
              }}>Contact us</span>
                  </Link>
                </div>
              </>
            )}
          </div>

          {isLoggedIn && (
            <div className="border-t border-[#E8DDCC] !px-5 !py-7"
            style={{

                transform: "translate(0px,0px) scale(1)",
              }}>
              <button
                type="button"
                onClick={handleSidebarLogout}
                className="flex w-full items-center gap-5 rounded-xl px-4 py-3.5 text-red-600 transition hover:bg-red-50"style={{

                transform: "translate(40px,0px) scale(1)",
              }}
              >
                <FaSignOutAlt size={21} />
                <span className="text-base font-semibold"
                style={{

                transform: "translate(0px,0px) scale(1)",
              }}>Logout</span>
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}