import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";

import {
FaArrowLeft
} from "react-icons/fa";


export default function OrderDetails(){

const {id}=useParams();

const navigate=useNavigate();


const [order,setOrder]=useState(null);

const [loading,setLoading]=useState(true);



useEffect(()=>{

fetchOrder();

},[]);



const fetchOrder=async()=>{

try{

const res=await api.get(`/orders/${id}`);

setOrder(res.data.order);

}

catch(error){

toast.error(
"Failed to load order details"
);

}

finally{

setLoading(false);

}

};



if(loading){

return(

<div
className="
min-h-screen
bg-[#F7F8FC]
flex
items-center
justify-center
"

style={{
transform:"translateX(0px) translateY(0px)"
}}
>

<h2
className="
text-2xl
font-bold
text-gray-500
"
>
Loading Order...
</h2>

</div>

);

}



if(!order){

return null;

}



return(

<div

className="
min-h-screen
bg-[#F7F8FC]
p-10
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
transform:"translateX(5px) translateY(0px)"
}}

>


<button

onClick={()=>navigate(-1)}

className="
flex
items-center
gap-2
text-[#556B2F]
font-semibold
mb-8
"

style={{
transform:"translateX(10px) translateY(5px)"
}}

>

<FaArrowLeft/>

Back

</button>



<h1

className="
text-4xl
font-bold
text-gray-800
"

style={{
transform:"translateX(-50px) translateY(0px) scale(0.9)"
}}

>

Order Details

</h1>


<p

className="
text-gray-500
mt-2
mb-8
"

style={{
transform:"translateX(20px) translateY(0px)"
}}

>

Order ID : #{order._id.slice(-8)}

</p>

{/* ================= CUSTOMER DETAILS ================= */}


<div

className="
grid
grid-cols-1
lg:grid-cols-3
gap-6
mt-10
"

style={{
transform:"translateX(-5px) translateY(50px)scale(0.98)"
}}

>


<div

className="
bg-white
rounded-3xl
border
border-gray-200
shadow-sm
p-6
"

style={{
transform:"translateX(0px) translateY(0px)"
}}

>


<h2

className="
text-xl
font-bold
text-gray-800
mb-5
"

style={{
transform:"translateX(30px) translateY(10px)"
}}

>

Customer Information

</h2>


<p

className="text-gray-500 text-sm"

style={{
transform:"translateX(10px) translateY(20px)"
}}

>
Name
</p>


<h3

className="
font-semibold
text-lg
text-gray-800
mt-1
"

style={{
transform:"translateX(60px) translateY(-3px)"
}}

>

{order.user?.name || "Unknown"}

</h3>



<p

className="text-gray-500 text-sm mt-4"

style={{
transform:"translateX(10px) translateY(5px)"
}}

>
Email
</p>


<h3

className="
font-medium
text-gray-700
mt-1
"

style={{
transform:"translateX(60px) translateY(-18px)"
}}

>

{order.user?.email || "Not Available"}

</h3>


</div>





<div

className="
bg-white
rounded-3xl
border
border-gray-200
shadow-sm
p-6
"

style={{
transform:"translateX(0px) translateY(0px)"
}}

>


<h2

className="
text-xl
font-bold
text-gray-800
mb-5
"

style={{
transform:"translateX(30px) translateY(10px)"
}}

>

Shipping Address

</h2>


<p

className="
text-gray-600
leading-7
"

style={{
transform:"translateX(30px) translateY(20px)"
}}

>

{order.shippingAddress}

</p>


</div>





<div

className="
bg-white
rounded-3xl
border
border-gray-200
shadow-sm
p-6
"

style={{
transform:"translateX(0px) translateY(0px)"
}}

>


<h2

className="
text-xl
font-bold
text-gray-800
mb-5
"

style={{
transform:"translateX(40px) translateY(10px)"
}}

>

Payment Details

</h2>


<p

className="text-gray-500 text-sm"

style={{
transform:"translateX(30px) translateY(22px)"
}}

>

Payment Method

</p>


<h3

className="
font-semibold
text-[#556B2F]
mt-2
"

style={{
transform:"translateX(180px) translateY(0px)"
}}

>

{order.paymentMethod}

</h3>


</div>


</div>

{/* ================= ORDERED PRODUCTS ================= */}


<div

className="
bg-white
rounded-3xl
border
border-gray-200
shadow-sm
mt-8
overflow-hidden
"

style={{
transform:"translateX(-10px) translateY(180px)scale(0.98)"
}}

>


<div

className="
px-8
py-6
border-b
border-gray-100
"

style={{
transform:"translateX(30px) translateY(10px)"
}}

>


<h2

className="
text-2xl
font-bold
text-gray-800
"

style={{
transform:"translateX(0px) translateY(0px)"
}}

>

Products Ordered

</h2>


</div>





<div

className="
divide-y
divide-gray-100
"

style={{
transform:"translateX(-90px) translateY(5px) scale(0.8)"
}}

>


{

order.items.map((item)=>(


<div

key={item._id}

className="
flex
items-center
justify-between
px-8
py-6
"

style={{
transform:"translateX(0px) translateY(0px)"
}}

>


<div

className="
flex
items-center
gap-5
"

style={{
transform:"translateX(0px) translateY(0px)"
}}

>


<img

src={
item.product?.images?.[0]
}

alt="product"

className="
w-20
h-20
rounded-2xl
object-cover
border
border-gray-200
"

style={{
transform:"translateX(0px) translateY(0px)"
}}

/>



<div

style={{
transform:"translateX(0px) translateY(0px)"
}}

>


<h3

className="
font-semibold
text-gray-800
text-lg
"

style={{
transform:"translateX(0px) translateY(0px)"
}}

>

{
item.product?.name ||
"Product"
}

</h3>



<p

className="
text-gray-500
mt-1
"

style={{
transform:"translateX(0px) translateY(0px)"
}}

>

Quantity : {item.quantity}

</p>


</div>


</div>





<div

className="
text-right
"

style={{
transform:"translateX(0px) translateY(0px)"
}}

>


<p

className="
text-gray-500
text-sm
"

style={{
transform:"translateX(0px) translateY(0px)"
}}

>

Price

</p>


<h3

className="
font-bold
text-lg
text-[#556B2F]
"

style={{
transform:"translateX(0px) translateY(0px)"
}}

>

₹{item.price}

</h3>


</div>


</div>


))

}


</div>


</div>





{/* ================= TOTAL CARD ================= */}


<div

className="
flex
justify-end
mt-8
"

style={{
transform:"translateX(-25px) translateY(-40px)"
}}

>


<div

className="
bg-white
rounded-3xl
border
border-gray-200
shadow-sm
p-8
w-full
lg:w-[350px]
"

style={{
transform:"translateX(0px) translateY(-0px)"
}}

>


<p

className="
text-gray-500
"

style={{
transform:"translateX(90px) translateY(0px)"
}}

>

Total Amount

</p>


<h1

className="
text-4xl
font-bold
text-[#556B2F]
mt-2
"

style={{
transform:"translateX(100px) translateY(0px)"
}}

>

₹{order.totalPrice}

</h1>


</div>


</div>

{/* ================= STATUS SECTION ================= */}


<div

className="
bg-white
rounded-3xl
border
border-gray-200
shadow-sm
mt-8
p-8
"

style={{
transform:"translateX(-10px) translateY(140px)scale(0.98)"
}}

>


<h2

className="
text-2xl
font-bold
text-gray-800
mb-5
"

style={{
transform:"translateX(20px) translateY(5px)"
}}

>

Order Status

</h2>



<div

className="
flex
items-center
justify-between
flex-wrap
gap-5
"

style={{
transform:"translateX(40px) translateY(0px)"
}}

>


<div>

<span

className="
px-5
py-3
rounded-full
font-semibold
bg-yellow-100
text-yellow-700
"

style={{
transform:"translateX(0px) translateY(0px)"
}}

>

{order.status}

</span>


</div>





<div

className="
flex
items-center
gap-4
"

style={{
transform:"translateX(-100px) translateY(-10px)"
}}

>


<select

value={order.status}

onChange={async(e)=>{

try{

await api.put(

`/orders/${order._id}`,

{
status:e.target.value
}

);

toast.success(
"Status Updated"
);

fetchOrder();

}

catch(error){

toast.error(
"Update Failed"
);

}

}}

className="
h-12
rounded-xl
border
border-gray-200
px-5
outline-none
font-medium
"

style={{
transform:"translateX(0px) translateY(0px)"
}}

>


<option value="Pending">
Pending
</option>


<option value="Processing">
Processing
</option>


<option value="Shipped">
Shipped
</option>


<option value="Delivered">
Delivered
</option>


<option value="Cancelled">
Cancelled
</option>


</select>


</div>


</div>


</div>




</div>

</div>


);

}