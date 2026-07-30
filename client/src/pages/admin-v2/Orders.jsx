import { useEffect, useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import {
  FaArrowLeft,
  FaSearch,
  FaFilter,
  FaCalendarAlt,
  FaChevronDown
} from "react-icons/fa";

export default function Orders() {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] =
    useState("All");
const navigate = useNavigate();


  const fetchOrders = async () => {

    try {

      const res = await api.get("/orders");

      setOrders(res.data.orders || []);

    }

    catch (error) {

      toast.error(

        error.response?.data?.message ||

        "Failed to fetch orders"

      );

    }

    finally {

      setLoading(false);

    }

  };



  useEffect(() => {

    fetchOrders();

  }, []);



  const updateStatus = async (

    id,

    status

  ) => {

    try {

      await api.put(

        `/orders/${id}`,

        {

          status

        }

      );

      toast.success(

        "Order Updated"

      );

      fetchOrders();

    }

    catch (error) {

      toast.error(

        error.response?.data?.message ||

        "Update Failed"

      );

    }

  };



  const filteredOrders =

    orders.filter((order)=>{

      const keyword =

      search.toLowerCase();

      const customer =

      order.user?.name

      ?.toLowerCase() || "";

      const orderId =

      order._id

      ?.toLowerCase() || "";

      const matchSearch =

      customer.includes(keyword)

      ||

      orderId.includes(keyword);

      const matchStatus =

      statusFilter==="All"

      ||

      order.status===statusFilter;

      return matchSearch && matchStatus;

    });



  if(loading){

    return(

      <div
  className="
  min-h-screen
  bg-[#F7F8FC]
  pb-45
  "



        

      

      >

        <h2

          className="
          text-3xl
          font-bold
          text-gray-500
          "

          style={{

            transform:
            "translateX(px) translateY(px)"

          }}

        >

          Loading Orders...

        </h2>

      </div>

    );

  }



  return(

    <div

      className="
      min-h-screen
      bg-[#F7F8FC]
      "

      style={{

        padding:"65px",

        transform:
        "translateX(0px) translateY(0px)"

      }}

    >



      <div

        className="
        flex
        justify-between
        items-center
        flex-wrap
        gap-8
        mb-10
        "

        style={{

          transform:
          "translateX(-20px) translateY(-15px)"

        }}

      >



        <div

          style={{

            transform:
            "translateX(0px) translateY(0px)"

          }}

        >

          <button

            onClick={()=>window.history.back()}

            className="
            flex
            items-center
            gap-2
            text-[#556B2F]
            font-semibold
            mb-5
            "

            style={{

              transform:
              "translateX(10px) translateY(0px)"

            }}

          >

            <FaArrowLeft/>

            Back

          </button>



          <h1

            className="
            text-5xl
            font-bold
            text-[#111827]
            "

            style={{

              transform:
              "translateX(0px) translateY(0px) scale(0.96)"

            }}

          >

            Orders

          </h1>



          <p

            className="
            text-gray-500
            mt-3
            text-lg
            "

            style={{

              transform:
              "translateX(10px) translateY(0px)"

            }}

          >

            Manage customer orders and track delivery status.

          </p>

        </div>

        <div

          className="
          flex
          items-center
          gap-4
          flex-wrap
          "

          style={{

            transform:
            "translateX(-20px) translateY(0px)"

          }}

        >



          <div

            className="
            bg-white
            border
            border-gray-200
            rounded-2xl
            shadow-sm
            flex
            items-center
            px-5
            "

            style={{

              width:"340px",

              height:"58px",

              transform:
              "translateX(0px) translateY(0px)"

            }}

          >

            <FaSearch

              className="text-gray-400"

              style={{

                transform:
                "translateX(20px) translateY(0px)"

              }}

            />

            <input

              type="text"

              placeholder="Search Orders..."

              value={search}

              onChange={(e)=>

                setSearch(

                  e.target.value

                )

              }

              className="
              flex-1
              ml-4
              bg-transparent
              outline-none
              "

              style={{

                transform:
                "translateX(30px) translateY(0px)"

              }}

            />

          </div>



          <button

            className="
            bg-white
            border
            border-gray-200
            rounded-2xl
            shadow-sm
            flex
            items-center
            gap-3
            px-6
            "

            style={{

              height:"58px",

              transform:
              "translateX(-6px) translateY(0px)"

            }}

          >

            <FaFilter

              style={{

                transform:
                "translateX(8px) translateY(0px) scale(0.9)"

              }}

            />

            Filters

          </button>



          <button

            className="
            bg-white
            border
            border-gray-200
            rounded-2xl
            shadow-sm
            flex
            items-center
            gap-3
            px-6
            "

            style={{

              height:"58px",

              transform:
              "translateX(10px) translateY(0px)"

            }}

          >

            <FaCalendarAlt

              style={{

                transform:
                "translateX(6px) translateY(0px)"

              }}

            />

            Date Range


          </button>

        </div>

      </div>



      <div
  className="
  bg-white
  rounded-[30px]
  shadow-lg
  border
  border-gray-100
  overflow-hidden
  min-h-[700px]
  "


        style={{

          transform:
          "translateX(-15px) translateY(0px) scale(1.02)"

        }}

      >



        <div

          className="
          px-8
          py-6
          border-b
          border-gray-100
          flex
          items-center
          justify-between
          "

          style={{

            transform:
            "translateX(20px) translateY(5px)"

          }}

        >

          <div

            style={{

              transform:
              "translateX(10px) translateY(0px)"

            }}

          >

            <h2

              className="
              text-2xl
              font-bold
              text-gray-800
              "

              style={{

                transform:
                "translateX(0px) translateY(0px)"

              }}

            >

              Order List

            </h2>

            <p

              className="
              text-gray-500
              mt-1
              "

              style={{

                transform:
                "translateX(1px) translateY(0px)"

              }}

            >

              Total Orders :

              {" "}

              {filteredOrders.length}

            </p>

          </div>

        </div>

        <table

          className="w-full"

          style={{

            transform:
            "translateX(10px) translateY(12px)"

          }}

        >

          <thead

            style={{

              transform:
              "translateX(50px) translateY(0px)"

            }}

          >

            <tr

              className="
              bg-[#FAFBFC]
              border-b
              border-gray-200
              "

              style={{

                transform:
                "translateX(7px) translateY(0px)"

              }}

            >

              <th

                className="
                px-8
                py-5
                text-left
                text-sm
                font-semibold
                text-gray-500
                "

                style={{

                  transform:
                  "translateX(0px) translateY(0px)"

                }}

              >

                Order ID

              </th>

              <th

                className="
                px-8
                py-5
                text-left
                text-sm
                font-semibold
                text-gray-500
                "

                style={{

                  transform:
                  "translateX(0px) translateY(0px)"

                }}

              >

                Customer

              </th>

              <th

                className="
                px-8
                py-5
                text-left
                text-sm
                font-semibold
                text-gray-500
                "

                style={{

                  transform:
                  "translateX(-25px) translateY(0px)"

                }}

              >

                Date

              </th>

              <th

                className="
                px-8
                py-5

                text-left
                text-sm
                font-semibold
                text-gray-500
                "

                style={{

                  transform:
                  "translateX(-55px) translateY(0px)"

                }}

              >

                Amount

              </th>

              <th

                className="
                px-8
                py-5
                text-left
                text-sm
                font-semibold
                text-gray-500
                "

                style={{

                  transform:
                  "translateX(-45px) translateY(0px)"

                }}

              >

                Status

              </th>

              <th

                className="
                px-8
                py-5
                text-center
                text-sm
                font-semibold
                text-gray-500
                "

                style={{

                  transform:
                  "translateX(-65px) translateY(0px)"

                }}

              >

                Action

              </th>

            </tr>

          </thead>



          <tbody

            style={{

              transform:
              "translateX(3px) translateY(0px)"

            }}

          >

            {

              filteredOrders.length === 0

              ?

              (

                <tr

                  style={{

                    transform:
                    "translateX(0px) translateY(0px)"

                  }}

                >

                  <td

                    colSpan={6}

                    className="py-24 text-center"

                    style={{

                      transform:
                      "translateX(0px) translateY(0px)"

                    }}

                  >

                    <div

                      className="
                      flex
                      flex-col
                      items-center
                      "

                      style={{

                        transform:
                        "translateX(20px) translateY(0px)"

                      }}

                    >

                      <div

                        className="
                        w-24
                        h-24
                        rounded-full
                        bg-gray-100
                        flex
                        items-center
                        justify-center
                        text-4xl
                        "

                        style={{

                          transform:
                          "translateX(30px) translateY(30px)"

                        }}

                      >

                        📦

                      </div>



                      <h2

                        className="
                        text-2xl
                        font-bold
                        mt-6
                        "

                        style={{

                          transform:
                          "translateX(1px) translateY(0px)"

                        }}

                      >

                        No Orders Found

                      </h2>



                      <p

                        className="
                        text-gray-500
                        mt-2
                        "

                        style={{

                          transform:
                          "translateX(0px) translateY(0px)"

                        }}

                      >

                        Try another search keyword.

                      </p>

                    </div>

                  </td>

                </tr>

              )

              :

              filteredOrders.map((order)=>(

                <tr

                  key={order._id}

                  className="
                  border-b
                  border-gray-100
                  hover:bg-[#FAFAFA]
                  duration-300
                  "

                  style={{

                    transform:
                    "translateX(10px) translateY(-2px)scale(0.93)"

                  }}

                >

                  <td

                    className="px-8 py-8"

                    style={{

                      transform:
                      "translateX(0px) translateY(0px)"

                    }}

                  >

                    <p

                      className="
                      font-semibold
                      text-[#1F2937]
                      "

                      style={{

                        transform:
                        "translateX(0px) translateY(0px)"

                      }}

                    >

                      #{order._id.slice(-8)}

                    </p>

                  </td>



                  <td

                    className="px-8 py-28"

                    style={{

                      transform:
                      "translateX(0px) translateY(0px)"

                    }}

                  >

                    <div

                      className="
                      flex
                      items-center
                      gap-4
                      "

                      style={{

                        transform:
                        "translateX(0px) translateY(0px)"

                      }}

                    >

                      <div

                        className="
                        w-12
                        h-12
                        rounded-full
                        bg-[#556B2F]
                        text-white
                        flex
                        items-center
                        justify-center
                        font-bold
                        "
 style={{
  background:
    "linear-gradient(135deg, #C58B2B 0%, #F3D58A 100%)",
  boxShadow: "0 8px 20px rgba(197,139,43,0.28)",
  transform: "translateX(-10px) translateY(0px) scale(0.8)"
}}

                      >

                        {

                          order.user?.name

                          ?.charAt(0)

                          ?.toUpperCase()

                        }

                      </div>



                      <div

                        style={{

                          transform:
                          "translateX(-20px) translateY(3px)"

                        }}

                      >

                        <h3

                          className="font-semibold"

                          style={{

                            transform:
                            "translateX(0px) translateY(0px)"

                          }}

                        >

                          {

                            order.user?.name ||

                            "Unknown"

                          }

                        </h3>



                        <p

                          className="
                          text-sm
                          text-gray-500
                          "

                          style={{

                            transform:
                            "translateX(0px) translateY(0px)"

                          }}

                        >

                          Customer

                        </p>

                      </div>

                    </div>

                  </td>



                  <td

                    className="px-8 py-20"

                    style={{

                      transform:
                      "translateX(0px) translateY(0px)"

                    }}

                  >

                    {

                      new Date(

                        order.createdAt

                      ).toLocaleDateString()

                    }

                  </td>



                  <td

                    className="
                    px-8
                    py-6
                    font-semibold
                    "

                    style={{

                      transform:
                      "translateX(0px) translateY(0px)"

                    }}

                  >

                    ₹{order.totalPrice}

                  </td>

                  <td

                    className="px-8 py-20"

                    style={{

                      transform:
                      "translateX(0px) translateY(0px)"

                    }}

                  >

                    <span
  className={`
    px-4
    py-2
    rounded-full
    text-sm
    font-semibold
    ${
      order.status === "Delivered"
        ? "bg-green-100 text-green-700"
        : order.status === "Shipped"
        ? "bg-blue-100 text-blue-700"
        : order.status === "Pending"
        ? "bg-yellow-100 text-yellow-700"
        : "bg-red-100 text-red-700"
    }
  `}
>
  <span
    style={{
      display: "inline-block",
      transform: "translateX(0px) scale(0.88)" // Right
      // transform: "translateX(-10px)" // Left
    }}
  >
    {order.status}
  </span>
</span>
                  </td>



                  <td

                    className="
                    px-8
                    py-6
                    "

                    style={{

                      transform:
                      "translateX(10px) translateY(0px)"

                    }}

                  >

                    <div

                      className="
                      flex
                      justify-center
                      "

                      style={{

                        transform:
                        "translateX(1px) translateY(0px)"

                      }}

                    >



<button

onClick={()=>
navigate(`/admin-v2/orders/${order._id}`)
}

className="
px-5
py-3
rounded-xl
bg-[#C49A4A]
text-white
font-semibold
shadow-sm
hover:bg-[#465927]
duration-300
"

style={{
  paddingLeft:"30px",
  paddingRight:"30px",
transform:
"translateX(-50px) translateY(0px)"
}}

>

View

</button>
                      <div

                        className="relative"

                        style={{

                          transform:
                          "translateX(0px) translateY(0px)"

                        }}

                      >

                        <select

                          value={order.status}

                          onChange={(e)=>

                            updateStatus(

                              order._id,

                              e.target.value

                            )

                          }

                          className="
appearance-none
bg-white
border
border-gray-200
rounded-xl
w-34
px-8
py-3
pr-12
outline-none
font-medium
shadow-sm
hover:border-[#556B2F]
duration-300
"
 style={{
    width: "130px",
    appearance: "none",
    WebkitAppearance: "none",
    MozAppearance: "none",
    textIndent: "20px"
  }}

                        >

                          <option value="Pending">

                            Pending

                          </option>

                          <option value="Shipped">

                            Shipped

                          </option>

                          <option value="Delivered">

                            Delivered

                          </option>

                          <option value="Cancelled">

                            Cancelled

                          </option>

                        </select>

                        <FaChevronDown

                          className="
                          absolute
                          right-2
                          top-1/2
                          -translate-y-1/2
                          text-gray-400
                          pointer-events-none
                          "

                          style={{

                            transform:
                            "translateX(-1px) translateY(0px) scale(0.7)"

                          }}

                        />

                      </div>

                    </div>

                  </td>

                </tr>

              ))

            }

          </tbody>

        </table>
      <div

        className="
        flex
        items-center
        justify-between
        flex-wrap
        gap-5
        px-8
        py-6
        border-t
        border-gray-100
        bg-white
        "

        style={{

          transform:
          "translateX(0px) translateY(0px)"

        }}

      >

        <p

          className="
          text-gray-500
          "

          style={{

            transform:
            "translateX(51px) translateY(10px)"

          }}

        >

          Showing. 

          <span

            className="
            font-semibold
            text-[#556B2F]
            mx-2
            "

            style={{

              transform:
              "translateX(0px) translateY(0px)"

            }}

          >

            {filteredOrders.length}

          </span>

        .Orders

        </p>



        <div

          className="
          flex
          items-center
          gap-3
          "

          style={{

            transform:
            "translateX(20px) translateY(0px)"

          }}

        >

          <button

            className="
            w-10
            h-10
            rounded-xl
            border
            border-gray-200
            bg-white
            hover:bg-gray-50
            duration-300
            "

            style={{

              transform:
              "translateX(-100px) translateY(40px)"

            }}

          >

            1

          </button>



          <button

            className="
            w-10
            h-10
            rounded-xl
            bg-[#556B2F]
            text-white
            shadow-md
            "

            style={{

              transform:
              "translateX(-100px) translateY(40px)"

            }}

          >

            2

          </button>



          <button

            className="
            w-10
            h-10
            rounded-xl
            border
            border-gray-200
            bg-white
            hover:bg-gray-50
            duration-300
            "

            style={{

              transform:
              "translateX(-100px) translateY(40px)"

            }}

          >

            3

          </button>

        </div>

      </div>

    </div>

  </div>

);

}