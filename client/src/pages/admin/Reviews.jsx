import { useState } from "react";

export default function Reviews() {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      customer: "Rahul Sharma",
      product: "Wooden Lamp",
      rating: 5,
      review: "Excellent quality and beautiful craftsmanship.",
    },
    {
      id: 2,
      customer: "Priya Singh",
      product: "Clay Pot",
      rating: 4,
      review: "Very nice product. Packaging was good.",
    },
    {
      id: 3,
      customer: "Aman Verma",
      product: "Handmade Basket",
      rating: 3,
      review: "Good product but delivery was a little late.",
    },
  ]);

  const deleteReview = (id) => {
    setReviews(reviews.filter((review) => review.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] p-8">

      <h1 className="text-4xl font-bold text-[#2F3A2D] mb-8">
        Customer Reviews
      </h1>

      <div className="bg-white rounded-2xl shadow-md overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="text-left p-4">Customer</th>
              <th className="text-left p-4">Product</th>
              <th className="text-left p-4">Rating</th>
              <th className="text-left p-4">Review</th>
              <th className="text-center p-4">Action</th>

            </tr>

          </thead>

          <tbody>

            {reviews.map((review) => (

              <tr
                key={review.id}
                className="border-t hover:bg-gray-50"
              >

                <td className="p-4 font-medium">
                  {review.customer}
                </td>

                <td className="p-4">
                  {review.product}
                </td>

                <td className="p-4 text-yellow-500">
                  {"⭐".repeat(review.rating)}
                </td>

                <td className="p-4">
                  {review.review}
                </td>

                <td className="p-4 text-center">

                  <button
                    onClick={() => deleteReview(review.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}