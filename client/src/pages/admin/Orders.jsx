import { useEffect, useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await api.get("/orders");
      setOrders(res.data.orders || []);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to fetch orders"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/orders/${id}`, {
        status,
      });

      toast.success("Status Updated");

      fetchOrders();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Update Failed"
      );
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
    <div className="min-h-screen bg-[#F5F5F5] p-8">

      <h1 className="text-4xl font-bold text-[#2F3A2D] mb-8">
        Orders
      </h1>

      <div className="bg-white rounded-2xl shadow-md overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>
              <th className="text-left p-4">Order ID</th>
              <th className="text-left p-4">Customer</th>
              <th className="text-left p-4">Date</th>
              <th className="text-left p-4">Amount</th>
              <th className="text-left p-4">Status</th>
            </tr>

          </thead>

          <tbody>

            {orders.length === 0 ? (

              <tr>
                <td
                  colSpan="5"
                  className="text-center p-8"
                >
                  No Orders Found
                </td>
              </tr>

            ) : (

              orders.map((order) => (

                <tr
                  key={order._id}
                  className="border-t hover:bg-gray-50"
                >

                  <td className="p-4 font-medium">
                    {order._id}
                  </td>

                  <td className="p-4">
                    {order.user?.name}
                  </td>

                  <td className="p-4">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>

                  <td className="p-4">
                    ₹{order.totalPrice}
                  </td>

                  <td className="p-4">

                    <select
                      value={order.status}
                      onChange={(e) =>
                        updateStatus(order._id, e.target.value)
                      }
                      className="border rounded-lg px-3 py-2"
                    >
                      <option value="Pending">
                        Pending
                      </option>

                      <option value="Shipped">
                        Shipped
                      </option>

                      <option value="Delivered">
                        Delivered
                      </option>

                    </select>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}