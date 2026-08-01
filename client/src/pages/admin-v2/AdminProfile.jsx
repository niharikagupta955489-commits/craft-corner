import { useState } from "react";
import { useAuth } from "../../context/AuthContext";


export default function AdminProfile(){


const { user } = useAuth();



const [admin,setAdmin] = useState({

name:user?.name || "",

email:user?.email || "",

mobile:user?.phone || "",

password:"",

confirmPassword:"",

role:user?.role || "Super Admin",

avatar:user?.avatar || ""

});

const handleChange=(e)=>{


setAdmin({

...admin,

[e.target.name]:e.target.value

});


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
max-w-6xl
mx-auto
"

style={{

transform:"translateX(0px) translateY(0px)"

}}

>



<div

className="
mb-8
"

style={{

transform:"translateX(-110px) translateY(0px) scale(0.7)"

}}

>


<h1

className="
text-5xl
font-bold
text-[#111827]
"

>

Admin Profile

</h1>



<p

className="
text-gray-500
mt-3
text-lg
"

>

Manage your personal details and account permissions

</p>


</div>





<div

className="
bg-white
rounded-[30px]
shadow-lg
border
border-gray-200
p-8
"

style={{

transform:"translateX(0px) translateY(0px)"

}}

>


<div

className="
flex
items-center
gap-6
mb-10
"

style={{

transform:"translateX(-100px) translateY(0px) scale(0.8)"

}}

>


<div

className="
w-28
h-28
rounded-full
bg-[#F5E6C8]
flex
items-center
justify-center
overflow-hidden
text-5xl
font-bold
text-[#C58B45]
"

>

{

admin.avatar ? (

<img

src={admin.avatar}

alt="admin"

className="
h-full
w-full
object-cover
"

/>

)

:

(

admin.name?.charAt(0).toUpperCase()

)

}

</div>



<div>


<h2

className="
text-3xl
font-bold
text-gray-800
"

>

{admin.name}

</h2>


<p

className="
text-gray-500
mt-2
"

>

{admin.email}

</p>


<span

className="
inline-block
mt-3
px-4
py-2
rounded-xl
bg-[#FFF7E8]
text-[#C58B45]
font-semibold
"

>

{admin.role}

</span>




</div>


</div>



{/* ================= PERSONAL INFORMATION ================= */}


<div

className="
border-t
border-gray-100
pt-8
"

style={{

transform:"translateX(-10px) translateY(0px) scale(0.95)"

}}

>


<h2

className="
text-2xl
font-bold
text-gray-800
mb-6
"

style={{

transform:"translateX(0px) translateY(0px)"

}}

>

Personal Information

</h2>





<div

className="
grid
grid-cols-1
md:grid-cols-2
gap-6
"

style={{

transform:"translateX(0px) translateY(0px)"

}}

>





<div>


<label

className="
block
text-sm
font-semibold
text-gray-700
mb-2
"

>

Full Name

</label>



<input

type="text"

name="name"

value={admin.name}

onChange={handleChange}

className="
w-full
h-14
rounded-2xl
border
border-gray-200
px-5
outline-none
focus:border-[#C58B45]
focus:ring-2
focus:ring-[#C58B45]/20
"

style={{
paddingLeft:"30px",
 paddingRight:"30px",

transform:"translateX(0px) translateY(0px)"

}}

/>


</div>







<div>


<label

className="
block
text-sm
font-semibold
text-gray-700
mb-2
"

>

Email Address

</label>



<input

type="email"

name="email"

value={admin.email}

onChange={handleChange}

className="
w-full
h-14
rounded-2xl
border
border-gray-200
px-5
outline-none
focus:border-[#C58B45]
focus:ring-2
focus:ring-[#C58B45]/20
"

style={{
paddingLeft:"30px",
 paddingRight:"30px",
transform:"translateX(0px) translateY(0px)"

}}

/>


</div>








<div>


<label

className="
block
text-sm
font-semibold
text-gray-700
mb-2
"

>

Mobile Number

</label>



<input

type="text"

name="mobile"

value={admin.mobile}

onChange={handleChange}

className="
w-full
h-14
rounded-2xl
border
border-gray-200
px-5
outline-none
focus:border-[#C58B45]
focus:ring-2
focus:ring-[#C58B45]/20
"

style={{
paddingLeft:"30px",
 paddingRight:"30px",
transform:"translateX(0px) translateY(0px)"

}}

/>


</div>





<div>


<label

className="
block
text-sm
font-semibold
text-gray-700
mb-2
"

>

Role

</label>



<input

type="text"

value={admin.role}

disabled

className="
w-full
h-14
rounded-2xl
border
border-gray-200
px-5
bg-gray-100
text-gray-500
cursor-not-allowed
"

style={{
paddingLeft:"30px",
 paddingRight:"30px",
transform:"translateX(0px) translateY(0px)"

}}

/>


</div>



</div>


</div>



{/* ================= SECURITY ================= */}


<div

className="
border-t
border-gray-100
pt-8
mt-8
"

style={{

transform:"translateX(2px) translateY(10px) scale(0.97)"

}}

>


<h2

className="
text-2xl
font-bold
text-gray-800
mb-6
"

style={{

transform:"translateX(-60px) translateY(0px) scale(0.9)"

}}

>

Security

</h2>





<div

className="
grid
grid-cols-1
md:grid-cols-2
gap-6
"

style={{

transform:"translateX(0px) translateY(0px)"

}}

>



<div>


<label

className="
block
text-sm
font-semibold
text-gray-700
mb-2
"

>

New Password

</label>


<input

type="password"

name="password"

value={admin.password}

onChange={handleChange}

placeholder="Enter new password"

className="
w-full
h-14
rounded-2xl
border
border-gray-200
px-5
outline-none
focus:border-[#C58B45]
"

style={{
paddingLeft:"30px",
 paddingRight:"30px",

transform:"translateX(0px) translateY(0px)"

}}

/>


</div>





<div>


<label

className="
block
text-sm
font-semibold
text-gray-700
mb-2
"

>

Confirm Password

</label>


<input

type="password"

name="confirmPassword"

value={admin.confirmPassword}

onChange={handleChange}

placeholder="Confirm password"

className="
w-full
h-14
rounded-2xl
border
border-gray-200
px-5
outline-none
focus:border-[#C58B45]
"

style={{
paddingLeft:"30px",
 paddingRight:"30px",
transform:"translateX(0px) translateY(0px)"

}}

/>


</div>



</div>


</div>








{/* ================= PERMISSIONS ================= */}


<div

className="
border-t
border-gray-100
pt-8
mt-8
"

style={{

transform:"translateX(0px) translateY(20px) scale(0.97)"

}}

>


<div

className="
flex
justify-between
items-center
mb-6
"

>


<h2

className="
text-2xl
font-bold
text-gray-800
"
style={{
 paddingLeft:"30px",
 paddingRight:"30px",
transform:"translateX(-50px) translateY(0px) scale(0.8)"
}}

>

Admin Permissions

</h2>



<span

className="
px-4
py-2
rounded-xl
bg-[#FFF7E8]
text-[#C58B45]
font-semibold
"

>

Super Admin Only

</span>


</div>






<div

className="
grid
grid-cols-1
md:grid-cols-2
gap-5
"

style={{

transform:"translateX(0px) translateY(0px)"

}}

>


{


[

"Manage Products",

"Manage Orders",

"Manage Customers",

"Manage Categories",

"View Analytics",

"Manage Admins"

].map((permission)=>(


<div

key={permission}

className="
flex
items-center
justify-between
bg-[#FFF7E8]
border
border-[#F5E6C8]
rounded-2xl
p-5
"

style={{
 paddingLeft:"30px",
 paddingRight:"30px",
transform:"translateX(0px) translateY(5px) scale(1"
}}

>


<p

className="
font-semibold
text-gray-700
"

>

{permission}

</p>



<input

type="checkbox"

defaultChecked

className="
w-5
h-5
accent-[#C58B45]
"

/>


</div>


))


}



</div>


</div>


{/* ================= UPDATE BUTTON ================= */}


<div

className="
border-t
border-gray-100
pt-8
mt-10
flex
justify-end
"

style={{

transform:"translateX(0px) translateY(0px)"

}}

>


<button

onClick={()=>{

alert("Profile Updated Successfully");

}}

className="
px-10
h-14
rounded-2xl
bg-[#C58B45]
text-white
font-semibold
shadow-lg
hover:bg-[#A66A20]
transition
"

style={{
paddingLeft:"30px",
 paddingRight:"30px",

transform:"translateX(-80px) translateY(-650px) scale(0.95)"



}}

>

Update Profile

</button>


</div>


</div>


</div>


</div>


);

}