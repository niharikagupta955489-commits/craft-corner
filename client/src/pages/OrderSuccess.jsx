import { Link } from "react-router-dom";
import {
  FaCheck,
  FaLeaf,
  FaShoppingBag
} from "react-icons/fa";


export default function OrderSuccess() {


  return (


    <div

      className="
min-h-screen
bg-[#FAF7F0]
flex
items-center
justify-center
px-6
py-10
overflow-hidden
"

      style={{

        transform: "translateX(0px) translateY(0px)"

      }}

    >


      {/* DECORATION */}


      <div

        className="
absolute
top-10
left-10
text-[#D9DDC5]
text-8xl
"

        style={{

          transform: "translateX(0px) translateY(0px)"

        }}

      >

        ❧

      </div>





      <div

        className="
absolute
bottom-10
right-10
text-[#D9DDC5]
text-8xl
"

        style={{

          transform: "translateX(0px) translateY(0px)"

        }}

      >

        ❧

      </div>







      {/* MAIN CARD */}



      <div

        className="
bg-[#FAF7F0]
max-w-4xl
w-full
rounded-[45px]

p-10
md:p-16
text-center
"

        style={{

          transform: "translateX(0px) translateY(-120px) scale(1)"

        }}

      >






        {/* CHECK ICON */}


        <div

          className="
w-32
h-32
rounded-full
bg-[#EEF3E3]
flex
items-center
justify-center
mx-auto
"

          style={{

            transform: "translateX(100px) translateY(98px) scale(0.6"

          }}

        >


          <div

            className="
w-20
h-20
rounded-full
border
border-[#9BAA70]
flex
items-center
justify-center
"

          >


            <FaCheck

              size={45}

              className="
text-[#556B2F]
"

            />


          </div>


        </div>



        {/* TITLE */}


        <h1

          className="
text-6xl
font-black
text-[#24331D]
mt-10
"

          style={{

            transform: "translateX(0px) translateY(0px)"

          }}

        >

          Order Placed!

        </h1>






        <div

          className="
flex
items-center
justify-center
gap-3
mt-5
"

          style={{

            transform: "translateX(1px) translateY(0px)"

          }}

        >


          <div

            className="
w-20
h-[2px]
bg-[#AAB68A]
"

          ></div>


          <FaLeaf

            className="
text-[#87965C]
"

            size={22}

          />


          <div

            className="
w-20
h-[2px]
bg-[#AAB68A]
"

          ></div>


        </div>







        {/* MESSAGE */}



        <p

          className="
text-xl
text-[#625D52]
mt-8
max-w-xl
mx-auto
leading-relaxed
"

          style={{

            transform: "translateX(160px) translateY(0px)"

          }}

        >

          Thank you for shopping with CraftCorner.
          <br />

          Your order has been placed successfully.

        </p>







        {/* ORDER ID BOX */}



        <div

          className="
bg-[#F8F6EF]
rounded-3xl
mt-10
p-8
"

          style={{

            transform: "translateX(0px) translateY(10px)"

          }}

        >


          <p

            className="
text-[#7B8657]
font-semibold
tracking-wide
"

          >

            ORDER ID

          </p>




          <h2

            className="
text-4xl
font-black
text-[#24331D]
mt-3
"

            style={{

              transform: "translateX(0px) translateY(0px) scale(0.6)"

            }}

          >

            #CC2026001

          </h2>



        </div>







        {/* BUTTONS */}



        <div

          className="
flex
flex-col
md:flex-row
gap-5
mt-10
"

          style={{

            transform: "translateX(0px) translateY(50px)"

          }}

        >



          <Link

            to="/my-orders"

            className="
flex-1
bg-[#6B7D3A]
text-white
py-5
rounded-2xl
text-lg
font-semibold
flex
items-center
justify-center
gap-3
hover:bg-[#556B2F]
transition
"

            style={{

              transform: "translateX(0px) translateY(0px)"

            }}

          >


            <FaShoppingBag />

            View Orders


          </Link>







          <Link

            to="/marketplace"

            className="
flex-1
border-2
border-[#6B7D3A]
text-[#556B2F]
py-5
rounded-2xl
text-lg
font-semibold
flex
items-center
justify-center
gap-3
hover:bg-[#556B2F]
hover:text-white
transition
"

            style={{

              transform: "translateX(0px) translateY(0px)"

            }}

          >


            <FaShoppingBag />

            Continue Shopping


          </Link>




        </div>





      </div>


    </div>


  );

}