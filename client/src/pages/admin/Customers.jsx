import { useEffect, useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCustomers = async () => {
    try {
      const res = await api.get("/auth/users");
      setCustomers(res.data.users || []);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Failed to fetch customers"
      );
    } finally {
      setLoading(false);
    }
  };

  const deleteCustomer = async (id) => {
    if (!window.confirm("Delete this customer?")) return;

    try {
      await api.delete(`/auth/users/${id}`);

      toast.success("Customer Deleted");

      fetchCustomers();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Delete Failed"
      );
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-2xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5] p-8">

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-4xl font-bold text-[#2F3A2D]">
          Customers
        </h1>

      </div>

      <div className="bg-white rounded-2xl shadow-md overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="text-left p-4">
                ID
              </th>

              <th className="text-left p-4">
                Customer
              </th>

              <th className="text-left p-4">
                Email
              </th>

              <th className="text-left p-4">
                Phone
              </th>

              <th className="text-left p-4">
                Orders
              </th>

              <th className="text-center p-4">
                Action
              </th>

            </tr>

          </thead>

          <tbody>
          {customers.length === 0 ? (

            <tr>

              <td
                colSpan="6"
                className="text-center p-6"
              >
                No Customers Found
              </td>

            </tr>

          ) : (

            customers.map((customer, index) => (

              <tr
                key={customer._id}
                className="border-t hover:bg-gray-50"
              >

                <td className="p-4">
                  {index + 1}
                </td>

                <td className="p-4 font-semibold">
                  {customer.name}
                </td>

                <td className="p-4">
                  {customer.email}
                </td>

                <td className="p-4">
                  {customer.phone || "-"}
                </td>

                <td className="p-4">
                  -
                </td>

                <td className="p-4 text-center">

                  <button
                    onClick={() =>
                      alert(
`Name : ${customer.name}

Email : ${customer.email}

Phone : ${customer.phone || "-"}

Role : ${customer.role}`
                      )
                    }
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-blue-600"
                  >
                    View
                  </button>

                  <button
                    onClick={() =>
                      deleteCustomer(customer._id)
                    }
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>

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