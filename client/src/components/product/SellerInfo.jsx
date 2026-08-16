import {
  FaStore,
  FaCheckCircle,
  FaPhoneAlt,
} from "react-icons/fa";

export default function SellerInfo() {
  return (
    <div
      className="flex items-center justify-between gap-5"
      style={{
        padding: "0px",
        transform: "translate(0px,0px)",
      }}
    >
      <div
        className="flex items-center gap-4"
        style={{
          padding: "0px",
          transform: "translate(0px,0px)",
        }}
      >
        <div
          className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#E8F3D6] text-[#556B2F]"
          style={{
            padding: "0px",
            transform: "translate(0px,0px)",
          }}
        >
          <FaStore size={26} />
        </div>

        <div>
          <div
            className="flex items-center gap-2"
            style={{
              padding: "0px",
              transform: "translate(0px,0px)",
            }}
          >
            <h3
              className="text-xl font-black text-[#2F3A2D]"
              style={{
                margin: "0px",
                padding: "0px",
                transform: "translate(0px,0px)",
              }}
            >
              Craft Corner
            </h3>

            <FaCheckCircle className="text-green-600" />
          </div>

          <p
            className="text-sm text-[#777066]"
            style={{
              margin: "4px 0px 0px",
              padding: "0px",
              transform: "translate(0px,0px)",
            }}
          >
            98% Positive Ratings
          </p>
        </div>
      </div>

      <button
        className="flex items-center justify-center gap-2 rounded-xl border border-[#556B2F] text-[#556B2F] font-semibold hover:bg-[#556B2F] hover:text-white transition text-sm"
        style={{
          padding: "10px 18px",
          transform: "translate(0px,0px)",
        }}
      >
        <FaPhoneAlt />
        Contact Seller
      </button>
    </div>
  );
}
