import { MoreVertical, Search, Eye } from "lucide-react";

const orders = [
  {
    id: "#CC1001",
    customer: "Rahul Sharma",
    product: "Handmade Pottery Vase",
    amount: "₹1,299",
    status: "Delivered",
    date: "28 Jul 2026",
  },
  {
    id: "#CC1002",
    customer: "Priya Verma",
    product: "Wooden Wall Art",
    amount: "₹2,499",
    status: "Processing",
    date: "27 Jul 2026",
  },
  {
    id: "#CC1003",
    customer: "Aman Singh",
    product: "Handloom Cushion",
    amount: "₹899",
    status: "Pending",
    date: "27 Jul 2026",
  },
  {
    id: "#CC1004",
    customer: "Sneha Patel",
    product: "Terracotta Lamp",
    amount: "₹1,899",
    status: "Delivered",
    date: "26 Jul 2026",
  },
];

const badgeColor = (status) => {
  switch (status) {
    case "Delivered":
      return "bg-green-100 text-green-700";

    case "Processing":
      return "bg-yellow-100 text-yellow-700";

    default:
      return "bg-red-100 text-red-600";
  }
};

export default function OrdersTable() {
  return (
    <div className="rounded-[30px] border border-gray-100 bg-white p-7 shadow-sm">

      <div className="mb-8 flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-bold">
            Recent Orders
          </h2>

          <p className="mt-1 text-gray-500">
            Latest customer purchases
          </p>

        </div>

        <div className="relative">

          <Search
            size={18}
            className="absolute left-4 top-3 text-gray-400"
          />

          <input
            placeholder="Search..."
            className="rounded-xl border border-gray-200 py-3 pl-11 pr-4 outline-none focus:border-green-600"
          />

        </div>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="border-b">

              <th className="pb-4 text-left text-gray-500">
                Order
              </th>

              <th className="pb-4 text-left text-gray-500">
                Customer
              </th>

              <th className="pb-4 text-left text-gray-500">
                Product
              </th>

              <th className="pb-4 text-left text-gray-500">
                Amount
              </th>

              <th className="pb-4 text-left text-gray-500">
                Status
              </th>

              <th className="pb-4 text-left text-gray-500">
                Date
              </th>

              <th className="pb-4"></th>

            </tr>

          </thead>

          <tbody>

            {orders.map((order) => (

              <tr
                key={order.id}
                className="border-b transition hover:bg-gray-50"
              >

                <td className="py-5 font-semibold">
                  {order.id}
                </td>

                <td>{order.customer}</td>

                <td>{order.product}</td>

                <td className="font-semibold">
                  {order.amount}
                </td>

                <td>

                  <span
                    className={`rounded-full px-4 py-2 text-sm font-medium ${badgeColor(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>

                </td>

                <td>{order.date}</td>

                <td>

                  <div className="flex gap-3">

                    <button className="rounded-lg bg-gray-100 p-2 hover:bg-green-100">

                      <Eye size={18} />

                    </button>

                    <button className="rounded-lg bg-gray-100 p-2 hover:bg-green-100">

                      <MoreVertical size={18} />

                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      <div className="mt-8 flex items-center justify-between">

        <p className="text-gray-500">
          Showing 1-4 of 48 Orders
        </p>

        <div className="flex gap-2">

          <button className="rounded-xl border px-4 py-2 hover:bg-gray-100">
            Previous
          </button>

          <button className="rounded-xl bg-[#5F8C42] px-4 py-2 text-white">
            1
          </button>

          <button className="rounded-xl border px-4 py-2 hover:bg-gray-100">
            2
          </button>

          <button className="rounded-xl border px-4 py-2 hover:bg-gray-100">
            Next
          </button>

        </div>

      </div>

    </div>
  );
}