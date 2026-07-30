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
} from "react-icons/fa";

export default function Navbar() {
const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const { user, isLoggedIn, logout } = useAuth();
const { wishlist } = useWishlist();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
const handleSearch = (e) => {

  if(e.key === "Enter" && search.trim()){

    navigate(`/search?query=${search}`);

  }

};

  return (
    <nav className="sticky top-0 z-50 bg-[#FAF7F0] border-b border-gray-200">

      <div className="w-full h-16 px-6 lg:px-12 flex items-center gap-6">

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
  onChange={(e)=>setSearch(e.target.value)}
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

  <FaStore size={20}/>

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
            user?.role === "user" && (

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
            user?.role === "admin" && (
 <>
   
    <Link
      to="/admin-v2"
     className="flex items-center gap-3 text-[#556B2F] bg-[#EEF3E8] w-44 justify-center px-5 py-2.5 rounded-xl border border-[#D6E2C8] hover:bg-[#E2EBCF] transition"
    >

      <FaRocket />
      <span>Admin Portal</span>
    </Link>
  </>

)}

          {isLoggedIn ? (

            <div className="flex items-center gap-3">

              <div className="flex items-center gap-2">

                <FaUserCircle size={22} />

                <span className="hidden lg:block font-semibold">
                  {user?.name}
                </span>

              </div>

              <button
  onClick={handleLogout}
  className="w-28 flex items-center justify-center text-red-600 bg-red-50 px-5 py-2.5 rounded-xl border border-red-200 hover:bg-red-100 transition"
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
  );
}