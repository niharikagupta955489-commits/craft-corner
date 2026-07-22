import { useEffect, useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";


export default function AdminManagement(){


const [admins,setAdmins] = useState([]);

const [editId,setEditId] = useState(null);


const [form,setForm] = useState({

name:"",
email:"",
password:"",
role:"Admin",
permissions:[]

});



useEffect(()=>{

fetchAdmins();

},[]);




const fetchAdmins = async()=>{

try{

const res = await api.get("/admin/all");

setAdmins(res.data.admins || []);


}catch(error){

toast.error("Failed to load admins");

}

};





const handleChange=(e)=>{

setForm({

...form,

[e.target.name]:e.target.value

});

};





const togglePermission=(item)=>{


if(form.permissions.includes(item)){


setForm({

...form,

permissions:
form.permissions.filter(
p=>p!==item
)

});


}else{


setForm({

...form,

permissions:[
...form.permissions,
item
]

});


}


};







const saveAdmin = async()=>{


try{


if(editId){


await api.put(`/admin/${editId}`,{

name:form.name,

email:form.email,

role:form.role,

permissions:form.permissions

});


toast.success("Admin Updated");


}else{


await api.post("/admin/create",{

name:form.name,

email:form.email,

password:form.password,

role:form.role,

permissions:form.permissions

});


toast.success("Admin Created");


}



fetchAdmins();


setEditId(null);


setForm({

name:"",
email:"",
password:"",
role:"Admin",
permissions:[]

});



}catch(error){

toast.error(
error.response?.data?.message ||
"Something went wrong"
);

}


};







const editAdmin=(admin)=>{


setEditId(admin._id);


setForm({

name:admin.name,

email:admin.email,

password:"",

role:admin.role,

permissions:admin.permissions || []

});


};







const deleteAdmin=async(id)=>{


try{


await api.delete(`/admin/${id}`);


toast.success("Admin Deleted");


fetchAdmins();



}catch(error){

toast.error("Delete failed");

}


};







return(

<div className="min-h-screen bg-[#F6F7FB] p-8">


<h1 className="text-4xl font-bold text-[#263528] mb-8">

Admin Management

</h1>



<div className="grid md:grid-cols-2 gap-8">



<div className="bg-white rounded-3xl p-8 shadow">


<h2 className="text-2xl font-bold mb-6">

{
editId ? "Edit Admin" : "Add New Admin"
}

</h2>




<input

name="name"

value={form.name}

onChange={handleChange}

placeholder="Admin Name"

className="w-full border rounded-xl p-3 mb-4"

/>





<input

name="email"

value={form.email}

onChange={handleChange}

placeholder="Email"

className="w-full border rounded-xl p-3 mb-4"

/>





<input

name="password"

type="password"

value={form.password}

onChange={handleChange}

placeholder="Password"

className="w-full border rounded-xl p-3 mb-4"

/>





<select

name="role"

value={form.role}

onChange={handleChange}

className="w-full border rounded-xl p-3 mb-4"

>


<option>

Admin

</option>


<option>

Super Admin

</option>


</select>





<h3 className="font-bold mb-3">

Permissions

</h3>



{

[

"Dashboard",

"Products",

"Orders",

"Customers",

"Categories"

].map(item=>(


<label

key={item}

className="block mb-2"

>


<input

type="checkbox"

checked={
form.permissions.includes(item)
}

onChange={()=>togglePermission(item)}

/>


<span className="ml-2">

{item}

</span>


</label>


))

}





<button

onClick={saveAdmin}

className="mt-6 bg-[#556B2F] text-white px-8 py-3 rounded-xl"

>

{

editId ? "Update Admin" : "Create Admin"

}

</button>



</div>







<div className="bg-white rounded-3xl p-8 shadow">


<h2 className="text-2xl font-bold mb-6">

All Admins

</h2>



{

admins.map(admin=>(


<div

key={admin._id}

className="border rounded-2xl p-5 mb-4"

>


<h3 className="text-xl font-bold">

{admin.name}

</h3>



<p>

{admin.email}

</p>



<p className="mt-2">

Role : {admin.role}

</p>



<div className="mt-3 flex flex-wrap gap-2">


{

admin.permissions?.map(p=>(


<span

key={p}

className="bg-gray-100 px-3 py-1 rounded-full text-sm"

>

{p}

</span>


))

}


</div>




<div className="mt-4">


<button

onClick={()=>editAdmin(admin)}

className="bg-blue-500 text-white px-5 py-2 rounded-lg mr-3"

>

Edit

</button>



<button

onClick={()=>deleteAdmin(admin._id)}

className="bg-red-500 text-white px-5 py-2 rounded-lg"

>

Delete

</button>


</div>



</div>


))


}



</div>



</div>


</div>


)

}