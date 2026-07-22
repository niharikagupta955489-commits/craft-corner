export default function About() {
  return (
    <div className="min-h-screen bg-[#FAF7F0] py-12">

      <div className="max-w-6xl mx-auto px-6">

        <h1 className="text-4xl font-bold text-center text-[#2F3A2D]">
          About CraftCorner
        </h1>

        <p className="text-gray-600 text-center mt-4 max-w-3xl mx-auto leading-8">
          CraftCorner is an online marketplace dedicated to promoting handmade
          products created by talented artisans across India. Our goal is to
          connect skilled craftsmen with people who appreciate unique,
          handcrafted creations.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-14">

          <div className="bg-white rounded-2xl shadow-md p-8 text-center">

            <div className="text-5xl mb-4">
              🎨
            </div>

            <h2 className="text-2xl font-bold text-[#2F3A2D]">
              Handmade Products
            </h2>

            <p className="text-gray-500 mt-3">
              Every product is carefully handcrafted with passion and attention
              to detail.
            </p>

          </div>

          <div className="bg-white rounded-2xl shadow-md p-8 text-center">

            <div className="text-5xl mb-4">
              🤝
            </div>

            <h2 className="text-2xl font-bold text-[#2F3A2D]">
              Support Artisans
            </h2>

            <p className="text-gray-500 mt-3">
              Every purchase directly supports local artists and small
              businesses.
            </p>

          </div>

          <div className="bg-white rounded-2xl shadow-md p-8 text-center">

            <div className="text-5xl mb-4">
              🌍
            </div>

            <h2 className="text-2xl font-bold text-[#2F3A2D]">
              Eco Friendly
            </h2>

            <p className="text-gray-500 mt-3">
              We encourage sustainable, eco-friendly and handmade craftsmanship.
            </p>

          </div>

        </div>

        <div className="bg-white rounded-2xl shadow-md p-10 mt-14">

          <h2 className="text-3xl font-bold text-[#2F3A2D] mb-5">
            Our Mission
          </h2>

          <p className="text-gray-600 leading-8">
            Our mission is to preserve traditional craftsmanship by providing a
            digital platform where artisans can showcase and sell their
            beautiful handmade creations. We believe every handmade product
            tells a story and deserves recognition.
          </p>

        </div>

      </div>

    </div>
  );
}