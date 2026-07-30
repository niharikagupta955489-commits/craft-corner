export default function RecentOrders({ orders = [] }) {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-[#132715]">
          Recent Orders
        </h2>

        <button className="text-[#4B7B37] font-semibold hover:underline">
          View All
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b text-gray-500">
              <th className="text-left py-3">Order ID</th>
              <th className="text-left">Customer</th>
              <th className="text-left">Amount</th>
              <th className="text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr
                key={order._id}
                className="border-b hover:bg-gray-50"
              >
                <td className="py-4 font-medium">
                  #{order._id.slice(-6)}
                </td>

                <td>
                  {order.user?.name || "Customer"}
                </td>

                <td>
                  ₹{order.totalPrice}
                </td>

                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      order.isDelivered
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {order.isDelivered ? "Delivered" : "Pending"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}