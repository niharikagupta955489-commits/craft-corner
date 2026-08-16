import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const loadProduct = async () => {
      try {
        setLoading(true);

        const res = await api.get(`/products/${id}`);

        if (active) {
          setProduct(res.data.product);
        }
      } catch (error) {
        console.log("PRODUCT ERROR:", error);

        if (active) {
          setProduct(null);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadProduct();

    return () => {
      active = false;
    };
  }, [id]);

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center bg-[#FAF8F2]"
        style={{
          padding: "40px",
          transform: "translate(0px,0px)",
        }}
      >
        Loading product...
      </div>
    );
  }

  if (!product) {
    return (
      <div
        className="min-h-screen flex items-center justify-center bg-[#FAF8F2]"
        style={{
          padding: "40px",
          transform: "translate(0px,0px)",
        }}
      >
        Product not found.
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-[#FAF8F2]"
      style={{
        padding: "24px 34px 55px",
        transform: "translate(0px,0px)",
      }}
    >
      <div
        className="mx-auto max-w-[1380px]"
        style={{
          padding: "0px 10px",
          transform: "translate(0px,0px)",
        }}
      >
        <Link
          to="/marketplace"
          className="inline-flex items-center gap-2 text-[#556B2F] font-semibold text-lg hover:opacity-70 transition"
          style={{
            padding: "6px 0px",
            marginBottom: "18px",
            transform: "translate(0px,0px)",
          }}
        >
          ← Back
        </Link>

        {/* HERO */}
        <div
          className="grid grid-cols-[430px_minmax(0,1fr)] gap-8 items-start"
          style={{
            padding: "0px",
            transform: "translate(0px,0px)",
          }}
        >
          <div
            style={{
              padding: "0px",
              transform: "translate(0px,0px)",
            }}
          >
            <div
              className="rounded-[28px] bg-white border border-[#E4DECF] shadow-[0_12px_30px_rgba(65,75,40,0.08)]"
              style={{
                padding: "14px",
                transform: "translate(0px,0px)",
              }}
            >
              <ProductGallery product={product} />
            </div>

            <div
              className="rounded-[24px] bg-white border border-[#E4DECF] shadow-[0_8px_24px_rgba(65,75,40,0.06)]"
              style={{
                padding: "20px",
                marginTop: "18px",
                transform: "translate(0px,0px)",
              }}
            >
              <SellerInfo />
            </div>
          </div>

          <div
            className="rounded-[28px] bg-white border border-[#E4DECF] shadow-[0_12px_32px_rgba(65,75,40,0.08)]"
            style={{
              padding: "26px 28px",
              transform: "translate(0px,0px)",
              boxSizing: "border-box",
            }}
          >
            <ProductInfo product={product} />

            <div
              className="border-t border-[#EEE8DC]"
              style={{
                paddingTop: "20px",
                marginTop: "20px",
                transform: "translate(0px,0px)",
              }}
            >
              <ProductActions product={product} />
            </div>
          </div>
        </div>

        {/* SPECIFICATIONS */}
        <section
          className="bg-white border border-[#E4DECF] rounded-[28px] shadow-[0_8px_24px_rgba(65,75,40,0.06)]"
          style={{
            padding: "26px 28px",
            marginTop: "28px",
            transform: "translate(0px,0px)",
          }}
        >
          <h2
            className="text-2xl font-black text-[#2F3A2D]"
            style={{
              margin: "0px 0px 17px",
              padding: "0px 0px 15px",
              transform: "translate(0px,0px)",
              borderBottom: "1px solid #EEE8DC",
            }}
          >
            Product Specifications
          </h2>

          <ProductSpecifications product={product} />
        </section>

        {/* REVIEWS */}
        <section
          className="bg-white border border-[#E4DECF] rounded-[28px] shadow-[0_8px_24px_rgba(65,75,40,0.06)]"
          style={{
            padding: "26px 28px",
            marginTop: "28px",
            transform: "translate(0px,0px)",
          }}
        >
          <h2
            className="text-2xl font-black text-[#2F3A2D]"
            style={{
              margin: "0px 0px 17px",
              padding: "0px 0px 15px",
              transform: "translate(0px,0px)",
              borderBottom: "1px solid #EEE8DC",
            }}
          >
            Customer Reviews
          </h2>

          <ReviewSection
            productId={product._id}
            reviews={product.reviews || []}
          />
        </section>

        {/* RELATED */}
        <section
          className="bg-white border border-[#E4DECF] rounded-[28px] shadow-[0_8px_24px_rgba(65,75,40,0.06)]"
          style={{
            padding: "26px 28px",
            marginTop: "28px",
            transform: "translate(0px,0px)",
          }}
        >
          <h2
            className="text-2xl font-black text-[#2F3A2D]"
            style={{
              margin: "0px 0px 17px",
              padding: "0px 0px 15px",
              transform: "translate(0px,0px)",
              borderBottom: "1px solid #EEE8DC",
            }}
          >
            You May Also Like
          </h2>

          <RelatedProducts products={product.relatedProducts || []} />
        </section>
      </div>
    </div>
  );
}
