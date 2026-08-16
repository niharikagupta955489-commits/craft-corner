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
      title: "Free Shipping",
      subtitle: "On orders above ₹499",
    },
    {
      icon: <FaShieldAlt />,
      title: "Secure Payment",
      subtitle: "100% safe checkout",
    },
    {
      icon: <FaUndoAlt />,
      title: "Easy Returns",
      subtitle: "7 days return policy",
    },
    {
      icon: <FaGift />,
      title: "Quality Assured",
      subtitle: "Crafted with care",
    },
  ];

  return (
    <div
      className="grid grid-cols-2 gap-3"
      style={{
        padding: "0px",
        transform: "translate(0px,0px)",
      }}
    >
      {features.map((item, index) => (
        <div
          key={index}
          className="flex items-center gap-3 rounded-xl bg-[#F2F6E9] text-[#2F3A2D]"
          style={{
            padding: "12px 13px",
            transform: "translate(0px,0px)",
          }}
        >
          <div
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-[#556B2F]"
            style={{
              padding: "0px",
              transform: "translate(0px,0px)",
            }}
          >
            {item.icon}
          </div>

          <div
            style={{
              padding: "0px",
              transform: "translate(0px,0px)",
            }}
          >
            <h3
              className="font-bold text-sm"
              style={{
                margin: "0px",
                padding: "0px",
                transform: "translate(0px,0px)",
              }}
            >
              {item.title}
            </h3>

            <p
              className="text-[11px] text-[#756D63]"
              style={{
                margin: "2px 0px 0px",
                padding: "0px",
                transform: "translate(0px,0px)",
              }}
            >
              {item.subtitle}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
