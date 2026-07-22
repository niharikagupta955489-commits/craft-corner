import { useState } from "react";

export default function Settings() {
  const [settings, setSettings] = useState({
    storeName: "CraftCorner",
    email: "admin@craftcorner.com",
    phone: "+91 9876543210",
    address: "New Delhi, India",
    currency: "INR",
    maintenance: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setSettings({
      ...settings,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Settings Updated Successfully");
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] p-8">

      <h1 className="text-4xl font-bold text-[#2F3A2D] mb-8">
        Settings
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-md p-8 max-w-4xl"
      >

        <div className="grid md:grid-cols-2 gap-6">

          <div>

            <label className="block mb-2 font-semibold">
              Store Name
            </label>

            <input
              type="text"
              name="storeName"
              value={settings.storeName}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3"
            />

          </div>

          <div>

            <label className="block mb-2 font-semibold">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={settings.email}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3"
            />

          </div>

          <div>

            <label className="block mb-2 font-semibold">
              Phone
            </label>

            <input
              type="text"
              name="phone"
              value={settings.phone}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3"
            />

          </div>

          <div>

            <label className="block mb-2 font-semibold">
              Currency
            </label>

            <select
              name="currency"
              value={settings.currency}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3"
            >
              <option value="INR">INR (₹)</option>
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
            </select>

          </div>

        </div>

        <div className="mt-6">

          <label className="block mb-2 font-semibold">
            Store Address
          </label>

          <textarea
            rows="4"
            name="address"
            value={settings.address}
            onChange={handleChange}
            className="w-full border rounded-xl px-4 py-3"
          />

        </div>

        <div className="mt-6 flex items-center gap-3">

          <input
            type="checkbox"
            name="maintenance"
            checked={settings.maintenance}
            onChange={handleChange}
            className="w-5 h-5"
          />

          <label className="font-semibold">
            Enable Maintenance Mode
          </label>

        </div>

        <button
          type="submit"
          className="mt-8 bg-[#556B2F] text-white px-8 py-3 rounded-xl hover:bg-[#445625]"
        >
          Save Settings
        </button>

      </form>

    </div>
  );
}