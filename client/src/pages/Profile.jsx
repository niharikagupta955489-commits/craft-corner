import { 
  useEffect, 
  useState, 
  useCallback 
} from "react";

import api from "../services/api";
import { useNavigate } from "react-router-dom";
import Cropper from "react-easy-crop";

import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaMapMarkerAlt
} from "react-icons/fa";



export default function Profile(){


const navigate = useNavigate();



const [user,setUser] = useState({

  name:"",
  email:"",
  phone:"",
  address:"",
  password:"",
  confirmPassword:"",
  avatar:""

});



const [imageSrc,setImageSrc] = useState(null);


const [crop,setCrop] = useState({

  x:0,
  y:0

});


const [zoom,setZoom] = useState(1);


const [croppedAreaPixels,setCroppedAreaPixels] = useState(null);


const [showCrop,setShowCrop] = useState(false);



const [loading,setLoading] = useState(false);






useEffect(()=>{

  getProfile();

},[]);







const getProfile = async()=>{


try{


const res = await api.get("/auth/profile");



setUser({

  name:res.data.user.name || "",

  email:res.data.user.email || "",

  phone:res.data.user.phone || "",

  address:res.data.user.address || "",

  password:"",

  confirmPassword:"",

  avatar:res.data.user.avatar || ""

});


}catch(error){

 console.log(error);

}


};








const handleChange=(e)=>{


setUser({

 ...user,

 [e.target.name]:e.target.value

});


};









const handleImageUpload=(e)=>{


const file = e.target.files[0];


if(!file) return;



const reader = new FileReader();



reader.onload = ()=>{


setImageSrc(reader.result);


setShowCrop(true);


};



reader.readAsDataURL(file);


};









const onCropComplete = useCallback(

(croppedArea,croppedAreaPixels)=>{


setCroppedAreaPixels(croppedAreaPixels);


},

[]
);









const uploadCroppedImage = async()=>{


try{


const canvas = document.createElement("canvas");


const image = new Image();


image.src = imageSrc;



image.onload = async()=>{



const canvasSize = 500;



canvas.width = canvasSize;

canvas.height = canvasSize;



const ctx = canvas.getContext("2d");



ctx.drawImage(

image,

croppedAreaPixels.x,

croppedAreaPixels.y,

croppedAreaPixels.width,

croppedAreaPixels.height,

0,

0,

canvasSize,

canvasSize

);




canvas.toBlob(async(blob)=>{


const formData = new FormData();


formData.append(

"avatar",

blob,

"profile.jpg"

);





const res = await api.put(

"/auth/profile/photo",

formData,

{

headers:{

"Content-Type":"multipart/form-data"

}

}

);





setUser({

...user,

avatar:res.data.avatar

});



setShowCrop(false);

setImageSrc(null);



alert(

"Profile photo updated"

);



});



};



}catch(error){


console.log(error);


alert(

"Photo upload failed"

);


}



};







const updateProfile = async()=>{


try{


setLoading(true);



await api.put(

"/auth/profile",

{

name:user.name,

email:user.email,

phone:user.phone,

address:user.address,

password:user.password

}

);



alert(

"Profile Updated Successfully"

);



}catch(error){


console.log(error);


}

finally{


setLoading(false);


}



};



return (


<div

className="
min-h-screen
bg-white
p-8
"

style={{
  width:"1800px",
  minHeight:"800px",
  transform:"translate(0px,0px)"
}}

>


<div

className="
max-w-7xl
mx-auto
"

style={{
transform:"translate(110px,40px)"
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
transform:"translate(18px,-10px)"
}}

>



<div

style={{
transform:"translate(-10px,0px)"
}}

>


<h1

className="
text-5xl
font-black
text-[#3D3023]
"

style={{
transform:"translate(-50px,0px)scale(0.8)"
}}

>

My Profile

</h1>




<p

className="
text-[#7A6B59]
mt-2
"

style={{
transform:"translate(-6px,-5px) scale(0.99)"
}}

>

Manage your personal details and account information

</p>


</div>






<button

onClick={updateProfile}

className="
bg-[#C98A3D]
text-white
px-8
py-5
rounded-2xl
font-bold
hover:scale-105
transition
"

style={{

paddingLeft:"20px",

paddingRight:"20px",

transform:"translate(-20px,0px)"

}}

>

{loading ? "Saving..." : "Update Profile"}

</button>


</div>








<div

className="
bg-white
rounded-[35px]
shadow-xl
border
border-[#E8DDCC]
p-1
w-full
"

style={{

minHeight:"600px",

transform:"translate(0px,10px)"

}}

>





<div

className="
flex
items-center
gap-8
pb-8
border-b
border-[#E8DDCC]
"

style={{

transform:"translate(10px,0px)"

}}

>





<div className="relative">



<div

className="
h-32
w-32
rounded-full
bg-[#F5E4C2]
flex
items-center
justify-center
overflow-hidden
text-6xl
font-bold
text-[#C98A3D]
"

style={{

transform:"translate(10px,0px) scale(0.65)"

}}

>


{

user.avatar ?


(

<img

src={user.avatar}

alt="profile"

className="
h-full
w-full
object-cover
"

/>


)

:

(

<FaUser/>

)

}



</div>







<label

className="
absolute
bottom-0
right-0
bg-[#C98A3D]
text-white
text-xs
px-3
py-2
rounded-full
cursor-pointer
"

style={{

paddingLeft:"20px",

paddingRight:"20px",

transform:"translate(-10px,-5px) scale(0.7)"

}}

>


Change



<input

type="file"

accept="image/*"

hidden

onChange={handleImageUpload}

/>



</label>



</div>









<div

style={{

transform:"translate(-60px,0px) scale(0.7)"

}}

>



<h2

className="
text-4xl
font-black
text-[#3D3023]
"

style={{

transform:"translate(0px,0px)"

}}

>


{user.name || "User Name"}



</h2>





<p

className="
text-[#7A6B59]
text-lg
"

style={{

transform:"translate(0px,5px)"

}}

>


{user.email}


</p>






<span

className="
text-[#C98A3D]
font-semibold
"

style={{

transform:"translate(0px,5px)"

}}

>


User


</span>



</div>





</div>


{/* Personal Information */}

<h2

className="
text-3xl
font-black
text-[#3D3023]
mt-8
mb-5
"

style={{
transform:"translate(-100px,10px) scale(0.8)"
}}

>

Personal Information

</h2>





<div

className="
grid
md:grid-cols-2
gap-6
"

style={{
transform:"translate(8px,15px)scale(0.95)"
}}

>





<div

style={{

transform:"translate(-5px,0px)"

}}

>


<label

className="
font-semibold
text-[#3D3023]
"

style={{

transform:"translate(0px,0px)"

}}

>

Full Name

</label>



<div

className="
flex
items-center
gap-3
border
rounded-2xl
px-5
mt-2
"

style={{

paddingLeft:"20px",

paddingRight:"20px",

transform:"translate(0px,5px)"

}}

>


<FaUser

className="
text-[#C98A3D]
"

style={{

transform:"translate(-10px,0px)"

}}

/>




<input

name="name"

value={user.name}

onChange={handleChange}

className="
w-full
py-4
outline-none
"

style={{

transform:"translate(0px,0px)"

}}

/>



</div>


</div>







<div

style={{

transform:"translate(0px,0px)"

}}

>


<label

className="
font-semibold
text-[#3D3023]
"

>

Email Address

</label>




<div

className="
flex
items-center
gap-3
border
rounded-2xl
px-5
mt-2
"

style={{

paddingLeft:"30px",

paddingRight:"30px",

transform:"translate(0px,5px)"

}}

>


<FaEnvelope

className="
text-[#C98A3D]
"

style={{

transform:"translate(-20px,0px)"

}}

/>





<input

name="email"

value={user.email}

onChange={handleChange}

className="
w-full
py-4
outline-none
"

style={{

transform:"translate(0px,0px)"

}}

/>


</div>


</div>







<div

style={{

transform:"translate(-5px,5px)"

}}

>


<label

className="
font-semibold
text-[#3D3023]
"

>

Mobile Number

</label>





<div

className="
flex
items-center
gap-3
border
rounded-2xl
px-5
mt-2
"

style={{

paddingLeft:"30px",

paddingRight:"30px",

transform:"translate(0px,5px)"

}}

>



<FaPhone

className="
text-[#C98A3D]
"

style={{

transform:"translate(-20px,0px)"

}}

/>




<input

name="phone"

value={user.phone}

onChange={handleChange}

className="
w-full
py-4
outline-none
"

style={{

transform:"translate(0px,0px)"

}}

/>


</div>


</div>




</div>








{/* Security */}


<h2

className="
text-3xl
font-black
text-[#3D3023]
mt-10
mb-5
"

style={{

transform:"translate(-100px,40px) scale(0.8)"

}}

>

Security

</h2>






<div

className="
grid
md:grid-cols-2
gap-6
"

style={{

transform:"translate(30px,25px)"

}}

>



<div

className="
grid
md:grid-cols-2
gap-6
"

style={{

transform:"translate(0px,25px)"

}}

>



<div

style={{

transform:"translate(0px,0px)"

}}

>


<label

className="
font-semibold
text-[#3D3023]
"

>

New Password

</label>





<div

className="
flex
items-center
gap-3
border
rounded-2xl
px-5
mt-2
"

style={{

paddingLeft:"20px",

paddingRight:"20px",

transform:"translate(0px,5px)"

}}

>



<FaLock

className="
text-[#C98A3D]
"

style={{

transform:"translate(-10px,0px)"

}}

/>





<input

type="password"

name="password"

value={user.password}

onChange={handleChange}

placeholder="Enter new password"

className="
w-full
py-4
outline-none
"

style={{

transform:"translate(10px,0px)"

}}

/>



</div>


</div>



<div

style={{

transform:"translate(-5px,0px)"

}}

>


<label

className="
font-semibold
text-[#3D3023]
"

>

Confirm Password

</label>





<div

className="
flex
items-center
gap-3
border
rounded-2xl
px-5
mt-2
"

style={{

paddingLeft:"20px",

paddingRight:"20px",

transform:"translate(0px,5px)"

}}

>



<FaLock

className="
text-[#C98A3D]
"

style={{

transform:"translate(-8px,0px)"

}}

/>





<input

type="password"

name="confirmPassword"

value={user.confirmPassword}

onChange={handleChange}

placeholder="Confirm password"

className="
w-full
py-4
outline-none
"

style={{

transform:"translate(0px,0px)"

}}

/>



</div>


</div>



</div>







{/* Address */}



<h2

className="
text-3xl
font-black
text-[#3D3023]
mt-10
mb-5
"

style={{

transform:"translate(-30px,-70px) scale(0.9)"

}}

>

Address

</h2>






<div

className="
flex
items-start
gap-3
border
rounded-2xl
px-5
"

style={{

transform:"translate(620px,-90px) scale(0.9)"

}}

>


<FaMapMarkerAlt

className="
text-[#C98A3D]
mt-5
"

style={{

transform:"translate(50px,40px)"

}}

/>





<textarea

name="address"

value={user.address}

onChange={handleChange}

rows="4"

placeholder="Enter your address"

className="
w-full
py-4
outline-none
resize-none
"

style={{

transform:"translate(50px,35px)"

}}

/>



</div>









<button

onClick={() => navigate("/")}

className="
text-[#556B2F]
text-lg
font-semibold
flex
items-center
gap-2
mb-4
relative
z-50
translate-x-2
translate-y-3
"

style={{

transform:"translate(-780px,-590px) scale(1)"

}}

>

← Back

</button>









{/* Crop Popup */}



{showCrop && (



<div

className="
fixed
inset-0
bg-black/0
flex
items-center
justify-center
z-50
"
style={{
transform:"translate(-10px,-400px) scale(0.6)"
}}

>


<div

className="
bg-white
rounded-3xl
p-6
w-[420px]
"

>


<div

className="
relative
h-[350px]
w-full
"

>



<Cropper

image={imageSrc}

crop={crop}

zoom={zoom}

aspect={1}

cropShape="round"

onCropChange={setCrop}

onZoomChange={setZoom}

onCropComplete={onCropComplete}

/>



</div>







<input

type="range"

min="1"

max="3"

step="0.1"

value={zoom}

onChange={(e)=>setZoom(e.target.value)}

style={{

transform:"translate(0px,10px)"

}}

/>







<button

onClick={uploadCroppedImage}

className="
mt-5
bg-[#C98A3D]
text-white
px-8
py-3
rounded-xl
"

style={{
paddingLeft:"30px",
paddingRight:"30px",
transform:"translate(80px,15px)"

}}

>

Save Photo

</button>




</div>


</div>


)}



</div>


</div>


</div>


</div>


);

}