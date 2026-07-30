import { useState } from "react";
import "./ProductGallery.css";


export default function ProductGallery({product}){


const images = product?.images?.length
? product.images
: [product?.image];



const [activeImage,setActiveImage] = useState(images[0]);

const [zoom,setZoom] = useState(false);




return(

<div className="gallery-container">





<div 
className={
zoom
?
"main-gallery zoom-box"
:
"main-gallery"
}

onMouseEnter={()=>setZoom(true)}

onMouseLeave={()=>setZoom(false)}

>





<img

src={activeImage}

alt="product"

className={
zoom
?
"main-gallery-image zoom-image"
:
"main-gallery-image"
}

/>





<button className="gallery-heart">

❤

</button>






<button

className="gallery-zoom"

onClick={()=>setZoom(!zoom)}

>

⛶

</button>





</div>









<div className="gallery-thumbnails">


{

images.map((img,index)=>(


<div

key={index}

className={
activeImage===img
?
"thumbnail active-thumb"
:
"thumbnail"
}


onClick={()=>setActiveImage(img)}

>


<img

src={img}

alt="thumbnail"

/>


</div>


))

}



</div>






</div>


)

}