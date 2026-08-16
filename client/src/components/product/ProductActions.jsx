import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  FaShoppingCart,
  FaBolt,
  FaHeart,
  FaMinus,
  FaPlus,
} from "react-icons/fa";

import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistProvider";

export default function ProductActions({ product }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const {
    addToWishlist,
    removeFromWishlist,
    isWishlisted,
  } = useWishlist();

  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const handleWishlist = () => {
    if (isWishlisted(product._id)) {
      removeFromWishlist(product._id);
      toast.success("Removed from Wishlist");
    } else {
      addToWishlist(product);
      toast.success("Added to Wishlist ❤️");
    }
  };

  const handleAddToCart = () => {
    addToCart({
      ...product,
      quantity,
    });

    toast.success("Added to Cart");
  };

  const handleBuyNow = () => {
    addToCart({
      ...product,
      quantity,
    });

    navigate("/checkout");
  };

  return (
    <div
      style={{
        padding: "0px",
        transform: "translate(0px,0px)",
      }}
    >
      <h3
        className="text-lg font-bold text-[#2F2B26]"
        style={{
          margin: "0px",
          padding: "0px",
          transform: "translate(0px,0px)",
        }}
      >
        Quantity
      </h3>

      <div
        className="flex items-center gap-3"
        style={{
          padding: "0px",
          marginTop: "12px",
          transform: "translate(0px,0px)",
        }}
      >
        <button
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EEF0F4] text-[#2F2B26] hover:bg-[#E1E5EA] transition"
          style={{
            padding: "0px",
            transform: "translate(0px,0px)",
          }}
        >
          <FaMinus size={12} />
        </button>

        <span
          className="flex h-10 min-w-10 items-center justify-center font-bold"
          style={{
            padding: "0px 8px",
            transform: "translate(0px,0px)",
          }}
        >
          {quantity}
        </span>

        <button
          onClick={() => setQuantity((q) => q + 1)}
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EEF0F4] text-[#2F2B26] hover:bg-[#E1E5EA] transition"
          style={{
            padding: "0px",
            transform: "translate(0px,0px)",
          }}
        >
          <FaPlus size={12} />
        </button>
      </div>

      <div
        className="grid grid-cols-2 gap-4"
        style={{
          padding: "0px",
          marginTop: "22px",
          transform: "translate(0px,0px)",
        }}
      >
        <button
          onClick={handleAddToCart}
          className="flex items-center justify-center gap-3 rounded-2xl bg-[#556B2F] text-white font-bold hover:bg-[#465C25] transition hover:-translate-y-0.5"
          style={{
            padding: "13px 16px",
            transform: "translate(0px,0px)",
          }}
        >
          <FaShoppingCart />
          Add To Cart
        </button>

        <button
          onClick={handleBuyNow}
          className="flex items-center justify-center gap-3 rounded-2xl bg-[#FF6F00] text-white font-bold hover:bg-[#E95F00] transition hover:-translate-y-0.5"
          style={{
            padding: "13px 16px",
            transform: "translate(0px,0px)",
          }}
        >
          <FaBolt />
          Buy Now
        </button>
      </div>

      <button
        onClick={handleWishlist}
        className="flex w-full items-center justify-center gap-3 rounded-2xl border-2 border-[#556B2F] font-semibold text-[#556B2F] hover:bg-[#556B2F] hover:text-white transition"
        style={{
          padding: "13px 16px",
          marginTop: "12px",
          transform: "translate(0px,0px)",
        }}
      >
        <FaHeart
          className={isWishlisted(product._id) ? "text-red-500" : ""}
        />

        {isWishlisted(product._id)
          ? "Remove From Wishlist"
          : "Add To Wishlist"}
      </button>
    </div>
  );
}
