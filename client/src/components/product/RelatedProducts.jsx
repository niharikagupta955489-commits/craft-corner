import { FaStar, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function RelatedProducts({ products }) {

  const navigate = useNavigate();

  if (!products || products.length === 0) {

    return (

      <p className="text-gray-500">

        No related products found.

      </p>

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

      spaceBetween={24}

      breakpoints={{

        0: {
          slidesPerView: 1,
        },

        640: {
          slidesPerView: 2,
        },

        1024: {
          slidesPerView: 3,
        },

        1280: {
          slidesPerView: 4,
        },

      }}

    >

      {products.map((item) => (

        <SwiperSlide key={item._id}>

          <div

            onClick={() => navigate(`/product/${item._id}`)}

            className="

            bg-[#FAFAFA]

            rounded-2xl

            overflow-hidden

            border

            border-gray-200

            hover:border-[#556B2F]

            hover:shadow-lg

            transition-all

            duration-300

            cursor-pointer

            "

          >

            <div className="overflow-hidden">

              <img

                src={item.images?.[0]}

                alt={item.name}

                className="

                w-full

                h-56

                object-cover

                hover:scale-105

                duration-300

                transition-all

                "

              />

            </div>

            <div className="p-5">

              <span className="

              inline-block

              bg-[#E8F3D6]

              text-[#556B2F]

              text-xs

              px-3

              py-1

              rounded-full

              ">

                {item.category}

              </span>

              <h3 className="

              mt-4

              text-lg

              font-bold

              text-[#2F3A2D]

              line-clamp-2

              min-h-[56px]

              ">

                {item.name}

              </h3>

              <div className="flex items-center gap-2 mt-3">

                <FaStar className="text-yellow-500" />

                <span>

                  {item.rating > 0

                    ? item.rating.toFixed(1)

                    : "New"}

                </span>

              </div>

              <div className="mt-4 flex items-center justify-between">

                <h2 className="text-2xl font-bold text-[#556B2F]">

                  ₹{item.price}

                </h2>

                <button

                  className="

                  w-10

                  h-10

                  rounded-full

                  bg-[#556B2F]

                  text-white

                  flex

                  items-center

                  justify-center

                  hover:bg-[#445625]

                  transition

                  "

                >

                  <FaArrowRight />

                </button>

              </div>

            </div>

          </div>

        </SwiperSlide>

      ))}

    </Swiper>

  );

}