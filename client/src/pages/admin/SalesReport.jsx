import { useState } from "react";

export default function SalesReport() {
  const [sales] = useState([
    {
      id: "#ORD1001",
      customer: "Rahul Sharma",
      amount: 2499,
      payment: "Paid",
      date: "22 Jul 2026",
    },
    {
      id: "#ORD1002",
      customer: "Priya Singh",
      amount: 1899,
      payment: "Paid",
      date: "21 Jul 2026",
    },
    {
      id: "#ORD1003",
      customer: "Aman Verma",
      amount: 999,
      payment: "Pending",
      date: "20 Jul 2026",
    },
  ]);

  const totalRevenue = sales.reduce(
    (sum, sale) => sale.payment === "Paid" ? sum + sale.amount : sum,
    0
  );

  return (
    <div className="min-h-screen bg-[#F5F5F5] p-8">

      <h1 className="text-4xl font-bold text-[#2F3A2D] mb-8">
        Sales Report
      </h1>

      <div className="grid md:grid-cols-3 gap-6 mb-8">

        <div className="bg-white rounded-2xl shadow p-6">
          <p className="text-gray-500">
            Total Revenue
          </p>

          <h2 className="text-3xl font-bold text-green-600 mt-2">
            ₹{totalRevenue}
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <p className="text-gray-500">
            Total Orders
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {sales.length}
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <p className="text-gray-500">
            Successful Payments
          </p>

          <h2 className="text-3xl font-bold text-blue-600 mt-2">
            {sales.filter((sale) => sale.payment === "Paid").length}
          </h2>
        </div>

      </div>

      <div className="bg-white rounded-2xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>
              <th className="text-left p-4">Order ID</th>
              <th className="text-left p-4">Customer</th>
              <th className="text-left p-4">Amount</th>
              <th className="text-left p-4">Payment</th>
              <th className="text-left p-4">Date</th>
            </tr>

          </thead>

          <tbody>

            {sales.map((sale) => (

              <tr
                key={sale.id}
                className="border-t hover:bg-gray-50"
              >

                <td className="p-4">
                  {sale.id}
                </td>

                <td className="p-4">
                  {sale.customer}
                </td>

                <td className="p-4">
                  ₹{sale.amount}
                </td>

                <td className="p-4">

                  <span
                    className={`px-3 py-1 rounded-full text-white ${
                      sale.payment === "Paid"
                        ? "bg-green-600"
                        : "bg-yellow-500"
                    }`}
                  >
                    {sale.payment}
                  </span>

                </td>

                <td className="p-4">
                  {sale.date}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}