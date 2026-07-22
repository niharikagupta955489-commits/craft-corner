import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";

import {
  FaHome,
  FaBox,
  FaPlus,
  FaShoppingCart,
  FaUsers,
  FaTags,
  FaRupeeSign,
  FaSearch
} from "react-icons/fa";


export default function Dashboard(){

const [stats,setStats]=useState({
totalProducts:0,
totalOrders:0,
totalCustomers:0,
totalRevenue:0,
recentOrders:[]
});


const [loading,setLoading]=useState(true);



const fetchDashboard=async()=>{

try{

const res=await api.get("/dashboard");

setStats(res.data);


}
catch(error){

toast.error("Dashboard load failed");

}
finally{

setLoading(false);

}

};



useEffect(()=>{
fetchDashboard();
},[]);



if(loading){

return(
<div className="h-screen flex justify-center items-center text-xl">
Loading...
</div>
)

}



return(

<div className="min-h-screen bg-[#F6F7FB]">






{/* Main */}

<main className="flex-1 px-14 py-8">



<div className="flex justify-between items-center mb-8">


<div>

<h1 className="text-4xl font-bold text-[#1F2937]">
Craft Corner Dashboard
</h1>


<p className="text-gray-500 mt-2">
Manage your handmade products and orders
</p>


</div>



<button className="bg-[#263528] text-white px-6 py-3 rounded-xl">
Admin
</button>



</div>






{/* Cards */}

<div className="grid grid-cols-4 gap-8 mt-8 max-w-[1500px] mx-auto">



<StatCard
title="Total Products"
value={stats.totalProducts}
icon={<FaBox/>}
/>



<StatCard
title="Total Orders"
value={stats.totalOrders}
icon={<FaShoppingCart/>}
/>



<StatCard
title="Customers"
value={stats.totalCustomers}
icon={<FaUsers/>}
/>




<StatCard
title="Revenue"
value={`₹${stats.totalRevenue}`}
icon={<FaRupeeSign/>}
/>



</div>





{/* Search */}


<div className="bg-white rounded-2xl p-5 mt-8 border border-gray-100 flex gap-4">


<div className="flex-1 flex items-center gap-3 border rounded-xl px-4">

<FaSearch className="text-gray-400"/>


<input
placeholder="Search orders..."
className="w-full py-3 outline-none"
/>


</div>



<button className="bg-[#556B2F] text-white px-8 rounded-xl">
Search
</button>


</div>






{/* Orders */}


<div className="bg-white rounded-2xl border border-gray-100 mt-8 p-6">



<h2 className="text-2xl font-bold text-[#1F2937] mb-6">
Recent Orders
</h2>




<table className="w-full">


<thead>


<tr className="bg-[#111827] text-white">


<th className="p-4 text-left rounded-l-xl">
Order ID
</th>


<th>
Customer
</th>


<th>
Amount
</th>


<th className="rounded-r-xl">
Status
</th>


</tr>


</thead>





<tbody>


{
stats.recentOrders.map(order=>(

<tr
key={order._id}
className="border-b hover:bg-gray-50"
>


<td className="p-4">
#{order._id.slice(-6)}
</td>



<td>
{order.user?.name}
</td>



<td>
₹{order.totalPrice}
</td>



<td>


<span
className={`px-4 py-2 rounded-full text-sm
${
order.status==="Delivered"
?"bg-green-100 text-green-700"
:
order.status==="Shipped"
?"bg-blue-100 text-blue-700"
:
"bg-yellow-100 text-yellow-700"
}
`}
>

{order.status}

</span>


</td>



</tr>


))
}



</tbody>


</table>



</div>





</main>


</div>

)

}





function Menu({icon,text,link,active}){

return(

<Link
to={link}
className={`flex items-center gap-4 px-4 py-3 rounded-xl transition

${active
?"bg-[#EEF2FF] text-[#556B2F]"
:"text-gray-600 hover:bg-gray-100"
}

`}
>

{icon}

<span>
{text}
</span>


</Link>

)

}





function StatCard({title,value,icon}){

return(

<div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm h-32 flex flex-col items-center justify-center">


<div className="w-10 h-10 rounded-xl bg-[#EEF2FF] flex items-center justify-center text-[#556B2F] mb-2">

{icon}

</div>



<p className="text-gray-500 text-base text-center">
{title}
</p>



<h2 className="text-3xl font-bold text-[#1F2937] mt-1 text-center">
{value}
</h2>



</div>

)

}