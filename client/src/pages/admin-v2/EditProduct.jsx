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

const files=Array.from(e.target.files);

setNewImages(files);

};


const handleSubmit=async(e)=>{

e.preventDefault();


// tumhara existing update code yaha rahega

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
transform:"translateX(0px) translateY(0px)"
}}

>


<button

type="button"

onClick={()=>navigate(-1)}

className="
flex
items-center
gap-2
text-[#556B2F]
font-semibold
mb-6
hover:text-[#3F5223]
transition
"

style={{
transform:"translateX(10px) translateY(5px)"
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
transform:"translateX(-180px) translateY(0px) scale(0.7)"
}}

>

Edit Product

</h1>



<p

className="
text-gray-500
mt-3
mb-8
text-lg
"

style={{
transform:"translateX(10px) translateY(-10px)"
}}

>

Update your product details and manage inventory.

</p>





<div

className="
bg-white
rounded-[30px]
border
border-gray-200
shadow-lg
p-10
min-h-[900px]
"

style={{
transform:"translateX(0px) translateY(0px)"
}}

>


<form onSubmit={handleSubmit}>


<div

className="
grid
md:grid-cols-2
gap-8
"

style={{
transform:"translateX(-7px) translateY(0px) scale(0.97)"
}}

>


{/* ================= PRODUCT NAME ================= */}


<div

style={{
transform:"translateX(0px) translateY(0px)"
}}

>

<label

className="
block
text-sm
font-semibold
text-gray-700
mb-3
"

style={{
transform:"translateX(10px) translateY(-5px)"
}}

>

Product Name

</label>


<input

name="name"

value={product.name}

onChange={handleChange}

placeholder="Enter product name"

className="
w-full
h-14
rounded-2xl
border
border-gray-200
bg-white
pl-[25px]
text-gray-700
outline-none
focus:border-[#556B2F]
focus:ring-2
focus:ring-[#556B2F]/20
transition-all
"

style={{
 paddingLeft:"30px",
 paddingRight:"30px",
transform:"translateX(0px) translateY(0px)"
}}

/>

</div>





{/* ================= CATEGORY ================= */}


<div

style={{
transform:"translateX(0px) translateY(0px)"
}}

>

<label

className="
block
text-sm
font-semibold
text-gray-700
mb-3
"

style={{
transform:"translateX(15px) translateY(-5px)"
}}

>

Category

</label>



<select

name="category"

value={product.category}

onChange={handleChange}

className="
w-full
h-14
rounded-2xl
border
border-gray-200
bg-white
pl-[25px]
text-gray-700
outline-none
focus:border-[#556BF2]
transition-all
"

style={{
 paddingLeft:"30px",
 paddingRight:"30px",
transform:"translateX(0px) translateY(0px)"
}}

>


<option value="">

Select Category

</option>


<option>
Pottery
</option>


<option>
Wood Craft
</option>


<option>
Painting
</option>


<option>
Jewellery
</option>


<option>
Home Decor
</option>


<option>
Handloom
</option>


</select>


</div>





{/* ================= PRICE ================= */}


<div

style={{
transform:"translateX(0px) translateY(0px)"
}}

>


<label

className="
block
text-sm
font-semibold
text-gray-700
mb-3
"

style={{
transform:"translateX(10px) translateY(-5px)"
}}

>

Price

</label>



<input

type="number"

name="price"

value={product.price}

onChange={handleChange}

placeholder="Enter price"

className="
w-full
h-14
rounded-2xl
border
border-gray-200
bg-white
pl-[25px]
text-gray-700
outline-none
focus:border-[#556B2F]
focus:ring-2
focus:ring-[#556B2F]/20
transition-all
"

style={{
 paddingLeft:"30px",
 paddingRight:"30px",
transform:"translateX(0px) translateY(0px)"
}}

/>


</div>





{/* ================= STOCK ================= */}


<div

style={{
transform:"translateX(0px) translateY(0px)"
}}

>


<label

className="
block
text-sm
font-semibold
text-gray-700
mb-3
"

style={{
transform:"translateX(15px) translateY(-5px)"
}}

>

Stock

</label>



<input

type="number"

name="stock"

value={product.stock}

onChange={handleChange}

placeholder="Available stock"

className="
w-full
h-14
rounded-2xl
border
border-gray-200
bg-white
pl-[25px]
text-gray-700
outline-none
focus:border-[#556B2F]
focus:ring-2
focus:ring-[#556B2F]/20
transition-all
"

style={{
 paddingLeft:"30px",
 paddingRight:"30px",
transform:"translateX(0px) translateY(0px)"
}}

/>


</div>


{/* ================= CURRENT IMAGES ================= */}


<div

className="
md:col-span-2
mt-2
"

style={{
transform:"translateX(10px) translateY(0px)"
}}

>


<label

className="
block
text-sm
font-semibold
text-gray-700
mb-4
"

style={{
transform:"translateX(0px) translateY(0px)"
}}

>

Current Images

</label>



<div

className="
flex
flex-wrap
gap-5
"

style={{
transform:"translateX(0px) translateY(0px)"
}}

>


{

product.images.map((img,index)=>(


<div

key={index}

className="
relative
"

style={{
transform:"translateX(0px) translateY(0px)"
}}

>


<img

src={img}

alt="product"

className="
w-28
h-28
rounded-2xl
object-cover
border
border-gray-200
shadow-sm
"

style={{
transform:"translateX(0px) translateY(0px)"
}}

/>



<div

className="
absolute
top-2
right-2
bg-[#556B2F]
text-white
text-xs
px-2
py-1
rounded-full
"

style={{
transform:"translateX(0px) translateY(0px)"
}}

>

{index+1}

</div>


</div>


))

}


</div>


</div>







{/* ================= UPLOAD NEW IMAGES ================= */}


<div

className="
md:col-span-2
mt-5
"

style={{
transform:"translateX(0px) translateY(0px)"
}}

>


<label

className="
block
text-sm
font-semibold
text-gray-700
mb-3
"

style={{
transform:"translateX(0px) translateY(0px)"
}}

>

Upload New Images

</label>




<label

htmlFor="newImages"

className="
w-full
h-[260px]
rounded-3xl
border-2
border-dashed
border-[#D8E3CC]
bg-white
flex
flex-col
items-center
justify-center
cursor-pointer
hover:border-[#556B2F]
transition-all
"

style={{
transform:"translateX(0px) translateY(0px)"
}}

>



<div

className="
w-20
h-20
rounded-full
bg-[#EEF5E5]
flex
items-center
justify-center
text-4xl
mb-4
"

style={{
transform:"translateX(0px) translateY(0px)"
}}

>

📷

</div>



<h3

className="
text-xl
font-semibold
text-gray-700
"

style={{
transform:"translateX(0px) translateY(0px)"
}}

>

Drag & Drop Images

</h3>



<p

className="
text-gray-500
mt-2
"

style={{
transform:"translateX(0px) translateY(0px)"
}}

>

or click to browse

</p>



<p

className="
text-sm
text-gray-400
mt-3
"

style={{
transform:"translateX(0px) translateY(0px)"
}}

>

PNG, JPG, JPEG • Maximum 5 Images

</p>



<input

id="newImages"

type="file"

multiple

accept="image/*"

onChange={handleImage}

className="hidden"

/>



</label>


</div>


{/* ================= DESCRIPTION ================= */}


<div

className="
md:col-span-2
mt-8
"

style={{
transform:"translateX(0px) translateY(0px)"
}}

>


<label

className="
block
text-sm
font-semibold
text-gray-700
mb-3
"

style={{
transform:"translateX(0px) translateY(0px)"
}}

>

Description

</label>



<textarea

name="description"

value={product.description}

onChange={handleChange}

rows="6"

placeholder="Write product description..."

className="
w-full
rounded-3xl
border
border-gray-200
bg-white
p-5
text-gray-700
outline-none
resize-none
focus:border-[#556B2F]
focus:ring-2
focus:ring-[#556B2F]/20
transition-all
"

style={{
 paddingLeft:"50px",
 paddingRight:"50px",
 paddingTop:"30px",
 paddingBottom:"30px",
transform:"translateX(0px) translateY(0px)"
}}

/>


</div>





{/* ================= PRODUCT SUMMARY ================= */}


<div

className="
md:col-span-2
grid
grid-cols-1
md:grid-cols-3
gap-6
mt-8
"

style={{
transform:"translateX(0px) translateY(0px)"
}}

>


<div

className="
bg-[#F8FAF5]
rounded-3xl
border
border-[#E7EEDC]
p-6
"

style={{
transform:"translateX(10px) translateY(0px)"
}}

>

<p

className="
text-sm
text-gray-500
"

style={{
transform:"translateX(20px) translateY(8px)"
}}

>

Product Name

</p>


<h3

className="
text-lg
font-bold
text-gray-800
mt-2
"

style={{
transform:"translateX(150px) translateY(-15px)"
}}

>

{product.name || "Not Entered"}

</h3>


</div>





<div

className="
bg-[#F8FAF5]
rounded-3xl
border
border-[#E7EEDC]
p-6
"

style={{
transform:"translateX(0px) translateY(0px)"
}}

>

<p

className="
text-sm
text-gray-500
"

style={{
transform:"translateX(20px) translateY(8px)"
}}


>

Category

</p>


<h3

className="
text-lg
font-bold
text-gray-800
mt-2
"

style={{
transform:"translateX(150px) translateY(-15px)"
}}

>

{product.category || "No Category"}

</h3>


</div>





<div

className="
bg-[#F8FAF5]
rounded-3xl
border
border-[#E7EEDC]
p-6
"

style={{
transform:"translateX(0px) translateY(0px)"
}}

>

<p

className="
text-sm
text-gray-500
"

style={{
transform:"translateX(20px) translateY(8px)"
}}


>

Stock Available

</p>


<h3

className="
text-lg
font-bold
text-gray-800
mt-2
"

style={{
transform:"translateX(150px) translateY(-15px)"
}}

>

{product.stock || 0}

</h3>


</div>


</div>


{/* ================= UPDATE BUTTON ================= */}


<div

className="
md:col-span-2
flex
justify-end
mt-10
"

style={{
transform:"translateX(-20px) translateY(-10px)"
}}

>


<button

type="submit"

className="
px-5
h-10
rounded-2xl
bg-[#C49A4A]
text-white
font-semibold
shadow-lg
hover:bg-[#465927]
transition-all
"

style={{
 paddingLeft:"30px",
 paddingRight:"30px",
transform:"translateX(0px) translateY(0px)"
}}

>

Update Product

</button>


</div>



</div>


</form>


</div>


</div>


</div>


);

}