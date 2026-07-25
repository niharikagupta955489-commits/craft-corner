import { useState } from "react";
import toast from "react-hot-toast";

export default function CouponSection({
  onApplyCoupon,
}) {
  const [coupon, setCoupon] = useState("");

  const handleApply = () => {
    if (!coupon.trim()) {
      toast.error("Please enter a coupon code");
      return;
    }

    onApplyCoupon(coupon.trim().toUpperCase());
  };

  return (
    <div className="mb-8">

      <label className="block text-lg font-semibold text-[#2F3A2D] mb-3">
        Promo Code
      </label>

      <div className="flex">

        <input
          type="text"
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
          placeholder="Enter coupon code"
          className="
            flex-1
            border
            border-gray-300
            rounded-l-xl
            px-4
            py-3
            outline-none
            focus:border-[#556B2F]
          "
        />

        <button
          onClick={handleApply}
          className="
            px-6
            bg-[#556B2F]
            text-white
            rounded-r-xl
            hover:bg-[#445625]
            transition
          "
        >
          Apply
        </button>

      </div>

      <p className="text-sm text-gray-500 mt-3">
        Try: <span className="font-semibold">SAVE10</span> or <span className="font-semibold">WELCOME20</span>
      </p>

    </div>
  );
}