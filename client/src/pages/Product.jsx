import { useEffect, useState } from "react";


import api from "../services/api";

import ProductGallery from "../components/product/ProductGallery";
import ProductInfo from "../components/product/ProductInfo";
import ProductActions from "../components/product/ProductActions";
import SellerInfo from "../components/product/SellerInfo";
import ProductSpecifications from "../components/product/ProductSpecifications";
import ReviewSection from "../components/product/ReviewSection";
import RelatedProducts from "../components/product/RelatedProducts";
import { useParams, Link } from "react-router-dom";


export default function Product(){

const {id}=useParams();

const [product,setProduct]=useState(null);
const [loading,setLoading]=useState(true);



useEffect(()=>{

api.get(`/products/${id}`)
.then(res=>{

setProduct(res.data.product);

})
.catch(err=>console.log(err))
.finally(()=>setLoading(false));


},[id]);



if(loading)
return <div>Loading...</div>



return(

<div style={{
width:"100%",
background:"#faf7f0",
padding:"30px"
}}>

<Link

to="/marketplace"

style={{
display:"inline-flex",
alignItems:"center",
gap:"8px",
color:"#556B2F",
fontSize:"18px",
fontWeight:"600",
marginBottom:"20px",
textDecoration:"none",
transform:"translate(10px,5px)"
}}

>

← Back

</Link>


<div style={{
maxWidth:"1300px",
margin:"auto"
}}>



<div style={{
display:"flex",
gap:"30px",
alignItems:"flex-start",
flexWrap:"wrap"
}}>




<div style={{
width:"420px",
maxWidth:"100%"
}}>


<ProductGallery product={product}/>



<div style={{
marginTop:"35px"
}}>

<SellerInfo/>

</div>


</div>





<div style={{
flex:"1",
minWidth:"400px"
}}>


<ProductInfo product={product}/>


<ProductActions product={product}/>


</div>



</div>






<div style={{
marginTop:"40px"
}}>


<ProductSpecifications product={product}/>


</div>




<div style={{
marginTop:"40px"
}}>


<ReviewSection reviews={product.reviews}/>


</div>




<div style={{
marginTop:"40px"
}}>


<RelatedProducts/>


</div>



</div>


</div>


)

}