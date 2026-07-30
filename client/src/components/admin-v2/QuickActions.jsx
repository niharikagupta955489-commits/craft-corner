import {
  Plus,
  Package,
  ShoppingCart,
  Users,
  LayoutGrid,
  Settings,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function QuickActions() {
  const navigate = useNavigate();

  const actions = [
    {
      title: "Add Product",
      desc: "Create a new product",
      icon: Plus,
      color: "bg-green-100 text-green-700",
      action: () => navigate("/admin-v2/products/add"),
    },
    {
      title: "Products",
      desc: "Manage products",
      icon: Package,
      color: "bg-blue-100 text-blue-700",
      action: () => navigate("/admin-v2/products"),
    },
    {
      title: "Orders",
      desc: "Manage orders",
      icon: ShoppingCart,
      color: "bg-orange-100 text-orange-700",
      action: () => navigate("/admin-v2/orders"),
    },
    {
      title: "Customers",
      desc: "Customer list",
      icon: Users,
      color: "bg-purple-100 text-purple-700",
      action: () => navigate("/admin-v2/customers"),
    },
    {
      title: "Categories",
      desc: "Manage categories",
      icon: LayoutGrid,
      color: "bg-pink-100 text-pink-700",
      action: () => navigate("/admin-v2/categories"),
    },
    {
      title: "Home Settings",
      desc: "Homepage banners",
      icon: Settings,
      color: "bg-gray-100 text-gray-700",
      action: () => navigate("/admin-v2/home-settings"),
    },
  ];

  return (
    <div className="rounded-[30px] border border-gray-100 bg-white p-6 shadow-sm">

      <div className="mb-8">

        <h2 className="text-2xl font-bold text-gray-900">
          Quick Actions
        </h2>

        <p className="mt-1 text-gray-500">
          Frequently used admin shortcuts
        </p>

      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">

        {actions.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.title}
              onClick={item.action}
              className="group rounded-2xl border border-gray-100 p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:border-[#5F8C42] hover:shadow-lg"
            >

              <div
                className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl ${item.color}`}
              >
                <Icon size={28} />
              </div>

              <h3 className="text-lg font-semibold text-gray-900">
                {item.title}
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                {item.desc}
              </p>

            </button>
          );
        })}

      </div>

    </div>
  );
}