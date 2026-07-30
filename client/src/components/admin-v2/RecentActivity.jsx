import {
  Package,
  ShoppingCart,
  UserPlus,
  BadgeCheck,
} from "lucide-react";

const activities = [
  {
    icon: ShoppingCart,
    color: "bg-green-100 text-green-700",
    title: "New Order Received",
    desc: "Rahul Sharma placed an order",
    time: "2 min ago",
  },
  {
    icon: Package,
    color: "bg-blue-100 text-blue-700",
    title: "Product Added",
    desc: "Macrame Wall Hanging added",
    time: "15 min ago",
  },
  {
    icon: UserPlus,
    color: "bg-purple-100 text-purple-700",
    title: "New Customer",
    desc: "Priya Verma registered",
    time: "1 hour ago",
  },
  {
    icon: BadgeCheck,
    color: "bg-orange-100 text-orange-700",
    title: "Order Delivered",
    desc: "Order #CC1004 completed",
    time: "3 hours ago",
  },
];

export default function RecentActivity() {
  return (
    <div className="rounded-[30px] border border-gray-100 bg-white p-6 shadow-sm">

      <div className="mb-6">

        <h2 className="text-2xl font-bold text-gray-900">
          Recent Activity
        </h2>

        <p className="mt-1 text-gray-500">
          Latest updates from your store
        </p>

      </div>

      <div className="space-y-5">

        {activities.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className="flex items-start gap-4"
            >

              <div
                className={`flex h-12 w-12 items-center justify-center rounded-2xl ${item.color}`}
              >
                <Icon size={22} />
              </div>

              <div className="flex-1">

                <h4 className="font-semibold text-gray-900">
                  {item.title}
                </h4>

                <p className="mt-1 text-sm text-gray-500">
                  {item.desc}
                </p>

                <span className="mt-2 block text-xs text-gray-400">
                  {item.time}
                </span>

              </div>

            </div>
          );
        })}

      </div>

    </div>
  );
}