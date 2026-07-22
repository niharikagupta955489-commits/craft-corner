import { Link } from "react-router-dom";

const categories = [
  { name: "🏺 Pottery", path: "/pottery" },
  { name: "🧵 Handloom", path: "/handloom" },
  { name: "💍 Jewellery", path: "/jewellery" },
  { name: "🪵 Wood Craft", path: "/wood-craft" },
  { name: "🎨 Paintings", path: "/painting" },
  { name: "🎁 Gifts", path: "/gifts" },
  { name: "🕯 Decor", path: "/decor" },
  { name: "🧺 Baskets", path: "/baskets" },
];

export default function CategoriesBar() {
  return (
    <section className="bg-white border-b">
      <div className="w-full px-8 lg:px-12">
        <div className="flex items-center gap-8 overflow-x-auto py-4 whitespace-nowrap scrollbar-hide">

          {categories.map((category) => (
            <Link
              key={category.path}
              to={category.path}
              className="text-gray-700 font-medium hover:text-[#556B2F] transition"
            >
              {category.name}
            </Link>
          ))}

        </div>
      </div>
    </section>
  );
}