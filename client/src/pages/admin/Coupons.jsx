import { useState } from "react";

export default function Coupons() {
  const [coupons, setCoupons] = useState([
    {
      id: 1,
      code: "WELCOME10",
      discount: "10%",
      expiry: "31 Dec 2026",
    },
    {
      id: 2,
      code: "CRAFT20",
      discount: "20%",
      expiry: "15 Aug 2026",
    },
  ]);

  const [form, setForm] = useState({
    code: "",
    discount: "",
    expiry: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const addCoupon = (e) => {
    e.preventDefault();

    if (!form.code || !form.discount || !form.expiry) return;

    setCoupons([
      ...coupons,
      {
        id: Date.now(),
        ...form,
      },
    ]);

    setForm({
      code: "",
      discount: "",
      expiry: "",
    });
  };

  const deleteCoupon = (id) => {
    setCoupons(coupons.filter((coupon) => coupon.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] p-8">

      <h1 className="text-4xl font-bold text-[#2F3A2D] mb-8">
        Coupons
      </h1>

      <form
        onSubmit={addCoupon}
        className="bg-white rounded-2xl shadow-md p-6 mb-8"
      >

        <div className="grid md:grid-cols-3 gap-4">

          <input
            type="text"
            name="code"
            placeholder="Coupon Code"
            value={form.code}
            onChange={handleChange}
            className="border rounded-xl px-4 py-3"
          />

          <input
            type="text"
            name="discount"
            placeholder="Discount (10%)"
            value={form.discount}
            onChange={handleChange}
            className="border rounded-xl px-4 py-3"
          />

          <input
            type="date"
            name="expiry"
            value={form.expiry}
            onChange={handleChange}
            className="border rounded-xl px-4 py-3"
          />

        </div>

        <button
          type="submit"
          className="mt-6 bg-[#556B2F] text-white px-6 py-3 rounded-xl hover:bg-[#445625]"
        >
          Add Coupon
        </button>

      </form>

      <div className="bg-white rounded-2xl shadow-md overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="text-left p-4">Code</th>
              <th className="text-left p-4">Discount</th>
              <th className="text-left p-4">Expiry</th>
              <th className="text-center p-4">Action</th>

            </tr>

          </thead>

          <tbody>

            {coupons.map((coupon) => (

              <tr
                key={coupon.id}
                className="border-t hover:bg-gray-50"
              >

                <td className="p-4 font-semibold">
                  {coupon.code}
                </td>

                <td className="p-4">
                  {coupon.discount}
                </td>

                <td className="p-4">
                  {coupon.expiry}
                </td>

                <td className="p-4 text-center">

                  <button
                    onClick={() => deleteCoupon(coupon.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                  >
                    Delete
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