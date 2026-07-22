import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import { useCart } from "../context/CartContext";

export default function Product() {
  const { id } = useParams();
  const { addToCart } = useCart();

const [product, setProduct] = useState(null);

useEffect(() => {
  fetchProduct();
}, []);

const fetchProduct = async () => {
  try {
    const res = await api.get(`/products/${id}`);
    setProduct(res.data.product);
  } catch (error) {
    console.log(error);
  }
};

  
if (!product) {
  return (
    <h1 className="text-center text-3xl mt-20">
      Loading...
    </h1>
  );
}
  return (
    <div className="min-h-screen bg-[#FAF7F0] py-12">
    <div className="max-w-6xl mx-auto px-6">

<div className="flex flex-col md:flex-row justify-center items-start gap-12">

          {/* Product Image */}
          <div className="w-64 h-64 flex-shrink-0 rounded-xl overflow-hidden border border-gray-300 bg-white shadow">

            <img
              src={product.images?.[0]}
              alt={product.name}
              className="w-full h-full object-cover"
            />

          </div>

          {/* Product Details */}
          <div className="flex-1">

            <h1 className="text-3xl font-bold text-[#2F3A2D]">
              {product.name}
            </h1>

            <p className="text-1xl font-bold text-[#556B2F] mt-4">
              ₹{product.price}
            </p>

            <p className="text-gray-600 mt-4 leading-7">
              {product.description}
            </p>

            <p className="mt-5 text-gray-500">
              Product ID : {product._id}
            </p>

            <div className="flex gap-4 mt-8">

              <button
                onClick={() => addToCart(product)}
                className="bg-[#556B2F] hover:bg-[#445625] text-white px-8 py-3 rounded-lg transition"
              >
                Add to Cart
              </button>

              <button
                className="border border-[#556B2F] text-[#556B2F] hover:bg-[#556B2F] hover:text-white px-8 py-3 rounded-lg transition"
              >
                Buy Now
              </button>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}