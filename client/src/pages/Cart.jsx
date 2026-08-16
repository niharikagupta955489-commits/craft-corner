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
      total + (item.product?.price || 0) * item.quantity,
    0
  );

  const shipping = subtotal >= 499 ? 0 : 49;

  const finalTotal = Math.max(
    0,
    subtotal + shipping - discount
  );

  const applyCoupon = () => {
    const code = coupon.trim().toUpperCase();

    if (!code) {
      toast.error("Enter coupon code");
      return;
    }

    if (code === "SAVE10") {
      const dis = Math.round(subtotal * 0.1);
      setDiscount(dis);
      toast.success("10% Discount Applied");
    } else if (code === "WELCOME20") {
      const dis = Math.round(subtotal * 0.2);
      setDiscount(dis);
      toast.success("20% Discount Applied");
    } else {
      setDiscount(0);
      toast.error("Invalid Coupon");
    }
  };

  if (cart.length === 0) {
    return (
      <div
        className="min-h-screen bg-[#FAF8F3] flex items-center justify-center"
        style={{
          padding: "40px 24px",
          transform: "translate(0px,0px)",
        }}
      >
        <div
          className="w-full max-w-[520px] rounded-[32px] border border-[#E6DFD1] bg-white text-center shadow-[0_15px_40px_rgba(70,80,40,0.10)]"
          style={{
            padding: "48px 32px",
            transform: "translate(0px,0px)",
          }}
        >
          <div
            className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#EEF5E5]"
            style={{
              padding: "0",
              transform: "translate(0px,0px)",
            }}
          >
            <FaLeaf className="text-4xl text-[#556B2F]" />
          </div>

          <h1
            className="text-3xl font-extrabold text-[#20311E]"
            style={{
              padding: "0",
              margin: "24px 0 0",
              transform: "translate(0px,0px)",
            }}
          >
            Your Cart is Empty
          </h1>

          <p
            className="text-[#7B746B]"
            style={{
              padding: "0",
              margin: "10px 0 28px",
              transform: "translate(0px,0px)",
            }}
          >
            Add some handmade products to your cart.
          </p>

          <Link
            to="/marketplace"
            className="inline-flex items-center justify-center rounded-2xl bg-[#556B2F] font-semibold text-white transition hover:bg-[#486027]"
            style={{
              padding: "14px 28px",
              transform: "translate(0px,0px)",
            }}
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-[#FAF8F3]"
      style={{
        padding: "24px 0 40px",
        transform: "translate(0px,0px)",
      }}
    >
      <div
        className="mx-auto max-w-[1500px]"
        style={{
          padding: "0 28px",
          transform: "translate(0px,0px)",
        }}
      >
        {/* BACK */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-xl font-semibold text-[#556B2F] transition hover:bg-[#EEF5E5]"
          style={{
            padding: "9px 13px",
            margin: "0 0 10px",
            transform: "translate(0px,0px)",
          }}
        >
          <FaArrowLeft />
          Back
        </Link>

        {/* TITLE */}
        <div
          style={{
            padding: "0",
            margin: "4px 0 26px",
            transform: "translate(0px,0px)",
          }}
        >
          <h1
            className="flex items-center gap-4 text-4xl font-extrabold text-[#20311E]"
            style={{
              padding: "0",
              margin: "0",
              transform: "translate(0px,0px)",
            }}
          >
            Shopping Cart
            <FaLeaf className="text-[#556B2F]" />
          </h1>

          <p
            className="text-[#7B746B]"
            style={{
              padding: "0",
              margin: "7px 0 0",
              transform: "translate(0px,0px)",
            }}
          >
            Review your handmade products before checkout.
          </p>
        </div>

        {/* MAIN GRID */}
        <div
          className="grid gap-7 lg:grid-cols-3"
          style={{
            padding: "0",
            transform: "translate(0px,0px)",
          }}
        >
          {/* LEFT */}
          <div
            className="space-y-5 lg:col-span-2"
            style={{
              padding: "0",
              transform: "translate(0px,0px)",
            }}
          >
            {/* TABLE HEADER */}
            <div
              className="hidden grid-cols-12 rounded-2xl bg-[#EEF5E5] font-semibold text-[#355E3B] lg:grid"
              style={{
                padding: "13px 20px",
                transform: "translate(0px,0px)",
              }}
            >
              <div className="col-span-5">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-center">Total</div>
              <div className="col-span-1 text-center">Remove</div>
            </div>

            {/* PRODUCTS */}
            {cart.map((item) => {
              const price = item.product?.price || 0;
              const total = price * item.quantity;

              return (
                <div
                  key={item._id}
                  className="rounded-[28px] border border-[#E7E0D3] bg-white shadow-[0_8px_24px_rgba(70,80,40,0.07)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(70,80,40,0.10)]"
                  style={{
                    padding: "20px",
                    transform: "translate(0px,0px)",
                    boxSizing: "border-box",
                  }}
                >
                  <div
                    className="grid grid-cols-1 items-center gap-5 lg:grid-cols-12"
                    style={{
                      padding: "0",
                      transform: "translate(0px,0px)",
                    }}
                  >
                    {/* PRODUCT */}
                    <div
                      className="flex items-center gap-5 lg:col-span-5"
                      style={{
                        padding: "0",
                        transform: "translate(0px,0px)",
                      }}
                    >
                      <img
                        src={item.product?.images?.[0]}
                        alt={item.product?.name || "Product"}
                        className="h-24 w-24 shrink-0 rounded-2xl object-cover"
                        style={{
                          padding: "0",
                          transform: "translate(0px,0px)",
                        }}
                      />

                      <div
                        className="min-w-0"
                        style={{
                          padding: "0",
                          transform: "translate(0px,0px)",
                        }}
                      >
                        <h2
                          className="truncate text-lg font-bold text-[#20311E] sm:text-xl"
                          style={{
                            padding: "0",
                            margin: "0",
                            transform: "translate(0px,0px)",
                          }}
                        >
                          {item.product?.name}
                        </h2>

                        <span
                          className="inline-block rounded-full bg-[#EEF5E5] text-sm font-medium text-[#556B2F]"
                          style={{
                            padding: "5px 11px",
                            margin: "8px 0 0",
                            transform: "translate(0px,0px)",
                          }}
                        >
                          Handmade
                        </span>

                        <p
                          className="text-sm text-[#777066]"
                          style={{
                            padding: "0",
                            margin: "7px 0 0",
                            transform: "translate(0px,0px)",
                          }}
                        >
                          🌿 Natural Craft
                        </p>
                      </div>
                    </div>

                    {/* PRICE */}
                    <div
                      className="text-center font-bold text-lg text-[#302C27] lg:col-span-2"
                      style={{
                        padding: "8px",
                        transform: "translate(0px,0px)",
                      }}
                    >
                      <span className="lg:hidden text-sm font-medium text-[#8A8177]">
                        Price:{" "}
                      </span>
                      ₹{price.toLocaleString("en-IN")}
                    </div>

                    {/* QUANTITY */}
                    <div
                      className="flex justify-center lg:col-span-2"
                      style={{
                        padding: "0",
                        transform: "translate(0px,0px)",
                      }}
                    >
                      <div
                        className="flex items-center overflow-hidden rounded-xl border border-[#D8D1C5] bg-white"
                        style={{
                          padding: "0",
                          transform: "translate(0px,0px)",
                        }}
                      >
                        <button
                          type="button"
                          onClick={() => decreaseQuantity(item._id)}
                          className="flex h-10 w-10 items-center justify-center text-[#556B2F] transition hover:bg-[#EEF5E5]"
                          style={{
                            padding: "0",
                            transform: "translate(0px,0px)",
                          }}
                          aria-label="Decrease quantity"
                        >
                          <FaMinus size={12} />
                        </button>

                        <span
                          className="flex h-10 w-10 items-center justify-center border-x border-[#E5DED2] font-semibold text-[#302C27]"
                          style={{
                            padding: "0",
                            transform: "translate(0px,0px)",
                          }}
                        >
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() => increaseQuantity(item._id)}
                          className="flex h-10 w-10 items-center justify-center text-[#556B2F] transition hover:bg-[#EEF5E5]"
                          style={{
                            padding: "0",
                            transform: "translate(0px,0px)",
                          }}
                          aria-label="Increase quantity"
                        >
                          <FaPlus size={12} />
                        </button>
                      </div>
                    </div>

                    {/* TOTAL */}
                    <div
                      className="text-center font-extrabold text-lg text-[#556B2F] lg:col-span-2"
                      style={{
                        padding: "8px",
                        transform: "translate(0px,0px)",
                      }}
                    >
                      <span className="lg:hidden text-sm font-medium text-[#8A8177]">
                        Total:{" "}
                      </span>
                      ₹{total.toLocaleString("en-IN")}
                    </div>

                    {/* REMOVE */}
                    <div
                      className="flex justify-center lg:col-span-1"
                      style={{
                        padding: "0",
                        transform: "translate(0px,0px)",
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => {
                          removeFromCart(item._id);
                          toast.success("Item removed");
                        }}
                        className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-500 transition hover:bg-red-500 hover:text-white"
                        style={{
                          padding: "0",
                          transform: "translate(0px,0px)",
                        }}
                        aria-label="Remove item"
                      >
                        <FaTrash size={17} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* COUPON + CLEAR */}
            <div
              className="flex flex-col items-stretch justify-between gap-4 md:flex-row md:items-center"
              style={{
                padding: "4px 2px 0",
                marginTop: "4px",
                transform: "translate(0px,0px)",
              }}
            >
              <div
                className="flex w-full md:w-[390px]"
                style={{
                  padding: "0",
                  transform: "translate(0px,0px)",
                }}
              >
                <input
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  placeholder="Enter coupon code"
                  className="min-w-0 flex-1 rounded-l-xl border border-[#D8D1C5] bg-white outline-none focus:border-[#7B9A55]"
                  style={{
                    padding: "12px 15px",
                    transform: "translate(0px,0px)",
                  }}
                />

                <button
                  type="button"
                  onClick={applyCoupon}
                  className="rounded-r-xl bg-[#556B2F] font-semibold text-white transition hover:bg-[#486027]"
                  style={{
                    padding: "12px 20px",
                    transform: "translate(0px,0px)",
                  }}
                >
                  Apply
                </button>
              </div>

              <button
                type="button"
                onClick={clearCart}
                className="rounded-xl border border-red-300 font-medium text-red-600 transition hover:bg-red-50"
                style={{
                  padding: "11px 20px",
                  transform: "translate(0px,0px)",
                }}
              >
                Clear Cart
              </button>
            </div>
          </div>

          {/* RIGHT */}
          <div
            className="space-y-6"
            style={{
              padding: "0",
              transform: "translate(0px,0px)",
            }}
          >
            {/* ORDER SUMMARY */}
            <div
              className="rounded-[30px] border border-[#E7E0D3] bg-white shadow-[0_12px_32px_rgba(70,80,40,0.09)]"
              style={{
                padding: "26px",
                transform: "translate(0px,0px)",
                boxSizing: "border-box",
              }}
            >
              <div
                className="flex items-center justify-between"
                style={{
                  padding: "0",
                  marginBottom: "22px",
                  transform: "translate(0px,0px)",
                }}
              >
                <h2
                  className="text-2xl font-extrabold text-[#20311E]"
                  style={{
                    padding: "0",
                    margin: "0",
                    transform: "translate(0px,0px)",
                  }}
                >
                  Order Summary
                </h2>

                <span
                  className="rounded-full bg-[#EEF5E5] text-sm font-semibold text-[#556B2F]"
                  style={{
                    padding: "6px 10px",
                    transform: "translate(0px,0px)",
                  }}
                >
                  {cart.length} {cart.length === 1 ? "item" : "items"}
                </span>
              </div>

              <div
                className="space-y-4"
                style={{
                  padding: "0",
                  transform: "translate(0px,0px)",
                }}
              >
                <div
                  className="flex justify-between text-[#6F675E]"
                  style={{
                    padding: "0",
                    transform: "translate(0px,0px)",
                  }}
                >
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#302C27]">
                    ₹{subtotal.toLocaleString("en-IN")}
                  </span>
                </div>

                <div
                  className="flex justify-between text-[#6F675E]"
                  style={{
                    padding: "0",
                    transform: "translate(0px,0px)",
                  }}
                >
                  <span>Shipping</span>
                  <span className="font-semibold text-[#4F8A38]">
                    {shipping === 0 ? "FREE" : `₹${shipping}`}
                  </span>
                </div>

                <div
                  className="flex justify-between text-[#6F675E]"
                  style={{
                    padding: "0",
                    transform: "translate(0px,0px)",
                  }}
                >
                  <span>Discount</span>
                  <span className="font-semibold text-[#4F8A38]">
                    -₹{discount.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              <div
                style={{
                  padding: "0",
                  margin: "22px 0",
                  transform: "translate(0px,0px)",
                }}
              >
                <div className="h-px bg-[#E8E0D4]" />
              </div>

              <div
                className="flex items-center justify-between"
                style={{
                  padding: "0",
                  transform: "translate(0px,0px)",
                }}
              >
                <span
                  className="text-xl font-bold text-[#302C27]"
                  style={{
                    padding: "0",
                    transform: "translate(0px,0px)",
                  }}
                >
                  Total
                </span>

                <span
                  className="text-2xl font-extrabold text-[#556B2F]"
                  style={{
                    padding: "0",
                    transform: "translate(0px,0px)",
                  }}
                >
                  ₹{finalTotal.toLocaleString("en-IN")}
                </span>
              </div>

              <button
                type="button"
                onClick={() => navigate("/checkout")}
                className="mt-6 flex w-full items-center justify-center gap-3 rounded-2xl bg-[#556B2F] font-semibold text-white transition hover:bg-[#486027]"
                style={{
                  padding: "14px 18px",
                  transform: "translate(0px,0px)",
                }}
              >
                <FaLock />
                Secure Checkout
              </button>

              <div
                className="space-y-4"
                style={{
                  padding: "0",
                  marginTop: "22px",
                  transform: "translate(0px,0px)",
                }}
              >
                <div className="flex items-center gap-3 text-[#4F6334]">
                  <FaTruck />
                  <span className="text-sm text-[#4C4944]">
                    Free Shipping Above ₹499
                  </span>
                </div>

                <div className="flex items-center gap-3 text-[#4F6334]">
                  <FaShieldAlt />
                  <span className="text-sm text-[#4C4944]">
                    Secure Payment
                  </span>
                </div>

                <div className="flex items-center gap-3 text-[#4F6334]">
                  <FaUndoAlt />
                  <span className="text-sm text-[#4C4944]">
                    Easy 7 Days Return
                  </span>
                </div>

                <div className="flex items-center gap-3 text-[#4F6334]">
                  <FaHeadset />
                  <span className="text-sm text-[#4C4944]">
                    24×7 Support
                  </span>
                </div>
              </div>
            </div>

            {/* WHY LOVE */}
            <div
              className="rounded-[30px] border border-[#E3E6D5] bg-gradient-to-br from-[#F0F5E8] to-[#FFF9EF] shadow-[0_10px_28px_rgba(70,80,40,0.08)]"
              style={{
                padding: "25px 26px",
                transform: "translate(0px,0px)",
              }}
            >
              <div
                className="flex items-center gap-3"
                style={{
                  padding: "0",
                  transform: "translate(0px,0px)",
                }}
              >
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#556B2F] shadow-sm"
                  style={{
                    padding: "0",
                    transform: "translate(0px,0px)",
                  }}
                >
                  <FaLeaf />
                </div>

                <h3
                  className="text-xl font-extrabold text-[#304125]"
                  style={{
                    padding: "0",
                    margin: "0",
                    transform: "translate(0px,0px)",
                  }}
                >
                  Why You'll Love Shopping Here
                </h3>
              </div>

              <p
                className="leading-7 text-[#626A58]"
                style={{
                  padding: "0",
                  margin: "15px 0 0",
                  transform: "translate(0px,0px)",
                }}
              >
                Every purchase supports skilled artisans. Our handmade
                products are crafted with care and delivered safely to your
                doorstep.
              </p>
            </div>
          </div>
        </div>

        {/* BOTTOM FEATURES */}
        <div
          className="mt-8 rounded-[28px] border border-[#E7E0D3] bg-white shadow-sm"
          style={{
            padding: "22px 26px",
            transform: "translate(0px,0px)",
          }}
        >
          <div
            className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4"
            style={{
              padding: "0",
              transform: "translate(0px,0px)",
            }}
          >
            <Feature
              icon={<FaTruck />}
              title="Free Shipping"
              text="On orders above ₹499"
            />

            <Feature
              icon={<FaShieldAlt />}
              title="Secure Payment"
              text="100% Safe Checkout"
            />

            <Feature
              icon={<FaUndoAlt />}
              title="Easy Returns"
              text="7 Days Return Policy"
            />

            <Feature
              icon={<FaHeadset />}
              title="24×7 Support"
              text="Always here to help"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function Feature({ icon, title, text }) {
  return (
    <div
      className="flex items-center gap-4 rounded-2xl"
      style={{
        padding: "12px 10px",
        transform: "translate(0px,0px)",
      }}
    >
      <div
        className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#EEF5E5] text-2xl text-[#556B2F]"
        style={{
          padding: "0",
          transform: "translate(0px,0px)",
        }}
      >
        {icon}
      </div>

      <div
        style={{
          padding: "0",
          transform: "translate(0px,0px)",
        }}
      >
        <h3
          className="font-bold text-[#20311E]"
          style={{
            padding: "0",
            margin: "0",
            transform: "translate(0px,0px)",
          }}
        >
          {title}
        </h3>

        <p
          className="text-sm text-[#777066]"
          style={{
            padding: "0",
            margin: "3px 0 0",
            transform: "translate(0px,0px)",
          }}
        >
          {text}
        </p>
      </div>
    </div>
  );
}
