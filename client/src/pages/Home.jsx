import TopBar from "../components/layout/TopBar";
import Navbar from "../components/layout/Navbar";
import CategoriesBar from "../components/layout/CategoriesBar";
import Banner from "../components/home/Banner";
import ProductSection from "../components/home/ProductSection";

export default function Home() {
  return (
    <div className="bg-[#FAF7F0] min-h-screen">
      <TopBar />
      <Navbar />
      <CategoriesBar />
      <Banner />

      <ProductSection />
    </div>
  );
}