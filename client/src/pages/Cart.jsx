import { Link, useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaLeaf,
  FaTrash,
  FaMinus,
  FaPlus,
  FaLock,
  FaTruck,
  FaShieldAlt,
  FaUndoAlt,
  FaHeadset,
} from "react-icons/fa";

import { useState } from "react";
import toast from "react-hot-toast";
import { useCart } from "../context/CartContext";


export default function Cart() {

  const navigate = useNavigate();

  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  } = useCart();


  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);


  const subtotal = cart.reduce(
    (total, item) =>
      total + item.product.price * item.quantity,
    0
  );


  const shipping = subtotal >= 499 ? 0 : 49;


  const finalTotal =
    subtotal + shipping - discount;



  const applyCoupon = () => {

    const code = coupon.trim().toUpperCase();


    if (!code) {
      toast.error("Enter coupon code");
      return;
    }


    if (code === "SAVE10") {

      const dis = Math.round(subtotal * 0.10);

      setDiscount(dis);

      toast.success("10% Discount Applied");

    }

    else if (code === "WELCOME20") {

      const dis = Math.round(subtotal * 0.20);

      setDiscount(dis);

      toast.success("20% Discount Applied");

    }

    else {

      setDiscount(0);

      toast.error("Invalid Coupon");

    }

  };



  if(cart.length === 0){

    return (

      <div className="
        min-h-screen
        bg-[#FAF8F3]
        flex
        items-center
        justify-center
      ">

        <div className="text-center">

          <FaLeaf className="
            text-5xl
            text-[#556B2F]
            mx-auto
            mb-6
          "/>


          <h1 className="
            text-2xl
            font-bold
            text-[#20311E]
          ">
            Your Cart is Empty
          </h1>


          <p className="
            text-gray-500
            mt-3
            mb-8
          ">
            Add some handmade products.
          </p>


          <Link
            to="/marketplace"
            className="
              bg-[#556B2F]
              text-white
              px-8
              py-4
              rounded-xl
            "
          >
            Continue Shopping
          </Link>


        </div>

      </div>

    );

  }



  return (

    <div className="
      min-h-screen
      bg-[#FAF8F3]
      py-10
    ">


      <div className="
        max-w-[1500px]
        mx-auto
        px-6
      ">



        <h1 className="
          text-2xl
          font-extrabold
          text-[#20311E]
          mt-12
          flex
          items-center
          gap-4
        ">

          Shopping Cart

          <FaLeaf className="text-[#556B2F]"/>

        </h1>



        <div className="
          grid
          lg:grid-cols-3
          gap-5
          mt-10
        ">


          <div className="
            lg:col-span-2
            space-y-7
          ">

        {/* Cart Header */}

        <div className="
          hidden
          lg:grid
          grid-cols-12
          bg-[#EEF5E5]
          rounded-2xl
          px-6
          py-4
          font-semibold
          text-[#355E3B]
        ">

          <div className="col-span-5">
            Product
          </div>

          <div className="col-span-2 text-center">
            Price
          </div>

          <div className="col-span-1 text-center">
            Quantity
          </div>

          <div className="col-span-2 text-center">
            Total
          </div>

          <div className="col-span-1 text-center">
              Remove 
          </div>

        </div>



        {/* Cart Products */}


        {
          cart.map((item)=>(

            <div
              key={item._id}
              className="
                bg-white
                rounded-3xl
                border
                border-[#ECE6D8]
                shadow-sm
                p-6
              "
            >


              <div className="
                grid
                grid-cols-1
                lg:grid-cols-12
                items-center
                gap-5
              ">


                {/* Product Info */}


                <div className="
                  lg:col-span-5
                  flex
                  items-center
                  gap-8
                ">


                  <img
                    src={item.product.images?.[0]}
                    alt={item.product.name}
                    className="
  w-30
  h-20
  rounded-2xl
  object-cover
  
"
                  />


                  <div>


                    <h2 className="
  text-x2
  font-bold
  text-[#20311E]
  whitespace-nowrap
">
  {item.product.name}
</h2>


                    <span className="
                      inline-block
                      mt-4
                      px-3
                      py-1
                      rounded-full
                      bg-[#EEF5E5]
                      text-[#556B2F]
                      text-sm
                    ">
                      Handmade
                    </span>


                    <p className="
                      text-gray-500
                      mt-2
                      text-sm
                    ">
                      🌿 Natural Craft
                    </p>


                  </div>


                </div>



                {/* Price */}


                <div className="
                  lg:col-span-2 
                  text-center
                  font-bold
                  text-xl
                ">

                  ₹{item.product.price}

                </div>




                {/* Quantity */}


                <div className="
                  lg:col-span-1
                  flex
                  justify-center
                ">


                  <div className="
                    flex
                    items-center
                    border
                    rounded-xl
                    overflow-hidden
                  ">


                    <button
                      onClick={()=>decreaseQuantity(item._id)}
                      className="
                        w-12
                        h-10
                        hover:bg-gray-100
                      "
                    >

                      <FaMinus/>

                    </button>



                    <span className="
                      w-10
                      text-center
                      font-semibold
                    ">

                      {item.quantity}

                    </span>



                    <button
                      onClick={()=>increaseQuantity(item._id)}
                      className="
                        w-10
                        h-10
                        hover:bg-gray-100
                      "
                    >

                      <FaPlus/>

                    </button>


                  </div>


                </div>




                {/* Total */}


                <div className="
                  lg:col-span-2
                  text-center
                  font-bold
                  text-xl
                  text-[#556B2F]
                ">

                  ₹{item.product.price * item.quantity}

                </div>




                {/* Remove */}


               <div className="
  lg:col-span-0
  flex
  justify-end
  items-center
">

<button
  onClick={() => {

    removeFromCart(item._id);

    toast.success("Item removed");

  }}

  className="
    w-16
    h-12
    flex
    items-center
    justify-center
    rounded-full
    bg-red-50
    text-red-500
    hover:bg-red-500
    hover:text-white
    transition
  "
>

  <FaTrash size={19}/>

</button>

                </div>


              </div>


            </div>


          ))
        }



        {/* Coupon Section */}


        <div className="
          flex
          flex-col
          md:flex-row
          justify-between
          items-center
          gap-5
          mt-8
        ">


          <div className="
            flex
            w-full
            md:w-[380px]
          ">


            <input
              value={coupon}
              onChange={(e)=>setCoupon(e.target.value)}
              placeholder="Enter coupon code"
              className="
                flex-1
                px-5
                py-2
                border
                rounded-l-xl
                outline-none
              "
            />


            <button
              onClick={applyCoupon}
              className="
                bg-[#556B2F]
                text-white
                px-5
                rounded-r-xl
              "
            >

              Apply

            </button>


          </div>




          <button
            onClick={clearCart}
            className="
              px-7
              py-3
              rounded-xl
              border
              border-red-300
              text-red-600
            "
          >

            Clear Cart

          </button>


        </div>

          </div>


          {/* RIGHT SIDE */}


          <div className="space-y-6">


          <div className="
  bg-white
  rounded-3xl
  border
  border-[#ECE6D8]
  shadow-lg
  p-8
">


              <h2 className="
                text-2xl
                font-semi bold
                text-[#20311E]
                mb-8
              ">

                Order Summary

              </h2>



              <div className="space-y-4">


                <div className="flex justify-between">

                  <span className="text-gray-600">
                    Subtotal
                  </span>


                  <span className="font-semibold">

                    ₹{subtotal}

                  </span>

                </div>



                <div className="flex justify-between">

                  <span className="text-gray-600">
                    Shipping
                  </span>


                  <span className="text-green-600 font-semibold">

                    {
                      shipping === 0
                      ? "FREE"
                      : `₹${shipping}`
                    }

                  </span>


                </div>



                <div className="flex justify-between">

                  <span className="text-gray-600">
                    Discount
                  </span>


                  <span className="text-green-600">

                    -₹{discount}

                  </span>


                </div>



              </div>




              <hr className="my-8"/>




              <div className="
                flex
                justify-between
                items-center
              ">


                <span className="
                  text-2xl
                  font-bold
                ">

                  Total

                </span>



                <span className="
                  text-2xl
                  font-bold
                  text-[#556B2F]
                ">

                  ₹{finalTotal}

                </span>


              </div>





              <button

                onClick={()=>navigate("/checkout")}

                className="
                  mt-8
                  w-full
                  py-4
                  rounded-2xl
                  bg-[#556B2F]
                  hover:bg-[#445625]
                  text-white
                  font-semibold
                  text-lg
                  flex
                  justify-center
                  items-center
                  gap-3
                  transition
                "

              >

                <FaLock/>

                Secure Checkout


              </button>





              <div className="
                mt-8
                space-y-5
              ">


                <div className="
                  flex
                  items-center
                  gap-3
                ">

                  <FaTruck className="text-[#556B2F]"/>

                  <span>
                    Free Shipping Above ₹499
                  </span>

                </div>




                <div className="
                  flex
                  items-center
                  gap-3
                ">


                  <FaShieldAlt className="text-[#556B2F]"/>


                  <span>
                    Secure Payment
                  </span>


                </div>




                <div className="
                  flex
                  items-center
                  gap-3
                ">


                  <FaUndoAlt className="text-[#556B2F]"/>


                  <span>
                    Easy 7 Days Return
                  </span>


                </div>




                <div className="
                  flex
                  items-center
                  gap-3
                ">


                  <FaHeadset className="text-[#556B2F]"/>


                  <span>
                    24×7 Support
                  </span>


                </div>


              </div>



            </div>




            {/* Why Love Card */}



            <div className="
              rounded-3xl
              bg-gradient-to-br
              from-[#556B2F]
              to-[#445625]
              text-white
              p-8
              shadow-xl
            ">


              <h3 className="
                text-2xl
                font-bold
              ">

                Why You'll Love Shopping Here

              </h3>


              <p className="
                mt-5
                leading-8
                text-white/90
              ">

                Every purchase supports skilled artisans.
                Our handmade products are crafted with care
                and delivered safely to your doorstep.

              </p>


            </div>


          </div>


        </div>
        {/* Bottom Features */}

        <div className="
          mt-16
          bg-white
          rounded-3xl
          border
          border-[#ECE6D8]
          shadow-sm
          p-8
        ">


          <div className="
            grid
            grid-cols-1
            md:grid-cols-2
            lg:grid-cols-4
            gap-8
          ">



            <div className="
              flex
              items-center
              gap-4
            ">

              <div className="
                w-14
                h-14
                rounded-2xl
                bg-[#EEF5E5]
                flex
                items-center
                justify-center
              ">

                <FaTruck className="
                  text-[#556B2F]
                  text-2xl
                "/>

              </div>


              <div>

                <h3 className="font-bold text-[#20311E]">
                  Free Shipping
                </h3>

                <p className="text-sm text-gray-500">
                  On orders above ₹499
                </p>

              </div>


            </div>





            <div className="
              flex
              items-center
              gap-4
            ">

              <div className="
                w-14
                h-14
                rounded-2xl
                bg-[#EEF5E5]
                flex
                items-center
                justify-center
              ">

                <FaShieldAlt className="
                  text-[#556B2F]
                  text-2xl
                "/>

              </div>


              <div>

                <h3 className="font-bold text-[#20311E]">
                  Secure Payment
                </h3>

                <p className="text-sm text-gray-500">
                  100% Safe Checkout
                </p>

              </div>


            </div>





            <div className="
              flex
              items-center
              gap-4
            ">

              <div className="
                w-14
                h-14
                rounded-2xl
                bg-[#EEF5E5]
                flex
                items-center
                justify-center
              ">

                <FaUndoAlt className="
                  text-[#556B2F]
                  text-2xl
                "/>

              </div>


              <div>

                <h3 className="font-bold text-[#20311E]">
                  Easy Returns
                </h3>

                <p className="text-sm text-gray-500">
                  7 Days Return Policy
                </p>

              </div>


            </div>





            <div className="
              flex
              items-center
              gap-4
            ">

              <div className="
                w-14
                h-14
                rounded-2xl
                bg-[#EEF5E5]
                flex
                items-center
                justify-center
              ">

                <FaHeadset className="
                  text-[#556B2F]
                  text-2xl
                "/>

              </div>


              <div>

                <h3 className="font-bold text-[#20311E]">
                  24×7 Support
                </h3>

                <p className="text-sm text-gray-500">
                  Always here to help
                </p>

              </div>


            </div>



          </div>


        </div>


      </div>


    </div>


  );

}