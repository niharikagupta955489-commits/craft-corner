import { useEffect, useState } from "react";
import {
  FaStar,
  FaUserCircle,
  FaPaperPlane,
  FaTrash,
} from "react-icons/fa";
import toast from "react-hot-toast";
import api from "../../services/api";

export default function ReviewSection({
  productId,
  reviews: initialReviews = [],
}) {
  const [reviews, setReviews] = useState(initialReviews || []);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [summary, setSummary] = useState({
    rating: 0,
    numReviews: 0,
  });

  const loadReviews = async () => {
    try {
      setLoadingReviews(true);

      const res = await api.get(
        `/reviews/${productId}`
      );

      setReviews(res.data.reviews || []);

      setSummary({
        rating: Number(res.data.rating || 0),
        numReviews: Number(res.data.numReviews || 0),
      });
    } catch (error) {
      // Product.jsx already provides the reviews, so keep them
      // if the optional refresh endpoint is unavailable.
      setReviews(initialReviews || []);
      setSummary({
        rating: 0,
        numReviews: (initialReviews || []).length,
      });
    } finally {
      setLoadingReviews(false);
    }
  };

  useEffect(() => {
    if (productId) {
      loadReviews();
    }
  }, [productId]);

  useEffect(() => {
    setReviews(initialReviews || []);
  }, [initialReviews]);

  const submitReview = async (e) => {
    e.preventDefault();

    if (!comment.trim()) {
      toast.error("Please write your review.");
      return;
    }

    try {
      setSubmitting(true);

      const res = await api.post(
        `/reviews/${productId}`,
        {
          rating,
          comment: comment.trim(),
        }
      );

      setReviews((prev) => [
        ...prev,
        res.data.review,
      ]);

      setSummary({
        rating: Number(res.data.rating || 0),
        numReviews: Number(res.data.numReviews || 0),
      });

      setComment("");
      setRating(5);
      toast.success("Review added successfully.");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to add review."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const deleteReview = async (reviewId) => {
    try {
      await api.delete(
        `/reviews/${productId}/${reviewId}`
      );

      setReviews((prev) =>
        prev.filter(
          (review) => review._id !== reviewId
        )
      );

      await loadReviews();

      toast.success("Review deleted.");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to delete review."
      );
    }
  };

  const average =
    summary.rating ||
    (reviews.length
      ? reviews.reduce(
          (sum, review) =>
            sum + Number(review.rating || 0),
          0
        ) / reviews.length
      : 0);

  return (
    <section
      className="rounded-[30px] border border-[#E7E0D3] bg-white shadow-[0_10px_30px_rgba(70,80,40,0.08)]"
      style={{
        padding: "28px",
        transform: "translate(0px,0px)",
      }}
    >
      {/* HEADER */}
      <div
        className="flex flex-col justify-between gap-5 md:flex-row md:items-center"
        style={{
          padding: "0 0 22px",
          transform: "translate(0px,0px)",
          borderBottom: "1px solid #ECE5D9",
        }}
      >
        <div
          style={{
            padding: "0",
            transform: "translate(0px,0px)",
          }}
        >
          <h2
            className="text-3xl font-extrabold text-[#2F3A2D]"
            style={{
              padding: "0",
              margin: "0",
              transform: "translate(0px,0px)",
            }}
          >
            Customer Reviews
          </h2>

          <p
            className="text-[#7A746B]"
            style={{
              padding: "0",
              margin: "7px 0 0",
              transform: "translate(0px,0px)",
            }}
          >
            Real feedback from customers who purchased this product.
          </p>
        </div>

        <div
          className="rounded-2xl bg-[#F3F6EA] text-center"
          style={{
            padding: "12px 18px",
            transform: "translate(0px,0px)",
          }}
        >
          <div
            className="flex items-center justify-center gap-1 text-[#E5A923]"
            style={{
              padding: "0",
              transform: "translate(0px,0px)",
            }}
          >
            <FaStar />
            <span className="text-2xl font-extrabold text-[#2F3A2D]">
              {Number(average || 0).toFixed(1)}
            </span>
            <span className="text-sm text-[#7A746B]">
              / 5
            </span>
          </div>

          <p
            className="text-sm text-[#7A746B]"
            style={{
              padding: "0",
              margin: "3px 0 0",
              transform: "translate(0px,0px)",
            }}
          >
            {summary.numReviews || reviews.length}{" "}
            reviews
          </p>
        </div>
      </div>

      {/* REVIEW FORM */}
      <form
        onSubmit={submitReview}
        className="rounded-[24px] bg-[#FAF8F3]"
        style={{
          padding: "22px",
          marginTop: "22px",
          transform: "translate(0px,0px)",
        }}
      >
        <h3
          className="text-xl font-bold text-[#2F3A2D]"
          style={{
            padding: "0",
            margin: "0",
            transform: "translate(0px,0px)",
          }}
        >
          Write a Review
        </h3>

        <div
          className="flex items-center gap-2"
          style={{
            padding: "0",
            marginTop: "14px",
            transform: "translate(0px,0px)",
          }}
        >
          <span className="font-semibold text-[#5D584F]">
            Your Rating
          </span>

          <div
            className="flex items-center gap-1"
            style={{
              padding: "0",
              transform: "translate(0px,0px)",
            }}
          >
            {[1, 2, 3, 4, 5].map((star) => {
              const active =
                star <= (hoverRating || rating);

              return (
                <button
                  key={star}
                  type="button"
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                  className="transition hover:scale-110"
                  style={{
                    padding: "2px",
                    transform: "translate(0px,0px)",
                  }}
                  aria-label={`${star} star`}
                >
                  <FaStar
                    className={
                      active
                        ? "text-[#E5A923]"
                        : "text-[#D7D2C9]"
                    }
                    size={22}
                  />
                </button>
              );
            })}
          </div>
        </div>

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your experience with this product..."
          rows={4}
          maxLength={1000}
          className="w-full resize-none rounded-2xl border border-[#DED7CB] bg-white outline-none focus:border-[#7B9654]"
          style={{
            padding: "14px 16px",
            marginTop: "15px",
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
          <span className="text-sm text-[#8A8177]">
            {comment.length}/1000
          </span>

          <button
            type="submit"
            disabled={submitting}
            className="flex items-center gap-2 rounded-xl bg-[#556B2F] font-semibold text-white transition hover:bg-[#486027] disabled:cursor-not-allowed disabled:opacity-60"
            style={{
              padding: "11px 20px",
              transform: "translate(0px,0px)",
            }}
          >
            <FaPaperPlane size={14} />
            {submitting ? "Submitting..." : "Submit Review"}
          </button>
        </div>
      </form>

      {/* REVIEWS */}
      <div
        style={{
          padding: "0",
          marginTop: "26px",
          transform: "translate(0px,0px)",
        }}
      >
        {loadingReviews && reviews.length === 0 ? (
          <p
            className="text-[#7A746B]"
            style={{
              padding: "20px 0",
              margin: "0",
              transform: "translate(0px,0px)",
            }}
          >
            Loading reviews...
          </p>
        ) : reviews.length === 0 ? (
          <div
            className="rounded-2xl bg-[#F7F5EF] text-center"
            style={{
              padding: "28px",
              transform: "translate(0px,0px)",
            }}
          >
            <FaStar
              className="mx-auto text-3xl text-[#D9D2C6]"
              style={{
                transform: "translate(0px,0px)",
              }}
            />

            <p
              className="font-semibold text-[#5D584F]"
              style={{
                padding: "0",
                margin: "10px 0 0",
                transform: "translate(0px,0px)",
              }}
            >
              No reviews yet. Be the first customer to review this product.
            </p>
          </div>
        ) : (
          <div
            className="space-y-5"
            style={{
              padding: "0",
              transform: "translate(0px,0px)",
            }}
          >
            {reviews.map((review) => (
              <div
                key={review._id || `${review.name}-${review.comment}`}
                className="rounded-2xl border border-[#EEE8DE] bg-[#FFFDF9]"
                style={{
                  padding: "20px",
                  transform: "translate(0px,0px)",
                }}
              >
                <div
                  className="flex items-start gap-4"
                  style={{
                    padding: "0",
                    transform: "translate(0px,0px)",
                  }}
                >
                  <FaUserCircle
                    className="shrink-0 text-4xl text-[#A9A39A]"
                    style={{
                      color: "#A9A39A",
                      transform: "translate(0px,0px)",
                    }}
                  />

                  <div
                    className="min-w-0 flex-1"
                    style={{
                      padding: "0",
                      transform: "translate(0px,0px)",
                    }}
                  >
                    <div
                      className="flex flex-wrap items-center justify-between gap-3"
                      style={{
                        padding: "0",
                        transform: "translate(0px,0px)",
                      }}
                    >
                      <div>
                        <h3
                          className="font-bold text-[#2F3A2D]"
                          style={{
                            padding: "0",
                            margin: "0",
                            transform: "translate(0px,0px)",
                          }}
                        >
                          {review.name || "Customer"}
                        </h3>

                        {review.createdAt && (
                          <p className="mt-1 text-xs text-[#958D82]">
                            {new Date(
                              review.createdAt
                            ).toLocaleDateString("en-IN")}
                          </p>
                        )}
                      </div>

                      <div
                        className="flex items-center gap-1"
                        style={{
                          padding: "0",
                          transform: "translate(0px,0px)",
                        }}
                      >
                        {[1, 2, 3, 4, 5].map((star) => (
                          <FaStar
                            key={star}
                            className={
                              star <= Number(review.rating)
                                ? "text-[#E5A923]"
                                : "text-[#D7D2C9]"
                            }
                            size={15}
                          />
                        ))}
                      </div>
                    </div>

                    <p
                      className="leading-7 text-[#625D55]"
                      style={{
                        padding: "0",
                        margin: "12px 0 0",
                        transform: "translate(0px,0px)",
                      }}
                    >
                      {review.comment}
                    </p>

                    {review._id && (
                      <button
                        type="button"
                        onClick={() => deleteReview(review._id)}
                        className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-red-500 hover:text-red-700"
                        style={{
                          padding: "4px 0",
                          transform: "translate(0px,0px)",
                        }}
                      >
                        <FaTrash size={11} />
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
