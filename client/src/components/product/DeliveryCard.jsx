import {
  FaTruck,
  FaShieldAlt,
  FaUndoAlt,
  FaGift,
} from "react-icons/fa";

export default function DeliveryCard() {

  const features = [

    {
      icon: <FaTruck />,
      title: "Free Delivery",
      subtitle: "Delivered within 3-5 business days",
    },

    {
      icon: <FaShieldAlt />,
      title: "Secure Payment",
      subtitle: "100% Safe & Secure Checkout",
    },

    {
      icon: <FaUndoAlt />,
      title: "Easy Returns",
      subtitle: "7 Days Return Policy",
    },

    {
      icon: <FaGift />,
      title: "Handmade Product",
      subtitle: "Crafted with love by artisans",
    },

  ];

  return (

    <div className="mt-10 space-y-5">

      {features.map((item, index) => (

        <div
          key={index}
          className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-5 flex items-center gap-5"
        >

          <div className="

          w-12

          h-12

          rounded-full

          bg-[#E8F3D6]

          text-[#556B2F]

          flex

          items-center

          justify-center

          text-xl

          ">

            {item.icon}

          </div>

          <div>

            <h3 className="font-bold text-[#2F3A2D]">

              {item.title}

            </h3>

            <p className="text-sm text-gray-500">

              {item.subtitle}

            </p>

          </div>

        </div>

      ))}

    </div>

  );

}

