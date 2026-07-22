import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../services/api";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
export default function Checkout() {
 const { user } = useAuth();

const { cart, fetchCart } = useCart();

const navigate = useNavigate();

const [address, setAddress] = useState("");

const [loading, setLoading] = useState(false);

  const total = cart.reduce(
  (sum, item) => sum + item.product.price * item.quantity,
  0
);


const placeOrder = async () => {

  if (!address) {
    toast.error("Please enter shipping address");
    return;
  }

  try {

    setLoading(true);

    const res = await api.post("/orders", {
      userId: user._id,
      shippingAddress: address,
      paymentMethod: "Cash On Delivery",
    });

    toast.success(res.data.message);

    await fetchCart();

    navigate("/");

  } catch (error) {

    toast.error(
      error.response?.data?.message || "Order Failed"
    );

  } finally {

    setLoading(false);

  }

};

  return (
    <div className="min-h-screen bg-[#FAF7F0] py-12">

      <div className="max-w-7xl mx-auto px-6">

        <h1 className="text-4xl font-bold text-[#2F3A2D] mb-10">
          Checkout
        </h1>

        <div className="grid lg:grid-cols-[2fr_1fr] gap-8">

          <div className="bg-white rounded-2xl shadow-md p-8">

            <h2 className="text-2xl font-bold mb-6">
              Shipping Address
            </h2>

            <div className="grid md:grid-cols-2 gap-5">

              <input
                type="text"
                placeholder="Full Name"
                className="border rounded-xl px-4 py-3"
              />

              <input
                type="tel"
                placeholder="Phone Number"
                className="border rounded-xl px-4 py-3"
              />

              <input
                type="text"
                placeholder="City"
                className="border rounded-xl px-4 py-3"
              />

              <input
                type="text"
                placeholder="State"
                className="border rounded-xl px-4 py-3"
              />

              <input
                type="text"
                placeholder="Pincode"
                className="border rounded-xl px-4 py-3"
              />

              <input
                type="text"
                placeholder="Country"
                defaultValue="India"
                className="border rounded-xl px-4 py-3"
              />

            </div>

            <textarea
  placeholder="Complete Address"
  rows="4"
  value={address}
  onChange={(e) => setAddress(e.target.value)}
  className="border rounded-xl px-4 py-3 mt-5 w-full"
/>

            <h2 className="text-2xl font-bold mt-10 mb-5">
              Payment Method
            </h2>

            <div className="space-y-4">

              <label className="flex items-center gap-3">
                <input type="radio" name="payment" defaultChecked />
                Cash on Delivery
              </label>

              <label className="flex items-center gap-3">
                <input type="radio" name="payment" />
                UPI
              </label>

              <label className="flex items-center gap-3">
                <input type="radio" name="payment" />
                Credit / Debit Card
              </label>

            </div>

          </div>

          <div>

            <div className="bg-white rounded-2xl shadow-md p-6 sticky top-24">

              <h2 className="text-2xl font-bold">
                Order Summary
              </h2>

              <div className="mt-6 space-y-4">

                {cart.map((item) => (

                  <div
                   key={item._id}
                    className="flex justify-between"
                  >
                    <span>
                      {item.product.name} x {item.quantity}
                    </span>

                    <span>
                     ₹{item.product.price * item.quantity}
                    </span>

                  </div>

                ))}

              </div>

              <hr className="my-6" />

              <div className="flex justify-between text-xl font-bold">

                <span>Total</span>

                <span className="text-[#556B2F]">
                  ₹{total}
                </span>

              </div>

              <button
  onClick={placeOrder}
  disabled={loading}
  className="w-full mt-8 bg-[#556B2F] text-white py-3 rounded-xl hover:bg-[#445625] disabled:opacity-50"
>
  {loading ? "Placing Order..." : "Place Order"}
</button>
               

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}