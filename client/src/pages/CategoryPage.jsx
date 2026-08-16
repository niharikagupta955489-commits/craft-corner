import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaLeaf,
  FaShieldAlt,
  FaTruck,
} from "react-icons/fa";

import ProductCard from "../components/home/ProductCard";
import potterySide from "../assets/pottery side.png";
import api from "../services/api";

export default function CategoryPage() {
  const category = window.location.pathname.replace("/", "");

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilter, setShowFilter] = useState(false);
  const [activeFilter, setActiveFilter] = useState("Newest");

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);

        const res = await api.get(
          `/products/category/${category}`
        );

        const data = res.data.products || [];

        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error("CATEGORY PRODUCTS ERROR:", error);
        setProducts([]);
        setFilteredProducts([]);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, [category]);

  const handleFilter = (type) => {
    let data = [...products];

    switch (type) {
      case "low":
        data.sort((a, b) => Number(a.price || 0) - Number(b.price || 0));
        setActiveFilter("Price: Low → High");
        break;

      case "high":
        data.sort((a, b) => Number(b.price || 0) - Number(a.price || 0));
        setActiveFilter("Price: High → Low");
        break;

      case "new":
        data.sort(
          (a, b) =>
            new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
        );
        setActiveFilter("Newest");
        break;

      case "old":
        data.sort(
          (a, b) =>
            new Date(a.createdAt || 0) - new Date(b.createdAt || 0)
        );
        setActiveFilter("Oldest");
        break;

      default:
        data = [...products];
        setActiveFilter("Newest");
    }

    setFilteredProducts(data);
    setShowFilter(false);
  };

  if (loading) {
    return (
      <div
        className="min-h-screen bg-[#F7F4EC] flex items-center justify-center"
        style={{
          padding: "40px",
          transform: "translate(0px,0px)",
        }}
      >
        <div
          className="rounded-2xl bg-white border border-[#E3DED2] text-[#556B2F] font-semibold shadow-sm"
          style={{
            padding: "16px 26px",
            transform: "translate(0px,0px)",
          }}
        >
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-[#F7F4EC] text-[#2F2B26]"
      style={{
        padding: "26px 34px 50px",
        transform: "translate(0px,0px)",
      }}
    >
      <div
        className="mx-auto max-w-[1450px]"
        style={{
          padding: "0 10px",
          transform: "translate(0px,0px)",
        }}
      >
        {/* HEADER */}
        <div
          className="flex items-center justify-between"
          style={{
            padding: "0 4px 20px",
            transform: "translate(0px,0px)",
          }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full text-[#556B2F] font-semibold hover:bg-[#EEF2E4] transition"
            style={{
              padding: "8px 12px",
              transform: "translate(0px,0px)",
            }}
          >
            <FaHome size={14} />
            Home
          </Link>

          <button
            type="button"
            onClick={() => setShowFilter((value) => !value)}
            className="inline-flex items-center gap-2 rounded-xl border border-[#CED6BF] bg-white text-[#3F4C32] font-semibold shadow-sm hover:bg-[#EFF3E8] transition"
            style={{
              padding: "10px 17px",
              transform: "translate(0px,0px)",
            }}
          >
            ☰
            {showFilter ? "Close Filter" : "Filter"}
          </button>
        </div>

        <div
          className="grid grid-cols-1 lg:grid-cols-[300px_minmax(0,1fr)] gap-7 items-start"
          style={{
            padding: "0",
            transform: "translate(0px,0px)",
          }}
        >
          {/* SIDEBAR */}
          <aside
            className="hidden lg:block rounded-[30px] border border-[#DFDACD] bg-[#EAE6DA] shadow-[0_10px_26px_rgba(70,80,40,0.06)]"
            style={{
              padding: "18px",
              transform: "translate(0px,0px)",
            }}
          >
            <div
              className="overflow-hidden rounded-[24px] bg-[#B0B190]"
              style={{
                height: "290px",
                padding: "0",
                transform: "translate(0px,0px)",
              }}
            >
              <img
                src={potterySide}
                alt="Handmade pottery"
                className="h-full w-full object-cover"
                style={{
                  padding: "0",
                  transform: "translate(0px,0px)",
                }}
              />
            </div>

            <div
              className="space-y-7"
              style={{
                padding: "10px 5px 8px",
                marginTop: "14px",
                transform: "translate(0px,0px)",
              }}
            >
              <Feature icon={<FaLeaf />} title="Handmade" text="Crafted with traditional techniques" />
              <Feature icon={<FaShieldAlt />} title="Premium Quality" text="High quality clay and materials" />
              <Feature icon={<FaTruck />} title="Safe Delivery" text="Carefully packaged for safe shipping" />
            </div>
          </aside>

          {/* MAIN */}
          <main
            className="rounded-[30px] border border-[#E2DDCF] bg-[#FCFAF4] shadow-[0_10px_30px_rgba(70,80,40,0.05)]"
            style={{
              padding: "28px 30px 34px",
              transform: "translate(0px,0px)",
            }}
          >
            {/* BREADCRUMB */}
            <div
              className="flex items-center gap-2 text-sm text-[#7C776D]"
              style={{
                padding: "0",
                transform: "translate(0px,0px)",
              }}
            >
              <FaHome size={12} />
              <span>Home</span>
              <span>›</span>
              <span className="capitalize font-semibold text-[#556B2F]">
                {category}
              </span>
            </div>

            {/* TITLE */}
            <div
              style={{
                padding: "0",
                marginTop: "22px",
                transform: "translate(0px,0px)",
              }}
            >
              <div
                className="flex items-center gap-3"
                style={{
                  padding: "0",
                  transform: "translate(0px,0px)",
                }}
              >
                <div
                  className="h-1 w-12 rounded-full bg-[#556B2F]"
                  style={{
                    padding: "0",
                    transform: "translate(0px,0px)",
                  }}
                />
                <span className="text-[#8A9971] text-xl">❧</span>
              </div>

              <h1
                className="text-4xl md:text-5xl font-black capitalize text-[#24331D] leading-tight"
                style={{
                  margin: "10px 0 0",
                  padding: "0",
                  transform: "translate(0px,0px)",
                }}
              >
                {category}
              </h1>

              <p
                className="max-w-3xl text-[#666157] text-lg leading-8"
                style={{
                  margin: "9px 0 0",
                  padding: "0",
                  transform: "translate(0px,0px)",
                }}
              >
                Beautiful handmade {category} items crafted with love and tradition.
              </p>
            </div>

            {/* FILTERS */}
            {showFilter && (
              <div
                className="rounded-2xl border border-[#E0D9CB] bg-white shadow-[0_14px_32px_rgba(70,80,40,0.10)]"
                style={{
                  padding: "10px",
                  marginTop: "18px",
                  transform: "translate(0px,0px)",
                }}
              >
                <div
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2"
                  style={{
                    padding: "0",
                    transform: "translate(0px,0px)",
                  }}
                >
                  <FilterButton label="Newest" onClick={() => handleFilter("new")} active={activeFilter === "Newest"} />
                  <FilterButton label="Oldest" onClick={() => handleFilter("old")} active={activeFilter === "Oldest"} />
                  <FilterButton label="Price: Low → High" onClick={() => handleFilter("low")} active={activeFilter === "Price: Low → High"} />
                  <FilterButton label="Price: High → Low" onClick={() => handleFilter("high")} active={activeFilter === "Price: High → Low"} />
                  <FilterButton label="Reset" onClick={() => handleFilter("reset")} danger />
                </div>
              </div>
            )}

            {/* COUNT */}
            <div
              className="flex flex-col md:flex-row md:items-center justify-between gap-4"
              style={{
                padding: "0",
                marginTop: "22px",
                transform: "translate(0px,0px)",
              }}
            >
              <div
                className="inline-flex items-center gap-2 self-start rounded-full bg-[#EAF1DD] text-[#556B2F] font-bold"
                style={{
                  padding: "9px 16px",
                  transform: "translate(0px,0px)",
                }}
              >
                🛍 {filteredProducts.length} Products Found
              </div>

              {activeFilter !== "Newest" && (
                <span className="text-sm text-[#7A746B]">
                  Sorted by: <span className="font-semibold text-[#556B2F]">{activeFilter}</span>
                </span>
              )}
            </div>

            {/* GRID */}
            {filteredProducts.length === 0 ? (
              <div
                className="rounded-[24px] border border-dashed border-[#C9D3B1] bg-[#F6F7EF] text-center"
                style={{
                  padding: "52px 24px",
                  marginTop: "24px",
                  transform: "translate(0px,0px)",
                }}
              >
                <div
                  className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white text-[#71874B]"
                  style={{
                    padding: "0",
                    transform: "translate(0px,0px)",
                  }}
                >
                  <FaLeaf size={28} />
                </div>

                <h2
                  className="text-2xl font-black text-[#24331D]"
                  style={{
                    margin: "14px 0 6px",
                    padding: "0",
                    transform: "translate(0px,0px)",
                  }}
                >
                  No Products Found
                </h2>

                <p className="text-[#7C756A]">
                  Try another filter or explore a different category.
                </p>
              </div>
            ) : (
              <div
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5"
                style={{
                  marginTop: "24px",
                  padding: "0",
                  transform: "translate(0px,0px)",
                }}
              >
                {filteredProducts.map((product) => (
                  <div
                    key={product._id}
                    className="rounded-[22px] transition hover:-translate-y-1"
                    style={{
                      padding: "0",
                      transform: "translate(0px,0px)",
                    }}
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

function Feature({ icon, title, text }) {
  return (
    <div
      className="flex items-start gap-4"
      style={{
        padding: "0",
        transform: "translate(0px,0px)",
      }}
    >
      <div
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#718353] text-[#556B2F]"
        style={{
          padding: "0",
          transform: "translate(0px,0px)",
        }}
      >
        {icon}
      </div>

      <div>
        <h3
          className="text-lg font-black text-[#344225]"
          style={{
            margin: "0",
            padding: "0",
            transform: "translate(0px,0px)",
          }}
        >
          {title}
        </h3>

        <p
          className="text-sm leading-6 text-[#69655D]"
          style={{
            margin: "2px 0 0",
            padding: "0",
            transform: "translate(0px,0px)",
          }}
        >
          {text}
        </p>
      </div>
    </div>
  );
}

function FilterButton({ active, label, onClick, danger = false }) {
  const className = danger
    ? "text-red-600 hover:bg-red-50"
    : active
    ? "bg-[#5E7F35] text-white"
    : "bg-[#F7F4EC] text-[#4E5A41] hover:bg-[#EDF2E5]";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-xl text-sm font-semibold transition ${className}`}
      style={{
        padding: "11px 12px",
        transform: "translate(0px,0px)",
      }}
    >
      {label}
    </button>
  );
}
