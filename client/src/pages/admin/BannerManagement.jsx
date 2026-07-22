import { useState } from "react";

export default function BannerManagement() {
  const [banners, setBanners] = useState([
    {
      id: 1,
      title: "Summer Sale",
      image: "https://via.placeholder.com/600x200",
      active: true,
    },
    {
      id: 2,
      title: "Festival Collection",
      image: "https://via.placeholder.com/600x200",
      active: false,
    },
  ]);

  const toggleBanner = (id) => {
    setBanners(
      banners.map((banner) =>
        banner.id === id
          ? { ...banner, active: !banner.active }
          : banner
      )
    );
  };

  const deleteBanner = (id) => {
    setBanners(banners.filter((banner) => banner.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] p-8">

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-4xl font-bold text-[#2F3A2D]">
          Banner Management
        </h1>

        <button className="bg-[#556B2F] text-white px-6 py-3 rounded-xl hover:bg-[#445625]">
          + Add Banner
        </button>

      </div>

      <div className="grid md:grid-cols-2 gap-8">

        {banners.map((banner) => (

          <div
            key={banner.id}
            className="bg-white rounded-2xl shadow-md overflow-hidden"
          >

            <img
              src={banner.image}
              alt={banner.title}
              className="w-full h-52 object-cover"
            />

            <div className="p-6">

              <h2 className="text-2xl font-bold">
                {banner.title}
              </h2>

              <p className="mt-3">

                Status :

                <span
                  className={`ml-2 font-semibold ${
                    banner.active
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {banner.active ? "Active" : "Inactive"}
                </span>

              </p>

              <div className="flex gap-4 mt-6">

                <button
                  onClick={() => toggleBanner(banner.id)}
                  className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600"
                >
                  {banner.active ? "Deactivate" : "Activate"}
                </button>

                <button
                  onClick={() => deleteBanner(banner.id)}
                  className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}