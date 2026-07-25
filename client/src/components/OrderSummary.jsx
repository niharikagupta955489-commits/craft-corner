import {
  FaShoppingBag,
  FaShieldAlt,
  FaLock
} from "react-icons/fa";


const OrderSummary = ({ 
  cart,
  placeOrder,
  loading
}) => {


  const subtotal = cart.reduce(
    (total, item) =>
      total + item.product.price * item.quantity,
    0
  );


  const shipping = subtotal >= 499 ? 0 : 49;


  const total = subtotal + shipping;



  return (

    <div className="checkout-card order-card">


      <div className="checkout-title">

        <div className="title-icon">
          <FaShoppingBag />
        </div>


        <div>
          <h2>
            Order Summary
          </h2>

          <p>
            Review your order details
          </p>
        </div>

      </div>




      <div className="summary-products">


        {
          cart.map((item)=>(

            <div
              className="product-box"
              key={item._id}
            >

              <img
                src={item.product.images?.[0]}
                alt={item.product.name}
              />


              <div className="product-info">

                <h3>
                  {item.product.name}
                </h3>


                <p>
                  Qty : {item.quantity}
                </p>


                <span>
                  ₹{item.product.price * item.quantity}
                </span>


              </div>


            </div>


          ))
        }


      </div>





      <hr />





      <div className="price-row">

        <p>
          Subtotal
        </p>


        <span>
          ₹{subtotal}
        </span>


      </div>





      <div className="price-row">

        <p>
          Shipping
        </p>


        <span className="green">

          {
            shipping === 0
            ? "FREE"
            : `₹${shipping}`
          }

        </span>


      </div>





      <div className="total-box">


        <h2>
          Total
        </h2>


        <h2 className="green">
          ₹{total}
        </h2>


      </div>





      <div className="secure-box">


        <FaShieldAlt />


        <div>

          <h3>
            Secure Checkout
          </h3>


          <p>
            Your payment information is safe
          </p>


        </div>


      </div>





     <button
  className="place-order"
  onClick={placeOrder}
  disabled={loading}
>

  <FaLock />

  {
    loading
    ? "Placing Order..."
    : "Place Order"
  }

</button>




      <div className="secure-payment">

        <FaShieldAlt />

        100% Secure Payment

      </div>



    </div>

  );

};


export default OrderSummary;