import {
  FaTag,
  FaGift,
  FaPercent,
} from "react-icons/fa";

export default function OffersCard() {

  const offers = [

    {
      icon: <FaTag />,
      title: "10% Instant Discount",
      subtitle: "On all prepaid orders",
    },

    {
      icon: <FaGift />,
      title: "Free Gift Packing",
      subtitle: "Available on every handmade item",
    },

    {
      icon: <FaPercent />,
      title: "Buy 2 Get Extra 15% Off",
      subtitle: "Limited period offer",
    },

  ];

  return (

    <div className="mt-10">

      <h2 className="text-2xl font-bold text-[#2F3A2D] mb-5">

        Available Offers

      </h2>

      <div className="space-y-4">

        {offers.map((offer,index)=>(

          <div
            key={index}
            className="bg-white rounded-xl shadow p-5 flex gap-4 items-start"
          >

            <div className="text-[#556B2F] text-xl mt-1">

              {offer.icon}

            </div>

            <div>

              <h3 className="font-semibold">

                {offer.title}

              </h3>

              <p className="text-sm text-gray-500">

                {offer.subtitle}

              </p>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}
