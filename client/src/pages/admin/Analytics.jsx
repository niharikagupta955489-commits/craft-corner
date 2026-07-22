export default function Analytics() {
  return (
    <div className="min-h-screen bg-[#F5F5F5] p-8">

      <h1 className="text-4xl font-bold text-[#2F3A2D] mb-8">
        Analytics
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="bg-white rounded-2xl shadow-md p-6">

          <h2 className="text-gray-500">
            Total Revenue
          </h2>

          <p className="text-3xl font-bold text-green-600 mt-3">
            ₹2,45,000
          </p>

        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">

          <h2 className="text-gray-500">
            Total Orders
          </h2>

          <p className="text-3xl font-bold text-blue-600 mt-3">
            520
          </p>

        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">

          <h2 className="text-gray-500">
            Customers
          </h2>

          <p className="text-3xl font-bold text-purple-600 mt-3">
            340
          </p>

        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">

          <h2 className="text-gray-500">
            Products
          </h2>

          <p className="text-3xl font-bold text-orange-600 mt-3">
            145
          </p>

        </div>

      </div>

      <div className="grid lg:grid-cols-2 gap-8 mt-8">

        <div className="bg-white rounded-2xl shadow-md p-6">

          <h2 className="text-2xl font-semibold mb-6">
            Monthly Sales
          </h2>

          <div className="space-y-4">

            <div>
              <div className="flex justify-between mb-1">
                <span>January</span>
                <span>₹18,000</span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-green-500 h-3 rounded-full w-1/4"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span>February</span>
                <span>₹25,000</span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-blue-500 h-3 rounded-full w-2/4"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span>March</span>
                <span>₹36,000</span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-purple-500 h-3 rounded-full w-3/4"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span>April</span>
                <span>₹42,000</span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-orange-500 h-3 rounded-full w-full"></div>
              </div>
            </div>

          </div>

        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">

          <h2 className="text-2xl font-semibold mb-6">
            Top Selling Products
          </h2>

          <div className="space-y-5">

            <div className="flex justify-between border-b pb-3">
              <span>Wooden Lamp</span>
              <span className="font-semibold">120 Sold</span>
            </div>

            <div className="flex justify-between border-b pb-3">
              <span>Clay Pot</span>
              <span className="font-semibold">95 Sold</span>
            </div>

            <div className="flex justify-between border-b pb-3">
              <span>Handmade Basket</span>
              <span className="font-semibold">82 Sold</span>
            </div>

            <div className="flex justify-between">
              <span>Wall Painting</span>
              <span className="font-semibold">75 Sold</span>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}