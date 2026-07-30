import api from "../../services/api";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";


export default function AddProduct(){


const [categories,setCategories]=useState([]);

const [images,setImages]=useState([]);

const [preview,setPreview]=useState([]);



const [product,setProduct]=useState({

name:"",
category:"",
price:"",
stock:"",
description:""

});



useEffect(()=>{

getCategories();

},[]);




const getCategories=async()=>{

try{

const res=await api.get("/categories");

setCategories(res.data.categories || []);

}
catch(error){

console.log(error);

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



if(images.length + files.length > 5){

toast.error("Maximum 5 images allowed");

return;

}



setImages((prev)=>[

...prev,

...files

]);




const newPreview=files.map((file)=>

URL.createObjectURL(file)

);



setPreview((prev)=>[

...prev,

...newPreview

]);


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
"description",
product.description
);



formData.append(
"price",
product.price || 0
);



formData.append(
"category",
product.category
);



formData.append(
"stock",
product.stock || 0
);





images.forEach((image)=>{

formData.append(
"images",
image
);

});






const res=await api.post(

"/products",

formData,

{

headers:{

"Content-Type":"multipart/form-data"

}

}

);




toast.success(res.data.message);




setProduct({

name:"",
category:"",
price:"",
stock:"",
description:""

});


setImages([]);

setPreview([]);



}

catch(error){


toast.error(

error.response?.data?.message ||

"Product add failed"

);


}


};







return(


<div className="min-h-screen bg-[#F6F7FB] flex items-center justify-center p-8">


<div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl p-12">



<h1 className="text-4xl font-bold text-center text-[#2F3A2D] mb-10">

Add Product

</h1>




<form onSubmit={handleSubmit}>


<div className="grid grid-cols-2 gap-10">



<div>

<label className="block text-center font-bold mb-3">

PRODUCT NAME

</label>


<input

name="name"

value={product.name}

onChange={handleChange}

className="w-full h-14 border rounded-xl px-5"

/>


</div>





<div>

<label className="block text-center font-bold mb-3">

CATEGORY

</label>


<select

name="category"

value={product.category}

onChange={handleChange}

className="w-full h-14 border rounded-xl px-5"

>


<option>Select Category</option>


{

categories.map(cat=>(

<option key={cat._id}>

{cat.name}

</option>

))

}


</select>


</div>





<div>

<label className="block text-center font-bold mb-3">

PRICE

</label>


<input

type="number"

name="price"

value={product.price}

onChange={handleChange}

required

className="w-full h-14 border rounded-xl px-5"

/>


</div>





<div>

<label className="block text-center font-bold mb-3">

STOCK

</label>


<input

name="stock"

value={product.stock}

onChange={handleChange}

className="w-full h-14 border rounded-xl px-5"

/>


</div>


</div>








<div className="mt-8">


<label className="block text-center font-bold mb-3">

UPLOAD IMAGES (MAX 5)

</label>



<input

type="file"

multiple

accept="image/*"

onChange={handleImage}

className="w-full h-14 border rounded-xl px-5"

/>






<div className="flex gap-4 mt-5 flex-wrap">


{

preview.map((img,index)=>(


<img

key={index}

src={img}

className="
w-24
h-24
rounded-xl
object-cover
border
"

/>


))

}



</div>


</div>








<div className="mt-8">


<label className="block text-center font-bold mb-3">

DESCRIPTION

</label>


<textarea

name="description"

value={product.description}

onChange={handleChange}

className="w-full h-40 border rounded-xl p-5"

/>


</div>







<button

className="block mx-auto mt-8 bg-[#556B2F] text-white px-12 py-3 rounded-xl"

>

Save Product

</button>




</form>



</div>


</div>


)

}