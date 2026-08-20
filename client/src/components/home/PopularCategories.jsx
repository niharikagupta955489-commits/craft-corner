import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services/api";




export default function PopularCategories(){

const [categories,setCategories] = useState([]);
const icons = {
Pottery:"🏺",
Handloom:"🧵",
Jewellery:"💍",
"Wood Craft":"🪵",
Paintings:"🎨",
Gifts:"🎁",
Decor:"🌿",
Baskets:"🧺"
};


const paths = {
Pottery:"/pottery",
Handloom:"/handloom",
Jewellery:"/jewellery",
"Wood Craft":"/wood-craft",
Paintings:"/painting",
Gifts:"/gifts",
Decor:"/decor",
Baskets:"/baskets"
};


useEffect(()=>{

const fetchCategories = async()=>{

try{

const res = await api.get("/home");

setCategories(res.data.categories || []);

}

catch(err){

console.log(err);

}

};


fetchCategories();


},[]);


return (

<section
className="
home-popular-section
bg-[#FAF7F0]
px-12
py-10
relative
"
style={{
transform:"translate(120px,80px) scale(1.1)"
}}
>


<h2 className="
text-center
text-4xl
font-bold
text-[#35451f]
mb-10
"
style={{

transform:"translate(-70px,-30px) scale(1)"

}}

>

Popular Categories

</h2>



<div className="
grid
grid-cols-4
gap-8
max-w-7xl
mx-auto
">


{

categories.map((cat)=>(


<Link

to={paths[cat.name] || "/"}

key={cat.name}

className="
bg-white
rounded-3xl
overflow-hidden
shadow-md
hover:shadow-xl
transition-all
duration-300
hover:-translate-y-2
"


>


<div className="
h-32
overflow-hidden
">


<img

src={cat.image}

alt={cat.name}

className="
w-full
h-full
object-cover
hover:scale-110
transition
duration-500
"

/>


</div>


<div className="
relative
text-center
px-4
pb-8
pt-10
min-h-[100px]
">


<div className="
absolute
-left-1/2
-top-8
left-1/2
-translate-x-1/2
w-14
h-14
rounded-full
bg-[#F4EEDC]
flex
items-center
justify-center
text-2xl
border-4
border-white
">

{cat.icon}
{icons[cat.name]}
</div>



<h3 className="
text-xl
font-bold
text-[#556B2F]
translate-y-9
">

{cat.name}

</h3>


<p className="
text-gray-600
text-sm
mt-1
translate-y-9
">

{cat.description || "Handmade with tradition"}

</p>


</div>



</Link>


))


}


</div>


</section>

)


}