import { useState } from "react";
import {
  FaStar,
  FaBolt,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaFire,
  FaTruck,
} from "react-icons/fa";

export default function ProductInfo({ product }) {

  const [pincode, setPincode] = useState("");

  const [deliveryMessage, setDeliveryMessage] = useState("");

  if (!product) return null;

  const discount = 20;

  const originalPrice = Math.round(product.price / (1 - discount / 100));

  const saveAmount = originalPrice - product.price;

  const checkDelivery = () => {

    if (pincode.length !== 6) {

      setDeliveryMessage("Please enter a valid pincode.");

      return;

    }

    setDeliveryMessage("✓ Delivery available within 3-5 business days.");

  };

  return (

    <div>

      {/* Category + Bestseller */}

      <div className="flex items-center gap-3 flex-wrap">

        <span className="bg-[#E8F3D6] text-[#556B2F] px-4 py-2 rounded-full font-semibold">

          {product.category}

        </span>

        <span className="bg-orange-500 text-white px-4 py-2 rounded-full font-semibold flex items-center gap-2">

          <FaFire />

          Bestseller

        </span>

      </div>

      {/* Product Name */}

      <h1 className="text-4xl font-bold text-[#2F3A2D] mt-6 leading-tight">

        {product.name}

      </h1>

      {/* Rating */}

      <div className="flex items-center gap-4 mt-5">

        <div className="bg-green-600 text-white px-3 py-1 rounded-lg flex items-center gap-2">

          <FaStar />

          {product.rating > 0 ? product.rating.toFixed(1) : "New"}

        </div>

        <span className="text-gray-500">

          {product.numReviews > 0
            ? `${product.numReviews} Reviews`
            : "No Reviews Yet"}

        </span>

      </div>

      {/* Price */}

      <div className="mt-8">

        <div className="flex items-center gap-4 flex-wrap">

          <h2 className="text-5xl font-bold text-[#556B2F]">

            ₹{product.price}

          </h2>

          <span className="text-2xl text-gray-400 line-through">

            ₹{originalPrice}

          </span>

          <span className="text-green-600 font-bold">

            {discount}% OFF

          </span>

        </div>

        <p className="text-green-600 mt-2 font-medium">

          You save ₹{saveAmount}

        </p>

      </div>

      {/* Stock */}

      <div className="mt-8">

        <div className="flex justify-between">

          <span className="font-semibold">

            Stock

          </span>

          <span>

            {product.stock} Available

          </span>

        </div>

        <div className="w-full bg-gray-200 rounded-full h-3 mt-3">

          <div

            className="bg-[#556B2F] h-3 rounded-full"

            style={{

              width: `${Math.min(product.stock,100)}%`

            }}

          />

        </div>

      </div>

      {/* Description */}

      <div className="mt-10">

        <h2 className="text-2xl font-bold text-[#2F3A2D]">

          Description

        </h2>

        <p className="mt-4 text-gray-600 leading-8">

          {product.description}

        </p>

      </div>

      {/* Delivery */}

      <div className="bg-white rounded-2xl shadow-md p-6 mt-10">

        <h3 className="font-bold text-xl flex items-center gap-3">

          <FaMapMarkerAlt />

          Check Delivery

        </h3>

        <div className="flex gap-3 mt-5">

          <input

            value={pincode}

            onChange={(e)=>setPincode(e.target.value)}

            placeholder="Enter Pincode"

            className="flex-1 border rounded-xl px-4 py-3 outline-none"

          />

          <button

            onClick={checkDelivery}

            className="bg-[#556B2F] text-white px-6 rounded-xl"

          >

            Check

          </button>

        </div>

        {deliveryMessage && (

          <p className="text-green-600 mt-4">

            {deliveryMessage}

          </p>

        )}

      </div>

      {/* Offers */}

      <div className="mt-10">

        <h2 className="text-2xl font-bold mb-5">

          Available Offers

        </h2>

        <div className="space-y-4">

          <div className="flex gap-3">

            <FaBolt className="text-green-600 mt-1"/>

            <span>

              10% Instant Discount on prepaid orders

            </span>

          </div>

          <div className="flex gap-3">

            <FaBolt className="text-green-600 mt-1"/>

            <span>

              Free Delivery on orders above ₹499

            </span>

          </div>

          <div className="flex gap-3">

            <FaBolt className="text-green-600 mt-1"/>

            <span>

              Buy 2 products & get 15% OFF

            </span>

          </div>

        </div>

      </div>

      {/* Trust */}

      <div className="grid grid-cols-2 gap-4 mt-10">

        <div className="bg-white rounded-xl shadow p-5 flex gap-3 items-center">

          <FaTruck className="text-[#556B2F] text-2xl"/>

          <span>

            Free Shipping

          </span>

        </div>

        <div className="bg-white rounded-xl shadow p-5 flex gap-3 items-center">

          <FaCheckCircle className="text-[#556B2F] text-2xl"/>

          <span>

            Quality Assured

          </span>

        </div>

      </div>

    </div>

  );

}