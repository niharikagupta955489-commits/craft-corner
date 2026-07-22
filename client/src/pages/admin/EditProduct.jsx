import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import toast from "react-hot-toast";


export default function EditProduct(){

const {id}=useParams();
const navigate=useNavigate();


const [newImages,setNewImages]=useState([]);


const [product,setProduct]=useState({

name:"",
category:"",
price:"",
stock:"",
description:"",
images:[]

});



useEffect(()=>{

fetchProduct();

},[]);




const fetchProduct=async()=>{

try{

const res=await api.get(`/products/${id}`);


const data=res.data.product;


setProduct({

name:data.name,

category:data.category,

price:data.price,

stock:data.stock,

description:data.description,

images:data.images || []

});


}
catch(error){

toast.error("Product not found");

}

};






const handleChange=(e)=>{

setProduct({

...product,

[e.target.name]:e.target.value

});

};






const handleImage=(e)=>{

setNewImages(e.target.files);

};







const handleSubmit=async(e)=>{

e.preventDefault();


try{


const formData=new FormData();


formData.append(
"name",
product.name
);


formData.append(
"category",
product.category
);


formData.append(
"price",
Number(product.price)
);


formData.append(
"stock",
Number(product.stock)
);


formData.append(
"description",
product.description
);




Array.from(newImages).forEach((img)=>{

formData.append(
"images",
img
);

});




await api.put(

`/products/${id}`,

formData,

{

headers:{

"Content-Type":"multipart/form-data"

}

}

);



toast.success(
"Product Updated Successfully"
);


navigate("/admin/products");



}
catch(error){

toast.error(

error.response?.data?.message ||

"Update failed"

);

}


};







return(


<div className="min-h-screen bg-[#F6F7FB] p-8">


<div className="bg-white rounded-3xl shadow-lg p-10 max-w-5xl">


<h1 className="text-4xl font-bold mb-8">

Edit Product

</h1>



<form onSubmit={handleSubmit}>


<div className="grid md:grid-cols-2 gap-6">



<div>

<label className="block mb-2 font-semibold">
Product Name
</label>

<input

name="name"

value={product.name}

onChange={handleChange}

className="w-full border rounded-xl px-4 py-3"

/>

</div>





<div>

<label className="block mb-2 font-semibold">
Category
</label>


<select

name="category"

value={product.category}

onChange={handleChange}

className="w-full border rounded-xl px-4 py-3"

>


<option>Pottery</option>

<option>Wood Craft</option>

<option>Painting</option>

<option>Jewellery</option>

<option>Home Decor</option>

<option>Handloom</option>


</select>


</div>







<div>

<label className="block mb-2 font-semibold">
Price
</label>


<input

type="number"

name="price"

value={product.price}

onChange={handleChange}

className="w-full border rounded-xl px-4 py-3"

/>

</div>






<div>

<label className="block mb-2 font-semibold">
Stock
</label>


<input

type="number"

name="stock"

value={product.stock}

onChange={handleChange}

className="w-full border rounded-xl px-4 py-3"

/>


</div>




<div className="md:col-span-2">


<label className="block mb-2 font-semibold">

Current Images

</label>


<div className="flex gap-4">


{

product.images.map((img,index)=>(

<img

key={index}

src={img}

className="w-24 h-24 object-cover rounded"

/>

))

}


</div>


</div>







<div className="md:col-span-2">


<label className="block mb-2 font-semibold">

Upload New Images

</label>


<input

type="file"

multiple

accept="image/*"

onChange={handleImage}

className="w-full border rounded-xl px-4 py-3"

/>


</div>




</div>







<div className="mt-6">


<label className="block mb-2 font-semibold">

Description

</label>


<textarea

name="description"

value={product.description}

onChange={handleChange}

rows="5"

className="w-full border rounded-xl px-4 py-3"

/>


</div>







<button

className="mt-8 bg-[#556B2F] text-white px-10 py-3 rounded-xl"

>

Update Product

</button>




</form>



</div>


</div>


)

}