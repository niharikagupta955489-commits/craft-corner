import CartItem from "./CartItem";

export default function CartList({
  cart,
  increaseQty,
  decreaseQty,
  removeItem,
}) {
  return (
    <div className="space-y-5">

      {/* Table Header */}

      <div className="hidden lg:grid grid-cols-12 bg-[#EEF5E5] rounded-2xl px-6 py-4 font-semibold text-[#355E3B]">

        <div className="col-span-5">
          Product
        </div>

        <div className="col-span-2 text-center">
          Price
        </div>

        <div className="col-span-2 text-center">
          Quantity
        </div>

        <div className="col-span-2 text-center">
          Total
        </div>

        <div className="col-span-1 text-center">
          Remove
        </div>

      </div>

      {/* Items */}

      {cart.map((item) => (

        <CartItem
          key={item._id}
          item={item}
          increaseQty={increaseQty}
          decreaseQty={decreaseQty}
          removeItem={removeItem}
        />

      ))}

    </div>
  );
}