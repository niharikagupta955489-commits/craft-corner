import { useEffect, useState } from "react";
import api from "../../services/api";


export default function HeroCategory(){


const [banner,setBanner] = useState("");



useEffect(()=>{


const fetchBanner = async()=>{


try{


const res = await api.get("/home");


setBanner(res.data.bannerImage);


}

catch(err){

console.log(err);

}


};


fetchBanner();


},[]);





return(

<section className="home-hero-section px-8 py-6 bg-[#FAF7F0]">


<div className="home-hero-card
relative
h-[320px]
rounded-3xl
overflow-hidden
shadow-lg
bg-[#EDE5D8]
">


<img

src={banner}

className="
absolute
right-0
top-0
w-full
h-full
object-cover
"

/>



<div className="
absolute
inset-0
bg-gradient-to-r
from-[#F8F2E8]
via-[#F8F2E8]/80
to-transparent
">
</div>





<div className="home-hero-copy
relative
z-10
p-12
max-w-xl
">


<h1 className="
text-5xl
font-bold
text-[#556B2F]
leading-tight
translate-x-19
translate-y-5
scale-90

">

Explore Handmade
<br/>
Categories

</h1>




<p className="
mt-5
text-lg
text-gray-700
translate-x-19
translate-y-8
scale-90
">

Discover a wide range of handmade products
crafted by skilled artisans with love and care.

</p>



<button className="
mt-8
bg-[#556B2F]
text-white
px-9
py-3
rounded-full
font-semibold
translate-x-49
translate-y-9
scale-90
">

 ..Shop Categories 🌿

</button>



</div>


</div>


</section>

)


}