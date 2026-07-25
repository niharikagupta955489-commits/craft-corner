import { Link } from "react-router-dom";
import { FaHeart, FaTrash } from "react-icons/fa";
import { useWishlist } from "../context/WishlistProvider";

export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();

  return (
    <div className="min-h-screen bg-[#F8F6F3] py-10">
      <div className="max-w-7xl mx-auto px-6">

        <h1 className="text-4xl font-bold text-[#556B2F] flex items-center gap-3 mb-8">
          <FaHeart className="text-red-500" />
          My Wishlist
        </h1>

        {wishlist.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow">
            <h2 className="text-2xl font-semibold mb-3">
              Your wishlist is empty
            </h2>

            <Link
              to="/marketplace"
              className="inline-block mt-4 bg-[#556B2F] text-white px-6 py-3 rounded-xl"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">

            {wishlist.map((product) => (

              <div
                key={product._id}
                className="bg-white rounded-2xl shadow overflow-hidden"
              >

                <Link to={`/product/${product._id}`}>
                  <img
                    src={product.images?.[0]}
                    alt={product.name}
                    className="w-full h-64 object-cover"
                  />
                </Link>

                <div className="p-4">

                  <h2 className="font-bold text-lg">
                    {product.name}
                  </h2>

                  <p className="text-[#556B2F] text-2xl font-bold mt-2">
                    ₹{product.price}
                  </p>

                  <button
                    onClick={() => removeFromWishlist(product._id)}
                    className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl flex justify-center items-center gap-2"
                  >
                    <FaTrash />
                    Remove
                  </button>

                </div>

              </div>

            ))}

          </div>
        )}

      </div>
    </div>
  );
}