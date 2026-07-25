import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useState } from "react";

import toast from "react-hot-toast";

import { useCart } from "../context/CartContext";
import api from "../services/api";

import ShippingAddress from "../components/ShippingAddress";
import PaymentMethod from "../components/PaymentMethod";
import OrderSummary from "../components/OrderSummary";

import "../styles/checkout.css";


const Checkout = () => {


  const navigate = useNavigate();


  const {
    cart,
    clearCart
  } = useCart();



  const [address, setAddress] = useState("");

  const [paymentMethod, setPaymentMethod] = useState(
    "Cash On Delivery"
  );


  const [loading, setLoading] = useState(false);



  console.log("CHECKOUT CART =", cart);




  const placeOrder = async () => {


    console.log("PLACE ORDER CLICKED");



    if(!address){

      toast.error(
        "Please enter shipping address"
      );

      return;

    }



    if(cart.length === 0){

      toast.error(
        "Cart is empty"
      );

      return;

    }




    try{


      setLoading(true);



      const items = cart.map((item)=>({

        product: item.product._id,

        quantity: item.quantity,

        price: item.product.price

      }));





      const totalPrice = cart.reduce(

        (total,item)=>

        total +
        item.product.price *
        item.quantity,

        0

      );





      const response = await api.post(

        "/orders",

        {

          items,

          totalPrice,

          shippingAddress: address,

          paymentMethod

        }

      );



      console.log(
        "ORDER RESPONSE",
        response.data
      );



      toast.success(
        "Order placed successfully"
      );



      clearCart();



      navigate(
        "/order-success"
      );



    }
    catch(error){

  console.log(
    "ORDER ERROR:",
    error.response?.data || error.message
  );

  toast.error(
    error.response?.data?.message ||
    "Order failed"
  );

}
    finally{


      setLoading(false);


    }



  };






  return (

    <div className="checkout-page">


      <div className="checkout-header">


        <Link
          to="/cart"
          className="back-btn"
        >

          <FaArrowLeft />

          Back to Cart

        </Link>



        <h1>
          Checkout
        </h1>



      </div>






      <div className="checkout-container">



        <div className="checkout-left">



          <ShippingAddress

            address={address}

            setAddress={setAddress}

          />





          <PaymentMethod

            paymentMethod={paymentMethod}

            setPaymentMethod={setPaymentMethod}

          />



        </div>






        <div className="checkout-right">



          <OrderSummary

            cart={cart}

            placeOrder={placeOrder}

            loading={loading}

          />



        </div>





      </div>



    </div>

  );

};


export default Checkout;