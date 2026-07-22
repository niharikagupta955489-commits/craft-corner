import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductCard from "../components/home/ProductCard";
import api from "../services/api";

export default function CategoryPage() {

const params = useParams();

const category = window.location.pathname.replace("/", "");

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {

    const fetchProducts = async () => {

      try {

        const res = await api.get(
  `/products/category/${category}`
);

console.log(res.data.products);
        setProducts(res.data.products);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };


    fetchProducts();

  }, [category]);


  if (loading) {
    return (
      <div className="text-center py-20 text-xl">
        Loading Products...
      </div>
    );
  }


  return (

    <div className="min-h-screen bg-[#FAF7F0] py-12">

      <div className="max-w-7xl mx-auto px-6">


        <h1 className="text-4xl font-bold text-[#2F3A2D] capitalize mb-3">
          {category}
        </h1>


        <p className="text-gray-500 mb-10">
          {products.length} Products Found
        </p>


        {
          products.length === 0 ? (

            <div className="bg-white rounded-2xl shadow-md p-12 text-center">

              <h2 className="text-3xl font-bold text-[#2F3A2D]">
                No Products Found
              </h2>

            </div>


          ) : (


            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">


              {
                products.map((item)=>(

                  <ProductCard
                    key={item._id}
                    product={item}
                  />

                ))
              }


            </div>


          )
        }


      </div>

    </div>

  );

}