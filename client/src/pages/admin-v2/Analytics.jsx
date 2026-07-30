import { FaShoppingCart, FaBox, FaUsers, FaRupeeSign } from "react-icons/fa";


export default function Analytics(){


const stats = [

{
title:"Total Revenue",
value:"₹1,25,000",
icon:<FaRupeeSign/>
},

{
title:"Total Orders",
value:"245",
icon:<FaShoppingCart/>
},

{
title:"Total Products",
value:"86",
icon:<FaBox/>
},

{
title:"Total Customers",
value:"120",
icon:<FaUsers/>
}

];





return(


<div

className="
min-h-screen
bg-[#F7F8FC]
px-8
py-8
"

style={{
transform:"translateX(0px) translateY(0px)"
}}

>



<div

className="
max-w-7xl
mx-auto
"

style={{
transform:"translateX(0px) translateY(0px)"
}}

>




<div

className="
mb-8
"

style={{
transform:"translateX(0px) translateY(0px)"
}}

>


<h1

className="
text-5xl
font-bold
text-[#111827]
"

>

Analytics

</h1>



<p

className="
text-gray-500
mt-3
text-lg
"

>

Track your store performance and growth

</p>


</div>








<div

className="
grid
grid-cols-1
md:grid-cols-2
lg:grid-cols-4
gap-6
"

style={{
transform:"translateX(0px) translateY(0px)"
}}

>



{

stats.map((item,index)=>(


<div

key={index}

className="
bg-white
rounded-[30px]
border
border-gray-200
shadow-sm
p-6
"

style={{
transform:"translateX(0px) translateY(0px)"
}}

>



<div

className="
flex
justify-between
items-center
"

>


<div>


<p

className="
text-gray-500
text-sm
font-medium
"

>

{item.title}

</p>



<h2

className="
text-3xl
font-bold
text-gray-800
mt-3
"

>

{item.value}

</h2>


</div>





<div

className="
w-14
h-14
rounded-2xl
bg-[#FFF7E8]
text-[#C58B45]
flex
items-center
justify-center
text-xl
"

>

{item.icon}

</div>


</div>


</div>


))


}



</div>


{/* ================= SALES OVERVIEW ================= */}


<div

className="
bg-white
rounded-[30px]
border
border-gray-200
shadow-sm
p-8
mt-8
"

style={{
transform:"translateX(0px) translateY(0px)"
}}

>



<div

className="
flex
justify-between
items-center
mb-8
"

>


<div>


<h2

className="
text-2xl
font-bold
text-gray-800
"

>

Sales Overview

</h2>



<p

className="
text-gray-500
mt-1
"

>

Monthly revenue performance

</p>


</div>



<select

className="
border
border-gray-200
rounded-xl
px-5
py-3
outline-none
bg-white
"

>


<option>

2026

</option>


<option>

2025

</option>


</select>


</div>







<div

className="
h-72
flex
items-end
gap-6
px-6
"

style={{
transform:"translateX(0px) translateY(0px)"
}}

>


{


[

40,

65,

50,

85,

70,

95,

75,

90,

60,

80,

100,

88

].map((height,index)=>(


<div

key={index}

className="
flex-1
flex
flex-col
items-center
gap-3
"

>


<div

className="
w-full
rounded-t-2xl
bg-[#C58B45]
"

style={{

height:`${height*2}px`,

transform:"translateX(0px) translateY(0px)"

}}

>


</div>



<span

className="
text-xs
text-gray-500
"

>

{

[

"Jan",

"Feb",

"Mar",

"Apr",

"May",

"Jun",

"Jul",

"Aug",

"Sep",

"Oct",

"Nov",

"Dec"

][index]

}

</span>


</div>


))


}


</div>





</div>


{/* ================= BOTTOM ANALYTICS ================= */}


<div

className="
grid
grid-cols-1
lg:grid-cols-2
gap-8
mt-8
"

style={{
transform:"translateX(0px) translateY(0px)"
}}

>





{/* ORDER STATUS */}


<div

className="
bg-white
rounded-[30px]
border
border-gray-200
shadow-sm
p-8
"

style={{
transform:"translateX(0px) translateY(0px)"
}}

>


<h2

className="
text-2xl
font-bold
text-gray-800
mb-6
"

>

Order Status

</h2>




<div

className="
space-y-5
"

>


<div

className="
flex
justify-between
items-center
bg-[#FFF7E8]
rounded-2xl
p-5
"

>


<span className="font-semibold text-gray-700">

Delivered

</span>


<span className="
font-bold
text-[#C58B45]
">

180

</span>


</div>





<div

className="
flex
justify-between
items-center
bg-green-50
rounded-2xl
p-5
"

>


<span className="font-semibold text-gray-700">

Processing

</span>


<span className="
font-bold
text-green-600
">

45

</span>


</div>





<div

className="
flex
justify-between
items-center
bg-red-50
rounded-2xl
p-5
"

>


<span className="font-semibold text-gray-700">

Cancelled

</span>


<span className="
font-bold
text-red-500
">

20

</span>


</div>



</div>



</div>









{/* TOP PRODUCTS */}



<div

className="
bg-white
rounded-[30px]
border
border-gray-200
shadow-sm
p-8
"

style={{
transform:"translateX(0px) translateY(0px)"
}}

>



<h2

className="
text-2xl
font-bold
text-gray-800
mb-6
"

>

Top Selling Products

</h2>




<div

className="
space-y-5
"

>


{

[

{
name:"Hand Painted Tote Bag",
sales:120
},

{
name:"Wall Art Set",
sales:95
},

{
name:"Wood Collection",
sales:80
},

{
name:"Canvas Painting",
sales:65
}

].map((product,index)=>(



<div

key={index}

className="
flex
justify-between
items-center
border-b
border-gray-100
pb-4
"

style={{
transform:"translateX(0px) translateY(0px)"
}}

>



<div>


<h3

className="
font-semibold
text-gray-800
"

>

{product.name}

</h3>


<p

className="
text-sm
text-gray-500
mt-1
"

>

Sales : {product.sales}

</p>


</div>




<div

className="
w-12
h-12
rounded-xl
bg-[#F5E6C8]
flex
items-center
justify-center
font-bold
text-[#C58B45]
"

>

#{index+1}

</div>



</div>



))


}



</div>



</div>



</div>

</div>


</div>


);

}