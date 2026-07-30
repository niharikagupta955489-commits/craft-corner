import { useState, useEffect, useRef } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";


const categoriesList = [
  "Pottery",
  "Handloom",
  "Jewellery",
  "Wood Craft",
  "Paintings",
  "Gifts",
  "Decor",
  "Baskets"
];


export default function HomeSettings(){


const [banner,setBanner] = useState("");
const [bannerPreview,setBannerPreview] = useState("");

const bannerRef = useRef("");



const [categories,setCategories] = useState(

categoriesList.map(name=>({

name:name,
image:"",
preview:""

}))

);




useEffect(()=>{

fetchHome();

},[]);





const fetchHome = async()=>{

try{

const res = await api.get("/home");


if(res.data){


setBanner(res.data.bannerImage || "");

setBannerPreview(res.data.bannerImage || "");

bannerRef.current = res.data.bannerImage || "";



if(res.data.categories){

setCategories(

res.data.categories.map(item=>({

name:item.name,

image:item.image,

preview:item.image

}))

);

}

}


}

catch(err){

console.log(err);

}

};







const uploadImage = async(file)=>{


const formData = new FormData();

formData.append("image",file);



const res = await api.post(

"/upload",

formData,

{

headers:{

"Content-Type":"multipart/form-data"

}

}

);



console.log("UPLOAD RESPONSE:",res.data);



return res.data.url;


};








const bannerChange = async(e)=>{


const file = e.target.files[0];


if(!file) return;



setBannerPreview(
URL.createObjectURL(file)
);



try{


const url = await uploadImage(file);



bannerRef.current = url;


setBanner(url);

setBannerPreview(url);



toast.success(
"Banner uploaded"
);



}

catch(err){

console.log(err);

toast.error(
"Image upload failed"
);

}


};









const categoryChange = async(index,e)=>{


const file = e.target.files[0];


if(!file) return;



let update=[...categories];


update[index].preview =
URL.createObjectURL(file);


setCategories(update);



try{


const url = await uploadImage(file);



update[index].image = url;

update[index].preview = url;


setCategories([...update]);



toast.success(
"Category uploaded"
);


}

catch(err){

console.log(err);

toast.error(
"Image upload failed"
);

}


};









const saveChanges = async()=>{


const data = {


bannerImage:
bannerRef.current || banner,


categories:

categories.map(item=>({

name:item.name,

image:item.image

}))


};



console.log(
"SENDING DATA:",
data
);



try{


const res = await api.put(

"/home",

data

);



console.log(
"SAVE RESPONSE:",
res.data
);



toast.success(
"Home settings saved"
);


}


catch(err){


console.log(err);


toast.error(
"Save failed"
);


}


};








return(


<div className="
bg-[#FAF7F0]
min-h-screen
p-14
">



<button

onClick={()=>window.history.back()}

className="
bg-[#35451F]
text-white
px-7
py-3
rounded-xl
mb-8
font-semibold
"

>

← Back

</button>




<h1 className="
text-3xl
font-bold
text-[#35451F]
mb-10
">

Home Page Settings

</h1>






<div className="
bg-white
rounded-2xl
p-8
shadow-lg
mb-12
">


<h2 className="
text-2xl
font-bold
mb-6
">

Hero Banner

</h2>




<label className="
h-52
rounded-3xl
border-2
border-dashed
border-[#556B2F]
flex
items-center
justify-center
cursor-pointer
">


<input

type="file"

className="hidden"

onChange={bannerChange}

/>


<span className="
font-semibold
text-[#556B2F]
">

Upload Banner Image

</span>


</label>




{

bannerPreview &&

<img

src={bannerPreview}

className="
mt-8
w-full
h-72
object-cover
rounded-3xl
"

/>

}


</div>







<h2 className="
text-3xl
font-bold
mb-8
">

Category Images

</h2>






<div className="
grid
grid-cols-3
gap-10
px-5
">



{

categories.map((cat,index)=>(


<div

key={cat.name}

className="
bg-white
rounded-3xl
p-6
shadow-lg
"


>


<h3 className="
text-xl
font-bold
mb-5
">

{cat.name}

</h3>




{

cat.preview &&

<img

src={cat.preview}

className="
w-full
h-44
object-cover
rounded-2xl
mb-5
"

/>

}





<label className="
bg-[#556B2F]
text-white
py-3
rounded-xl
block
text-center
cursor-pointer
font-semibold
">

Upload Image


<input

type="file"

className="hidden"

onChange={(e)=>categoryChange(index,e)}

/>


</label>




</div>


))


}


</div>






<button

onClick={saveChanges}

className="
mt-20
bg-[#35451F]
text-white
px-14
py-4
rounded-2xl
font-bold
"

>

Save Changes

</button>






</div>


);


}