import { useMemo, useState } from "react";
import { FaHeart, FaExpand } from "react-icons/fa";
import "./ProductGallery.css";

export default function ProductGallery({ product }) {
  const images = useMemo(() => {
    const list = product?.images?.length
      ? product.images
      : [product?.image];

    return list.filter(Boolean);
  }, [product]);

  const [activeImage, setActiveImage] = useState(images[0]);
  const [zoom, setZoom] = useState(false);

  const selectedImage = activeImage || images[0];

  return (
    <div
      className="gallery-container"
      style={{
        padding: "0px",
        transform: "translate(0px,0px)",
      }}
    >
      <div
        className="main-gallery"
        style={{
          padding: "12px",
          transform: "translate(0px,0px)",
        }}
        onMouseEnter={() => setZoom(true)}
        onMouseLeave={() => setZoom(false)}
      >
        <img
          src={selectedImage}
          alt={product?.name || "product"}
          className={zoom ? "main-gallery-image zoom-image" : "main-gallery-image"}
          style={{
            padding: "0px",
            transform: "translate(0px,0px)",
          }}
        />

        <button
          className="gallery-heart"
          type="button"
          style={{
            padding: "0px",
            transform: "translate(0px,0px)",
          }}
        >
          <FaHeart size={18} />
        </button>

        <button
          className="gallery-zoom"
          type="button"
          onClick={() => setZoom((value) => !value)}
          style={{
            padding: "0px",
            transform: "translate(0px,0px)",
          }}
        >
          <FaExpand size={15} />
        </button>
      </div>

      <div
        className="gallery-thumbnails"
        style={{
          padding: "0px",
          marginTop: "14px",
          transform: "translate(0px,0px)",
        }}
      >
        {images.map((img, index) => (
          <button
            key={index}
            type="button"
            className={selectedImage === img ? "thumbnail active-thumb" : "thumbnail"}
            onClick={() => setActiveImage(img)}
            style={{
              padding: "0px",
              transform: "translate(0px,0px)",
            }}
          >
            <img
              src={img}
              alt={`thumbnail ${index + 1}`}
              style={{
                padding: "0px",
                transform: "translate(0px,0px)",
              }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
