import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";
import "../styles/wishlist.css";


export default function Wishlist() {


  const [wishlist, setWishlist] = useState([]);


  useEffect(() => {

    fetchWishlist();

  }, []);





  const fetchWishlist = async () => {

    try {

      const res = await api.get("/wishlist");


      console.log(
        "WISHLIST DATA:",
        res.data
      );


      setWishlist(
        res.data.wishlist || []
      );


    } catch (error) {


      console.log(
        "WISHLIST ERROR:",
        error
      );


    }

  };







  const removeWishlist = async (id) => {


    try {


      await api.delete(
        `/wishlist/${id}`
      );


      setWishlist(
        wishlist.filter(
          item => item._id !== id
        )
      );


      toast.success(
        "Removed from wishlist"
      );


    } catch (error) {


      toast.error(
        "Failed to remove"
      );


    }

  };








  return (


    <div className="wishlist-page">


      <div className="wishlist-container">



        <Link
          to="/"
          className="wishlist-back"
        >
          ← Back
        </Link>





        <div className="wishlist-header">


          <h1>
            ❤️ My Wishlist
          </h1>


          <p>
            All your favourite handmade items, saved in one place.
          </p>


        </div>







        {
          wishlist.length === 0 ?


          (

            <div className="wishlist-bottom">


              <h2>
                This is the only item in your wishlist!
              </h2>


              <p>
                Explore more beautiful handmade products and add them to your wishlist.
              </p>



              <Link
                to="/"
                className="continue-btn"
              >

                Continue Shopping →

              </Link>


            </div>


          )


          :



          (


          <>


          <div className="wishlist-list">


          {
            wishlist.map((item)=>(


              <div
                className="wishlist-card"
                key={item._id}
              >



                <div className="wishlist-image">


                  <img

                    src={
                      item.images?.[0] ||
                      item.image
                    }

                    alt={item.name}

                  />



                  <span>
                    ❤️
                  </span>


                </div>







                <div className="wishlist-info">


                  <div className="tag">
                    🌿 Handmade
                  </div>



                  <h2>
                    {item.name}
                  </h2>



                  <p className="desc">
                    Beautiful handmade product for your home.
                  </p>




                  <h3>
                    ₹{item.price}
                  </h3>



                  <div className="stock">
                    ● In Stock
                  </div>


                </div>







                <div className="wishlist-actions">



                  <button

                    className="delete-btn"

                    onClick={
                      ()=>removeWishlist(item._id)
                    }

                  >

                    🗑

                  </button>





                  <button
                    className="cart-btn"
                  >

                    🛍 Add to Cart

                  </button>





                  <Link

                    to={`/product/${item._id}`}

                    className="view-btn"

                  >

                    ◉ View Product

                  </Link>



                </div>



              </div>


            ))
          }


          </div>






          <div className="wishlist-bottom">


            <h2>
              This is the only item in your wishlist!
            </h2>


            <p>
              Explore more beautiful handmade products and add them to your wishlist.
            </p>



            <Link
              to="/"
              className="continue-btn"
            >

              Continue Shopping →

            </Link>


          </div>


          </>


          )

        }




      </div>


    </div>


  );


}