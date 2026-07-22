import { useState } from "react";

export default function Inventory() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Wooden Lamp",
      category: "Wood Craft",
      stock: 18,
    },
    {
      id: 2,
      name: "Clay Pot",
      category: "Pottery",
      stock: 5,
    },
    {
      id: 3,
      name: "Handmade Basket",
      category: "Basket",
      stock: 2,
    },
    {
      id: 4,
      name: "Wall Painting",
      category: "Painting",
      stock: 25,
    },
  ]);

  const increaseStock = (id) => {
    setProducts(
      products.map((product) =>
        product.id === id
          ? { ...product, stock: product.stock + 1 }
          : product
      )
    );
  };

  const decreaseStock = (id) => {
    setProducts(
      products.map((product) =>
        product.id === id && product.stock > 0
          ? { ...product, stock: product.stock - 1 }
          : product
      )
    );
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] p-8">

      <h1 className="text-4xl font-bold text-[#2F3A2D] mb-8">
        Inventory Management
      </h1>

      <div className="bg-white rounded-2xl shadow-md overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>
              <th className="text-left p-4">Product</th>
              <th className="text-left p-4">Category</th>
              <th className="text-left p-4">Stock</th>
              <th className="text-center p-4">Status</th>
              <th className="text-center p-4">Update Stock</th>
            </tr>

          </thead>

          <tbody>

            {products.map((product) => (

              <tr
                key={product.id}
                className="border-t hover:bg-gray-50"
              >

                <td className="p-4 font-medium">
                  {product.name}
                </td>

                <td className="p-4">
                  {product.category}
                </td>

                <td className="p-4 font-semibold">
                  {product.stock}
                </td>

                <td className="p-4 text-center">

                  {product.stock <= 3 ? (
                    <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm">
                      Low Stock
                    </span>
                  ) : product.stock <= 10 ? (
                    <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
                      Medium
                    </span>
                  ) : (
                    <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
                      In Stock
                    </span>
                  )}

                </td>

                <td className="p-4 text-center">

                  <button
                    onClick={() => decreaseStock(product.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-lg mr-2 hover:bg-red-600"
                  >
                    -
                  </button>

                  <button
                    onClick={() => increaseStock(product.id)}
                    className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700"
                  >
                    +
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-8">

        <div className="bg-white rounded-2xl shadow-md p-6">

          <h2 className="text-gray-500">
            Total Products
          </h2>

          <p className="text-3xl font-bold mt-3">
            {products.length}
          </p>

        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">

          <h2 className="text-gray-500">
            Low Stock Items
          </h2>

          <p className="text-3xl font-bold text-red-600 mt-3">
            {products.filter((item) => item.stock <= 3).length}
          </p>

        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">

          <h2 className="text-gray-500">
            Total Stock
          </h2>

          <p className="text-3xl font-bold text-green-600 mt-3">
            {products.reduce((sum, item) => sum + item.stock, 0)}
          </p>

        </div>

      </div>

    </div>
  );
}