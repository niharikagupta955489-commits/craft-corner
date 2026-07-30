import TopBar from "../components/layout/TopBar";
import Navbar from "../components/layout/Navbar";
import HeroCategory from "../components/home/HeroCategory";
import PopularCategories from "../components/home/PopularCategories";
import Services from "../components/home/Services";


export default function Home(){

return(

<div className="bg-[#FAF7F0] min-h-screen">

<TopBar/>

<Navbar/>

<HeroCategory/>

<PopularCategories/>

<Services/>

</div>

)

}