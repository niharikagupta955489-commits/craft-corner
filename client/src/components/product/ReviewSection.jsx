import { FaStar, FaUserCircle } from "react-icons/fa";

export default function ReviewSection({ reviews }) {

  if (!reviews || reviews.length === 0) {

    return (

      <p className="text-gray-500 text-lg">

        No reviews yet. Be the first customer to review this product.

      </p>

    );

  }

  return (

    <div className="space-y-8">

      {reviews.map((review, index) => (

        <div
          key={index}
          className="border-b border-gray-200 pb-8 last:border-none"
        >

          <div className="flex items-start gap-5">

            <FaUserCircle className="text-5xl text-gray-400 shrink-0" />

            <div className="flex-1">

              <div className="flex items-center justify-between">

                <h3 className="text-lg font-bold text-[#2F3A2D]">

                  {review.name || "Customer"}

                </h3>

                <div className="flex items-center gap-1">

                  {[1, 2, 3, 4, 5].map((star) => (

                    <FaStar
                      key={star}
                      className={
                        star <= review.rating
                          ? "text-yellow-500"
                          : "text-gray-300"
                      }
                    />

                  ))}

                </div>

              </div>

              <p className="mt-4 text-gray-600 leading-7">

                {review.comment}

              </p>

            </div>

          </div>

        </div>

      ))}

    </div>

  );

}