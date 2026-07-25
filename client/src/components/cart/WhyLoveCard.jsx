import {
  FaLeaf,
  FaTruck,
  FaShieldAlt,
  FaHeart,
} from "react-icons/fa";

export default function WhyLoveCard() {
  return (
    <div className="mt-6 bg-gradient-to-br from-[#556B2F] to-[#3E5A22] text-white rounded-3xl p-7 shadow-xl">

      <h2 className="text-2xl font-bold mb-6">
        Why You'll Love Shopping Here
      </h2>

      <div className="space-y-5">

        <div className="flex items-start gap-4">
          <div className="w-11 h-11 rounded-full bg-white/20 flex items-center justify-center">
            <FaLeaf />
          </div>

          <div>
            <h3 className="font-semibold">
              100% Handmade Products
            </h3>

            <p className="text-sm text-white/80 mt-1">
              Every product is crafted by skilled local artisans.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-11 h-11 rounded-full bg-white/20 flex items-center justify-center">
            <FaTruck />
          </div>

          <div>
            <h3 className="font-semibold">
              Fast & Free Shipping
            </h3>

            <p className="text-sm text-white/80 mt-1">
              Free delivery on eligible handmade products.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-11 h-11 rounded-full bg-white/20 flex items-center justify-center">
            <FaShieldAlt />
          </div>

          <div>
            <h3 className="font-semibold">
              Secure Payments
            </h3>

            <p className="text-sm text-white/80 mt-1">
              Safe checkout with trusted payment gateways.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-11 h-11 rounded-full bg-white/20 flex items-center justify-center">
            <FaHeart />
          </div>

          <div>
            <h3 className="font-semibold">
              Made With Love
            </h3>

            <p className="text-sm text-white/80 mt-1">
              Supporting Indian artisans with every purchase.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}