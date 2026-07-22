import { useEffect, useState } from "react";

const banners = [
  {
    image:
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1600&q=80",
  },
  {
    image:
      "https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&w=1600&q=80",
  },
  {
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=80",
  },
];

export default function Banner() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 3500);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="px-6 py-5">
      <div className="w-full">

        <div className="relative h-[330px] overflow-hidden rounded-2xl shadow-lg">

          <img
            src={banners[current].image}
            alt=""
            className="w-full h-full object-cover duration-700"
          />

          <div className="absolute inset-0 bg-black/35"></div>

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6 lg:translate-x-12">

            <h1 className="text-5xl font-extrabold leading-tight">
              Handmade Products
              <br />
              Crafted With Love
            </h1>

            <p className="mt-4 text-lg max-w-xl">
              Discover authentic handmade products crafted by talented artisans
              across India.
            </p>

            <button className="mt-8 w-fit bg-white text-[#556B2F] px-8 py-3 rounded-xl font-semibold hover:scale-105 transition">
              Shop Now
            </button>

          </div>

          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-3">

            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`h-3 w-3 rounded-full ${
                  current === index ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}

          </div>

        </div>

      </div>
    </section>
  );
}