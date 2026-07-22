import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";


export default function UserLayout(){

const location = useLocation();

const navigate = useNavigate();


return(

<div>


{
location.pathname !== "/" && (

<button

onClick={()=>navigate(-1)}

className="m-5 flex items-center gap-2 bg-white px-5 py-3 rounded-xl shadow"

>

<FaArrowLeft/>

Back

</button>

)
}


<Outlet/>


</div>

)

}