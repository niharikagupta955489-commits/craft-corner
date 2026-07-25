import { useState } from "react";
import {
  FaArrowRight,
  FaShieldAlt,
  FaTruck,
  FaUndoAlt,
} from "react-icons/fa";
import toast from "react-hot-toast";

export default function OrderSummary({
  subtotal,
  onCheckout,
}) {
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

  const shipping = subtotal >= 499 ? 0 : 49;
  const tax = Math.round(subtotal * 0.05);

  const handleApplyCoupon = () => {
    const code = coupon.trim().toUpperCase();

    if (!code) {
      toast.error("Please enter a coupon code");
      return;
    }

    if (code === "SAVE10") {
      setDiscount(Math.round(subtotal * 0.1));
      toast.success("10% Discount Applied 🎉");
    }

    else if (code === "WELCOME20") {
      setDiscount(Math.round(subtotal * 0.2));
      toast.success("20% Discount Applied 🎉");
    }

    else {
      setDiscount(0);
      toast.error("Invalid Coupon");
    }
  };

  const total =
    subtotal +
    shipping +
    tax -
    discount;

  return (
    <div className="sticky top-28">

      <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-8">

        <h2 className="text-3xl font-bold text-[#2F3A2D] mb-8">
          Order Summary
        </h2>

        {/* Coupon */}

        <h3 className="font-semibold text-lg mb-3">
          Promo Code
        </h3>

        <div className="flex">

          <input
            type="text"
            placeholder="Enter coupon"
            value={coupon}
            onChange={(e)=>setCoupon(e.target.value)}
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
            onClick={handleApplyCoupon}
            className="
            bg-[#556B2F]
            hover:bg-[#445625]
            text-white
            px-6
            rounded-r-xl
            transition
            "
          >
            Apply
          </button>

        </div>

        <p className="text-sm text-gray-500 mt-3">
          Try:
          <span className="font-semibold ml-2">
            SAVE10
          </span>

          <span className="mx-2">
            |
          </span>

          <span className="font-semibold">
            WELCOME20
          </span>

        </p>

        <hr className="my-8" />

        {/* Price Details */}

        <div className="space-y-5">

          <div className="flex justify-between">

            <span>
              Subtotal
            </span>

            <span>
              ₹{subtotal}
            </span>

          </div>

          <div className="flex justify-between">

            <span>
              Shipping
            </span>

            <span className="text-green-600">

              {shipping === 0
                ? "FREE"
                : `₹${shipping}`}

            </span>

          </div>

          <div className="flex justify-between">

            <span>
              Tax
            </span>

            <span>
              ₹{tax}
            </span>

          </div>

          <div className="flex justify-between text-green-600">

            <span>
              Discount
            </span>

            <span>
              -₹{discount}
            </span>

          </div>

        </div>

        <hr className="my-8" />

        <div className="flex justify-between text-3xl font-bold">

          <span>
            Total
          </span>

          <span className="text-[#556B2F]">

            ₹{total}

          </span>

        </div>

        {/* Checkout */}

        <button
          onClick={onCheckout}
          className="
          mt-8
          w-full
          bg-[#556B2F]
          hover:bg-[#445625]
          text-white
          py-4
          rounded-2xl
          font-semibold
          flex
          justify-center
          items-center
          gap-3
          transition
          "
        >

          Proceed To Checkout

          <FaArrowRight />

        </button>

        {/* Trust */}

        <div className="mt-8 space-y-4">

          <div className="flex items-center gap-3">

            <FaShieldAlt className="text-[#556B2F]" />

            <span>
              100% Secure Checkout
            </span>

          </div>

          <div className="flex items-center gap-3">

            <FaTruck className="text-[#556B2F]" />

            <span>
              Free Shipping Above ₹499
            </span>

          </div>

          <div className="flex items-center gap-3">

            <FaUndoAlt className="text-[#556B2F]" />

            <span>
              Easy 7 Days Return
            </span>

          </div>

        </div>

      </div>

    </div>
  );
}