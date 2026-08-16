import { FaStar, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function RelatedProducts({ products = [] }) {
  const navigate = useNavigate();

  if (!products || products.length === 0) {
    return (
      <div
        className="rounded-2xl bg-[#FAF7F0] text-center text-[#777066]"
        style={{
          padding: "28px",
          transform: "translate(0px,0px)",
        }}
      >
        No related products found.
      </div>
    );
  }

  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      navigation
      pagination={{ clickable: true }}
      autoplay={{
        delay: 3500,
        disableOnInteraction: false,
      }}
      spaceBetween={18}
      breakpoints={{
        0: { slidesPerView: 1 },
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
        1280: { slidesPerView: 4 },
      }}
      style={{
        padding: "4px 0 34px",
        transform: "translate(0px,0px)",
      }}
    >
      {products.map((item) => (
        <SwiperSlide key={item._id}>
          <div
            onClick={() => navigate(`/product/${item._id}`)}
            className="bg-[#FAFAFA] rounded-2xl overflow-hidden border border-[#E4DECF] hover:border-[#556B2F] hover:shadow-lg transition-all duration-300 cursor-pointer"
            style={{
              padding: "0px",
              transform: "translate(0px,0px)",
            }}
          >
            <div
              className="overflow-hidden"
              style={{
                padding: "0px",
                transform: "translate(0px,0px)",
              }}
            >
              <img
                src={item.images?.[0]}
                alt={item.name}
                className="w-full h-48 object-cover hover:scale-105 transition-all duration-300"
                style={{
                  padding: "0px",
                  transform: "translate(0px,0px)",
                }}
              />
            </div>

            <div
              style={{
                padding: "16px",
                transform: "translate(0px,0px)",
              }}
            >
              <span
                className="inline-block bg-[#E8F3D6] text-[#556B2F] text-xs rounded-full"
                style={{
                  padding: "5px 10px",
                  transform: "translate(0px,0px)",
                }}
              >
                {item.category}
              </span>

              <h3
                className="mt-3 text-base font-bold text-[#2F3A2D] line-clamp-2 min-h-[48px]"
                style={{
                  padding: "0px",
                  transform: "translate(0px,0px)",
                }}
              >
                {item.name}
              </h3>

              <div
                className="flex items-center gap-2"
                style={{
                  marginTop: "9px",
                  padding: "0px",
                  transform: "translate(0px,0px)",
                }}
              >
                <FaStar className="text-yellow-500" size={13} />
                <span className="text-sm text-[#6D655D]">
                  {item.rating > 0 ? item.rating.toFixed(1) : "New"}
                </span>
              </div>

              <div
                className="flex items-center justify-between"
                style={{
                  marginTop: "12px",
                  padding: "0px",
                  transform: "translate(0px,0px)",
                }}
              >
                <h2
                  className="text-xl font-black text-[#556B2F]"
                  style={{
                    margin: "0px",
                    padding: "0px",
                    transform: "translate(0px,0px)",
                  }}
                >
                  ₹{item.price}
                </h2>

                <button
                  type="button"
                  className="w-9 h-9 rounded-full bg-[#556B2F] text-white flex items-center justify-center hover:bg-[#445625] transition"
                  style={{
                    padding: "0px",
                    transform: "translate(0px,0px)",
                  }}
                >
                  <FaArrowRight size={13} />
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
