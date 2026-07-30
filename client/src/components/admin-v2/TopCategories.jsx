export default function TopCategories() {
  const items = [
    {
      name: "Handmade Decor",
      sales: 245,
      color: "bg-green-500",
    },
    {
      name: "Pottery",
      sales: 186,
      color: "bg-blue-500",
    },
    {
      name: "Jewellery",
      sales: 154,
      color: "bg-pink-500",
    },
    {
      name: "Wood Craft",
      sales: 131,
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm border border-gray-100">

      <h2 className="text-2xl font-bold mb-6">
        Top Categories
      </h2>

      <div className="space-y-5">

        {items.map((item) => (

          <div key={item.name}>

            <div className="flex justify-between mb-2">

              <span>{item.name}</span>

              <span>{item.sales}</span>

            </div>

            <div className="h-2 rounded-full bg-gray-200">

              <div
                className={`${item.color} h-2 rounded-full`}
                style={{
                  width: `${item.sales / 3}%`,
                }}
              />

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}