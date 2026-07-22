import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../services/api";

export default function Search() {

  const [searchParams] = useSearchParams();

  const query = searchParams.get("query");

  const [products, setProducts] = useState([]);


  useEffect(() => {

    if(query){
      fetchProducts();
    }

  }, [query]);



  const fetchProducts = async () => {

    try {

      const res = await api.get(
        `/products/search?query=${query}`
      );

      setProducts(res.data.products);


    } catch(error) {

      console.log(error);

    }

  };



  return (

    <div className="min-h-screen bg-[#F5F5F5] p-8">


      <h1 className="text-3xl font-bold text-[#2F3A2D] mb-8">

        Search Results For "{query}"

      </h1>



      {
        products.length === 0 ? (

          <h2 className="text-center text-2xl font-semibold">
            No Products Found
          </h2>


        ) : (


<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 justify-items-center">


            {
              products.map((product)=>(


                <div

                  key={product._id}

                  className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition"

                >



                  <img

                    src={product.images?.[0]}

                    alt={product.name}

                    className="w-full h-48 object-cover"

                  />



                  <div className="p-3">



                    <h2 className="font-bold text-base truncate">

                      {product.name}

                    </h2>




                    <div className="text-sm mt-2">

                      ⭐ {product.rating || 0}

                    </div>




                    <p className="text-[#556B2F] font-bold text-lg mt-2">

                      ₹{product.price}

                    </p>




                    <p className="text-sm text-gray-500">

                      {product.category}

                    </p>




                    <button

                      className="w-full mt-3 bg-[#556B2F] text-white py-2 rounded-xl text-sm"

                    >

                      Add to Cart

                    </button>



                  </div>



                </div>


              ))
            }


          </div>


        )
      }



    </div>

  );

}