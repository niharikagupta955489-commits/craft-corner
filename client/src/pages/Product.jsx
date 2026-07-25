import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

import api from "../services/api";

import ProductGallery from "../components/product/ProductGallery";
import ProductInfo from "../components/product/ProductInfo";
import ProductActions from "../components/product/ProductActions";
import SellerInfo from "../components/product/SellerInfo";
import ProductSpecifications from "../components/product/ProductSpecifications";
import ReviewSection from "../components/product/ReviewSection";
import RelatedProducts from "../components/product/RelatedProducts";

export default function Product() {

  const { id } = useParams();

  const [product, setProduct] = useState(null);

  const [relatedProducts, setRelatedProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetchProduct();

  }, [id]);

  const fetchProduct = async () => {

    try {

      setLoading(true);

      const res = await api.get(`/products/${id}`);

      const currentProduct = res.data.product;

      setProduct(currentProduct);

      if (currentProduct.category) {

        const related = await api.get(

          `/products/category/${currentProduct.category}`

        );

        setRelatedProducts(

          related.data.products.filter(

            (item) => item._id !== currentProduct._id

          )

        );

      }

    }

    catch (err) {

      console.log(err);

    }

    finally {

      setLoading(false);

    }

  };

  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center bg-[#F8F6F3]">

        <h1 className="text-3xl font-bold text-[#556B2F]">

          Loading Product...

        </h1>

      </div>

    );

  }

  if (!product) {

    return (

      <div className="min-h-screen flex items-center justify-center bg-[#F8F6F3]">

        <h1 className="text-3xl font-bold">

          Product Not Found

        </h1>

      </div>

    );

  }

  return (

    <div className="min-h-screen bg-[#F8F6F3] py-10 px-4 lg:px-8">

<div className="max-w-[1500px] mx-auto">

        
        {/* Main Product Card */}

     <div className="px-4 lg:px-6">
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "520px 1fr",
      gap: "40px",
      alignItems: "start",
    }}
  >
    <ProductGallery product={product} />

    <div>
      <ProductInfo product={product} />

      <div style={{ marginTop: "30px" }}>
        <ProductActions product={product} />
      </div>
    </div>
  </div>
</div>

        {/* Seller Card */}

<div className="mt-8 bg-white rounded-3xl shadow-sm border border-gray-200 p-8 lg:p-10">
          <SellerInfo />

        </div>

        {/* Specifications */}

<div className="mt-8 bg-white rounded-3xl shadow-sm border border-gray-200 p-8">

          <h2 className="text-3xl font-bold text-[#2F3A2D] mb-8">

            Product Specifications

          </h2>

          <ProductSpecifications product={product} />

        </div>

        {/* Reviews */}

<div className="mt-8 mx-4 lg:mx-6 bg-white rounded-3xl border border-gray-200 shadow-sm p-8">

          <div className="flex items-center justify-between mb-8">

            <h2 className="text-3xl font-bold text-[#2F3A2D]">

              Customer Reviews

            </h2>

            <button

              className="

              bg-[#556B2F]

              hover:bg-[#445625]

              text-white

              px-6

              py-3

              rounded-xl

              font-semibold

              transition

              "

            >

              Write Review

            </button>

          </div>

          <ReviewSection reviews={product.reviews} />

        </div>

        {/* Related Products */}

     <div className="mt-8 mx-4 lg:mx-6 bg-white rounded-3xl border border-gray-200 shadow-sm p-8">

          <div className="flex items-center justify-between mb-8">

            <h2 className="text-3xl font-bold text-[#2F3A2D]">

              Related Products

            </h2>

            <Link

              to="/marketplace"

              className="text-[#556B2F] font-semibold hover:underline"

            >

              View All →

            </Link>

          </div>

          <RelatedProducts products={relatedProducts} />

        </div>

      </div>

    </div>

  );

}