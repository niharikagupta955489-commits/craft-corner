import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaCheckCircle,
  FaChevronRight,
  FaClipboardList,
  FaClock,
  FaEye,
  FaHeart,
  FaLeaf,
  FaPaperPlane,
  FaStar,
  FaTruck,
  FaTimes,
} from "react-icons/fa";
import toast from "react-hot-toast";

import { useAuth } from "../context/AuthContext";
import api from "../services/api";

export default function MyOrders() {
  const { user } = useAuth();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [reviewProduct, setReviewProduct] = useState(null);
  const [reviewRating, setReviewRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewComment, setReviewComment] = useState("");
  const [submittingReview, setSubmittingReview] = useState(false);

  useEffect(() => {
    if (user?._id) {
      fetchOrders();
    }
  }, [user?._id]);

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const res = await api.get(
        `/orders/user/${user._id}`
      );

      setOrders(res.data.orders || []);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to fetch orders"
      );
    } finally {
      setLoading(false);
    }
  };

  const orderStats = useMemo(() => {
    const total = orders.length;

    const delivered = orders.filter(
      (order) => order.status === "Delivered"
    ).length;

    const active = orders.filter(
      (order) =>
        !["Delivered", "Cancelled"].includes(order.status)
    ).length;

    const spent = orders.reduce(
      (sum, order) =>
        sum + Number(order.totalPrice || 0),
      0
    );

    return {
      total,
      delivered,
      active,
      spent,
    };
  }, [orders]);

  const getStatusConfig = (status) => {
    switch (status) {
      case "Delivered":
        return {
          icon: <FaCheckCircle />,
          badge: "bg-[#EAF4DF] text-[#4F762D]",
          line: "bg-[#6B8B3A]",
          label: "Delivered",
        };

      case "Shipped":
        return {
          icon: <FaTruck />,
          badge: "bg-[#EAF0FF] text-[#4867A5]",
          line: "bg-[#6D87BA]",
          label: "Shipped",
        };

      case "Processing":
        return {
          icon: <FaClock />,
          badge: "bg-[#FFF3D9] text-[#B47718]",
          line: "bg-[#D2A347]",
          label: "Processing",
        };

      case "Cancelled":
        return {
          icon: <FaTimes />,
          badge: "bg-[#FDE8E8] text-[#C34B4B]",
          line: "bg-[#D96B6B]",
          label: "Cancelled",
        };

      default:
        return {
          icon: <FaClock />,
          badge: "bg-[#FFF3D9] text-[#B47718]",
          line: "bg-[#D2A347]",
          label: "Pending",
        };
    }
  };

  const openReview = (product) => {
    if (!product?._id) return;

    setReviewProduct(product);
    setReviewRating(5);
    setHoverRating(0);
    setReviewComment("");
  };

  const closeReview = () => {
    if (submittingReview) return;

    setReviewProduct(null);
    setReviewComment("");
    setReviewRating(5);
    setHoverRating(0);
  };

  const submitReview = async (event) => {
    event.preventDefault();

    if (!reviewProduct?._id) return;

    const comment = reviewComment.trim();

    if (comment.length < 3) {
      toast.error("Please write at least 3 characters.");
      return;
    }

    try {
      setSubmittingReview(true);

      await api.post(
        `/reviews/${reviewProduct._id}`,
        {
          rating: reviewRating,
          comment,
        }
      );

      toast.success("Review added successfully.");
      closeReview();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to add review."
      );
    } finally {
      setSubmittingReview(false);
    }
  };

  if (loading) {
    return (
      <div
        className="min-h-screen bg-[#F8F7F1] flex items-center justify-center text-[#556B2F]"
        style={{
          padding: "40px",
          transform: "translate(0px,0px)",
        }}
      >
        <div
          className="rounded-2xl bg-white border border-[#E6E0D4] shadow-sm font-semibold"
          style={{
            padding: "18px 28px",
            transform: "translate(0px,0px)",
          }}
        >
          Loading orders...
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-[#F8F7F1] text-[#2F2B26]"
      style={{
        padding: "26px 38px 52px",
        transform: "translate(0px,0px)",
      }}
    >
      <div
        className="mx-auto max-w-[1380px]"
        style={{
          padding: "0 10px",
          transform: "translate(0px,0px)",
        }}
      >
        {/* HEADER */}
        <div
          className="flex items-end justify-between gap-6"
          style={{
            padding: "0 4px 28px",
            transform: "translate(0px,0px)",
          }}
        >
          <div>
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-full bg-[#5E7F35] text-white font-semibold hover:bg-[#4F6D2C] transition"
              style={{
                padding: "9px 16px",
                marginBottom: "16px",
                transform: "translate(0px,0px)",
              }}
            >
              <FaArrowLeft size={13} />
              Back
            </Link>

            <div
              className="flex items-center gap-3"
              style={{
                padding: "0",
                transform: "translate(0px,0px)",
              }}
            >
              <div
                className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EAF2DE] text-[#5E7F35]"
                style={{
                  padding: "0",
                  transform: "translate(0px,0px)",
                }}
              >
                <FaClipboardList size={25} />
              </div>

              <h1
                className="text-5xl font-black tracking-tight"
                style={{
                  margin: "0",
                  padding: "0",
                  transform: "translate(0px,0px)",
                }}
              >
                My Orders
              </h1>
            </div>

            <p
              className="text-[#756D63] text-lg"
              style={{
                margin: "8px 0 0 68px",
                padding: "0",
                transform: "translate(0px,0px)",
              }}
            >
              Track and manage all your orders in one place.
            </p>
          </div>

          {orders.length > 0 && (
            <div
              className="hidden lg:flex items-center gap-3 rounded-[22px] bg-white border border-[#E5DFD3] shadow-sm"
              style={{
                padding: "13px 16px",
                transform: "translate(0px,0px)",
              }}
            >
              <FaLeaf className="text-[#6B8B3A]" />

              <div className="text-center">
                <p
                  className="text-xs text-[#857C71]"
                  style={{
                    margin: "0",
                    padding: "0",
                  }}
                >
                  Orders
                </p>

                <p
                  className="font-black text-[#2F3A2D]"
                  style={{
                    margin: "2px 0 0",
                    padding: "0",
                  }}
                >
                  {orderStats.total}
                </p>
              </div>

              <div className="h-8 w-px bg-[#E8E1D6]" />

              <div className="text-center">
                <p
                  className="text-xs text-[#857C71]"
                  style={{
                    margin: "0",
                    padding: "0",
                  }}
                >
                  Delivered
                </p>

                <p
                  className="font-black text-[#4F762D]"
                  style={{
                    margin: "2px 0 0",
                    padding: "0",
                  }}
                >
                  {orderStats.delivered}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* SUMMARY STRIP */}
        {orders.length > 0 && (
          <div
            className="grid grid-cols-1 sm:grid-cols-3 gap-4"
            style={{
              padding: "0",
              marginBottom: "22px",
              transform: "translate(0px,0px)",
            }}
          >
            <SummaryCard
              icon={<FaClipboardList />}
              label="Total Orders"
              value={orderStats.total}
              helper="All placed orders"
            />

            <SummaryCard
              icon={<FaTruck />}
              label="Active Orders"
              value={orderStats.active}
              helper="On the way"
            />

            <SummaryCard
              icon={<FaHeart />}
              label="Total Spent"
              value={`₹${orderStats.spent.toLocaleString("en-IN")}`}
              helper="Across all orders"
            />
          </div>
        )}

        {/* ORDERS */}
        {orders.length === 0 ? (
          <div
            className="rounded-[30px] border border-[#D8E1C5] bg-white shadow-[0_12px_35px_rgba(65,75,40,0.08)] text-center"
            style={{
              padding: "54px 32px",
              transform: "translate(0px,0px)",
            }}
          >
            <div
              className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[#EDF3E4] text-[#5E7F35]"
              style={{
                padding: "0",
                transform: "translate(0px,0px)",
              }}
            >
              <FaClipboardList size={38} />
            </div>

            <h2
              className="text-3xl font-black"
              style={{
                margin: "18px 0 8px",
                padding: "0",
                transform: "translate(0px,0px)",
              }}
            >
              No orders yet
            </h2>

            <p
              className="text-[#756D63]"
              style={{
                margin: "0",
                padding: "0",
                transform: "translate(0px,0px)",
              }}
            >
              Discover beautiful handmade products and place your first order.
            </p>

            <Link
              to="/marketplace"
              className="inline-flex items-center gap-2 rounded-full bg-[#5E7F35] text-white font-semibold hover:bg-[#4F6D2C] transition"
              style={{
                padding: "12px 24px",
                marginTop: "22px",
                transform: "translate(0px,0px)",
              }}
            >
              Start Shopping
              <FaChevronRight size={12} />
            </Link>
          </div>
        ) : (
          <div
            className="space-y-5"
            style={{
              padding: "0",
              transform: "translate(0px,0px)",
            }}
          >
            {orders.map((order) => {
              const status = getStatusConfig(order.status);

              return (
                <div
                  key={order._id}
                  className="overflow-hidden rounded-[28px] border border-[#E5DFD3] bg-white shadow-[0_8px_26px_rgba(65,75,40,0.07)] hover:shadow-[0_14px_32px_rgba(65,75,40,0.10)] transition"
                  style={{
                    padding: "0",
                    transform: "translate(0px,0px)",
                  }}
                >
                  {/* CARD TOP */}
                  <div
                    className="grid grid-cols-1 xl:grid-cols-[220px_minmax(0,1fr)_245px] gap-0"
                    style={{
                      padding: "0",
                      transform: "translate(0px,0px)",
                    }}
                  >
                    {/* ORDER INFO */}
                    <div
                      className="border-b xl:border-b-0 xl:border-r border-[#ECE6DB]"
                      style={{
                        padding: "24px",
                        transform: "translate(0px,0px)",
                      }}
                    >
                      <div
                        className="flex items-start gap-3"
                        style={{
                          padding: "0",
                          transform: "translate(0px,0px)",
                        }}
                      >
                        <div
                          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#EEF3E5] text-[#5E7F35]"
                          style={{
                            padding: "0",
                            transform: "translate(0px,0px)",
                          }}
                        >
                          <FaClipboardList />
                        </div>

                        <div className="min-w-0">
                          <p
                            className="text-xs font-semibold text-[#91887D]"
                            style={{
                              margin: "0",
                              padding: "0",
                            }}
                          >
                            Order ID
                          </p>

                          <h3
                            className="font-black text-[#2F2B26]"
                            style={{
                              margin: "3px 0 0",
                              padding: "0",
                              wordBreak: "break-all",
                            }}
                          >
                            #{order._id.slice(-8)}
                          </h3>

                          <p
                            className="mt-2 flex items-center gap-2 text-sm text-[#756D63]"
                            style={{
                              padding: "0",
                            }}
                          >
                            <FaCalendarAlt size={11} />
                            {new Date(
                              order.createdAt
                            ).toLocaleDateString("en-IN", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* PRODUCTS */}
                    <div
                      style={{
                        padding: "20px 22px",
                        transform: "translate(0px,0px)",
                      }}
                    >
                      <div
                        className="space-y-4"
                        style={{
                          padding: "0",
                          transform: "translate(0px,0px)",
                        }}
                      >
                        {order.items.map((item) => (
                          <div
                            key={item._id || item.product?._id}
                            className="flex items-center gap-4"
                            style={{
                              padding: "0",
                              transform: "translate(0px,0px)",
                            }}
                          >
                            <div
                              className="h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-[#F4F1EA]"
                              style={{
                                padding: "0",
                                transform: "translate(0px,0px)",
                              }}
                            >
                              <img
                                src={item.product?.images?.[0]}
                                alt={item.product?.name || "Product"}
                                className="h-full w-full object-cover"
                                style={{
                                  padding: "0",
                                  transform: "translate(0px,0px)",
                                }}
                              />
                            </div>

                            <div
                              className="min-w-0 flex-1"
                              style={{
                                padding: "0",
                                transform: "translate(0px,0px)",
                              }}
                            >
                              <Link
                                to={`/product/${item.product?._id}`}
                                className="line-clamp-2 font-bold text-[#2F2B26] hover:text-[#5E7F35] transition"
                                style={{
                                  padding: "0",
                                  transform: "translate(0px,0px)",
                                }}
                              >
                                {item.product?.name}
                              </Link>

                              <p
                                className="text-sm text-[#756D63]"
                                style={{
                                  margin: "5px 0 0",
                                  padding: "0",
                                }}
                              >
                                Qty: {item.quantity}
                              </p>

                              <p
                                className="font-black text-[#A96820]"
                                style={{
                                  margin: "4px 0 0",
                                  padding: "0",
                                }}
                              >
                                ₹{Number(item.price || 0).toLocaleString("en-IN")}
                              </p>
                            </div>

                            {order.status === "Delivered" &&
                              item.product?._id && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    openReview(item.product)
                                  }
                                  className="shrink-0 rounded-xl border border-[#D2BF96] bg-[#FFF9ED] text-[#9A6B23] font-semibold hover:bg-[#FFF0D5] transition"
                                  style={{
                                    padding: "9px 12px",
                                    transform: "translate(0px,0px)",
                                  }}
                                >
                                  <span className="flex items-center gap-2">
                                    <FaStar />
                                    Review
                                  </span>
                                </button>
                              )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* STATUS */}
                    <div
                      className="border-t xl:border-t-0 xl:border-l border-[#ECE6DB] bg-[#FCFBF7]"
                      style={{
                        padding: "22px 24px",
                        transform: "translate(0px,0px)",
                      }}
                    >
                      <div
                        className="flex items-center justify-between gap-3"
                        style={{
                          padding: "0",
                          transform: "translate(0px,0px)",
                        }}
                      >
                        <div>
                          <p
                            className="text-xs font-semibold text-[#91887D]"
                            style={{
                              margin: "0",
                              padding: "0",
                            }}
                          >
                            Status
                          </p>

                          <span
                            className={`mt-2 inline-flex items-center gap-2 rounded-full text-sm font-bold ${status.badge}`}
                            style={{
                              padding: "7px 12px",
                              transform: "translate(0px,0px)",
                            }}
                          >
                            {status.icon}
                            {status.label}
                          </span>
                        </div>

                        <Link
                          to={`/product/${
                            order.items?.[0]?.product?._id || ""
                          }`}
                          className="flex h-10 w-10 items-center justify-center rounded-full bg-white border border-[#DED7CA] text-[#556B2F] hover:bg-[#EEF3E5] transition"
                          style={{
                            padding: "0",
                            transform: "translate(0px,0px)",
                          }}
                          title="View product"
                        >
                          <FaEye size={14} />
                        </Link>
                      </div>

                      <div
                        className="h-px bg-[#E9E3D9]"
                        style={{
                          margin: "17px 0",
                          padding: "0",
                          transform: "translate(0px,0px)",
                        }}
                      />

                      <p
                        className="text-xs font-semibold text-[#91887D]"
                        style={{
                          margin: "0",
                          padding: "0",
                        }}
                      >
                        Total
                      </p>

                      <h2
                        className="text-2xl font-black text-[#5E7F35]"
                        style={{
                          margin: "4px 0 0",
                          padding: "0",
                          transform: "translate(0px,0px)",
                        }}
                      >
                        ₹{Number(order.totalPrice || 0).toLocaleString("en-IN")}
                      </h2>
                    </div>
                  </div>

                  {/* DELIVERY PROGRESS */}
                  {!["Cancelled"].includes(order.status) && (
                    <OrderProgress status={order.status} />
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* BOTTOM CTA */}
        <div
          className="mt-7 overflow-hidden rounded-[28px] border border-[#E3DDCE] bg-gradient-to-r from-[#F1F5E7] via-white to-[#FFF8EC]"
          style={{
            padding: "24px 28px",
            transform: "translate(0px,0px)",
          }}
        >
          <div
            className="flex flex-col md:flex-row md:items-center justify-between gap-5"
            style={{
              padding: "0",
              transform: "translate(0px,0px)",
            }}
          >
            <div className="flex items-center gap-4">
              <div
                className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#5E7F35] shadow-sm"
                style={{
                  padding: "0",
                  transform: "translate(0px,0px)",
                }}
              >
                <FaLeaf size={24} />
              </div>

              <div>
                <h2
                  className="text-xl font-black text-[#2F3A2D]"
                  style={{
                    margin: "0",
                    padding: "0",
                  }}
                >
                  Looking for something more?
                </h2>

                <p
                  className="text-sm text-[#756D63]"
                  style={{
                    margin: "4px 0 0",
                    padding: "0",
                  }}
                >
                  Explore our beautiful handmade collection.
                </p>
              </div>
            </div>

            <Link
              to="/marketplace"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#5E7F35] text-white font-bold hover:bg-[#4F6D2C] hover:scale-[1.02] transition"
              style={{
                padding: "13px 22px",
                transform: "translate(0px,0px)",
              }}
            >
              Continue Shopping
              <FaChevronRight size={12} />
            </Link>
          </div>
        </div>
      </div>

      {/* REVIEW MODAL */}
      {reviewProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          style={{
            padding: "22px",
            transform: "translate(0px,0px)",
          }}
          onClick={closeReview}
        >
          <div
            className="w-full max-w-[520px] rounded-[30px] border border-[#E2DACD] bg-white shadow-[0_24px_70px_rgba(0,0,0,0.22)]"
            style={{
              padding: "28px",
              transform: "translate(0px,0px)",
            }}
            onClick={(event) => event.stopPropagation()}
          >
            <div
              className="flex items-start justify-between gap-4"
              style={{
                padding: "0",
                transform: "translate(0px,0px)",
              }}
            >
              <div>
                <p
                  className="text-xs font-semibold uppercase tracking-wider text-[#8B8175]"
                  style={{
                    margin: "0",
                    padding: "0",
                  }}
                >
                  Write a Review
                </p>

                <h2
                  className="mt-2 text-2xl font-black text-[#2F3A2D]"
                  style={{
                    padding: "0",
                    transform: "translate(0px,0px)",
                  }}
                >
                  {reviewProduct.name}
                </h2>
              </div>

              <button
                type="button"
                onClick={closeReview}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F4F1EA] text-[#6D665D] hover:bg-[#ECE6DB]"
                style={{
                  padding: "0",
                  transform: "translate(0px,0px)",
                }}
              >
                <FaTimes size={14} />
              </button>
            </div>

            <div
              style={{
                padding: "0",
                marginTop: "22px",
                transform: "translate(0px,0px)",
              }}
            >
              <p
                className="font-semibold text-[#514B44]"
                style={{
                  margin: "0",
                  padding: "0",
                }}
              >
                Your Rating
              </p>

              <div
                className="flex items-center gap-2"
                style={{
                  padding: "0",
                  marginTop: "10px",
                  transform: "translate(0px,0px)",
                }}
              >
                {[1, 2, 3, 4, 5].map((star) => {
                  const active =
                    star <=
                    (hoverRating || reviewRating);

                  return (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() =>
                        setHoverRating(star)
                      }
                      onMouseLeave={() =>
                        setHoverRating(0)
                      }
                      onClick={() =>
                        setReviewRating(star)
                      }
                      className="transition hover:scale-110"
                      style={{
                        padding: "2px",
                        transform: "translate(0px,0px)",
                      }}
                    >
                      <FaStar
                        size={27}
                        className={
                          active
                            ? "text-[#E5A923]"
                            : "text-[#D7D1C8]"
                        }
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            <textarea
              value={reviewComment}
              onChange={(event) =>
                setReviewComment(event.target.value)
              }
              rows={5}
              maxLength={1000}
              placeholder="Tell us about your experience with this product..."
              className="w-full resize-none rounded-2xl border border-[#DDD6CA] bg-[#FFFEFB] outline-none focus:border-[#7C9955]"
              style={{
                padding: "14px 15px",
                marginTop: "20px",
                transform: "translate(0px,0px)",
              }}
            />

            <div
              className="flex items-center justify-between gap-4"
              style={{
                padding: "0",
                marginTop: "12px",
                transform: "translate(0px,0px)",
              }}
            >
              <span className="text-xs text-[#8A8177]">
                {reviewComment.length}/1000
              </span>

              <button
                type="button"
                onClick={submitReview}
                disabled={submittingReview}
                className="inline-flex items-center gap-2 rounded-xl bg-[#5E7F35] text-white font-bold hover:bg-[#4F6D2C] disabled:opacity-60 disabled:cursor-not-allowed"
                style={{
                  padding: "12px 20px",
                  transform: "translate(0px,0px)",
                }}
              >
                <FaPaperPlane size={13} />
                {submittingReview
                  ? "Submitting..."
                  : "Submit Review"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SummaryCard({
  icon,
  label,
  value,
  helper,
}) {
  return (
    <div
      className="rounded-[22px] border border-[#E5DFD3] bg-white shadow-[0_7px_22px_rgba(65,75,40,0.06)]"
      style={{
        padding: "17px 18px",
        transform: "translate(0px,0px)",
      }}
    >
      <div
        className="flex items-center gap-4"
        style={{
          padding: "0",
          transform: "translate(0px,0px)",
        }}
      >
        <div
          className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EEF3E5] text-[#5E7F35]"
          style={{
            padding: "0",
            transform: "translate(0px,0px)",
          }}
        >
          {icon}
        </div>

        <div>
          <p
            className="text-xs font-semibold text-[#8C847A]"
            style={{
              margin: "0",
              padding: "0",
            }}
          >
            {label}
          </p>

          <p
            className="text-xl font-black text-[#2F3A2D]"
            style={{
              margin: "3px 0 0",
              padding: "0",
              transform: "translate(0px,0px)",
            }}
          >
            {value}
          </p>
        </div>

        <span
          className="ml-auto text-xs text-[#8C847A]"
          style={{
            padding: "0",
            transform: "translate(0px,0px)",
          }}
        >
          {helper}
        </span>
      </div>
    </div>
  );
}

function OrderProgress({ status }) {
  const steps = [
    "Pending",
    "Processing",
    "Shipped",
    "Delivered",
  ];

  const currentIndex = steps.indexOf(status);

  return (
    <div
      className="border-t border-[#ECE6DB] bg-[#FFFEFB]"
      style={{
        padding: "17px 24px 18px",
        transform: "translate(0px,0px)",
      }}
    >
      <div
        className="flex items-center justify-between gap-2"
        style={{
          padding: "0",
          transform: "translate(0px,0px)",
        }}
      >
        {steps.map((step, index) => {
          const completed =
            currentIndex >= index;

          const last = index === steps.length - 1;

          return (
            <div
              key={step}
              className="flex flex-1 items-center"
              style={{
                padding: "0",
                transform: "translate(0px,0px)",
              }}
            >
              <div
                className={`flex items-center gap-2 text-xs font-semibold ${
                  completed
                    ? "text-[#5E7F35]"
                    : "text-[#A09990]"
                }`}
                style={{
                  padding: "0",
                  transform: "translate(0px,0px)",
                }}
              >
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-full ${
                    completed
                      ? "bg-[#EAF4DF] text-[#5E7F35]"
                      : "bg-[#F0ECE5] text-[#A09990]"
                  }`}
                  style={{
                    padding: "0",
                    transform: "translate(0px,0px)",
                  }}
                >
                  {completed ? (
                    <FaCheckCircle size={13} />
                  ) : (
                    index + 1
                  )}
                </span>

                <span className="hidden sm:inline">
                  {step}
                </span>
              </div>

              {!last && (
                <div
                  className={`mx-2 h-1 flex-1 rounded-full ${
                    currentIndex > index
                      ? "bg-[#7C9955]"
                      : "bg-[#E7E3DA]"
                  }`}
                  style={{
                    padding: "0",
                    transform: "translate(0px,0px)",
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
