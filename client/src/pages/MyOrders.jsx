import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import toast from "react-hot-toast";

export default function MyOrders() {
  const { user } = useAuth();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?._id) {
      fetchOrders();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const res = await api.get(`/orders/user/${user._id}`);

      setOrders(res.data.orders || []);
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message || "Failed to fetch orders"
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-2xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F0] py-10">
      <div className="max-w-6xl mx-auto px-6">

        <h1 className="text-4xl font-bold text-[#2F3A2D] mb-8">
          My Orders
        </h1>

        {orders.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-md p-10 text-center">
            <h2 className="text-2xl font-bold">
              No Orders Found
            </h2>

            <p className="text-gray-500 mt-3">
              You haven't placed any orders yet.
            </p>
          </div>
        ) : (
          <div className="space-y-6">

            {orders.map((order) => (

              <div
                key={order._id}
                className="bg-white rounded-2xl shadow-md p-6"
              >

                <div className="flex justify-between">

                  <div>

                    <h2 className="font-bold text-lg">
                      Order ID
                    </h2>

                    <p className="text-gray-500">
                      {order._id}
                    </p>

                    <p className="text-sm text-gray-500 mt-2">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>

                  </div>

                  <div className="text-right">

                    <h2 className="font-bold">
                      Status
                    </h2>

                    <span
                      className={`px-3 py-1 rounded-full text-white ${
                        order.status === "Delivered"
                          ? "bg-green-600"
                          : order.status === "Shipped"
                          ? "bg-blue-600"
                          : "bg-yellow-500"
                      }`}
                    >
                      {order.status}
                    </span>

                  </div>

                </div>

                <hr className="my-5" />

                {order.items.map((item) => (

                  <div
                    key={item._id}
                    className="flex justify-between py-2"
                  >

                    <span>
                      {item.product?.name} × {item.quantity}
                    </span>

                    <span>
                      ₹{item.price * item.quantity}
                    </span>

                  </div>

                ))}

                <hr className="my-5" />

                <div className="flex justify-between text-xl font-bold">

                  <span>Total</span>

                  <span className="text-[#556B2F]">
                    ₹{order.totalPrice}
                  </span>

                </div>

              </div>

            ))}

          </div>
        )}

      </div>
    </div>
  );
}