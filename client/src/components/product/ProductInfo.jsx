import { useState } from "react";
import {
  FaMapMarkerAlt,
  FaFire,
  FaStar,
} from "react-icons/fa";

import OffersCard from "./OffersCard";
import DeliveryCard from "./DeliveryCard";

export default function ProductInfo({ product }) {
  const [pincode, setPincode] = useState("");
  const [message, setMessage] = useState("");

  if (!product) return null;

  const oldPrice = Math.round(Number(product.price || 0) / 0.8);
  const save = oldPrice - Number(product.price || 0);

  const checkDelivery = () => {
    if (pincode.length !== 6) {
      setMessage("Enter valid pincode");
      return;
    }

    setMessage("✓ Delivery available");
  };

  const stock = Number(product.stock || 0);
  const stockPercent = Math.max(0, Math.min(100, stock * 11));

  return (
    <div
      className="flex flex-col gap-6"
      style={{
        padding: "0px",
        transform: "translate(0px,0px)",
      }}
    >
      {/* CATEGORY */}
      <div
        className="flex flex-wrap items-center gap-2"
        style={{
          padding: "0px",
          transform: "translate(0px,0px)",
        }}
      >
        <span
          className="rounded-full bg-[#EAF4DD] text-[#556B2F] font-semibold text-sm"
          style={{
            padding: "7px 14px",
            transform: "translate(0px,0px)",
          }}
        >
          {product.category || "Handmade"}
        </span>

        <span
          className="flex items-center gap-1 rounded-full bg-[#FF7A00] text-white font-semibold text-sm"
          style={{
            padding: "7px 14px",
            transform: "translate(0px,0px)",
          }}
        >
          <FaFire size={12} />
          Bestseller
        </span>
      </div>

      {/* TITLE */}
      <h1
        className="text-4xl font-black text-[#2F2B26] leading-tight"
        style={{
          margin: "0px",
          padding: "0px",
          transform: "translate(0px,0px)",
        }}
      >
        {product.name}
      </h1>

      {/* RATING / STATUS */}
      <div
        className="flex flex-wrap items-center gap-3"
        style={{
          padding: "0px",
          transform: "translate(0px,0px)",
        }}
      >
        <span
          className="flex items-center gap-1 rounded-lg bg-[#12A447] text-white font-semibold"
          style={{
            padding: "7px 12px",
            transform: "translate(0px,0px)",
          }}
        >
          <FaStar size={12} />
          New
        </span>

        <span className="text-[#7A746B]">
          {Number(product.rating || 0) > 0
            ? `${Number(product.rating).toFixed(1)} Rating`
            : "No Reviews Yet"}
        </span>
      </div>

      {/* PRICE */}
      <div
        style={{
          padding: "0px",
          transform: "translate(0px,0px)",
        }}
      >
        <div
          className="flex flex-wrap items-center gap-3"
          style={{
            padding: "0px",
            transform: "translate(0px,0px)",
          }}
        >
          <h2
            className="text-5xl font-black text-[#2F2B26]"
            style={{
              margin: "0px",
              padding: "0px",
              transform: "translate(0px,0px)",
            }}
          >
            ₹{Number(product.price || 0).toLocaleString("en-IN")}
          </h2>

          <span
            className="text-xl text-[#A7A098] line-through"
            style={{
              padding: "0px",
              transform: "translate(0px,0px)",
            }}
          >
            ₹{oldPrice.toLocaleString("en-IN")}
          </span>

          <span
            className="font-bold text-[#0F9F47]"
            style={{
              padding: "0px",
              transform: "translate(0px,0px)",
            }}
          >
            20% OFF
          </span>
        </div>

        <p
          className="text-[#6F675E]"
          style={{
            margin: "6px 0px 0px",
            padding: "0px",
            transform: "translate(0px,0px)",
          }}
        >
          You save ₹{Math.max(0, save).toLocaleString("en-IN")}
        </p>
      </div>

      {/* STOCK */}
      <div
        className="rounded-2xl bg-[#FBFAF6]"
        style={{
          padding: "14px 16px",
          transform: "translate(0px,0px)",
        }}
      >
        <div
          className="flex items-center justify-between font-semibold"
          style={{
            padding: "0px",
            transform: "translate(0px,0px)",
          }}
        >
          <span>Stock</span>
          <span>{stock} Available</span>
        </div>

        <div
          className="rounded-full bg-[#E4E7EA]"
          style={{
            height: "10px",
            marginTop: "9px",
            padding: "0px",
            overflow: "hidden",
            transform: "translate(0px,0px)",
          }}
        >
          <div
            className="h-full rounded-full bg-[#556B2F]"
            style={{
              width: `${stockPercent}%`,
              padding: "0px",
              transform: "translate(0px,0px)",
            }}
          />
        </div>
      </div>

      {/* DESCRIPTION */}
      <div
        style={{
          padding: "0px",
          transform: "translate(0px,0px)",
        }}
      >
        <h2
          className="text-2xl font-black text-[#2F3A2D]"
          style={{
            margin: "0px 0px 7px",
            padding: "0px",
            transform: "translate(0px,0px)",
          }}
        >
          Description
        </h2>

        <p
          className="text-[#6F675E] leading-7"
          style={{
            margin: "0px",
            padding: "0px",
            transform: "translate(0px,0px)",
          }}
        >
          {product.description || "Beautiful handmade product crafted with care."}
        </p>
      </div>

      {/* DELIVERY CHECK */}
      <div
        className="rounded-2xl bg-[#FAF7F0]"
        style={{
          padding: "16px",
          transform: "translate(0px,0px)",
        }}
      >
        <h2
          className="flex items-center gap-2 text-lg font-bold text-[#2F3A2D]"
          style={{
            margin: "0px",
            padding: "0px",
            transform: "translate(0px,0px)",
          }}
        >
          <FaMapMarkerAlt className="text-[#556B2F]" />
          Check Delivery
        </h2>

        <div
          className="flex gap-3"
          style={{
            padding: "0px",
            marginTop: "12px",
            transform: "translate(0px,0px)",
          }}
        >
          <input
            value={pincode}
            maxLength={6}
            onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))}
            placeholder="Enter Pincode"
            className="min-w-0 flex-1 rounded-xl border border-[#CFC9BF] bg-white outline-none"
            style={{
              padding: "11px 14px",
              transform: "translate(0px,0px)",
            }}
          />

          <button
            onClick={checkDelivery}
            className="rounded-xl bg-[#556B2F] text-white font-semibold hover:bg-[#465C25] transition"
            style={{
              padding: "11px 20px",
              transform: "translate(0px,0px)",
            }}
          >
            Check
          </button>
        </div>

        {message && (
          <p
            className="text-sm text-[#0C9C47] font-semibold"
            style={{
              margin: "8px 0px 0px",
              padding: "0px",
              transform: "translate(0px,0px)",
            }}
          >
            {message}
          </p>
        )}
      </div>

      {/* OFFERS */}
      <OffersCard />

      {/* BENEFITS */}
      <DeliveryCard />
    </div>
  );
}
