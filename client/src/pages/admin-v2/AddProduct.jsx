import api from "../../services/api";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";

export default function AddProduct() {

const [categories, setCategories] = useState([]);

const [images, setImages] = useState([]);

const [preview, setPreview] = useState([]);

const [product, setProduct] = useState({

name: "",
category: "",
price: "",
stock: "",
description: ""

});

useEffect(() => {

getCategories();

}, []);

const getCategories = async () => {

try {

const res = await api.get("/categories");

setCategories(res.data.categories || []);

}
catch (error) {

console.log(error);

}

};

const handleChange = (e) => {

setProduct({

...product,

[e.target.name]: e.target.value

});

};

const handleImage = (e) => {

const files = Array.from(e.target.files);

if (images.length + files.length > 5) {

toast.error("Maximum 5 images allowed");

return;

}

setImages((prev) => [

...prev,

...files

]);

const newPreview = files.map((file) =>
URL.createObjectURL(file)
);

setPreview((prev) => [

...prev,

...newPreview

]);

};

const handleSubmit = async (e) => {

e.preventDefault();

try {

const formData = new FormData();

formData.append("name", product.name);

formData.append("description", product.description);

formData.append("price", product.price || 0);

formData.append("category", product.category);

formData.append("stock", product.stock || 0);

images.forEach((image) => {

formData.append("images", image);

});

const res = await api.post(

"/products",

formData,

{

headers: {

"Content-Type": "multipart/form-data"

}

}

);

toast.success(res.data.message);

setProduct({

name: "",
category: "",
price: "",
stock: "",
description: ""

});

setImages([]);

setPreview([]);

}
catch (error) {

toast.error(

error.response?.data?.message ||

"Product add failed"

);

}

};

return (

<div
className="min-h-[120vh] bg-[#F7F8FC] px-8 py-8 overflow-y-auto"
style={{
transform:"translateX(0px) translateY(20px)"
}}
>

<div
className="max-w-7xl mx-auto"
style={{
transform: "translateX(0px) translateY(0px)"
}}
>

<button
type="button"
onClick={() => window.history.back()}
className="flex items-center gap-2 text-[#6B8E4E] font-semibold hover:text-[#4E6838] transition-all mb-6"
style={{
transform: "translateX(20px) translateY(0px)"
}}
>
← Back
</button>

<h1
className="text-[40px] font-bold text-[#1F2937]"
style={{
transform: "translateX(-155px) translateY(1px) scale(0.7)"
}}
>
Add Product
</h1>

<p
className="text-gray-500 mt-2 mb-8"
style={{
transform: "translateX(30px) translateY(0px)"
}}
>
Add a new handmade product to your store
</p>

<div
className="
bg-white
rounded-[28px]
border
border-gray-200
shadow-sm
p-10
min-h-[1050px]
"
style={{
transform:"translateX(0px) translateY(0px)"
}}
>

<form onSubmit={handleSubmit}>

<div
className="grid grid-cols-1 lg:grid-cols-2 gap-8"
style={{
transform: "translateX(0px) translateY(0px)"
}}
>


{/* Product Name */}

<div
style={{
transform: "translateX(20px) translateY(20px)"
}}
>

<label
className="block text-sm font-semibold text-gray-700 mb-2"
style={{
transform: "translateX(10px) translateY(-10px)"
}}
>
Product Name
</label>

<input
type="text"
name="name"
value={product.name}
onChange={handleChange}

placeholder="Enter product name"
shift

required

className="w-full h-14 rounded-2xl border border-gray-200 bg-white px-20 text-gray-700 outline-none focus:border-[#6B8E4E] focus:ring-2 focus:ring-[#6B8E4E]/20 transition-all"
style={{
  paddingLeft:"30px",
  transform:"translateX(0px) translateY(0px)"
}}
/>

</div>



{/* Category */}

<div
style={{
transform: "translateX(-6px) translateY(20px)"
}}
>

<label
className="block text-sm font-semibold text-gray-700 mb-2"
style={{
transform: "translateX(11px) translateY(-10px)"
}}
>
Category
</label>

<select
name="category"
value={product.category}
onChange={handleChange}
required
className="w-full h-14 rounded-2xl border border-gray-200 bg-white px-5 text-gray-700 outline-none focus:border-[#6B8E4E] focus:ring-2 focus:ring-[#6B8E4E]/20 transition-all"
style={{
  paddingLeft:"30px",
  transform:"translateX(0px) translateY(0px)"
}}
>

<option value="">
Select Category
</option>

{

categories.map((cat)=>(


<option
key={cat._id}
value={cat.name}
>

{cat.name}

</option>

))

}

</select>

</div>



{/* Price */}

<div
style={{
transform: "translateX(20px) translateY(0px)"
}}
>

<label
className="block text-sm font-semibold text-gray-700 mb-2"
style={{
transform: "translateX(11px) translateY(0px)"
}}
>
Price
</label>

<input
type="number"
name="price"
value={product.price}
onChange={handleChange}
placeholder="0"
required
className="w-full h-14 rounded-2xl border border-gray-200 bg-white px-5 text-gray-700 outline-none focus:border-[#6B8E4E] focus:ring-2 focus:ring-[#6B8E4E]/20 transition-all"
style={{
  paddingLeft:"30px",
  transform:"translateX(0px) translateY(0px)"
}}
/>

</div>



{/* Stock */}

<div
style={{
transform: "translateX(-5px) translateY(0px)"
}}
>

<label
className="block text-sm font-semibold text-gray-700 mb-2"
style={{
transform: "translateX(11px) translateY(-5px)"
}}
>
Stock
</label>

<input
type="number"
name="stock"
value={product.stock}
onChange={handleChange}
placeholder="Available quantity"
required
className="w-full h-14 rounded-2xl border border-gray-200 bg-white px-5 text-gray-700 outline-none focus:border-[#6B8E4E] focus:ring-2 focus:ring-[#6B8E4E]/20 transition-all"
style={{
  paddingLeft:"30px",
  transform:"translateX(0px) translateY(0px)"
}}
/>

</div>



</div>
{/* ================= Upload Images ================= */}

<div
className="lg:col-span-2"
style={{
transform: "translateX(0px) translateY(10px) scale(0.97)"
}}
>

<label
className="block text-sm font-semibold text-gray-700 mb-3"
style={{
transform: "translateX(20px) translateY(-10px)"
}}
>
Upload Images
</label>

<label
htmlFor="productImages"
className="relative flex flex-col items-center justify-center w-full h-[280px] rounded-3xl border-2 border-dashed border-[#D8E3CC] bg-[#FAFCF7] cursor-pointer hover:border-[#7A9B52] hover:bg-[#F5F9EF] transition-all"
style={{
transform: "translateX(0px) translateY(0px)"
}}
>

<div
className="w-20 h-20 rounded-full bg-[#EEF6E7] flex items-center justify-center mb-5 text-4xl"
style={{
transform: "translateX(0px) translateY(0px)"
}}
>
📷
</div>

<h3
className="text-xl font-semibold text-gray-700"
style={{
transform: "translateX(0px) translateY(0px)"
}}
>
Drag & Drop Images
</h3>

<p
className="text-gray-500 mt-2"
style={{
transform: "translateX(0px) translateY(0px)"
}}
>
or click to browse your computer
</p>

<p
className="text-sm text-gray-400 mt-4"
style={{
transform: "translateX(0px) translateY(0px)"
}}
>
PNG, JPG, JPEG • Maximum 5 Images
</p>

<input
id="productImages"
type="file"
multiple
accept="image/*"
onChange={handleImage}
className="hidden"
/>

</label>





{

preview.length > 0 && (

<div
className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mt-8"
style={{
transform: "translateX(10px) translateY(10px)"
}}
>

{

preview.map((img,index)=>(

<div

key={index}

className="relative"

style={{
transform:"translateX(0px) translateY(0px)"
}}
>

<img

src={img}

alt="preview"

className="w-full h-36 rounded-2xl object-cover border border-black-700 shadow-sm "

style={{
transform:"translateX(0px) translateY(0px)"
}}

/>

<div

className="absolute top-5 right-3 bg-[#6B8E4E] text-white text-x5 px-5 py-5 w-5 rounded-full"

style={{
  paddingLeft:"6px",
  transform:"translateX(0px) translateY(0px)"
}}
>

{index+1}

</div>

</div>

))

}

</div>

)

}
</div>

{/* ================= DESCRIPTION ================= */}

<div
className="mt-10"
style={{
transform: "translateX(0px) translateY(0px)"
}}
>

<label
className="block text-sm font-semibold text-gray-700 mb-3"
style={{
transform: "translateX(80px) translateY(8px)"
}}
>
Description
</label>

<textarea

name="description"

value={product.description}

onChange={handleChange}

rows={6}

placeholder="Write product description..."

className="w-full rounded-3xl border border-gray-100 bg-white p- resize-none outline-none focus:border-[#6B8E4E] focus:ring-2 focus:ring-[#6B8E4E]/20 transition-all"

style={{
  paddingLeft:"50px",
paddingTop:"80px",
paddingBottom:"-10px",
  transform:"translateX(4px) translateY(15px) scale(0.97)"
}}

/>

</div>





{/* ================= PRODUCT SUMMARY ================= */}

<div

className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10"

style={{
transform:"translateX(30px) translateY(20px)"
}}
>

<div

className="bg-[#FCFBF7] rounded-3xl border border-[#E7EEDC] p-6"

style={{
transform:"translateX(0px) translateY(0px)"
}}
>

<p
className="text-sm text-gray-500"
style={{
transform:"translateX(30px) translateY(15px)"
}}
>
Product Name
</p>

<h3
className="text-lg font-bold text-[#2F3A2D] mt-2 break-words"
style={{
transform:"translateX(130px) translateY(-5px) scale(0.75)"
}}
>

{product.name || "Not Entered"}

</h3>

</div>





<div

className="bg-[#FCFBF7] rounded-3xl border border-[#E7EEDC] p-6"

style={{
transform:"translateX(0px) translateY(0px)"
}}
>

<p
className="text-sm text-gray-500"
style={{
transform:"translateX(20px) translateY(18px)"
}}
>
Selected Category
</p>

<h3
className="text-lg font-bold text-[#2F3A2D] mt-2"
style={{
transform:"translateX(130px) translateY(-5px) scale(0.75)"
}}
>

{product.category || "No Category"}

</h3>

</div>





<div

className="bg-[#FCFBF7] rounded-3xl border border-[#E7EEDC] p-6"

style={{
transform:"translateX(0px) translateY(0px)"
}}
>

<p
className="text-sm text-gray-500"
style={{
transform:"translateX(20px) translateY(10px)"
}}
>
Images Selected
</p>

<h3
className="text-lg font-bold text-[#2F3A2D] mt-2"
style={{
transform:"translateX(180px) translateY(-10px)"
}}
>

{images.length} / 5

</h3>

<div
className="w-full h-2 rounded-full bg-[#E6ECD9] mt-4 overflow-hidden"
style={{
transform:"translateX(-10px) translateY(10px) scale(0.8)"
}}
>

<div

className="h-full bg-[#6B8E4E] rounded-full transition-all duration-500"

style={{
width:`${(images.length/5)*100}%`,
transform:"translateX(0px) translateY(0px)"
}}
>

</div>

</div>

</div>

</div>

{/* ================= ACTION BUTTONS ================= */}

<div
className="flex flex-col md:flex-row items-center justify-between gap-5 mt-10"
style={{
transform:"translateX(0px) translateY(20px)"
}}
>

<div
className="text-sm text-gray-500"
style={{
transform:"translateX(30px) translateY(0px)"
}}
>
Fill all required fields before saving the product.
</div>

<div
className="flex items-center gap-4"
style={{
transform:"translateX(0px) translateY(0px)"
}}
>

<button

type="button"

onClick={()=>{
setProduct({
name:"",
category:"",
price:"",
stock:"",
description:""
});
setImages([]);
setPreview([]);
}}

className="px-10 h-10 rounded-2xl border border-gray-300 bg-white text-gray-700 font-semibold hover:bg-gray-100 transition-all"

style={{
  paddingLeft:"30px",
  paddingRight:"30px",
transform:"translateX(-30px) translateY(30px) scale(0.99)"
}}
>

Reset

</button>

<button

type="submit"

className="px-10 h-12 rounded-2xl bg-[#6B8E4E] text-white font-semibold shadow-lg hover:bg-[#58763F] transition-all"

style={{
paddingLeft:"30px",
  paddingRight:"30px",
transform:"translateX(0px) translateY(30px) scale(0.8)"
}}
>

Save Product

</button>

</div>

</div>
{/* ================= FOOTER ================= */}

<div
className="border-t border-gray-200 mt-10 pt-6"
style={{
transform:"translateX(0px) translateY(70px)"
}}
>

<div
className="flex flex-col lg:flex-row items-center justify-between gap-4"
style={{
transform:"translateX(0px) translateY(0px)"
}}
>

<div
style={{
transform:"translateX(20px) translateY(40px)"
}}
>

<h3
className="text-lg font-semibold text-[#2F3A2D]"
style={{
transform:"translateX(10px) translateY(0px)"
}}
>
Ready to Publish
</h3>

<p
className="text-sm text-gray-500 mt-1"
style={{
transform:"translateX(10px) translateY(0px)"
}}
>
Verify product details before saving.
</p>

</div>

<div
className="flex items-center gap-3"
style={{
transform:"translateX(-50px) translateY(30px)"
}}
>

<div
className="px-4 py-2 rounded-xl bg-[#EEF6E7] text-[#6B8E4E] font-semibold"
style={{
 paddingLeft:"30px",
 paddingRight:"30px",
transform:"translateX(0px) translateY(0px)"
}}
>
{images.length} Images
</div>

<div
className="px-4 py-2 rounded-xl bg-[#E8D4A8] text-gray-700 font-semibold"
style={{
 paddingLeft:"30px",
 paddingRight:"30px",
transform:"translateX(0px) translateY(0px)"
}}
>
{product.stock || 0} Stock
</div>

</div>

</div>

</div>

</form>

</div>

</div>

</div>

);

}