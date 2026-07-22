import { useEffect, useState } from "react";
import api from "../../services/api";
import ProductCard from "./ProductCard";
import products from "../../data/products";

export default function ProductSection() {

const [products, setProducts] = useState([]);

useEffect(() => {
  fetchProducts();
}, []);

const fetchProducts = async () => {
  try {
    const res = await api.get("/products");
    setProducts(res.data.products);
  } catch (error) {
    console.log(error);
  }
};
  return (
    <section className="py-12 bg-[#FAF7F0]">
<div className="max-w-8xl mx-auto px-8">

        <h2 className="text-4xl font-bold text-center mb-10 text-[#2F3A2D]">
          Featured Products
        </h2>

       <div className="grid grid-cols-3 gap-8 justify-items-center">
  {products.map((item) => (
    <div key={item._id} className="w-full max-w-[330px]">
      <ProductCard product={item} />
    </div>
  ))}
</div>

      </div>
    </section>
  );
}