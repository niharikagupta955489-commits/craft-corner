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

<div className="min-h-screen bg-[#F6F7FB] p-8">


<div className="flex justify-between items-center mb-8">

<h1 className="text-4xl font-bold text-[#1F2937]">
Products
</h1>


<Link 
to="/admin/add-product"
className="bg-[#556B2F] text-white px-6 py-3 rounded-xl"
>
Add Product
</Link>


</div>




<div className="bg-white rounded-2xl shadow p-6">


<table className="w-full">

<thead>

<tr className="bg-[#111827] text-white">

<th className="p-4 text-left">
Image
</th>

<th>
Name
</th>

<th>
Category
</th>

<th>
Price
</th>

<th>
Stock
</th>

<th>
Action
</th>


</tr>

</thead>



<tbody>


{
products.map((product)=>(


<tr 
key={product._id}
className="border-b"
>


<td className="p-4">

<img
src={product.image}
alt={product.name}
className="w-16 h-16 object-cover rounded"
/>

</td>


<td>
{product.name}
</td>


<td>
{product.category}
</td>


<td>
₹{product.price}
</td>


<td>
{product.stock}
</td>



<td className="flex gap-3 py-5">


<Link

to={`/admin/edit-product/${product._id}`}

className="bg-blue-500 text-white px-4 py-2 rounded"

>
Edit
</Link>



<button

onClick={()=>deleteProduct(product._id)}

className="bg-red-500 text-white px-4 py-2 rounded"

>
Delete
</button>



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