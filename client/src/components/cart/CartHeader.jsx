import { Link } from "react-router-dom";
import { FaArrowLeft, FaLeaf } from "react-icons/fa";

export default function CartHeader() {
  return (
    <div className="mb-8">

      <Link
        to="/marketplace"
        className="inline-flex items-center gap-2 text-[#355E3B] hover:text-[#4E7A45] font-medium"
      >
        <FaArrowLeft />
        Back to Shop
      </Link>

      <h1 className="mt-4 flex items-center gap-3 text-5xl font-extrabold text-[#1F2F1F]">
        Shopping Cart
        <FaLeaf className="text-[#6B8E23] text-3xl" />
      </h1>

    </div>
  );
}