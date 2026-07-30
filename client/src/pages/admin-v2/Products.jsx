import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import toast from "react-hot-toast";


export default function Products(){


const [products,setProducts] = useState([]);

const [search,setSearch] = useState("");





const fetchProducts = async()=>{


try{


const res = await api.get("/products");


setProducts(
res.data.products || []
);


}


catch(error){


toast.error(
"Products load failed"
);


}


};





useEffect(()=>{


fetchProducts();


},[]);






const deleteProduct = async(id)=>{


try{


await api.delete(
`/products/${id}`
);



toast.success(
"Product deleted"
);



fetchProducts();



}


catch(error){


toast.error(
"Delete failed"
);


}


};







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

transform:"translateX(1px) translateY(0px)"

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


<button

className="
text-sm
text-[#556B2F]
mb-4
"

style={{

transform:"translateX(20px) translateY(10px)scale(1.15)"

}}

>

← Back

</button>



<h1

className="
text-5xl
font-bold
text-[#111827]
"

style={{

transform:"translateX(30px) translateY(0px) scale(0.8)"

}}

>

Products

</h1>



<p

className="
text-gray-500
mt-2
"

style={{

transform:"translateX(30px) translateY(-10px)"

}}

>

Manage all your handmade products

</p>


</div>






<div

className="
flex
gap-4
items-center
"

style={{

transform:"translateX(0px) translateY(0px)"

}}

>



<input


type="text"


placeholder="Search products..."


value={search}


onChange={(e)=>

setSearch(
e.target.value
)

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
focus:border-[#C58B45]
"


style={{
 paddingLeft:"30px",
 paddingRight:"30px",
transform:"translateX(-80px) translateY(0px)"
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
transform:"translateX(-60px) translateY(0px)"
}}

>

☷ Filters

</button>





<Link

to="/admin-v2/AddProduct"

className="
h-12
px-6
rounded-xl
bg-[#C58B45]
text-white
flex
items-center
font-semibold
"

style={{
 paddingLeft:"20px",
 paddingRight:"20px",
transform:"translateX(-40px) translateY(0px)"
}}
>

+ Add Product

</Link>



</div>


</div>



{/* ================= PRODUCT TABLE ================= */}


<div

className="
bg-white
rounded-[24px]
border
border-gray-200
shadow-sm
overflow-hidden
"

style={{

transform:"translateX(0px) translateY(0px)"

}}

>


<div

className="
overflow-x-auto
"

style={{

transform:"translateX(0px) translateY(0px)"

}}

>


<table

className="
w-full
"

>


<thead

className="
bg-[#FAFAF7]
border-b
border-gray-100
"

>


<tr>


<th

className="
px-6
py-5
text-left
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

Image

</th>


<th

className="
px-6
py-5
text-left
text-sm
font-semibold
text-gray-700
"

>

Name

</th>



<th

className="
px-6
py-5
text-left
text-sm
font-semibold
text-gray-700
"
style={{

transform:"translateX(-20px) translateY(0px)"
}}
>

Category

</th>



<th

className="
px-6
py-5
text-left
text-sm
font-semibold
text-gray-700
"

>

Price

</th>



<th

className="
px-6
py-5
text-left
text-sm
font-semibold
text-gray-700
"

>

Stock

</th>



<th

className="
px-6
py-5
text-center
text-sm
font-semibold
text-gray-700
"

>

Action

</th>


</tr>


</thead>





<tbody>


{


products

.filter((product)=>

product.name
?.toLowerCase()
.includes(
search.toLowerCase()
)

)


.map((product)=>(



<tr

key={product._id}

className="
border-b
border-gray-100
hover:bg-[#FFF9F0]
transition
"

style={{

transform:"translateX(0px) translateY(0px)"

}}

>



<td

className="
px-6
py-4
"

>


<img


src={
product.images?.[0] ||
"https://via.placeholder.com/100"
}


alt={product.name}


className="
w-18
h-15

rounded-xl
object-cover
"


style={{

transform:"translateX(20px) translateY(0px)"

}}


/>


</td>






<td

className="
px-6
py-4
font-medium
text-gray-800
"

>


{product.name}


</td>






<td

className="
px-6
py-4
"

>



<span

className={`

px-3

py-1

rounded-lg

text-sm

font-medium


${



product.category?.toLowerCase()
==="painting"


?

"bg-[#E8F0FF] text-blue-600"

:

product.category?.toLowerCase()
==="handloom"


?

"bg-[#FFF1D6] text-orange-700"

:

"bg-[#F5E6C8] text-[#A66A20]"

}

`}

>


{product.category}



</span>



</td>







<td

className="
px-6
py-4
font-semibold
text-gray-800
"

>

₹{product.price}

</td>







<td

className="
px-6
py-4
"

>


<span

className="
px-3
py-1
rounded-lg
bg-[#F1F6EA]
text-[#556B2F]
font-semibold
text-sm
"

>


{product.stock}


</span>


</td>


<td

className="
px-6
py-4
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



<Link

to={`/admin-v2/products/edit/${product._id}`}

className="
px-4
py-2
rounded-xl
border
border-gray-200
bg-white
text-gray-700
font-semibold
hover:bg-[#FFF7E8]
duration-300
flex
items-center
gap-2
"

style={{
paddingLeft:"20px",
 paddingRight:"20px",
transform:"translateX(0px) translateY(0px)"

}}

>

✎ Edit

</Link>





<button


onClick={()=>deleteProduct(product._id)}


className="
px-4
py-2
rounded-xl
bg-red-500
text-white
font-semibold
hover:bg-red-600
duration-300
"


style={{
paddingLeft:"20px",
 paddingRight:"20px",

transform:"translateX(40px) translateY(0px)"

}}


>

🗑 Delete

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
px-6
py-5
border-t
border-gray-100
"

style={{

transform:"translateX(20px) translateY(0px) scale(0.8)"

}}

>


<p

className="
text-sm
text-gray-500
"

>

Showing 1 to {products.length} products

</p>





<div

className="
flex
gap-2
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

>

‹

</button>




<button

className="
w-10
h-10
rounded-xl
bg-[#C58B45]
text-white
font-semibold
"

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
text-gray-700
"

>

2

</button>




<button

className="
w-10
h-10
rounded-xl
border
border-gray-200
bg-white
text-gray-700
"

>

3

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


