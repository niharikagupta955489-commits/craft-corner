import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import toast from "react-hot-toast";


export default function Products(){


const [products,setProducts] = useState([]);



const fetchProducts = async()=>{

try{

const res = await api.get("/products");

setProducts(res.data.products || []);

}
catch(error){

toast.error("Products load failed");

}

};



useEffect(()=>{

fetchProducts();

},[]);





const deleteProduct = async(id)=>{

try{

await api.delete(`/products/${id}`);

toast.success("Product deleted");

fetchProducts();

}

catch(error){

toast.error("Delete failed");

}

};





return(

<div

className="min-h-screen bg-[#F6F7FB]"

style={{
padding:"30px"
}}

>



<div className="
flex
justify-between
items-center
mb-8
">


<h1 className="
text-4xl
font-bold
text-[#1F2937]
">

Products

</h1>



<Link

to="/admin/add-product"

className="
bg-[#556B2F]
text-white
px-6
py-3
rounded-xl
"

>

Add Product

</Link>


</div>






<div className="
bg-white
rounded-2xl
shadow-lg
p-6
overflow-hidden
">





<table className="
w-full
table-fixed
border-collapse
">





<thead>


<tr className="
bg-[#111827]
text-white
">



<th className="
p-4
text-left
w-[12%]
">
Image
</th>




<th className="
p-4
text-left
w-[35%]
">
Name
</th>




<th className="
p-4
text-left
w-[18%]
">
Category
</th>




<th className="
p-4
text-left
w-[12%]
">
Price
</th>




<th className="
p-4
text-left
w-[10%]
">
Stock
</th>




<th className="
p-4
text-left
w-[13%]
">
Action
</th>



</tr>


</thead>






<tbody>


{

products.map((product)=>(


<tr

key={product._id}

className="
border-b
hover:bg-gray-50
"

>




<td className="
p-4
">


<img

src={
product.images?.[0] ||
"https://via.placeholder.com/100"
}

alt={product.name}

className="
w-20
h-20
object-cover
rounded-xl
"

/>


</td>






<td className="
p-4
text-lg
">

{product.name}

</td>







<td className="
p-4
text-lg
">

{product.category}

</td>







<td className="
p-4
text-lg
">

₹{product.price}

</td>






<td className="
p-4
text-lg
">

{product.stock}

</td>








<td className="
p-4
">

<div className="
flex
gap-3
">




<Link
to={`/admin-v2/products/edit/${product._id}`}

className="
bg-blue-500
text-white
px-4
py-2
rounded-lg
"

>

Edit

</Link>





<button

onClick={()=>deleteProduct(product._id)}

className="
bg-red-500
text-white
px-4
py-2
rounded-lg
"

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




</div>


)

}