import {
  FaWallet,
  FaMoneyBillWave,
  FaCreditCard
} from "react-icons/fa";


const PaymentMethod = ({
  paymentMethod,
  setPaymentMethod
}) => {


  return (

    <div className="checkout-card payment-card">


      <div className="checkout-title">

        <div className="title-icon">
          <FaWallet />
        </div>


        <div>

          <h2>
            Payment Method
          </h2>

          <p>
            Choose your preferred payment option
          </p>

        </div>

      </div>




      <div className="payment-options">



        <div
          className={
            paymentMethod==="Cash On Delivery"
            ?
            "payment-box active"
            :
            "payment-box"
          }

          onClick={()=>
            setPaymentMethod(
              "Cash On Delivery"
            )
          }

        >

          <FaMoneyBillWave />

          <h3>
            Cash on Delivery
          </h3>

          <p>
            Pay when you receive
          </p>


        </div>





        <div
          className="payment-box"

          onClick={()=>
            setPaymentMethod("UPI")
          }

        >

          UPI

          <h3>
            UPI
          </h3>

          <p>
            Pay using any UPI app
          </p>


        </div>






        <div

          className="payment-box"

          onClick={()=>
            setPaymentMethod(
              "Credit Card"
            )
          }

        >

          <FaCreditCard />

          <h3>
            Credit / Debit Card
          </h3>


          <p>
            Secure card payment
          </p>


        </div>



      </div>



    </div>

  );

};


export default PaymentMethod;