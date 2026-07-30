import { useEffect, useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";


export default function Customers(){


const [customers,setCustomers] = useState([]);

const [loading,setLoading] = useState(true);

const [search,setSearch] = useState("");





const fetchCustomers = async()=>{


try{


const res = await api.get("/auth/users");


setCustomers(
res.data.users || []
);


}


catch(error){


toast.error(

error.response?.data?.message ||

"Failed to fetch customers"

);


}

finally{


setLoading(false);


}


};





const deleteCustomer = async(id)=>{


if(!window.confirm("Delete this customer?"))
return;



try{


await api.delete(
`/auth/users/${id}`
);



toast.success(
"Customer Deleted"
);



fetchCustomers();



}

catch(error){


toast.error(

error.response?.data?.message ||

"Delete Failed"

);


}


};





useEffect(()=>{

fetchCustomers();

},[]);






if(loading){


return(

<div

className="
min-h-screen
flex
items-center
justify-center
text-2xl

"

style={{

transform:"translateX(0px) translateY(0px)"

}}

>

Loading...

</div>

);


}





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
flex
justify-between
items-center
mb-8
"

style={{

transform:"translateX(0px) translateY(0px)"

}}

>


<div>


<h1

className="
text-5xl
font-bold
text-[#111827]
"

style={{

transform:"translateX(10px) translateY(0px) scale(0.8)"

}}

>

Customers

</h1>



<p

className="
text-gray-500
mt-3
text-lg
"

style={{

transform:"translateX(10px) translateY(-10px)"

}}

>

View and manage your store customers

</p>


</div>





<div

className="
flex
gap-4
"

style={{
 paddingLeft:"0px",
 paddingRight:"30px",
transform:"translateX(-200px) translateY(0px)"
}}

>


<input

type="text"

placeholder="Search customers..."

value={search}

onChange={(e)=>

setSearch(e.target.value)

}

className="
w-72
h-12
rounded-xl
border
border-gray-200
bg-white
px-5
outline-none
focus:border-[#556B2F]
"

style={{
 paddingLeft:"30px",
 paddingRight:"30px",
transform:"translateX(0px) translateY(0px)"
}}

/>



<button

className="
h-12
px-6
rounded-xl
border
border-gray-200
bg-white
font-semibold
text-gray-700
"

style={{
 paddingLeft:"30px",
 paddingRight:"30px",
transform:"translateX(0px) translateY(0px)"
}}

>

☷ Filters

</button>


</div>


</div>


{/* ================= CUSTOMER TABLE ================= */}


<div

className="
bg-white
rounded-[10px]
border
border-gray-200
shadow-lg
overflow-hidden
"

style={{

transform:"translateX(0px) translateY(0px)scale(0.99)"

}}

>



<div

className="
overflow-x-auto
"

style={{

transform:"translateX(2px) translateY(0px)"

}}

>


<table

className="
w-full
"

>


<thead

className="
bg-[#FAFBFC]
border-b
border-gray-100
"
style={{
 paddingLeft:"30px",
 paddingRight:"30px",
transform:"translateX(0px) translateY(0px)"
}}

>


<tr>


<th

className="
text-left
px-8
py-5
text-sm
font-semibold
text-gray-700
"
style={{
 paddingLeft:"18px",
 paddingRight:"0px",
transform:"translateX(-10px) translateY(0px)"
}}

>

ID

</th>



<th

className="
text-left
px-8
py-5
text-sm
font-semibold
text-gray-700
"
style={{
 paddingLeft:"30px",
 paddingRight:"30px",
transform:"translateX(0px) translateY(0px)"
}}

>

Customer

</th>



<th

className="
text-left
px-8
py-5
text-sm
font-semibold
text-gray-700
"
style={{
 paddingLeft:"30px",
 paddingRight:"30px",
transform:"translateX(0px) translateY(0px)"
}}

>

Email

</th>



<th

className="
text-left
px-8
py-5
text-sm
font-semibold
text-gray-700
"
style={{
 paddingLeft:"30px",
 paddingRight:"30px",
transform:"translateX(0px) translateY(0px)"
}}

>

Phone

</th>



<th

className="
text-left
px-8
py-5
text-sm
font-semibold
text-gray-700
"
style={{
paddingLeft:"0px",
 paddingRight:"0px",
transform:"translateX(-10px) translateY(0px)"
}}

>

Orders

</th>



<th

className="
text-center
px-8
py-5
text-sm
font-semibold
text-gray-700
"
style={{
 paddingLeft:"30px",
 paddingRight:"30px",
transform:"translateX(20px) translateY(0px)"
}}

>

Action

</th>


</tr>


</thead>





<tbody>


{


customers

.filter((customer)=>

customer.name
?.toLowerCase()
.includes(
search.toLowerCase()
)

)


.length===0

?

<tr>


<td

colSpan="6"

className="
text-center
py-10
text-gray-500
"
style={{
 paddingLeft:"30px",
 paddingRight:"30px",
transform:"translateX(0px) translateY(0px)"
}}

>

No Customers Found

</td>


</tr>



:


customers

.filter((customer)=>

customer.name
?.toLowerCase()
.includes(
search.toLowerCase()
)

)


.map((customer,index)=>(


<tr

key={customer._id}

className="
border-b
border-gray-100
hover:bg-gray-50
transition
"

style={{

transform:"translateX(10px) translateY(0px)"

}}

>



<td

className="
px-8
py-5
text-gray-700
"

>

{index+1}

</td>





<td

className="
px-8
py-5
"

>


<div

className="
flex
items-center
gap-4
"

>


<div

className="
w-11
h-11
rounded-full
bg-[#E8F1E2]
flex
items-center
justify-center
font-bold
text-[#556B2F]
"

>


{

customer.name
?.charAt(0)
?.toUpperCase()

}


</div>




<div>


<p

className="
font-semibold
text-gray-800
"

>

{customer.name}

</p>



<p

className="
text-sm
text-gray-500
"

>

Customer

</p>


</div>


</div>


</td>





<td

className="
px-8
py-5
text-gray-600
"

>

{customer.email}

</td>





<td

className="
px-8
py-5
text-gray-600
"

>

{customer.phone || "-"}

</td>





<td

className="
px-8
py-5
"

>


<span

className="
px-4
py-2
rounded-xl
bg-[#E8F1E2]
text-[#556B2F]
font-semibold
"

>

-

</span>


</td>

<td

className="
px-8
py-5
text-center
"

>


<div

className="
flex
justify-center
gap-3
"

style={{

transform:"translateX(0px) translateY(0px)"

}}

>


<button


onClick={()=>


alert(

`Name : ${customer.name}

Email : ${customer.email}

Phone : ${customer.phone || "-"}

Role : ${customer.role}`

)


}


className="
px-5
py-2
rounded-xl
border
border-[#556B2F]
text-[#556B2F]
font-semibold
hover:bg-[#556B2F]
hover:text-white
transition
"


style={{
 paddingLeft:"30px",
 paddingRight:"30px",
transform:"translateX(0px) translateY(0px)"
}}
>


View

</button>





<button


onClick={()=>deleteCustomer(customer._id)}


className="
px-5
py-2
rounded-xl
border
border-red-300
text-red-500
font-semibold
hover:bg-red-500
hover:text-white
transition
"


style={{
 paddingLeft:"30px",
 paddingRight:"30px",
transform:"translateX(0px) translateY(0px)"
}}

>


Delete

</button>



</div>


</td>


</tr>


))


}


</tbody>


</table>


</div>





{/* ================= PAGINATION ================= */}


<div

className="
flex
justify-between
items-center
px-8
py-6
border-t
border-gray-100
"

style={{

transform:"translateX(1px) translateY(0px)"

}}

>


<p

className="
text-gray-500
text-sm
"
style={{
 paddingLeft:"30px",
 paddingRight:"30px",
transform:"translateX(0px) translateY(0px)"
}}

>

Showing 1 to {customers.length} customers

</p>




<div

className="
flex
gap-3
"

>


<button

className="
w-10
h-10
rounded-xl
border
border-gray-200
bg-white
text-gray-500
"
style={{
 paddingLeft:"30px",
 paddingRight:"30px",
transform:"translateX(-80px) translateY(0px) scale(0.8)"
}}

>

‹

</button>



<button

className="
w-10
h-10
rounded-xl
bg-[#556B2F]
text-white
font-semibold
"
style={{
 paddingLeft:"30px",
 paddingRight:"30px",
transform:"translateX(-80px) translateY(0px) scale(0.8)"
}}

>

1

</button>



<button

className="
w-10
h-10
rounded-xl
border
border-gray-200
bg-white
text-gray-500
"
style={{
 paddingLeft:"30px",
 paddingRight:"30px",
transform:"translateX(-80px) translateY(0px) scale(0.8)"
}}
>

›

</button>



</div>


</div>


</div>


</div>

</div>

);

}