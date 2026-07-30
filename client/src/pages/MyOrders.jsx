import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import "../styles/myOrders.css";


export default function MyOrders() {


  const { user } = useAuth();


  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);



  useEffect(()=>{

    if(user?._id){

      fetchOrders();

    }

  },[user]);




  const fetchOrders = async()=>{

    try{


      const res = await api.get(
        `/orders/user/${user._id}`
      );


      setOrders(
        res.data.orders || []
      );


    }
    catch(error){

      toast.error(
        "Failed to fetch orders"
      );

    }
    finally{

      setLoading(false);

    }

  };





  if(loading){

    return (

      <div className="orders-loading">

        Loading Orders...

      </div>

    );

  }




  return (

    <div className="my-orders-page">


      <div className="my-orders-container">



        <Link
          to="/"
          className="orders-back"
        >
          ← Back
        </Link>



        <h1>
          My Orders
        </h1>


        <p className="orders-subtitle">
          Track and manage all your orders in one place.
        </p>





        <div className="orders-wrapper">



        {
          orders.map((order)=>(


            <div
              className="order-box"
              key={order._id}
            >



              <div className="order-id-section">


                <div className="order-icon">
                  🧾
                </div>


                <div>

                  <span>
                    Order ID
                  </span>


                  <h3>
                    #{order._id.slice(-8)}
                  </h3>


                  <p>
                    📅 {new Date(order.createdAt).toLocaleDateString()}
                  </p>


                </div>


              </div>





              <div className="product-section">


              {
                order.items.map((item)=>(


                  <div
                    className="product-row"
                    key={item._id}
                  >


                    <img
                      src={
                        item.product?.images?.[0]
                      }
                      alt=""
                    />


                    <div>


                      <h3>
                        {item.product?.name}
                      </h3>


                      <p>
                        Qty: {item.quantity}
                      </p>


                      <strong>
                        ₹{item.price}
                      </strong>


                    </div>


                  </div>


                ))
              }


              </div>







              <div className="status-section">


                <span>
                  Status
                </span>


                <div className="status">

                  {order.status}

                </div>



                <p>
                  Total
                </p>


                <h2>
                  ₹{order.totalPrice}
                </h2>



              </div>





            </div>


          ))
        }


        </div>





        <div className="continue-box">


          <div>

            <h2>
              No more orders?
            </h2>


            <p>
              Explore our beautiful handmade collection.
            </p>


          </div>




          <Link
            to="/marketplace"
            className="continue-btn"
          >
            Continue Shopping
          </Link>



        </div>




      </div>


    </div>

  );

}