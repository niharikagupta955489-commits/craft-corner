import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  FaHome,
  FaLeaf,
  FaShieldAlt,
  FaTruck
} from "react-icons/fa";

import ProductCard from "../components/home/ProductCard";
import potterySide from "../assets/pottery side.png";

import api from "../services/api";



export default function CategoryPage(){


const category = window.location.pathname.replace("/","");



const [products,setProducts] = useState([]);

const [loading,setLoading] = useState(true);


const [filteredProducts, setFilteredProducts] = useState([]);
const [showFilter, setShowFilter] = useState(false);
const [activeFilter, setActiveFilter] = useState("Newest");


useEffect(()=>{


const getProducts = async()=>{


try{


const res = await api.get(

`/products/category/${category}`

);


setProducts(

res.data.products

);

setFilteredProducts(
res.data.products
);

}

catch(error){

console.log(error);

}


finally{

setLoading(false);

}


};



getProducts();



},[category]);


const handleFilter = (type) => {

let data = [...products];

switch(type){


case "low":
data.sort((a,b)=>a.price-b.price);
setActiveFilter("Price : Low → High");
break;

case "high":
data.sort((a,b)=>b.price-a.price);
setActiveFilter("Price : High → Low");
break;

case "new":
data.sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt));
setActiveFilter("Newest");
break;

case "old":
data.sort((a,b)=>new Date(a.createdAt)-new Date(b.createdAt));
setActiveFilter("Oldest");
break;

default:
data = [...products];
setActiveFilter("Newest");
}

setFilteredProducts(data);
setShowFilter(false);

};



if(loading){


return(

<div

className="
min-h-screen
flex
items-center
justify-center
text-xl
"

style={{

transform:"translateX(0px) translateY(20px)"

}}

>

Loading...

</div>


)

}







return(


<div

className="
min-h-screen
bg-[#EEE6D7]
py-8
"

style={{

transform:"translateX(5px) translateY(0px)"

}}

>


<div

className="
max-w-[1500px]
mx-auto
px-4
flex
gap-5
"

style={{

transform:"translateX(0px) translateY(0px)"

}}

>







{/* LEFT SIDEBAR */}



<div

className="
hidden
lg:block
w-[290px]
min-h-[720px]
bg-[#EEE6D7]
rounded-[35px]
p-6
"

style={{


transform:"translateX(0px) translateY(0px)"

}}

>



<div

className="
h-[340px]
rounded-[35px]
overflow-hidden
bg-[#A7A883]
"

style={{

transform:"translateX(-6px) translateY(0px) scale(0.9)"

}}

>


<img
  src={potterySide}

className="
w-full
h-full
object-cover
"
style={{

transform:"translateX(0px) translateY(0px) scale(0.99)"

}}

/>


</div>







<div

className="
mt-10
space-y-10
"

style={{

transform:"translateX(0px) translateY(20px)"

}}

>





<div

className="
flex
gap-5
"

style={{

transform:"translateX(0px) translateY(0px)"

}}

>


<div

className="
w-14
h-14
rounded-full
border
border-[#556B2F]
flex
items-center
justify-center
"

>

<FaLeaf

className="
text-[#556B2F]
"

size={24}

/>


</div>




<div>


<h3

className="
font-bold
text-xl
text-[#344225]
"

>

Handmade

</h3>


<p

className="
text-gray-600
mt-2
"

>

Crafted with traditional techniques

</p>


</div>


</div>








<div

className="
flex
gap-5
"

style={{

transform:"translateX(0px) translateY(0px)"

}}

>


<div

className="
w-14
h-14
rounded-full
border
border-[#556B2F]
flex
items-center
justify-center
"

>

<FaShieldAlt

className="
text-[#556B2F]
"

size={24}

/>


</div>




<div>


<h3

className="
font-bold
text-xl
text-[#344225]
"

>

Premium Quality

</h3>


<p

className="
text-gray-600
mt-2
"

>

High quality clay and materials

</p>


</div>


</div>







<div

className="
flex
gap-5
"

style={{

transform:"translateX(0px) translateY(0px)"

}}

>


<div

className="
w-14
h-14
rounded-full
border
border-[#556B2F]
flex
items-center
justify-center
"

>

<FaTruck

className="
text-[#556B2F]
"

size={24}

/>


</div>




<div>


<h3

className="
font-bold
text-xl
text-[#344225]
"

>

Safe Delivery

</h3>


<p

className="
text-gray-600
mt-2
"

>

Carefully packaged for safe shipping

</p>


</div>


</div>






</div>




</div>




{/* MAIN CONTENT */}


<div

className="
flex-1
bg-[#EEE6D7]
rounded-[0px]
p-10
"

style={{

transform:"translateX(px) translateY(0px)"

}}

>





{/* BREADCRUMB */}


<div

className="
flex
items-center
gap-3
text-[#6B6B5E]
"

style={{

transform:"translateX(170px) translateY(20px) scale(1.2)"

}}

>


<Link to="/" className="flex items-center gap-2 text-[#556B2F] hover:text-[#344225]">
  <FaHome />
  <span>Home</span>
</Link>


<span>

›

</span>


<span

className="
capitalize
"

>

{category}

</span>


</div>








{/* TITLE */}



<h1

className="
text-[64px]
font-black
capitalize
text-[#24331D]
mt-8
leading-none
"

style={{

transform:"translateX(-250px) translateY(10px) scale(0.5)"

}}

>


{category}


</h1>







<div

className="
flex
items-center
gap-3
mt-5
"

style={{

transform:"translateX(50px) translateY(0px)"

}}

>


<div

className="
w-10
h-[3px]
bg-[#556B2F]
"

></div>


<div

className="
text-[#8C9A70]
text-2xl
"

>

❧

</div>


</div>








{/* DESCRIPTION */}


<p

className="
mt-8
text-xl
text-[#555548]
max-w-xl
leading-relaxed
"

style={{

transform:"translateX(50px) translateY(0px)"

}}

>


Beautiful handmade {category} items crafted with love and tradition.


</p>








{/* COUNT + BUTTONS */}



<div

className="
flex
justify-between
items-center
mt-10
"

style={{

transform:"translateX(-40px) translateY(0px) scale(0.85)"

}}

>




<div

className="
bg-[#E8EED8]
text-[#556B2F]
px-7
py-3
rounded-full
font-semibold
text-lg
"

style={{
paddingLeft:"50px",
 paddingRight:"50px",

transform:"translateX(0px) translateY(0px)"

}}

>


🛍 {products.length} Products Found


</div>








<div

className="
flex
gap-5
"

style={{
paddingLeft:"80px",
 paddingRight:"80px",

transform:"translateX(190px) translateY(0px)"

}}

>














<div className="relative">

<button
onClick={()=>setShowFilter(!showFilter)}
className="
h-14
px-7
rounded-2xl
border
border-[#C8D1B8]
bg-[#F7F3EA]
flex
items-center
gap-3
text-lg
font-medium
"
style={{
paddingLeft:"40px",
paddingRight:"40px",
transform:"translateX(-60px) translateY(-180px)"
}}
>

☰

Filter

</button>

{showFilter && (

<div className="
absolute
right-0
top-16
w-60
bg-[#EEE6D7]
rounded-2xl
shadow-xl
border
border-[#E5E5E5]
overflow-hidden
z-50
"
style={{
 paddingLeft:"20px",
 paddingRight:"20px",
transform:"translateX(10px) translateY(-170px)"
}}

>

<button onClick={()=>handleFilter("new")} className="w-full text-left px-5 py-3 hover:bg-[#F2F5E9]">
Newest
</button>

<button onClick={()=>handleFilter("old")} className="w-full text-left px-5 py-3 hover:bg-[#F2F5E9]">
Oldest
</button>

<button onClick={()=>handleFilter("low")} className="w-full text-left px-5 py-3 hover:bg-[#F2F5E9]">
Price : Low → High
</button>

<button onClick={()=>handleFilter("high")} className="w-full text-left px-5 py-3 hover:bg-[#F2F5E9]">
Price : High → Low
</button>

<button onClick={()=>handleFilter("reset")} className="w-full text-left px-5 py-3 text-red-600 hover:bg-red-50">
Reset
</button>



</div>

)}

</div>




</div>






</div>



{/* PRODUCT GRID */}


{

products.length === 0 ?


(

<div

className="
mt-12
text-center
bg-[#EEE6D7]
rounded-3xl
p-10
"

style={{

transform:"translateX(0px) translateY(0px)"

}}

>

<h2

className="
text-3xl
font-bold
text-[#24331D]
"

>

No Products Found

</h2>


</div>

)


:


(


<div

className="
grid
grid-cols-1
sm:grid-cols-2
xl:grid-cols-4
gap-6
mt-10
"

style={{

transform:"translateX(-10px) translateY(10px) scale(0.9)"

}}

>


{


filteredProducts.map((product)=>(


<div

key={product._id}

style={{

transform:"translateX(0px) translateY(0px)"

}}

>


<ProductCard

product={product}

/>


</div>


))


}



</div>


)


}




</div>


</div>


</div>


);

}