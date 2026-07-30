import { useEffect, useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";


export default function Categories(){


const [categories,setCategories] = useState([]);

const [categoryName,setCategoryName] = useState("");



useEffect(()=>{

fetchCategories();

},[]);





const fetchCategories = async()=>{


try{


const res = await api.get("/categories");


setCategories(
res.data.categories
);


}


catch(error){


console.log(error);


}


};





const addCategory = async()=>{


if(!categoryName.trim()) return;



try{


const res = await api.post(

"/categories",

{
name:categoryName
}

);



toast.success(
res.data.message
);



setCategoryName("");

fetchCategories();



}


catch(error){


toast.error(

error.response?.data?.message ||

"Category add failed"

);


}


};





const deleteCategory = async(id)=>{


try{


await api.delete(

`/categories/${id}`

);



toast.success(
"Category Deleted"
);



fetchCategories();



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

transform:
"translateX(0px) translateY(0px)"

}}

>


<div

className="
max-w-7xl
mx-auto
"

style={{

transform:
"translateX(0px) translateY(0px)"

}}

>



<h1

className="
text-5xl
font-bold
text-[#111827]
"

style={{

transform:
"translateX(-170px) translateY(0px) scale(0.7)"

}}

>

Categories

</h1>



<p

className="
text-gray-500
mt-3
mb-8
text-lg
"

style={{

transform:
"translateX(-40px) translateY(-10px) scale(0.9)"

}}

>

Manage product categories for your store.

</p>





<div

className="
bg-white
rounded-[30px]
border
border-gray-200
shadow-lg
p-8
"

style={{

transform:
"translateX(0px) translateY(0px)"

}}

>


{/* ================= ADD CATEGORY ================= */}


<div

className="
bg-[#FAFAFA]
rounded-3xl
border
border-gray-200
p-6
mb-8
"

style={{

transform:
"translateX(0px) translateY(0px) "

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

transform:
"translateX(-150px) translateY(5px) scale(0.7)"

}}

>

Add New Category

</h2>




<div

className="
flex
flex-col
md:flex-row
gap-5
"

style={{

transform:
"translateX(0px) translateY(-1px)scale(1)"

}}

>


<input


type="text"


placeholder="Enter category name"


value={categoryName}


onChange={(e)=>

setCategoryName(
e.target.value
)

}


className="
flex-1
h-12
rounded-2xl
border
border-gray-200
bg-white
pl-[15px]
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
transform:"translateX(0px) translateY(10px) scale(1)"
}}


/>





<button


onClick={addCategory}


className="
h-14
px-10
rounded-2xl
bg-[#556B2F]
text-white
font-semibold
shadow-md
hover:bg-[#465927]
duration-300
"


style={{
 paddingLeft:"30px",
 paddingRight:"30px",
transform:"translateX(-30px) translateY(4px) scale(0.8)"
}}



>


Add Category


</button>



</div>


</div>


{/* ================= CATEGORY LIST ================= */}


<div

className="
bg-white
rounded-[30px]
border
border-gray-200
shadow-lg
overflow-hidden
"

style={{

transform:
"translateX(0px) translateY(80px)"

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

transform:
"translateX(-70px) translateY(0px) scale(0.85)"

}}

>


<h2

className="
text-2xl
font-bold
text-gray-800
"

style={{

transform:
"translateX(0px) translateY(0px)"

}}

>

Category List

</h2>



<p

className="
text-gray-500
mt-2
"

style={{

transform:
"translateX(0px) translateY(0px)"

}}

>

Total Categories : {categories.length}

</p>


</div>





<div

className="
p-8
space-y-5
"

style={{

transform:
"translateX(0px) translateY(0px)"

}}

>


{

categories.length===0

?

<div

className="
text-center
py-20
"

style={{

transform:
"translateX(0px) translateY(0px)"

}}

>


<h3

className="
text-2xl
font-bold
text-gray-700
"

style={{

transform:
"translateX(0px) translateY(0px)"

}}

>

No Categories Found

</h3>


<p

className="
text-gray-500
mt-2
"

style={{

transform:
"translateX(0px) translateY(0px)"

}}

>

Add your first category.

</p>


</div>


:


categories.map((cat,index)=>(


<div

key={cat._id}

className="
flex
items-center
justify-between
bg-[#FAFBFC]
border
border-gray-200
rounded-2xl
p-5
hover:shadow-md
duration-300
"

style={{

transform:
"translateX(0px) translateY(0px)"

}}

>


<div

className="
flex
items-center
gap-5
"

style={{

transform:
"translateX(0px) translateY(0px)"

}}

>


<div

className="
w-12
h-12
rounded-full
bg-[#E8D4A8]
flex
items-center
justify-center
font-bold
text-[#556B2F]
"

style={{

transform:
"translateX(20px) translateY(0px) scale(0.8)"

}}

>

{index+1}

</div>




<div

style={{

transform:
"translateX(0px) translateY(3px) scale(0.9)"

}}

>


<h3

className="
text-lg
font-semibold
text-gray-800
"

style={{

transform:
"translateX(0px) translateY(0px)"

}}

>

{cat.name}

</h3>


<p

className="
text-sm
text-gray-500
mt-1
"

style={{

transform:
"translateX(0px) translateY(0px)"

}}

>

Product Category

</p>


</div>


</div>







<button

onClick={()=>deleteCategory(cat._id)}

className="
px-6
py-3
rounded-xl
bg-red-500
text-white
font-semibold
hover:bg-red-600
duration-300
"

style={{
 paddingLeft:"30px",
 paddingRight:"30px",
transform:"translateX(-80px) translateY(0px) scale(0.8)"
}}

>

Delete

</button>


</div>


))

}

</div>


</div>


</div>

</div>


</div>

);

}
