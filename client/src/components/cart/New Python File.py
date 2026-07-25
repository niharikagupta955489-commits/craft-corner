import {
  FaTruck,
  FaShieldAlt,
  FaUndoAlt,
  FaHeadset,
} from "react-icons/fa";

export default function FeaturesBar() {
  const features = [
    {
      icon: <FaTruck />,
      title: "Free Shipping",
      desc: "On orders above ₹499",
    },
    {
      icon: <FaShieldAlt />,
      title: "Secure Payment",
      desc: "100% Safe Checkout",
    },
    {
      icon: <FaUndoAlt />,
      title: "Easy Returns",
      desc: "7 Days Return Policy",
    },
    {
      icon: <FaHeadset />,
      title: "24/7 Support",
      desc: "We're always here to help",
    },
  ];

  return (
    <div className="mt-12 bg-white rounded-3xl border border-[#E8E3D8] shadow-sm p-8">

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

        {features.map((item, index) => (

          <div
            key={index}
            className="flex items-center gap-4"
          >

            <div className="w-14 h-14 rounded-2xl bg-[#EEF5E5] text-[#556B2F] flex items-center justify-center text-2xl">

              {item.icon}

            </div>

            <div>

              <h3 className="font-bold text-[#20311E]">
                {item.title}
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                {item.desc}
              </p>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}