import { useRef, useState } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaHeart,
  FaExpand,
} from "react-icons/fa";

export default function ProductGallery({ product }) {

  const [selectedImage, setSelectedImage] = useState(0);

  const [zoomStyle, setZoomStyle] = useState({});

  const imageRef = useRef(null);

  if (!product) return null;

  const nextImage = () => {

    if (selectedImage < product.images.length - 1) {

      setSelectedImage(selectedImage + 1);

    }

  };

  const previousImage = () => {

    if (selectedImage > 0) {

      setSelectedImage(selectedImage - 1);

    }

  };

  const handleMouseMove = (e) => {

    const { left, top, width, height } =
      imageRef.current.getBoundingClientRect();

    const x = ((e.clientX - left) / width) * 100;

    const y = ((e.clientY - top) / height) * 100;

    setZoomStyle({

      transformOrigin: `${x}% ${y}%`,

      transform: "scale(2)",

    });

  };

  const handleMouseLeave = () => {

    setZoomStyle({

      transform: "scale(1)",

    });

  };

  return (

<div className="w-[500px] shrink-0 flex items-start gap-5">

{/* Thumbnails */}

<div className="flex flex-col gap-4">

{product.images?.map((image,index)=>(

<img

key={index}

src={image}

alt={product.name}

onClick={()=>setSelectedImage(index)}

className={`

w-20

h-20

rounded-xl

object-cover

cursor-pointer

border-2

transition-all

duration-300

${
selectedImage===index
?

"border-[#556B2F] scale-105"

:

"border-gray-300 hover:border-[#556B2F]"

}

`}

/>

))}

</div>

{/* Main Image */}

<div className="relative w-full max-w-[500px]">

<div className="w-[500px] h-[500px] bg-white rounded-3xl shadow-xl overflow-hidden flex items-center justify-center p-6">

<img

ref={imageRef}

src={product.images?.[selectedImage]}

alt={product.name}

style={zoomStyle}

onMouseMove={handleMouseMove}

onMouseLeave={handleMouseLeave}

className="

w-full
max-w-[420px]
max-h-[420px]
object-contain

transition-all

duration-300

cursor-crosshair

"
/>

{/* Previous Button */}

<button

onClick={previousImage}

disabled={selectedImage===0}

className="

absolute

left-5

top-1/2

-translate-y-1/2

w-12

h-12

rounded-full

bg-white

shadow-lg

flex

items-center

justify-center

hover:bg-[#556B2F]

hover:text-white

transition

disabled:opacity-40

"

>

<FaChevronLeft />

</button>



{/* Next Button */}

<button

onClick={nextImage}

disabled={selectedImage===product.images.length-1}

className="

absolute

right-5

top-1/2

-translate-y-1/2

w-12

h-12

rounded-full

bg-white

shadow-lg

flex

items-center

justify-center

hover:bg-[#556B2F]

hover:text-white

transition

disabled:opacity-40

"

>

<FaChevronRight />

</button>



{/* Wishlist */}

<button

className="

absolute

top-5

right-5

w-12

h-12

rounded-full

bg-white

shadow-lg

text-red-500

flex

items-center

justify-center

hover:scale-110

transition

"

>

<FaHeart />

</button>



{/* Full Screen */}

<button

className="

absolute

bottom-5

right-5

w-12

h-12

rounded-full

bg-white

shadow-lg

flex

items-center

justify-center

hover:bg-[#556B2F]

hover:text-white

transition

"

>

<FaExpand />

</button>



{/* Image Counter */}

<div

className="

absolute

bottom-5

left-5

bg-black/70

text-white

px-4

py-2

rounded-full

text-sm

"

>

{selectedImage+1} / {product.images.length}

</div>

</div>

</div>

</div>

);

}