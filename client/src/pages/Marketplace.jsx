function Marketplace() {
  const products = [
    {
      id: 1,
      name: "Handmade Clay Pot",
      price: "₹799",
      category: "Pottery",
      image:
        "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600",
    },
    {
      id: 2,
      name: "Wooden Elephant",
      price: "₹1499",
      category: "Wood Craft",
      image:
        "https://images.unsplash.com/photo-1517705008128-361805f42e86?w=600",
    },
    {
      id: 3,
      name: "Handwoven Basket",
      price: "₹999",
      category: "Handloom",
      image:
        "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?w=600",
    },
    {
      id: 4,
      name: "Traditional Necklace",
      price: "₹1299",
      category: "Jewellery",
      image:
        "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=600",
    },
    {
      id: 5,
      name: "Wall Painting",
      price: "₹2499",
      category: "Painting",
      image:
        "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600",
    },
    {
      id: 6,
      name: "Decor Vase",
      price: "₹899",
      category: "Home Decor",
      image:
        "https://images.unsplash.com/photo-1616628182509-6cb8d63c4a43?w=600",
    },
  ];

  return (
    <section className="min-h-screen bg-[#FAF7F0] py-20">
      <div className="max-w-7xl mx-auto px-8">

        <h1 className="text-5xl font-bold text-[#2F3A2D] mb-3">
          Marketplace
        </h1>

        <p className="text-gray-600 mb-12">
          Explore handcrafted products from talented artisans.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {products.map((product) => (

            <div
              key={product.id}
              className="bg-white rounded-3xl shadow-lg overflow-hidden hover:-translate-y-2 hover:shadow-2xl transition duration-300"
            >

              <img
                src={product.image}
                alt={product.name}
                className="w-full h-72 object-cover"
              />

              <div className="p-6">

                <span className="text-sm bg-[#EAF2DD] text-[#556B2F] px-3 py-1 rounded-full">
                  {product.category}
                </span>

                <h2 className="text-2xl font-semibold mt-4">
                  {product.name}
                </h2>

                <p className="text-2xl font-bold text-[#556B2F] mt-3">
                  {product.price}
                </p>

                <button className="w-full mt-6 bg-[#556B2F] text-white py-3 rounded-xl hover:bg-[#3E4E23] transition">
                  View Product
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}

export default Marketplace;