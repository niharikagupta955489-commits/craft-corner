import {
  FaStore,
  FaStar,
  FaCheckCircle,
  FaPhoneAlt,
} from "react-icons/fa";

export default function SellerInfo() {

  return (

    <div className="flex items-center justify-between">

      <div className="flex items-center gap-5">

        <div className="w-16 h-16 rounded-full bg-[#E8F3D6] flex items-center justify-center"
        style={{
  paddingLeft:"20px",
  paddingRight:"20px",

transform:"translate(-40px,0px) scale(01)"

}}>

          <FaStore className="text-[#556B2F] text-3xl"/>

        </div>

        <div>

          <div className="flex items-center gap-3">

            <h3 className="text-2xl font-bold"
            style={{


transform:"translate(-40px,8px) scale(0.8)"

}}>

Craft Corner

            </h3>

            <FaCheckCircle className="text-green-600"
            style={{
  

transform:"translate(-80px,0px) scale(01)"

}}/>

          </div>

          <p className="text-gray-500"
          style={{


transform:"translate(-30px,0px) scale(01)"

}}
>

            98% Positive Ratings

          </p>

        </div>

      </div>

      <button

        className="

        border

        border-[#556B2F]

        text-[#556B2F]

        hover:bg-[#556B2F]

        hover:text-white

        px-8

        py-3

        rounded-xl

        flex

        items-center

        gap-3

        transition

        "
style={{
  paddingLeft:"20px",
  paddingRight:"20px",

transform:"translate(0px,0px) scale(01)"

}}
      >

        <FaPhoneAlt/>

        Contact Seller

      </button>

    </div>

  );

}