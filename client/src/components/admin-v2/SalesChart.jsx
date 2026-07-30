export default function SalesChart() {
  const data = [
    { month: "Jan", value: 35 },
    { month: "Feb", value: 60 },
    { month: "Mar", value: 45 },
    { month: "Apr", value: 80 },
    { month: "May", value: 70 },
    { month: "Jun", value: 95 },
  ];

  const max = Math.max(...data.map((d) => d.value));

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-[#132715]">
            Sales Analytics
          </h2>
          <p className="text-gray-500">
            Last 6 Months
          </p>
        </div>
      </div>

      <div className="flex items-end justify-between h-72 gap-4">
        {data.map((item) => (
          <div
            key={item.month}
            className="flex flex-col items-center flex-1"
          >
            <div
              className="w-full rounded-t-xl bg-gradient-to-t from-[#4B7B37] to-[#84C65F] hover:opacity-80 transition-all"
              style={{
                height: `${(item.value / max) * 220}px`,
              }}
            />

            <span className="mt-3 text-sm text-gray-500">
              {item.month}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}