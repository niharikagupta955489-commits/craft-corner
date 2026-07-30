import {
  FaBoxOpen,
  FaUsers,
  FaShoppingCart,
  FaRupeeSign,
  FaArrowUp,
} from "react-icons/fa";
export default function StatsCard({
  totalProducts = 0,
  totalCustomers = 0,
  totalOrders = 0,
  totalRevenue = 0,
}) {
  const cards = [
    {
      title: "Total Products",
      value: totalProducts,
      icon: FaBoxOpen,
      color: "from-green-500 to-emerald-600",
      bg: "bg-green-50",
      growth: "+15%",
    },
    {
      title: "Total Orders",
      value: totalOrders,
      icon: FaShoppingCart,
      color: "from-blue-500 to-sky-600",
      bg: "bg-blue-50",
      growth: "+20%",
    },
    {
      title: "Customers",
      value: totalCustomers,
      icon: FaUsers,
      color: "from-purple-500 to-pink-500",
      bg: "bg-purple-50",
      growth: "0%",
    },
    {
      title: "Revenue",
      value: `₹${Number(totalRevenue).toLocaleString("en-IN")}`,
      icon: FaRupeeSign,
      color: "from-orange-400 to-amber-500",
      bg: "bg-orange-50",
      growth: "+18%",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="relative overflow-hidden rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-6"
          >
            <div className="absolute top-0 right-0 h-24 w-24 rounded-full bg-gray-100 opacity-20 -translate-y-8 translate-x-8"></div>

            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">
                  {card.title}
                </p>

                <h2 className="mt-3 text-5xl font-bold text-gray-900">
                  {card.value}
                </h2>
              </div>

              <div
                className={`h-16 w-16 rounded-2xl flex items-center justify-center bg-gradient-to-br ${card.color}`}
              >
                <Icon className="text-white text-3xl" />
              </div>
            </div>

            <div className="mt-8">
              <div className="flex items-center gap-2">
                <FaArrowUp className="text-green-600" />

                <span className="text-green-600 font-semibold">
                  {card.growth}
                </span>

                <span className="text-gray-500 text-sm">
                  this month
                </span>
              </div>

              <div className="mt-4 h-2 rounded-full bg-gray-200 overflow-hidden">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${card.color}`}
                  style={{ width: "82%" }}
                ></div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}