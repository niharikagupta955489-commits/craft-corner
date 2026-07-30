export default function RecentProducts({ products = [] }) {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-[#132715]">
          Recent Products
        </h2>

        <button className="text-[#4B7B37] font-semibold hover:underline">
          View All
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b text-gray-500">
              <th className="text-left py-3">Image</th>
              <th className="text-left">Product</th>
              <th className="text-left">Category</th>
              <th className="text-left">Price</th>
              <th className="text-left">Stock</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr
                key={product._id}
                className="border-b hover:bg-gray-50"
              >
                <td className="py-3">
                  <img
                    src={
                      product.images?.[0] ||
                      "https://placehold.co/60x60?text=No+Image"
                    }
                    alt={product.name}
                    className="w-14 h-14 rounded-xl object-cover"
                  />
                </td>

                <td className="font-medium">
                  {product.name}
                </td>

                <td>
                  {product.category}
                </td>

                <td>
                  ₹{product.price}
                </td>

                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      product.stock > 10
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {product.stock}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}