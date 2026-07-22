import { Link } from "react-router-dom";

export default function OrderSuccess() {
  return (
    <div className="min-h-screen bg-[#FAF7F0] flex items-center justify-center px-6">

      <div className="bg-white rounded-2xl shadow-lg p-10 max-w-lg w-full text-center">

        <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto">

          <span className="text-5xl">
            ✅
          </span>

        </div>

        <h1 className="text-4xl font-bold text-[#2F3A2D] mt-6">
          Order Placed!
        </h1>

        <p className="text-gray-500 mt-4">
          Thank you for shopping with CraftCorner.
          Your order has been placed successfully.
        </p>

        <div className="bg-[#F8F8F8] rounded-xl p-5 mt-8">

          <p className="text-gray-500">
            Order ID
          </p>

          <h2 className="text-2xl font-bold text-[#556B2F] mt-2">
            #CC2026001
          </h2>

        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-8">

          <Link
            to="/orders"
            className="flex-1 bg-[#556B2F] text-white py-3 rounded-xl hover:bg-[#445625]"
          >
            View Orders
          </Link>

          <Link
            to="/marketplace"
            className="flex-1 border-2 border-[#556B2F] text-[#556B2F] py-3 rounded-xl hover:bg-[#556B2F] hover:text-white"
          >
            Continue Shopping
          </Link>

        </div>

      </div>

    </div>
  );
}