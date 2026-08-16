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
    <div
      className="min-h-screen bg-[#F8F7F1] text-[#2F2B26]"
      style={{
        minHeight: "100vh",
        padding: "28px 42px 50px",
        transform: "translate(0px,0px)",
      }}
    >
      <div
        className="mx-auto max-w-[1380px]"
        style={{
          padding: "0px 18px",
          transform: "translate(0px,0px)",
        }}
      >
        {/* Top navigation */}
        <div
          style={{
            padding: "0px 0px 26px",
            transform: "translate(0px,0px)",
          }}
        >
          <Link
            to="/"
            className="inline-flex items-center text-[#556B2F] font-semibold text-lg hover:opacity-70 transition"
            style={{
              padding: "5px 0px",
              transform: "translate(0px,0px)",
            }}
          >
            ← Back
          </Link>
        </div>

        {/* Header */}
        <div
          className="flex items-end justify-between gap-5"
          style={{
            padding: "0px 4px 28px",
            transform: "translate(0px,0px)",
          }}
        >
          <div>
            <div
              className="flex items-center gap-3"
              style={{
                padding: "0px",
                transform: "translate(0px,0px)",
              }}
            >
              <span
                className="flex items-center justify-center rounded-full bg-[#FBE8EC] text-3xl"
                style={{
                  width: "58px",
                  height: "58px",
                  padding: "0px",
                  transform: "translate(0px,0px)",
                }}
              >
                ❤️
              </span>

              <h1
                className="text-5xl font-black tracking-tight"
                style={{
                  margin: "0px",
                  padding: "0px",
                  transform: "translate(0px,0px)",
                }}
              >
                My Wishlist
              </h1>
            </div>

            <p
              className="text-[#756D63] text-lg"
              style={{
                margin: "9px 0px 0px 70px",
                padding: "0px",
                transform: "translate(0px,0px)",
              }}
            >
              All your favourite handmade items, saved in one place.
            </p>
          </div>

          <div
            className="rounded-full bg-white border border-[#E5E0D5] text-[#556B2F] font-semibold shadow-sm"
            style={{
              padding: "9px 18px",
              transform: "translate(0px,0px)",
            }}
          >
            {wishlist.length} {wishlist.length === 1 ? "Item" : "Items"}
          </div>
        </div>

        {wishlist.length === 0 ? (
          /* Empty wishlist */
          <div
            className="bg-white rounded-[30px] border border-[#D5DFBE] shadow-[0_12px_35px_rgba(65,75,40,0.08)] text-center overflow-hidden"
            style={{
              padding: "0px",
              transform: "translate(0px,0px)",
            }}
          >
            <div
              className="bg-[#F0F4E7]"
              style={{
                padding: "32px 30px 28px",
                transform: "translate(0px,0px)",
              }}
            >
              <div
                className="mx-auto rounded-full bg-white shadow-sm flex items-center justify-center text-5xl"
                style={{
                  width: "94px",
                  height: "94px",
                  padding: "0px",
                  transform: "translate(0px,0px)",
                }}
              >
                ♡
              </div>

              <h2
                className="text-3xl font-black"
                style={{
                  margin: "20px 0px 7px",
                  padding: "0px",
                  transform: "translate(0px,0px)",
                }}
              >
                Your wishlist is waiting!
              </h2>

              <p
                className="text-[#756D63] text-base"
                style={{
                  margin: "0px",
                  padding: "0px",
                  transform: "translate(0px,0px)",
                }}
              >
                Save your favourite handmade products here and find them anytime.
              </p>
            </div>

            <div
              style={{
                padding: "28px 30px 34px",
                transform: "translate(0px,0px)",
              }}
            >
              <p
                className="text-[#5F594F]"
                style={{
                  margin: "0px",
                  padding: "0px",
                  transform: "translate(0px,0px)",
                }}
              >
                Explore more beautiful handmade products and add them to your wishlist.
              </p>

              <Link
                to="/"
                className="inline-flex items-center justify-center bg-[#5B7F35] text-white rounded-full font-bold shadow-[0_8px_18px_rgba(91,127,53,0.22)] hover:scale-105 transition"
                style={{
                  marginTop: "14px",
                  padding: "13px 27px",
                  transform: "translate(0px,0px)",
                }}
              >
                Continue Shopping →
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* Wishlist products */}
            <div
              className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5"
              style={{
                padding: "0px",
                transform: "translate(0px,0px)",
              }}
            >
              {wishlist.map((item) => (
                <div
                  className="group bg-white rounded-[22px] border border-[#E5E0D5] overflow-hidden shadow-[0_6px_18px_rgba(65,75,40,0.06)] hover:shadow-[0_10px_24px_rgba(65,75,40,0.10)] transition"
                  key={item._id}
                  style={{
                    padding: "0px",
                    transform: "translate(0px,0px)",
                  }}
                >
                  <div
                    className="relative bg-[#F3F0E8] overflow-hidden"
                    style={{
                      height: "205px",
                      padding: "0px",
                      transform: "translate(0px,0px)",
                    }}
                  >
                    <img
                      src={item.images?.[0] || item.image}
                      alt={item.name}
                      className="h-full w-full object-cover group-hover:scale-105 transition duration-300"
                      style={{
                        padding: "0px",
                        transform: "translate(0px,0px)",
                      }}
                    />

                    <button
                      onClick={() => removeWishlist(item._id)}
                      className="absolute top-4 right-4 bg-white text-red-500 rounded-full shadow-md hover:scale-110 transition"
                      style={{
                        width: "42px",
                        height: "42px",
                        padding: "0px",
                        transform: "translate(0px,0px)",
                      }}
                      aria-label="Remove from wishlist"
                    >
                      ❤️
                    </button>

                    <div
                      className="absolute left-4 bottom-4 rounded-full bg-white/95 text-[#556B2F] text-xs font-bold shadow-sm"
                      style={{
                        padding: "7px 12px",
                        transform: "translate(0px,0px)",
                      }}
                    >
                      🌿 Handmade
                    </div>
                  </div>

                  <div
                    style={{
                      padding: "22px",
                      transform: "translate(0px,0px)",
                    }}
                  >
                    <h2
                      className="text-lg font-black line-clamp-2"
                      style={{
                        margin: "0px",
                        padding: "0px",
                        transform: "translate(0px,0px)",
                      }}
                    >
                      {item.name}
                    </h2>

                    <p
                      className="text-sm text-[#756D63] line-clamp-2"
                      style={{
                        margin: "6px 0px 0px",
                        padding: "0px",
                        transform: "translate(0px,0px)",
                      }}
                    >
                      Beautiful handmade product for your home.
                    </p>

                    <div
                      className="flex items-center justify-between"
                      style={{
                        marginTop: "12px",
                        padding: "0px",
                        transform: "translate(0px,0px)",
                      }}
                    >
                      <span
                        className="text-xl font-black text-[#556B2F]"
                        style={{
                          padding: "0px",
                          transform: "translate(0px,0px)",
                        }}
                      >
                        ₹{item.price}
                      </span>

                      <span
                        className="rounded-full bg-[#EEF3E6] text-[#5B7F35] text-xs font-semibold"
                        style={{
                          padding: "6px 10px",
                          transform: "translate(0px,0px)",
                        }}
                      >
                        ● In Stock
                      </span>
                    </div>

                    <div
                      className="grid grid-cols-2 gap-3"
                      style={{
                        marginTop: "20px",
                        padding: "0px",
                        transform: "translate(0px,0px)",
                      }}
                    >
                      <button
                        className="bg-[#5B7F35] text-white rounded-xl font-semibold hover:scale-[1.02] transition"
                        style={{
                          padding: "4px 0px",
                          transform: "translate(0px,0px)",
                        }}
                      >
                        🛍 Add to Cart
                      </button>

                      <Link
                        to={`/product/${item._id}`}
                        className="border border-[#CDBA8E] text-[#9A6B23] rounded-xl font-semibold text-center hover:bg-[#FAF4E7] transition"
                        style={{
                          padding: "9px 0px",
                          transform: "translate(0px,0px)",
                        }}
                      >
                        ◉ View Product
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom shopping banner */}
            <div
              className="bg-white border border-[#E5E0D5] rounded-[26px] shadow-[0_8px_25px_rgba(65,75,40,0.06)]"
              style={{
                marginTop: "28px",
                padding: "25px 30px",
                transform: "translate(0px,0px)",
              }}
            >
              <div
                className="flex flex-col md:flex-row items-center justify-between gap-5"
                style={{
                  padding: "0px",
                  transform: "translate(0px,0px)",
                }}
              >
                <div>
                  <h2
                    className="text-2xl font-black"
                    style={{
                      margin: "0px",
                      padding: "0px",
                      transform: "translate(0px,0px)",
                    }}
                  >
                    Looking for something more?
                  </h2>

                  <p
                    className="text-[#756D63]"
                    style={{
                      margin: "5px 0px 0px",
                      padding: "0px",
                      transform: "translate(0px,0px)",
                    }}
                  >
                    Discover more handcrafted products made with care.
                  </p>
                </div>

                <Link
                  to="/"
                  className="bg-[#5B7F35] text-white rounded-full font-bold hover:scale-105 transition"
                  style={{
                    padding: "12px 24px",
                    transform: "translate(0px,0px)",
                  }}
                >
                  Continue Shopping →
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );


}