import { useEffect, useState } from "react";
import api from "../services/api";

function Marketplace() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data.products || []);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="min-h-screen bg-[#FAF7F0] py-20">
      <div className="max-w-7xl mx-auto px-8">

        <h1 className="text-5xl font-bold text-[#2F3A2D] mb-3">
          Marketplace
        </h1>

        <p className="text-gray-600 mb-12">
          Explore handcrafted products from talented artisans.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {products.map((product) => (

            <div
              key={product._id}
              className="bg-white rounded-3xl shadow-lg overflow-hidden hover:-translate-y-2 hover:shadow-2xl transition duration-300"
            >

              <img
                src={product.images?.[0]}
                alt={product.name}
                className="w-full h-72 object-cover"
              />

              <div className="p-6">

                <span className="text-sm bg-[#EAF2DD] text-[#556B2F] px-3 py-1 rounded-full">
                  {product.category}
                </span>

                <h2 className="text-2xl font-semibold mt-4">
                  {product.name}
                </h2>

                <p className="text-2xl font-bold text-[#556B2F] mt-3">
                  ₹{product.price}
                </p>

                <button className="w-full mt-6 bg-[#556B2F] text-white py-3 rounded-xl hover:bg-[#3E4E23] transition">
                  View Product
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}

export default Marketplace;