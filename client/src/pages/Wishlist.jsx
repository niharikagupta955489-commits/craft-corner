import { Link } from "react-router-dom";

export default function Wishlist() {

  const wishlist = [];

  return (
    <div className="min-h-screen bg-[#FAF7F0] py-12">

      <div className="max-w-7xl mx-auto px-6">

        <h1 className="text-4xl font-bold text-[#2F3A2D] mb-8">
          My Wishlist
        </h1>

        {wishlist.length === 0 ? (

          <div className="bg-white rounded-2xl shadow-md p-12 text-center">

            <h2 className="text-3xl font-bold text-[#2F3A2D]">
              Your Wishlist is Empty
            </h2>

            <p className="text-gray-500 mt-3">
              Save your favourite handmade products here.
            </p>

            <Link
              to="/marketplace"
              className="inline-block mt-6 bg-[#556B2F] text-white px-6 py-3 rounded-xl hover:bg-[#445625]"
            >
              Continue Shopping
            </Link>

          </div>

        ) : (

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

            {wishlist.map((item) => (

              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-md overflow-hidden"
              >

                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-56 object-cover"
                />

                <div className="p-5">

                  <h2 className="text-xl font-semibold text-[#2F3A2D]">
                    {item.name}
                  </h2>

                  <p className="text-[#556B2F] text-2xl font-bold mt-2">
                    ₹{item.price}
                  </p>

                  <div className="flex gap-3 mt-6">

                    <button className="flex-1 bg-[#556B2F] text-white py-3 rounded-xl hover:bg-[#445625]">
                      Add to Cart
                    </button>

                    <button className="px-4 bg-red-500 text-white rounded-xl hover:bg-red-600">
                      Remove
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}