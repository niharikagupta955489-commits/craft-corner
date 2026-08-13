import { useState } from "react";
import {
  FaBolt,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaFire,
  FaTruck,
  FaStar
} from "react-icons/fa";


export default function ProductInfo({product}){


const [pincode,setPincode]=useState("");
const [message,setMessage]=useState("");



if(!product) return null;



const oldPrice=Math.round(product.price/0.8);
const save=oldPrice-product.price;



const checkDelivery=()=>{

if(pincode.length!==6){

setMessage("Enter valid pincode");

return;

}

setMessage("✓ Delivery available");

};



return(

<div className="flex flex-col gap-8"
style={{

transform:"translate(40px,0px) scale(01)"

}}
>



{/* CATEGORY */}

<div className="flex gap-2">

<span className="
bg-[#eaf4dd]
text-[#556B2F]
px-3 py-1
rounded-full
font-semibold
text-sm
"
style={{
  paddingLeft:"20px",
  paddingRight:"20px",

transform:"translate(0px,0px) scale(01)"

}}>

{product.category}

</span>


<span className="
bg-orange-500
text-white
px-3 py-1
rounded-full
font-semibold
flex items-center gap-1
text-sm
"
style={{
  paddingLeft:"20px",
  paddingRight:"20px",

transform:"translate(0px,0px) scale(01)"

}}
>

<FaFire/>
Bestseller

</span>


</div>






{/* TITLE */}

<h1 className="
text-4xl
font-bold
text-[#222]
">

{product.name}

</h1>






<div className="flex gap-3 items-center">


<span className="
bg-green-600
text-white
px-3 py-1
rounded-lg
flex items-center gap-1
"
style={{
  paddingLeft:"20px",
  paddingRight:"20px",

transform:"translate(0px,0px) scale(01)"

}}>

<FaStar/>

New

</span>


<span className="text-gray-500">

No Reviews Yet

</span>


</div>







{/* PRICE */}


<div>

<div className="
flex
items-center
gap-3
">


<h2 className="
text-5xl
font-bold
">

₹{product.price}

</h2>


<span className="
line-through
text-gray-400
text-xl
">

₹{oldPrice}

</span>


<span className="
text-green-600
font-bold
">

20% OFF

</span>


</div>


<p className="text-gray-600 mt-3">

You save ₹{save}

</p>


</div>







{/* STOCK */}


<div>


<div className="
flex justify-between
font-semibold
"
style={{
  paddingLeft:"20px",
  paddingRight:"20px",

transform:"translate(20px,0px) scale(01)"

}}>
  

<span>Stock</span>

<span>{product.stock} Available</span>

</div>


<div className="
h-3
bg-gray-200
rounded-full
mt-3
"
style={{
  paddingLeft:"0px",
  paddingRight:"0px",

transform:"translate(20px,0px) scale(01)"

}}
>


<div className="
h-3
bg-[#556B2F]
rounded-full
w-[55%]
"/>


</div>


</div>








{/* DESCRIPTION */}



<div>


<h2 className="
text-2xl
font-bold
mb-3
"
style={{
  paddingLeft:"0px",
  paddingRight:"0px",

transform:"translate(0px,0px) scale(01)"

}}>

Description

</h2>


<p className="
text-gray-600
leading-8
"
style={{
  paddingLeft:"0px",
  paddingRight:"0px",

transform:"translate(0px,0px) scale(01)"

}}>

{product.description}

</p>


</div>









{/* DELIVERY */}



<div className="
bg-[#FAF7F0]

rounded-2xl
p-
"
style={{
  paddingLeft:"0px",
  paddingRight:"0px",

transform:"translate(-10px,-10px) scale(01)"

}}
>


<h2 className="
text-xl
font-bold
flex
items-center
gap-2
"
style={{
  paddingLeft:"20px",
  paddingRight:"20px",

transform:"translate(-126px,13px) scale(0.7)"

}}>

<FaMapMarkerAlt/>

Check Delivery

</h2>



<div className="
flex
gap-3
mt-4
"
style={{
  paddingLeft:"20px",
  paddingRight:"20px",

transform:"translate(70px,-10px) scale(0.85)"

}}>


<input

value={pincode}

onChange={(e)=>setPincode(e.target.value)}

placeholder="Enter Pincode"

className="
flex-1
border
rounded-xl
px-4
py-2
"
style={{
  paddingLeft:"20px",
  paddingRight:"20px",

transform:"translate(0px,0px) scale(01)"

}}
/>



<button

onClick={checkDelivery}

className="
bg-[#556B2F]
text-white
px-6
rounded-xl
font-semibold
"
style={{
  paddingLeft:"20px",
  paddingRight:"20px",

transform:"translate(0px,0px) scale(01)"

}}>

Check

</button>


</div>



{
message &&

<p className="
text-green-600
mt-3
">

{message}

</p>

}


</div>









{/* OFFERS */}



<div className="
bg-[#FAF7F0]

rounded-2xl
p-5
"
style={{
  paddingLeft:"0px",
  paddingRight:"0px",

transform:"translate(-20px,-30px) scale(01)"

}}>


<h2 className="
text-2xl
font-bold
mb-4
"
style={{
  paddingLeft:"0px",
  paddingRight:"0px",

transform:"translate(-60px,2px) scale(0.8)"

}}>

Available Offers

</h2>



<div className="
flex
flex-col
gap-3
"
style={{
  paddingLeft:"0px",
  paddingRight:"0px",

transform:"translate(18px,-2px) scale(1)"

}}>


<p>
⚡ 10% Instant Discount on prepaid orders
</p>


<p>
⚡ Free Delivery on orders above ₹499
</p>


<p>
⚡ Buy 2 products & get 15% OFF
</p>


</div>


</div>









{/* BENEFITS */}



<div className="
grid
grid-cols-2
gap-4
"
style={{
  paddingLeft:"0px",
  paddingRight:"0px",

transform:"translate(0px,-20px) scale(1)"

}}
>


<div className="
bg-[#f3f8ea]
rounded-xl
p-4
flex
items-center
gap-2
font-semibold
"
style={{
  paddingLeft:"0px",
  paddingRight:"0px",

transform:"translate(0px,-20px) scale(1)"

}}
>

<FaTruck/>

Free Shipping

</div>



<div className="
bg-[#f3f8ea]
rounded-xl
p-4
flex
items-center
gap-2
font-semibold
"
style={{
  paddingLeft:"0px",
  paddingRight:"0px",

transform:"translate(200px,-20px) scale(1)"

}}
>


<FaCheckCircle/>

Quality Assured

</div>



</div>



</div>


)

}