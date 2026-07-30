import React, { useEffect, useState } from "react";
import "../styles/Marketplace.css";
import api from "../services/api";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


const categories = [
  "Home Decor",
  "Plants",
  "Bags & Purses",
  "Jewelry",
  "Candles",
  "Gift Items",
  "Art & Paintings",
  "Baskets",
];


function Marketplace(){

const [products,setProducts] = useState([]);

const navigate = useNavigate();

const { addToCart } = useCart();



useEffect(()=>{


const fetchProducts = async()=>{

try{

const res = await api.get("/products");

setProducts(res.data.products || []);

}

catch(error){

console.log("Product Fetch Error:",error);

}

};


fetchProducts();


},[]);





const handleAddToCart=(product)=>{


addToCart({

...product,

quantity:1

});


toast.success("Added to Cart 🛒");


};





return(


<div className="marketplace">



<button

onClick={()=>navigate("/")}

className="
mb-6
flex
items-center
gap-2
text-[#556B2F]
font-semibold
hover:underline
"

>

← Back to Home

</button>






<nav className="market-nav">


<h2>

🌿 CraftCorner

</h2>




<div className="nav-links">

<Link to="/">
Home
</Link>


<Link 
to="/marketplace"
className="active"
>
Marketplace
</Link>


<Link to="/contact">
Contact
</Link>


</div>



<input

placeholder="Search products..."

/>


</nav>







<section className="hero">



<div>


<h1>

Discover Beautiful

<br/>

Handmade Creations

</h1>



<p>

Explore unique handmade products made with love by talented artisans.

</p>




<button>

Shop Now 🌿

</button>



</div>




<img

src="https://images.unsplash.com/photo-1618220179428-22790b461013"

/>



</section>








<section className="categories">


{

categories.map((item,index)=>(


<div

className="category"

key={index}

>


<div className="circle">

🌱

</div>



<p>

{item}

</p>



</div>


))


}



</section>








<div className="title-row">


<h2>

Featured Products

</h2>



<span>

View All →

</span>



</div>








<section className="products">


{


products.map((product)=>(



<div

className="product-card"

key={product._id}

>




<img

src={

product.images?.[0] ||

"https://via.placeholder.com/300"

}

alt={product.name}

/>





<h3>

{product.name}

</h3>




<p className="price">

₹{product.price}

</p>





<p className="rating">

⭐ {product.rating || 0}

</p>





<button

onClick={()=>handleAddToCart(product)}

>

🛒 Add to Cart

</button>





</div>



))


}



</section>










<section className="services">



<div>

<h3>
🚚
</h3>

<h4>
Free Shipping
</h4>

<p>
Orders above ₹499
</p>

</div>





<div>

<h3>
🔒
</h3>

<h4>
Secure Payments
</h4>

<p>
100% safe checkout
</p>

</div>






<div>

<h3>
↩️
</h3>

<h4>
Easy Returns
</h4>

<p>
7 days return policy
</p>

</div>







<div>

<h3>
☎️
</h3>

<h4>
Support 24/7
</h4>

<p>
Always here to help
</p>

</div>




</section>






</div>


)


}


export default Marketplace;