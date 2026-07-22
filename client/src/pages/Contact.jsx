export default function Contact() {
  return (
    <div className="min-h-screen bg-[#FAF7F0] py-12">

      <div className="max-w-6xl mx-auto px-6">

        <h1 className="text-4xl font-bold text-center text-[#2F3A2D]">
          Contact Us
        </h1>

        <p className="text-center text-gray-500 mt-3">
          We'd love to hear from you. Send us your questions or feedback.
        </p>

        <div className="grid lg:grid-cols-2 gap-10 mt-12">

          <div className="bg-white rounded-2xl shadow-md p-8">

            <h2 className="text-2xl font-bold text-[#2F3A2D] mb-6">
              Get In Touch
            </h2>

            <div className="space-y-5">

              <div>
                <label className="block mb-2 font-medium">
                  Full Name
                </label>

                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full border rounded-xl px-4 py-3"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Email
                </label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full border rounded-xl px-4 py-3"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Subject
                </label>

                <input
                  type="text"
                  placeholder="Subject"
                  className="w-full border rounded-xl px-4 py-3"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Message
                </label>

                <textarea
                  rows="5"
                  placeholder="Write your message..."
                  className="w-full border rounded-xl px-4 py-3"
                />
              </div>

              <button className="w-full bg-[#556B2F] text-white py-3 rounded-xl hover:bg-[#445625]">
                Send Message
              </button>

            </div>

          </div>

          <div className="bg-white rounded-2xl shadow-md p-8">

            <h2 className="text-2xl font-bold text-[#2F3A2D] mb-6">
              Contact Information
            </h2>

            <div className="space-y-6">

              <div>
                <h3 className="font-semibold text-lg">
                  📍 Address
                </h3>

                <p className="text-gray-600 mt-2">
                  CraftCorner Marketplace
                  <br />
                  Jaipur, Rajasthan
                  <br />
                  India
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg">
                  📞 Phone
                </h3>

                <p className="text-gray-600 mt-2">
                  +91 98765 43210
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg">
                  ✉ Email
                </h3>

                <p className="text-gray-600 mt-2">
                  support@craftcorner.com
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg">
                  🕒 Working Hours
                </h3>

                <p className="text-gray-600 mt-2">
                  Monday - Saturday
                  <br />
                  9:00 AM - 6:00 PM
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}