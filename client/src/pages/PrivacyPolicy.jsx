export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#FAF7F0] py-12">

      <div className="max-w-5xl mx-auto px-6">

        <h1 className="text-4xl font-bold text-[#2F3A2D] mb-8">
          Privacy Policy
        </h1>

        <div className="bg-white rounded-2xl shadow-md p-8 space-y-8">

          <section>

            <h2 className="text-2xl font-semibold text-[#2F3A2D]">
              Information We Collect
            </h2>

            <p className="text-gray-600 mt-3 leading-7">
              We collect your name, email address, phone number, shipping
              address and order information to process your purchases and
              improve your shopping experience.
            </p>

          </section>

          <section>

            <h2 className="text-2xl font-semibold text-[#2F3A2D]">
              How We Use Your Information
            </h2>

            <ul className="list-disc ml-6 mt-3 text-gray-600 space-y-2">
              <li>Process and deliver orders.</li>
              <li>Provide customer support.</li>
              <li>Send order updates.</li>
              <li>Improve our marketplace.</li>
            </ul>

          </section>

          <section>

            <h2 className="text-2xl font-semibold text-[#2F3A2D]">
              Data Security
            </h2>

            <p className="text-gray-600 mt-3 leading-7">
              We use secure technologies to protect your personal information
              and payment details.
            </p>

          </section>

          <section>

            <h2 className="text-2xl font-semibold text-[#2F3A2D]">
              Contact Us
            </h2>

            <p className="text-gray-600 mt-3">
              Email: support@craftcorner.com
            </p>

          </section>

        </div>

      </div>

    </div>
  );
}