import { Link } from "react-router-dom";
import { FaHeart, FaStar } from "react-icons/fa";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistProvider";

export default function ProductCard({ product }) {

  const { addToCart } = useCart();
const {
  addToWishlist,
  removeFromWishlist,
  isWishlisted,
} = useWishlist();

const handleWishlist = (e) => {
  e.preventDefault();
  e.stopPropagation();

  if (isWishlisted(product._id)) {
    removeFromWishlist(product._id);
  } else {
    addToWishlist(product);
  }
};

  return (
    <Link to={`/product/${product._id}`}>

      <div className="w-full bg-[#F7F3EA] rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">

        <div className="relative h-56 flex items-center justify-center">

  <div className="w-[85%] h-44 rounded-2xl overflow-hidden shadow-[0_6px_18px_rgba(0,0,0,0.25)]">
    <img
      src={product.images?.[0]}
      alt={product.name}
      className="w-full h-full object-cover rounded-2xl"
    />
  </div>

  <button
    onClick={handleWishlist}
    className="absolute top-3 right-3 bg-white p-2 rounded-full shadow hover:scale-110 transition"
style={{
transform:"translateX(0px) translateY(-3px) scale(1.15)"

}}

  >
    <FaHeart
      className={
        isWishlisted(product._id)
          ? "text-red-500"
          : "text-gray-400"
      }
   style={{
transform:"translateX(0px) translateY(1px) scale(0.6)"

}}
 />
  </button>

</div>

<div className="p-5 text-center">
          <h3 className="font-bold text-lg text-[#2F3A2D]"
style={{
transform:"translateX(0px) translateY(-4px)"

}}
>
            {product.name}
          </h3>


          <div className="inline-flex items-center gap-2 mt-3 px-3 py-1 bg-yellow-50 rounded-full"
style={{
paddingLeft:"10px",
 paddingRight:"10px",
transform:"translateX(45px) translateY(15px)"

}}
>

            <FaStar className="text-yellow-400"
style={{
transform:"translateX(0px) translateY(0px) scale(0.8)"

}}
 />

            <span>
              4.8
            </span>

          </div>


          <p className="text-2xl font-bold text-[#556B2F] mt-3"
style={{
transform:"translateX(-30px) translateY(-20px)"

}}
>
            ₹{product.price}
          </p>


          <button
            onClick={(e)=>{
              e.preventDefault();
              e.stopPropagation();
              addToCart(product);
            }}
            className="mt-5 w-65 bg-[#556B2F] text-white py-3 rounded-2xl hover:bg-[#445625] shadow-md transition"
style={{
transform:"translateX(0px) translateY(-10px)"

}}

          >
            Add to Cart
          </button>


        </div>

      </div>

    </Link>
  );
}