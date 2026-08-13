import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  FaShoppingCart,
  FaBolt,
  FaHeart,
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

const handleWishlist = () => {
  if (isWishlisted(product._id)) {
    removeFromWishlist(product._id);
    toast.success("Removed from Wishlist");
  } else {
    addToWishlist(product);
    toast.success("Added to Wishlist ❤️");
  }
};

  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const handleAddToCart = () => {

    addToCart({
      ...product,
      quantity,
    });

  };

  const handleBuyNow = () => {

    addToCart({
      ...product,
      quantity,
    });

    navigate("/checkout");

  };

  return (

    <div className="mt-10">

      {/* Quantity */}

      <h3 className="text-lg font-semibold"
      style={{

transform:"translate(40px,-20px) scale(01)"

}}
      >


        Quantity

      </h3>

      <div className="flex items-center gap-4 mt-4">

        <button
          onClick={() =>
            quantity > 1 &&
            setQuantity(quantity - 1)
          }
          className="w-11 h-11 rounded-lg bg-gray-200 text-xl"
        style={{

transform:"translate(40px,-15px) scale(0.8)"

}}
        >

          -

        </button>

        <span className="text-xl font-bold"
        style={{


transform:"translate(40px,-15px) scale(01)"

}}>

          {quantity}

        </span>

        <button
          onClick={() =>
            setQuantity(quantity + 1)
          }
          className="w-11 h-11 rounded-lg bg-gray-200 text-xl"
          style={{

transform:"translate(40px,-15px) scale(0.8)"

}}
        >

          +

        </button>

      </div>

      {/* Buttons */}

      <div className="grid grid-cols-2 gap-4 mt-8">

        <button

          onClick={handleAddToCart}

          className="

          bg-[#556B2F]

          hover:bg-[#445625]

          text-white

          py-4

          rounded-xl

          font-semibold

          flex

          justify-center

          items-center

          gap-3

          transition

          "
style={{

transform:"translate(30px,15px) scale(01)"

}}
        >

          <FaShoppingCart />

          Add To Cart

        </button>

        <button

          onClick={handleBuyNow}

          className="

          bg-orange-500

          hover:bg-orange-600

          text-white

          py-4

          rounded-xl

          font-semibold

          flex

          justify-center

          items-center

          gap-3

          transition

          "
style={{

transform:"translate(30px,15px) scale(01)"

}}
        >

          <FaBolt />

          Buy Now

        </button>

      </div>

      <button
  onClick={handleWishlist}
  className="
    mt-5
    w-full
    border-2
    border-[#556B2F]
    py-4
    rounded-xl
    font-semibold
    flex
    justify-center
    items-center
    gap-3
    transition
    hover:bg-[#556B2F]
    hover:text-white
    text-[#556B2F]
  "
style={{

transform:"translate(30px,40px) scale(01)"

}}>
  <FaHeart
    className={
      isWishlisted(product._id)
        ? "text-red-500"
        : ""
    }
  />

  {isWishlisted(product._id)
    ? "Remove From Wishlist"
    : "Add To Wishlist"}
</button>

    </div>

  );

}