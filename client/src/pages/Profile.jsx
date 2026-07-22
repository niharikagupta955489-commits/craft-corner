export default function Profile() {
  return (
    <div className="min-h-screen bg-[#FAF7F0] py-12">

      <div className="max-w-5xl mx-auto px-6">

        <h1 className="text-4xl font-bold text-[#2F3A2D] mb-10">
          My Profile
        </h1>

        <div className="bg-white rounded-2xl shadow-md p-8">

          <div className="flex flex-col md:flex-row items-center gap-8">

            <img
              src="https://ui-avatars.com/api/?name=User&background=556B2F&color=fff&size=200"
              alt="Profile"
              className="w-36 h-36 rounded-full object-cover border-4 border-[#556B2F]"
            />

            <div className="flex-1">

              <h2 className="text-3xl font-bold text-[#2F3A2D]">
                John Doe
              </h2>

              <p className="text-gray-500 mt-2">
                john@example.com
              </p>

              <p className="text-gray-500 mt-1">
                +91 9876543210
              </p>

              <button className="mt-6 bg-[#556B2F] text-white px-6 py-3 rounded-xl hover:bg-[#445625]">
                Edit Profile
              </button>

            </div>

          </div>

          <hr className="my-8" />

          <h3 className="text-2xl font-bold text-[#2F3A2D] mb-6">
            Shipping Address
          </h3>

          <div className="grid md:grid-cols-2 gap-5">

            <input
              type="text"
              defaultValue="John Doe"
              className="border rounded-xl px-4 py-3"
            />

            <input
              type="email"
              defaultValue="john@example.com"
              className="border rounded-xl px-4 py-3"
            />

            <input
              type="tel"
              defaultValue="+91 9876543210"
              className="border rounded-xl px-4 py-3"
            />

            <input
              type="text"
              defaultValue="Jaipur"
              className="border rounded-xl px-4 py-3"
            />

            <input
              type="text"
              defaultValue="Rajasthan"
              className="border rounded-xl px-4 py-3"
            />

            <input
              type="text"
              defaultValue="302001"
              className="border rounded-xl px-4 py-3"
            />

          </div>

          <textarea
            rows="4"
            defaultValue="123 Handmade Street, Jaipur, Rajasthan"
            className="w-full mt-5 border rounded-xl px-4 py-3"
          />

          <button className="mt-6 bg-[#556B2F] text-white px-8 py-3 rounded-xl hover:bg-[#445625]">
            Save Changes
          </button>

        </div>

      </div>

    </div>
  );
}