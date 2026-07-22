import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();
const navigate = useNavigate();

  const total = cart.reduce(
  (sum, item) => sum + item.product.price * item.quantity,
  0
);

  return (
    <div className="min-h-screen bg-[#FAF7F0] py-10">
    <div className="max-w-7xl mx-auto px-6 lg:px-10">

        <h1 className="text-4xl font-bold text-[#2F3A2D] mb-10">
          Shopping Cart
        </h1>

        {cart.length === 0 ? (

          <div className="bg-white rounded-2xl shadow-md p-12 text-center flex flex-col justify-center items-center min-h-[400px]">

            <h2 className="text-3xl font-bold text-[#2F3A2D]">
              Your Cart is EmptyclassName="w-28 h-28 object-cover rounded-xl flex-shrink-0"className="w-28 h-28 object-cover rounded-xl flex-shrink-
            </h2>

            <p className="text-gray-500 mt-3">
              Add some beautiful handmade products.
            </p>

          </div>

        ) : (

     <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10 items-start">

            <div className="w-full">

              {cart.map((item) => (

                <div
                  key={item._id}
                  className="bg-white rounded-2xl shadow-md p-5 mb-6 flex gap-6"
                >

                  <img
                    src={item.product.images?.[0]}
                    alt={item.product.name}
                    className="w-5 h-28 object-cover rounded-xl"
                  />

                  <div className="flex-1">

                    <h2 className="text-2xl font-semibold text-[#2F3A2D]">
                      {item.product.name}
                    </h2>

                    <p className="text-[#556B2F] text-xl font-bold mt-2">
                      {item.product.name}
                    </p>

                    <p className="text-gray-500 mt-2">
                      {item.product.description}
                    </p>

                    <div className="flex items-center mt-5 gap-3">

                      <button
                        onClick={() => decreaseQuantity(item._id, item.quantity)}
                        className="w-9 h-9 rounded-lg bg-gray-200 hover:bg-gray-300"
                      >
                        -
                      </button>

                      <span className="text-lg font-semibold w-6 text-center">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => increaseQuantity(item._id, item.quantity)}
                        className="w-9 h-9 rounded-lg bg-gray-200 hover:bg-gray-300"
                      >
                        +
                      </button>

                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="ml-auto px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
                      >
                        Remove
                      </button>

                    </div>

                  </div>

                </div>

              ))}

            </div>

            <div>

              <div className="bg-white rounded-2xl shadow-md p-6 sticky top-24">

                <h2 className="text-2xl font-bold text-[#2F3A2D]">
                  Order Summary
                </h2>

                <div className="flex justify-between mt-6 text-lg">
                  <span>Total Items</span>

                  <span>
                    {cart.reduce(
                      (sum, item) => sum + item.quantity,
                      0
                    )}
                  </span>
                </div>

                <div className="flex justify-between mt-4 text-xl font-semibold">
                  <span>Total Price</span>

                  <span className="text-[#556B2F]">
                    ₹{total}
                  </span>
                </div>

                <button
  onClick={() => navigate("/checkout")}
  className="w-full mt-8 py-3 rounded-xl bg-[#556B2F] text-white font-semibold hover:bg-[#445625] transition"
>
  Proceed to Checkout
</button>

              </div>

            </div>

          </div>

        )}

      </div>
    </div>
  );
}