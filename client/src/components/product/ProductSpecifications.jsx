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

    <div className="grid md:grid-cols-2 gap-6">

      {specifications.map((item, index) => (

        <div
          key={index}
          className="flex border-b border-gray-200 py-3"
        >

          <div className="w-40 font-semibold text-gray-700">

            {item.title}

          </div>

          <div className="flex-1 text-gray-900">

            {item.value}

          </div>

        </div>

      ))}

    </div>

  );

}