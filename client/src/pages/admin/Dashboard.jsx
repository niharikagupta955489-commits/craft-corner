import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";

import {
FaBox,
FaShoppingCart,
FaUsers,
FaRupeeSign,
FaSearch,
FaHome,
FaCog,
FaPlus
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

<div className="h-screen flex items-center justify-center text-xl">

Loading...

</div>

)

}



return(


<div className="min-h-screen bg-[#F6F7FB] flex">








{/* Main */}


<main className="flex-1 px-10 py-8">



<h1 className="text-4xl font-bold text-[#1F2937]">

Craft Corner Dashboard

</h1>


<p className="text-gray-500 mt-2">

Manage your handmade products and orders

</p>





<div className="grid grid-cols-4 gap-8 mt-10">


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






<div className="bg-white rounded-2xl p-5 mt-10 flex gap-4">


<div className="flex-1 border rounded-xl flex items-center px-4">


<FaSearch className="text-gray-400"/>


<input

placeholder="Search orders..."

className="w-full p-3 outline-none"

/>


</div>


<button className="bg-[#556B2F] text-white px-8 rounded-xl">

Search

</button>


</div>







<div className="bg-white rounded-2xl mt-8 p-6">


<h2 className="text-2xl font-bold mb-6">

Recent Orders

</h2>



<table className="w-full">


<thead>

<tr className="bg-[#111827] text-white">


<th className="p-4">

Order ID

</th>


<th>

Customer

</th>


<th>

Amount

</th>


<th>

Status

</th>


</tr>

</thead>



<tbody>


{

stats.recentOrders.map(order=>(


<tr key={order._id} className="border-b">


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

{order.status}

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






function Menu({icon,text,link}){


return(

<Link

to={link}

className="
flex
items-center
gap-4
px-5
py-3
rounded-xl
text-gray-600
hover:bg-[#EEF2FF]
hover:text-[#556B2F]
transition
"

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

<div className="bg-white rounded-2xl p-6 shadow flex flex-col items-center">


<div className="w-12 h-12 rounded-xl bg-[#EEF2FF] flex items-center justify-center text-[#556B2F] text-xl">

{icon}

</div>


<p className="mt-3 text-gray-500">

{title}

</p>


<h2 className="text-3xl font-bold">

{value}

</h2>


</div>

)

}