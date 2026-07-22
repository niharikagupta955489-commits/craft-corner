import { useState } from "react";

export default function FAQ() {
  const faqs = [
    {
      question: "How do I place an order?",
      answer:
        "Browse products, add them to your cart, proceed to checkout, and complete your payment.",
    },
    {
      question: "Which payment methods are available?",
      answer:
        "We support UPI, Credit/Debit Cards and Cash on Delivery.",
    },
    {
      question: "How can I track my order?",
      answer:
        "Go to My Orders to view the current status of your order.",
    },
    {
      question: "Can I cancel my order?",
      answer:
        "Yes, you can cancel your order before it has been shipped.",
    },
    {
      question: "Do you offer returns?",
      answer:
        "Yes, eligible products can be returned within 7 days of delivery.",
    },
  ];

  const [active, setActive] = useState(null);

  return (
    <div className="min-h-screen bg-[#FAF7F0] py-12">

      <div className="max-w-4xl mx-auto px-6">

        <h1 className="text-4xl font-bold text-center text-[#2F3A2D]">
          Frequently Asked Questions
        </h1>

        <p className="text-center text-gray-500 mt-3 mb-10">
          Find answers to the most common questions.
        </p>

        <div className="space-y-4">

          {faqs.map((faq, index) => (

            <div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >

              <button
                onClick={() =>
                  setActive(active === index ? null : index)
                }
                className="w-full flex justify-between items-center px-6 py-5 text-left"
              >

                <span className="font-semibold text-lg">
                  {faq.question}
                </span>

                <span className="text-2xl">
                  {active === index ? "-" : "+"}
                </span>

              </button>

              {active === index && (

                <div className="px-6 pb-5 text-gray-600">
                  {faq.answer}
                </div>

              )}

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}