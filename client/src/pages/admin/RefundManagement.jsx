import { useState } from "react";

export default function RefundManagement() {
  const [refunds, setRefunds] = useState([
    {
      id: "#RF1001",
      orderId: "#ORD1001",
      customer: "Rahul Sharma",
      amount: 1499,
      reason: "Damaged Product",
      status: "Pending",
    },
    {
      id: "#RF1002",
      orderId: "#ORD1005",
      customer: "Priya Singh",
      amount: 899,
      reason: "Wrong Item",
      status: "Approved",
    },
    {
      id: "#RF1003",
      orderId: "#ORD1008",
      customer: "Aman Verma",
      amount: 699,
      reason: "Quality Issue",
      status: "Rejected",
    },
  ]);

  const updateStatus = (id, status) => {
    setRefunds(
      refunds.map((refund) =>
        refund.id === id
          ? { ...refund, status }
          : refund
      )
    );
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] p-8">

      <h1 className="text-4xl font-bold text-[#2F3A2D] mb-8">
        Refund Management
      </h1>

      <div className="bg-white rounded-2xl shadow-md overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>
              <th className="text-left p-4">Refund ID</th>
              <th className="text-left p-4">Order</th>
              <th className="text-left p-4">Customer</th>
              <th className="text-left p-4">Amount</th>
              <th className="text-left p-4">Reason</th>
              <th className="text-left p-4">Status</th>
              <th className="text-center p-4">Action</th>
            </tr>

          </thead>

          <tbody>

            {refunds.map((refund) => (

              <tr
                key={refund.id}
                className="border-t hover:bg-gray-50"
              >

                <td className="p-4">
                  {refund.id}
                </td>

                <td className="p-4">
                  {refund.orderId}
                </td>

                <td className="p-4">
                  {refund.customer}
                </td>

                <td className="p-4">
                  ₹{refund.amount}
                </td>

                <td className="p-4">
                  {refund.reason}
                </td>

                <td className="p-4">

                  <span
                    className={`px-3 py-1 rounded-full text-white ${
                      refund.status === "Approved"
                        ? "bg-green-600"
                        : refund.status === "Rejected"
                        ? "bg-red-600"
                        : "bg-yellow-500"
                    }`}
                  >
                    {refund.status}
                  </span>

                </td>

                <td className="p-4 text-center">

                  <button
                    onClick={() =>
                      updateStatus(refund.id, "Approved")
                    }
                    className="bg-green-600 text-white px-3 py-2 rounded-lg mr-2 hover:bg-green-700"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() =>
                      updateStatus(refund.id, "Rejected")
                    }
                    className="bg-red-600 text-white px-3 py-2 rounded-lg"
                  >
                    Reject
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}