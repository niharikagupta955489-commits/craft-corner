import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";


export default function BackButton(){

const navigate = useNavigate();


return(

<button

onClick={()=>navigate(-1)}

className="flex items-center gap-2 bg-white border px-5 py-3 rounded-xl shadow-sm hover:bg-gray-100"

>

<FaArrowLeft />

Back

</button>

)

}