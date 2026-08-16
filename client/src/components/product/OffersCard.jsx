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
    <div
      className="rounded-2xl bg-[#FAF7F0]"
      style={{
        padding: "17px",
        transform: "translate(0px,0px)",
      }}
    >
      <h2
        className="text-xl font-black text-[#2F3A2D]"
        style={{
          margin: "0px 0px 11px",
          padding: "0px",
          transform: "translate(0px,0px)",
        }}
      >
        Available Offers
      </h2>

      <div
        className="space-y-2"
        style={{
          padding: "0px",
          transform: "translate(0px,0px)",
        }}
      >
        {offers.map((offer, index) => (
          <div
            key={index}
            className="flex items-start gap-3"
            style={{
              padding: "7px 0px",
              transform: "translate(0px,0px)",
            }}
          >
            <span
              className="text-[#FF7A00]"
              style={{
                padding: "0px",
                transform: "translate(0px,0px)",
              }}
            >
              {offer.icon}
            </span>

            <div>
              <h3
                className="font-semibold text-[#3E3933]"
                style={{
                  margin: "0px",
                  padding: "0px",
                  transform: "translate(0px,0px)",
                }}
              >
                {offer.title}
              </h3>

              <p
                className="text-sm text-[#777066]"
                style={{
                  margin: "2px 0px 0px",
                  padding: "0px",
                  transform: "translate(0px,0px)",
                }}
              >
                {offer.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
