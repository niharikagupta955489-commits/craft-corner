import {
  FaTrash,
  FaLeaf,
  FaMinus,
  FaPlus,
} from "react-icons/fa";

export default function CartItem({
  item,
  increaseQty,
  decreaseQty,
  removeItem,
}) {
  return (
    <div className="bg-white rounded-3xl border border-[#E8E3D8] shadow-sm hover:shadow-md transition-all duration-300">

      <div className="grid grid-cols-12 items-center gap-6 p-6">

        {/* Product */}

        <div className="col-span-5 flex items-center gap-5">

          <img
            src={item.images?.[0]}
            alt={item.name}
            className="w-24 h-24 rounded-2xl object-cover"
          />

          <div>

            <h2 className="text-2xl font-bold text-[#20311E]">
              {item.name}
            </h2>

            <span className="inline-block mt-2 px-3 py-1 rounded-full bg-[#EEF5E5] text-[#556B2F] text-sm">
              {item.category}
            </span>

            <div className="flex items-center gap-2 mt-3 text-[#556B2F]">

              <FaLeaf />

              <span className="text-sm">
                Handmade
              </span>

            </div>

          </div>

        </div>

        {/* Price */}

        <div className="col-span-2 text-center">

          <p className="text-2xl font-bold text-[#20311E]">
            ₹{item.price}
          </p>

        </div>

        {/* Quantity */}

        <div className="col-span-2 flex justify-center">

          <div className="flex items-center rounded-xl border overflow-hidden">

            <button
              onClick={() => decreaseQty(item._id)}
              className="w-12 h-12 hover:bg-gray-100"
            >
              <FaMinus />
            </button>

            <div className="w-14 text-center font-bold">
              {item.quantity}
            </div>

            <button
              onClick={() => increaseQty(item._id)}
              className="w-12 h-12 hover:bg-gray-100"
            >
              <FaPlus />
            </button>

          </div>

        </div>

        {/* Total */}

        <div className="col-span-2 text-center">

          <p className="text-2xl font-bold text-[#20311E]">

            ₹{item.price * item.quantity}

          </p>

        </div>

        {/* Remove */}

        <div className="col-span-1 flex justify-center">

          <button
            onClick={() => removeItem(item._id)}
            className="text-red-500 hover:text-red-700 text-xl"
          >
            <FaTrash />
          </button>

        </div>

      </div>

    </div>
  );
}