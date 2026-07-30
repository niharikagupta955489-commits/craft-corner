import { useLocation, useNavigate } from "react-router-dom";
import { Link, Outlet } from "react-router-dom";

import {
  FaHome,
  FaBox,
  FaPlus,
  FaShoppingCart,
  FaUsers,
  FaList,
  FaCog,
  FaArrowLeft
} from "react-icons/fa";



export default function AdminLayout(){


const location = useLocation();

const navigate = useNavigate();



return(


<div className="min-h-screen bg-[#F6F7FB] flex">



{/* Sidebar */}


<aside className="
w-64
bg-[#243324]
text-white
min-h-screen
p-6
">


<h1 className="
text-3xl
font-bold
mb-10
">

Craft
<span className="text-[#C9A45C]">
Corner
</span>

</h1>





<nav className="space-y-3">





<Link

to="/admin/dashboard"

className="
flex
items-center
gap-3
p-3
rounded-xl
hover:bg-[#556B2F]
"

>

<FaHome/>

Dashboard

</Link>





<Link

to="/admin/admin-management"

className="
flex
items-center
gap-3
p-3
rounded-xl
hover:bg-[#556B2F]
"

>

Admin Management

</Link>






<Link

to="/admin/products"

className="
flex
items-center
gap-3
p-3
rounded-xl
hover:bg-[#556B2F]
"

>

<FaBox/>

Products

</Link>






<Link

to="/admin/add-product"

className="
flex
items-center
gap-3
p-3
rounded-xl
hover:bg-[#556B2F]
"

>

<FaPlus/>

Add Product

</Link>






<Link

to="/admin/orders"

className="
flex
items-center
gap-3
p-3
rounded-xl
hover:bg-[#556B2F]
"

>

<FaShoppingCart/>

Orders

</Link>






<Link

to="/admin/customers"

className="
flex
items-center
gap-3
p-3
rounded-xl
hover:bg-[#556B2F]
"

>

<FaUsers/>

Customers

</Link>







<Link

to="/admin/categories"

className="
flex
items-center
gap-3
p-3
rounded-xl
hover:bg-[#556B2F]
"

>

<FaList/>

Categories

</Link>







<Link

to="/admin/home-settings"

className="
flex
items-center
gap-3
p-3
rounded-xl
hover:bg-[#556B2F]
"

>

<FaCog/>

Home Settings

</Link>





</nav>


</aside>








{/* Main Content */}


<div className="flex-1 p-6">



{

location.pathname !== "/admin/dashboard" && (


<button

onClick={()=>navigate(-1)}

className="
mb-6
flex
items-center
gap-2
bg-white
px-5
py-3
rounded-xl
shadow
"

>

<FaArrowLeft/>

Back

</button>


)


}





<Outlet/>


</div>



</div>


)

}