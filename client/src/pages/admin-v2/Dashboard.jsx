
import { useEffect, useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import {
  FaDollarSign,
  FaShoppingBag,
  FaUsers,
  FaBoxOpen,
  FaArrowUp,
} from "react-icons/fa";


export default function Dashboard() {

const [dashboard, setDashboard] = useState({
  totalProducts: 0,
  totalOrders: 0,
  totalCustomers: 0,
  totalRevenue: 0,
  recentOrders: [],
});

const [loading, setLoading] = useState(true);

const fetchDashboard = async () => {
  try {
    const res = await api.get("/dashboard");

    console.log("Dashboard API:", res.data);

    setDashboard(res.data);
  } catch (err) {
    toast.error("Dashboard load failed");
  } finally {
    setLoading(false);
  }
};
useEffect(() => {
  fetchDashboard();
}, []);

const stats = [
  {
    title: "Revenue",
    value: `₹${dashboard.totalRevenue}`,
    growth: "+18%",
    icon: <FaDollarSign />,
  },
  {
    title: "Orders",
    value: dashboard.totalOrders,
    growth: "+12%",
    icon: <FaShoppingBag />,
  },
  {
    title: "Customers",
    value: dashboard.totalCustomers,
    growth: "+9%",
    icon: <FaUsers />,
  },
  {
    title: "Products",
    value: dashboard.totalProducts,
    growth: "+5%",
    icon: <FaBoxOpen />,
  },
];

if (loading) {
  return (
    <div className="h-screen flex items-center justify-center text-3xl font-bold">
      Loading Dashboard...
    </div>
  );
}
  return (
    <div className="space-y-8">

      {/* HEADER */}

      <div className="flex items-center justify-between">

        <div
          style={{
            transform: "translate(3px,0px) scale(0.8)",
          }}
        >
          <h1
            className="text-5xl font-black text-[#3D3023]"
            style={{
              transform: "translate(0px,0px)",
            }}
          >
            Dashboard
          </h1>

          <p
            className="mt-3 text-lg text-[#7A6B59]"
            style={{
              transform: "translate(0px,0px)",
            }}
          >
            Welcome back Admin. Here's your business overview.
          </p>
        </div>

<Link
  to="/"
  className="
  rounded-2xl
 bg-[#FFD08A]
  px-6
  py-3
  font-semibold
  text-[#556B2F]
  border
  border-[#D6E2C8]
  hover:bg-[#FFB347]
  transition
  "
style={{
paddingLeft:"20px",
 paddingRight:"20px",
            transform: "translate(-20px,-2px)",
          }}

>
  🏠 Visit Website
</Link>
        <div
          className="rounded-3xl border border-[#E6DAC8] bg-white px-7 py-5 shadow-md"
          style={{
            transform: "translate(-20px,0px)",
          }}
        >
          <p
            className="text-sm text-[#8D7A63]"
            style={{
              transform: "translate(8px,5px) scale(0.9)",
            }}
          >
            Today
          </p>

          <h2
            className="text-3xl font-bold text-[#3D3023]"
            style={{
              transform: "translate(-1px,-5px)scale(0.7) ",
            }}
          >
          {new Date().toLocaleDateString("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
})}
          </h2>
        </div>

      </div>



      {/* STATS */}

      <div className="grid grid-cols-4 gap-7">

        {stats.map((item) => (

          <div
            key={item.title}
            className="group rounded-[30px] border border-[#E8DDCC] bg-[#FFFDF9] p-7 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            style={{
              transform: "translate(5px,0px) scale(0.83)",
            }}
          >

            <div className="flex items-center justify-between">

              <div
                className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F3E5CF] text-3xl text-[#B28442]"
                style={{
                  transform: "translate(25px,40px) scale(0.83)",
                }}
              >
                {item.icon}
              </div>

              <div
                className="rounded-full bg-green-100 px-4 py-2"
                style={{
                  transform: "translate(-30px,42px)scale(1.19)",
                }}
              >
                <span
                  className="flex items-center gap-1 text-sm font-bold text-green-700"
                  style={{
                    transform: "translate(0px,0px)scale(0.86)",
                  }}
                >
                  <FaArrowUp />

                  {item.growth}
                </span>
              </div>

            </div>



            <h2
              className="mt-8 text-5xl font-black text-[#3D3023]"
              style={{
                transform: "translate(55px,-20px)scale(0.69)",
              }}
            >
              {item.value}
            </h2>



            <p
              className="mt-3 text-lg font-medium text-[#857260]"
              style={{
                transform: "translate(105px,-35px)",
              }}
            >
              {item.title}
            </p>



            <div
              className="mt-6 h-2 rounded-full bg-[#F4ECE0]"
              style={{
                transform: "translate(5px,-15px) scale(0.85)",
              }}
            >
              <div
                className="h-2 rounded-full bg-gradient-to-r from-[#B68B4A] to-[#D7BA83]"
                style={{
                  width: "75%",
                  transform: "translate(7px,0px)",
                }}
              />
            </div>

          </div>

        ))}

      </div>

    


{/* ===================== PART 2A ===================== */}

<div className="grid grid-cols-3 gap-7">

  {/* Sales Overview */}

  <div
    className="col-span-2 rounded-[32px] border border-[#E8DDCC] bg-[#FFFDF9] p-8 shadow-sm"
    style={{
      transform: "translate(10px,0px) scale(0.95) ",
    }}
  >

    <div
      className="flex items-center justify-between"
      style={{
        transform: "translate(25px,0px)scale(0.99)",
      }}
    >

      <div
        style={{
          transform: "translate(px,0px)",
        }}
      >

        <h2
          className="text-3xl font-bold text-[#3D3023]"
          style={{
            transform: "translate(0px,10px)",
          }}
        >
          Sales Overview
        </h2>

        <p
          className="mt-2 text-[#7A6B59]"
          style={{
            transform: "translate(20px,0px)",
          }}
        >
          Monthly performance
        </p>

      </div>

      <button
        className="rounded-2xl bg-[#EFE2CB] px-5 py-2 font-semibold text-[#8D6732]"
        style={{
paddingLeft:"20px",
 paddingRight:"20px",
          transform: "translate(-40px,0px)",
        }}
      >
        Monthly
      </button>

    </div>


    {/* Dummy Chart */}

    <div
      className="mt-8 flex h-[300px] items-end justify-between rounded-3xl bg-white p-6"
      style={{
        transform: "translate(-2px,15px)scale(0.9)",
      }}
    >

      {[90,150,120,210,180,240,300].map((h,i)=>(
        <div
          key={i}
          className="flex flex-col items-center"
          style={{
            transform:"translate(1px,0px)",
          }}
        >

          <div
            className="w-10 rounded-full bg-gradient-to-t from-[#B68B4A] to-[#E6D0A5]"
            style={{
              height:`${h}px`,
              transform:"translate(0px,0px)",
            }}
          />

          <p
            className="mt-3 text-sm text-[#7A6B59]"
            style={{
              transform:"translate(px,0px)",
            }}
          >
            {["Jan","Feb","Mar","Apr","May","Jun","Jul"][i]}
          </p>

        </div>
      ))}

    </div>

  </div>



  {/* Today Summary */}

  <div
    className="rounded-[32px] border border-[#E8DDCC] bg-[#FFFDF9] p-8 shadow-sm"
    style={{
      transform:"translate(0px,0px)",
    }}
  >

    <h2
      className="text-3xl font-bold text-[#3D3023]"
      style={{
        transform:"translate(50px,10px) scale(0.95)",
      }}
    >
      Today's Summary
    </h2>

    <p
      className="mt-2 text-[#7A6B59]"
      style={{
        transform:"translate(20px,25px)",
      }}
    >
      Store activity
    </p>


    <div className="mt-10 space-y-6">

      {[
  ["Total Orders", dashboard.totalOrders],
  ["Customers", dashboard.totalCustomers],
  ["Products", dashboard.totalProducts],
  ["Revenue", `₹${dashboard.totalRevenue}`],
].map((item)=>(
        <div
          key={item[0]}
          className="rounded-2xl bg-[#FAF5EC] p-5"
          style={{
            transform:"translate(0px,25px) scale(0.9)",
          }}
        >

          <div
            className="flex items-center justify-between"
            style={{
              transform:"translate(0px,0px)",
            }}
          >

            <p
              className="text-[#7A6B59]"
              style={{
                transform:"translate(0px,0px)",
              }}
            >
              {item[0]}
            </p>

            <h3
              className="text-2xl font-bold text-[#3D3023]"
              style={{
                transform:"translate(0px,0px)",
              }}
            >
              {item[1]}
            </h3>

          </div>

        </div>
      ))}

    </div>

  </div>

</div>

{/* ===================== PART 2B ===================== */}

<div className="grid grid-cols-3 gap-7">

  {/* Revenue Analytics */}

  <div
    className="col-span-2 rounded-[32px] border border-[#E8DDCC] bg-[#FFFDF9] p-8 shadow-sm"
    style={{
      transform: "translate(10px,0px)scale(0.95)",
    }}
  >

    <div
      className="flex items-center justify-between"
      style={{
        transform: "translate(0px,0px)",
      }}
    >

      <div
        style={{
          transform: "translate(0px,0px)",
        }}
      >

        <h2
          className="text-3xl font-bold text-[#3D3023]"
          style={{
            transform: "translate(50px,8px)scale(0.9)",
          }}
        >
          Revenue Analytics
        </h2>

        <p
          className="mt-2 text-[#7A6B59]"
          style={{
            transform: "translate(130px,0px)",
          }}
        >
          Last 7 Months
        </p>

      </div>

      <div
        className="rounded-2xl bg-[#F2E4CB] px-5 py-2"
        style={{
          transform: "translate(-40px,0px)",
        }}
      >
        <span
          className="font-semibold text-[#9D6C22]"
          style={{
paddingLeft:"20px",
 paddingRight:"20px",

            transform: "translate(21px,0px) scale(0.9) ",
          }}
        >
          Revenue
        </span>
      </div>

    </div>

    {/* Dummy Graph */}

    <div
      className="mt-10 flex h-[260px] items-end justify-between rounded-3xl bg-white px-8 py-6"
      style={{
        transform: "translate(0px,0px)",
      }}
    >

      {[80,140,110,190,170,230,280].map((h,i)=>(
        <div
          key={i}
          className="flex flex-col items-center"
          style={{
            transform:"translate(0px,18px) scale(0.81)",
          }}
        >

          <div
            className="w-12 rounded-full bg-gradient-to-t from-[#B6884D] to-[#E9D4A7]"
            style={{
              height:`${h}px`,
              transform:"translate(0px,0px)",
            }}
          />

          <p
            className="mt-3 text-sm text-[#7A6B59]"
            style={{
              transform:"translate(5px,-3px) ",
            }}
          >
            {["Jan","Feb","Mar","Apr","May","Jun","Jul"][i]}
          </p>

        </div>
      ))}

    </div>

  </div>



  {/* Monthly Growth */}

  <div
    className="rounded-[32px] border border-[#E8DDCC] bg-[#FFFDF9] p-8 shadow-sm"
    style={{
      transform:"translate(0px,10px) ",
    }}
  >

    <h2
      className="text-3xl font-bold text-[#3D3023]"
      style={{
        transform:"translate(10px,15px)  scale(0.91)",
      }}
    >
      Growth
    </h2>

    <p
      className="mt-2 text-[#7A6B59]"
      style={{
        transform:"translate(27px,8px)",
      }}
    >
      Compared to last month
    </p>

    <h1
      className="mt-10 text-6xl font-black text-[#B6884D]"
      style={{
        transform:"translate(-25px,0px) scale(0.71)",
      }}
    >
     {dashboard.totalOrders > 0 ? "+100%" : "0%"}
    </h1>

    <p
      className="mt-4 text-[#7A6B59]"
      style={{
        transform:"translate(20px,0px)",
      }}
    >
      Overall sales increased significantly.
    </p>

    <div
      className="mt-10 h-3 rounded-full bg-[#EEE3D2]"
      style={{
        transform:"translate(0px,5px) scale(0.91)",
      }}
    >

      <div
        className="h-3 rounded-full bg-gradient-to-r from-[#B6884D] to-[#DDBE86]"
        style={{
          width:"78%",
          transform:"translate(0px,0px)",
        }}
      />

    </div>

    <div
      className="mt-8 flex justify-between"
      style={{
        transform:"translate(0px,10px) scale(0.91)",
      }}
    >

      <div
        style={{
          transform:"translate(0px,0px)",
        }}
      >
        <h3 className="text-xl font-bold text-[#3D3023]">
         {dashboard.totalOrders}
        </h3>

        <p className="text-[#7A6B59]">
          Previous
        </p>
      </div>

      <div
        style={{
          transform:"translate(0px,0px)",
        }}
      >
        <h3 className="text-xl font-bold text-[#3D3023]">
         ₹{dashboard.totalRevenue}
        </h3>

        <p className="text-[#7A6B59]">
          Current
        </p>
      </div>

    </div>

  </div>

</div>

{/* ===================== PART 3 ===================== */}

<div className="grid grid-cols-3 gap-7">

  {/* Recent Orders */}

  <div
    className="col-span-2 rounded-[32px] border border-[#E8DDCC] bg-[#FFFDF9] p-8 shadow-sm"
    style={{
      transform: "translate(10px,0px) scale(0.95)",
    }}
  >

    <div
      className="flex items-center justify-between"
      style={{
        transform: "translate(0px,0px)",
      }}
    >

      <h2
        className="text-3xl font-bold text-[#3D3023]"
        style={{
          transform: "translate(25px,10px) scale(0.91)",
        }}
      >
        Recent Orders
      </h2>

      <button
        className="rounded-xl bg-[#F3E4CB] px-4 py-2 text-[#8D6835] font-semibold"
        style={{
paddingLeft:"20px",
 paddingRight:"20px",
          transform: "translate(-35px,20px)scale(0.91)",
        }}
      >
        View All
      </button>

    </div>

    <table className="mt-8 w-full">

      <thead>

        <tr className="border-b border-[#ECE2D3]">

          {["Order ID","Customer","Status","Total"].map((head)=>(
            <th
              key={head}
              className="pb-4 text-left text-[#8C7862]"
              style={{

                transform:"translate(15px,29px) scale(0.95)",
              }}
            >
              {head}
            </th>
          ))}

        </tr>

      </thead>

     <tbody>

 {dashboard.recentOrders.length === 0 ? (

<tr>

<td
  colSpan="4"
  className="py-10 text-center text-[#7A6B59]"
>
No Orders Found
</td>

</tr>

) : (

dashboard.recentOrders.map((order) => (

    <tr
      key={order._id}
      className="border-b border-[#F1EBDF] hover:bg-[#FCF9F4]"
      style={{
        transform: "translate(0px,29px) scale(0.95)",
      }}
    >

      <td
        className="py-5 font-semibold text-[#3D3023]"
        style={{
          transform: "translate(-10px,0px)",
        }}
      >
        #{order._id.slice(-6)}
      </td>

      <td
        className="text-[#6F6252]"
        style={{

          transform: "translate(0px,0px)",
        }}
      >
        {order.user?.name}
      </td>

      <td
        style={{

          transform: "translate(5px,0px)",
        }}
      >
        <span className="rounded-full bg-[#EFE4D1] px-4 py-1 text-[#A37430]"
  style={{
paddingLeft:"20px",
 paddingRight:"20px",
          transform: "translate(5px,0px)",
        }}
>
          {order.status}

        </span>
      </td>

      <td
        className="font-bold text-[#3D3023]"
        style={{
          transform: "translate(16px,0px)",
        }}
      >
        ₹{order.totalPrice}
      </td>

    </tr>

     ))

  )}

</tbody>

    </table>

  </div>



  {/* Right Side */}

  <div className="space-y-7">

    {/* Top Products */}

    <div
      className="rounded-[32px] border border-[#E8DDCC] bg-[#FFFDF9] p-7 shadow-sm"
      style={{
        transform:"translate(0px,25px)",
      }}
    >

      <h2
        className="text-2xl font-bold text-[#3D3023]"
        style={{
          transform:"translate(25px,5px) scale(0.81)",
        }}
      >
        Top Products
      </h2>

      <div className="mt-7 space-y-5">

        {[
          ["Wooden Bowl","320 Sales"],
          ["Clay Pot","285 Sales"],
          ["Wall Clock","250 Sales"],
        ].map((item,index)=>(

          <div
            key={index}
            className="flex items-center gap-4 rounded-2xl bg-[#FAF6EE] p-4"
            style={{
              transform:"translate(0px,3px) scale(0.79)",
            }}
          >

            <div
              className="h-14 w-14 rounded-xl bg-[#E8D3A8]"
              style={{
                transform:"translate(0px,0px)",
              }}
            />

            <div
              style={{
                transform:"translate(0px,0px)",
              }}
            >

              <h3 className="font-bold text-[#3D3023]">
                {item[0]}
              </h3>

              <p className="text-[#7A6B59]">
                {item[1]}
              </p>

            </div>

          </div>

        ))}

      </div>

    </div>



    {/* Low Stock */}

    <div
      className="rounded-[32px] border border-[#E8DDCC] bg-[#FFFDF9] p-7 shadow-sm"
      style={{
        transform:"translate(0px,35px)scale(0.96)",
      }}
    >

      <h2
        className="text-2xl font-bold text-[#3D3023]"
        style={{
          transform:"translate(10px,4px) scale(0.8)",
        }}
      >
        Low Stock
      </h2>

      <div className="mt-7 space-y-4">

        {[
          ["Flower Vase","3 Left"],
          ["Hand Basket","2 Left"],
          ["Tea Cup","5 Left"],
        ].map((item,index)=>(

          <div
            key={index}
            className="flex items-center justify-between rounded-2xl bg-[#FFF3EE] p-4"
            style={{
              transform:"translate(1px,2px) scale(0.9)",
            }}
          >

            <div
              style={{
                transform:"translate(0px,0px)",
              }}
            >

              <h3 className="font-semibold text-[#3D3023]">
                {item[0]}
              </h3>

              <p className="text-[#7A6B59]">
                {item[1]}
              </p>

            </div>

            <span
              className="rounded-full bg-red-100 px-3 py-1 text-sm font-bold text-red-600"
              style={{
paddingLeft:"20px",
 paddingRight:"20px",
                transform:"translate(0px,0px)",
              }}
            >
              Alert
            </span>

          </div>

        ))}

      </div>

    </div>

  </div>

</div>

{/* ===================== PART 4 ===================== */}

<div className="grid grid-cols-3 gap-7">

  {/* Latest Activity */}

  <div
    className="col-span-2 rounded-[32px] border border-[#E8DDCC] bg-[#FFFDF9] p-8 shadow-sm"
    style={{
      transform: "translate(32px,0px)",
    }}
  >

    <h2
      className="text-3xl font-bold text-[#3D3023]"
      style={{
        transform: "translate(-120px,0px) scale(0.65)",
      }}
    >
      Latest Activity
    </h2>

    <div className="mt-8 space-y-6">

      {dashboard.recentOrders.slice(0,4).map((order,index)=>(

        <div
          key={index}
          className="flex items-center gap-5 rounded-2xl bg-[#FAF6EE] p-5"
          style={{
            transform:"translate(0px,-1px) scale(0.98)",
          }}
        >

          <div
            className="h-4 w-4 rounded-full bg-[#C39A57]"
            style={{
              transform:"translate(10px,-2px) scale(0.8)",
            }}
          />

          <div
            className="flex-1"
            style={{
              transform:"translate(-30px,0px) scale(0.9)",
            }}
          >

            <h3
              className="font-bold text-[#3D3023]"
              style={{
                transform:"translate(0px,0px)",
              }}
            >
              Order Placed
            </h3>

            <p
              className="text-[#7A6B59]"
              style={{
                transform:"translate(-30px,0px) scale(0.9)",
              }}
            >
              {order.user?.name}
            </p>

          </div>

          <span
            className="text-sm text-[#9A8A76]"
            style={{

              transform:"translate(-20px,0px)",
            }}
          >
           {order.status}
          </span>

        </div>

      ))}

    </div>

  </div>



  {/* Customer Reviews */}

  <div
    className="rounded-[32px] border border-[#E8DDCC] bg-[#FFFDF9] p-7 shadow-sm"
    style={{
      transform:"translate(5px,35px) scale(0.95)",
    }}
  >

    <h2
      className="text-2xl font-bold text-[#3D3023]"
      style={{
        transform:"translate(10px,8px) scale(0.91)",
      }}
    >
      Reviews
    </h2>

    <div className="mt-7 space-y-5">

      {[
        ["⭐⭐⭐⭐⭐","Excellent Products"],
        ["⭐⭐⭐⭐","Fast Delivery"],
        ["⭐⭐⭐⭐⭐","Very Happy"],
      ].map((item,index)=>(

        <div
          key={index}
          className="rounded-2xl bg-[#FAF6EE] p-5"
          style={{
            transform:"translate(-20px,10px) scale(0.81)",
          }}
        >

          <p
            className="text-xl"
            style={{
              transform:"translate(0px,0px)",
            }}
          >
            {item[0]}
          </p>

          <h3
            className="mt-2 font-bold text-[#3D3023]"
            style={{
              transform:"translate(0px,0px)",
            }}
          >
            {item[1]}
          </h3>

        </div>

      ))}

    </div>

  </div>

</div>



{/* Bottom Stats */}

<div
  className="mt-8 rounded-[32px] border border-[#E8DDCC] bg-gradient-to-r from-[#FFFDF8] to-[#F7EFD9] p-8 shadow-sm"
  style={{
    transform:"translate(0px,45px)",
  }}
>

  <div
    className="grid grid-cols-4 gap-6"
    style={{
      transform:"translate(0px,0px)",
    }}
  >

  {[
  ["Products", dashboard.totalProducts],
  ["Orders", dashboard.totalOrders],
  ["Customers", dashboard.totalCustomers],
  ["Revenue", `₹${dashboard.totalRevenue}`],
].map((item, index) => (

  <div
    key={index}
    className="text-center"
  >

    <h1
      className="text-4xl font-black text-[#B6884D]"
    >
      {item[1]}
    </h1>

    <p className="mt-2 text-[#7A6B59]">
      {item[0]}
    </p>

  </div>

))}

  </div>

</div>



{/* Footer */}

<div
  className="mt-10 flex items-center justify-between"
  style={{
    transform:"translate(0px,0px)",
  }}
>

  <p
    className="text-[#8D7A63]"
    style={{
      transform:"translate(0px,0px)",
    }}
  >
    Craft Corner Admin Dashboard
  </p>

  <p
    className="text-[#8D7A63]"
    style={{
      transform:"translate(0px,0px)",
    }}
  >
    Version 2.0
  </p>

</div>
</div>

 );
}