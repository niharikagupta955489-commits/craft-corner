export default function ProductSpecifications({ product }) {
  if (!product) return null;

  const specifications = [
    {
      title: "Category",
      value: product.category || "N/A",
    },
    {
      title: "Material",
      value: product.material || "Handcrafted",
    },
    {
      title: "Color",
      value: product.color || "Natural",
    },
    {
      title: "Weight",
      value: product.weight || "500 g",
    },
    {
      title: "Dimensions",
      value: product.dimension || "Standard",
    },
    {
      title: "SKU",
      value: product._id?.slice(-8).toUpperCase(),
    },
    {
      title: "Availability",
      value: product.stock > 0 ? "In Stock" : "Out Of Stock",
    },
  ];

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 gap-x-8"
      style={{
        padding: "0px",
        transform: "translate(0px,0px)",
      }}
    >
      {specifications.map((item, index) => (
        <div
          key={index}
          className="flex items-center border-b border-[#ECE7DE]"
          style={{
            padding: "13px 0px",
            transform: "translate(0px,0px)",
          }}
        >
          <div
            className="w-40 shrink-0 font-semibold text-[#5B554D]"
            style={{
              padding: "0px",
              transform: "translate(0px,0px)",
            }}
          >
            {item.title}
          </div>

          <div
            className="flex-1 text-[#2F2B26]"
            style={{
              padding: "0px",
              transform: "translate(0px,0px)",
            }}
          >
            {item.value}
          </div>
        </div>
      ))}
    </div>
  );
}
