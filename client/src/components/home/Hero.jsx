import { FaArrowRight } from "react-icons/fa";

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-[#F8F5EE] via-white to-[#EEF6E9]">

      <div className="max-w-7xl mx-auto px-8 py-24">

        <div className="grid lg:grid-cols-2 items-center gap-16">

          {/* LEFT */}

          <div>

            <span className="bg-[#E7F2DD] text-[#5D7A35] px-4 py-2 rounded-full text-sm font-semibold">

              🌿 HANDCRAFTED IN INDIA

            </span>

            <h1 className="text-6xl font-bold leading-tight mt-7 text-[#24311F]">

              Discover
              <br />

              Authentic
              <br />

              Handmade Crafts

            </h1>

            <p className="mt-8 text-lg text-gray-600 leading-8 max-w-lg">

              Shop unique handmade products directly from talented artisans
              across India and support traditional craftsmanship.

            </p>

            <div className="flex gap-5 mt-10">

              <button className="bg-[#556B2F] text-white px-7 py-4 rounded-xl flex items-center gap-3 hover:bg-[#455826]">

                Shop Now

                <FaArrowRight/>

              </button>

              <button className="border border-[#556B2F] text-[#556B2F] px-7 py-4 rounded-xl hover:bg-[#556B2F] hover:text-white">

                Become Seller

              </button>

            </div>

            <div className="flex gap-12 mt-14">

              <div>

                <h2 className="text-3xl font-bold text-[#556B2F]">

                  ⭐4.9

                </h2>

                <p className="text-gray-500">

                  Rating

                </p>

              </div>

              <div>

                <h2 className="text-3xl font-bold text-[#556B2F]">

                  500+

                </h2>

                <p className="text-gray-500">

                  Artisans

                </p>

              </div>

              <div>

                <h2 className="text-3xl font-bold text-[#556B2F]">

                  10K+

                </h2>

                <p className="text-gray-500">

                  Products

                </p>

              </div>

            </div>

          </div>

          {/* RIGHT */}

          <div className="relative">

            <div className="absolute inset-0 bg-[#DCEBCB] rounded-[45px] rotate-3"></div>

            <img

              src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=80"

              className="relative rounded-[40px] h-[620px] w-full object-cover shadow-2xl"

              alt="artisan"

            />

            <div className="absolute top-8 left-8 bg-white rounded-2xl shadow-xl px-6 py-4">

              <p className="text-gray-500 text-sm">

                Featured Craft

              </p>

              <h3 className="font-semibold">

                Handmade Pottery

              </h3>

              <p className="text-[#556B2F] font-bold">

                ₹899

              </p>

            </div>

            <div className="absolute bottom-8 right-8 bg-white rounded-2xl shadow-xl px-6 py-4">

              <h3 className="text-3xl font-bold text-[#556B2F]">

                50K+

              </h3>

              <p className="text-gray-500">

                Happy Customers

              </p>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}