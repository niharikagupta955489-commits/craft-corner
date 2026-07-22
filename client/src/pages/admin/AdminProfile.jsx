import { useState } from "react";

export default function AdminProfile() {
  const [admin, setAdmin] = useState({
    name: "Admin",
    email: "admin@craftcorner.com",
    phone: "+91 9876543210",
    role: "Super Admin",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setAdmin({
      ...admin,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Profile Updated Successfully");
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] p-8">

      <h1 className="text-4xl font-bold text-[#2F3A2D] mb-8">
        Admin Profile
      </h1>

      <div className="bg-white rounded-2xl shadow-md p-8 max-w-4xl">

        <div className="flex items-center gap-6 mb-8">

          <div className="w-28 h-28 rounded-full bg-[#556B2F] text-white flex items-center justify-center text-4xl font-bold">
            A
          </div>

          <div>

            <h2 className="text-3xl font-bold">
              {admin.name}
            </h2>

            <p className="text-gray-500 mt-2">
              {admin.role}
            </p>

          </div>

        </div>

        <form
          onSubmit={handleSubmit}
          className="grid md:grid-cols-2 gap-6"
        >

          <div>

            <label className="block mb-2 font-semibold">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={admin.name}
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
              value={admin.email}
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
              value={admin.phone}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3"
            />

          </div>

          <div>

            <label className="block mb-2 font-semibold">
              Role
            </label>

            <input
              type="text"
              value={admin.role}
              disabled
              className="w-full border rounded-xl px-4 py-3 bg-gray-100"
            />

          </div>

          <div>

            <label className="block mb-2 font-semibold">
              New Password
            </label>

            <input
              type="password"
              name="password"
              value={admin.password}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3"
            />

          </div>

          <div>

            <label className="block mb-2 font-semibold">
              Confirm Password
            </label>

            <input
              type="password"
              name="confirmPassword"
              value={admin.confirmPassword}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3"
            />

          </div>

          <div className="md:col-span-2">

            <button
              type="submit"
              className="bg-[#556B2F] text-white px-8 py-3 rounded-xl hover:bg-[#445625]"
            >
              Update Profile
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}