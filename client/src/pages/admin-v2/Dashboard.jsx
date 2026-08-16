import { useEffect, useMemo, useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

import {
  FaDollarSign,
  FaShoppingBag,
  FaUsers,
  FaBoxOpen,
  FaArrowUp,
  FaArrowDown,
  FaStar,
} from "react-icons/fa";

export default function Dashboard() {
  const [dashboard, setDashboard] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalCustomers: 0,
    totalRevenue: 0,
    recentOrders: [],
  });

  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    try {
      setLoading(true);

      const [dashboardRes, productsRes, ordersRes] =
        await Promise.all([
          api.get("/dashboard"),
          api.get("/products"),
          api.get("/orders"),
        ]);

      setDashboard({
        totalProducts: dashboardRes.data?.totalProducts || 0,
        totalOrders: dashboardRes.data?.totalOrders || 0,
        totalCustomers: dashboardRes.data?.totalCustomers || 0,
        totalRevenue: dashboardRes.data?.totalRevenue || 0,
        recentOrders: dashboardRes.data?.recentOrders || [],
      });

      setProducts(productsRes.data?.products || []);
      setOrders(ordersRes.data?.orders || []);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Dashboard data load failed"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const monthKey = (date) => {
    const d = new Date(date);
    return `${d.getFullYear()}-${String(
      d.getMonth() + 1
    ).padStart(2, "0")}`;
  };

  const currentMonth = new Date();

  const currentMonthRevenue = useMemo(() => {
    return orders
      .filter((order) => {
        const date = new Date(order.createdAt);
        return (
          date.getMonth() === currentMonth.getMonth() &&
          date.getFullYear() === currentMonth.getFullYear()
        );
      })
      .reduce(
        (sum, order) => sum + Number(order.totalPrice || 0),
        0
      );
  }, [orders]);

  const previousMonthRevenue = useMemo(() => {
    const previous = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() - 1,
      1
    );

    return orders
      .filter((order) => {
        const date = new Date(order.createdAt);
        return (
          date.getMonth() === previous.getMonth() &&
          date.getFullYear() === previous.getFullYear()
        );
      })
      .reduce(
        (sum, order) => sum + Number(order.totalPrice || 0),
        0
      );
  }, [orders]);

  const revenueGrowth = useMemo(() => {
    if (previousMonthRevenue === 0) {
      return currentMonthRevenue > 0 ? 100 : 0;
    }

    return Math.round(
      ((currentMonthRevenue - previousMonthRevenue) /
        previousMonthRevenue) *
        100
    );
  }, [currentMonthRevenue, previousMonthRevenue]);

  const stats = [
    {
      title: "Revenue",
      value: `₹${Number(dashboard.totalRevenue || 0).toLocaleString(
        "en-IN"
      )}`,
      growth: revenueGrowth,
      icon: <FaDollarSign />,
    },
    {
      title: "Orders",
      value: dashboard.totalOrders,
      growth: null,
      icon: <FaShoppingBag />,
    },
    {
      title: "Customers",
      value: dashboard.totalCustomers,
      growth: null,
      icon: <FaUsers />,
    },
    {
      title: "Products",
      value: dashboard.totalProducts,
      growth: null,
      icon: <FaBoxOpen />,
    },
  ];

  const recentOrders = useMemo(() => {
    return [...orders]
      .sort(
        (a, b) =>
          new Date(b.createdAt) - new Date(a.createdAt)
      )
      .slice(0, 5);
  }, [orders]);

  const topProducts = useMemo(() => {
    const salesMap = new Map();

    orders.forEach((order) => {
      (order.items || []).forEach((item) => {
        const product = item.product;

        if (!product) return;

        const id =
          product._id ||
          product.id ||
          product.name;

        const previous = salesMap.get(id) || {
          id,
          name: product.name || "Unknown Product",
          image: product.images?.[0] || "",
          sales: 0,
        };

        previous.sales += Number(item.quantity || 0);
        salesMap.set(id, previous);
      });
    });

    return [...salesMap.values()]
      .sort((a, b) => b.sales - a.sales)
      .slice(0, 3);
  }, [orders]);

  const lowStockProducts = useMemo(() => {
    return [...products]
      .filter(
        (product) =>
          Number(product.stock ?? Infinity) <= 5
      )
      .sort(
        (a, b) =>
          Number(a.stock || 0) -
          Number(b.stock || 0)
      )
      .slice(0, 3);
  }, [products]);

  const monthlySales = useMemo(() => {
    const result = [];

    for (let i = 6; i >= 0; i--) {
      const date = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() - i,
        1
      );

      const key = monthKey(date);

      const revenue = orders
        .filter(
          (order) =>
            monthKey(order.createdAt) === key
        )
        .reduce(
          (sum, order) =>
            sum + Number(order.totalPrice || 0),
          0
        );

      result.push({
        label: date.toLocaleDateString("en-US", {
          month: "short",
        }),
        revenue,
      });
    }

    return result;
  }, [orders]);

  const maxMonthlyRevenue = Math.max(
    ...monthlySales.map((item) => item.revenue),
    1
  );

  const reviewData = useMemo(() => {
    const rows = [];

    products.forEach((product) => {
      const productReviews = Array.isArray(
        product.reviews
      )
        ? product.reviews
        : [];

      if (productReviews.length) {
        productReviews.forEach((review) => {
          rows.push({
            rating: Number(
              review.rating ||
                review.stars ||
                product.rating ||
                0
            ),
            text:
              review.comment ||
              review.text ||
              product.name,
          });
        });
      } else if (
        product.rating !== undefined &&
        product.rating !== null
      ) {
        rows.push({
          rating: Number(product.rating),
          text: product.name,
        });
      }
    });

    return rows
      .filter((item) => item.rating > 0)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 3);
  }, [products]);

  const latestActivity = recentOrders.slice(0, 4);

  const bottomStats = [
    {
      label: "Total Orders",
      value: dashboard.totalOrders,
    },
    {
      label: "Customers",
      value: dashboard.totalCustomers,
    },
    {
      label: "Products",
      value: dashboard.totalProducts,
    },
    {
      label: "Revenue",
      value: `₹${Number(
        dashboard.totalRevenue || 0
      ).toLocaleString("en-IN")}`,
    },
  ];

  if (loading) {
    return (
      <div
        className="flex min-h-screen items-center justify-center bg-[#FAF7F0] text-3xl font-bold text-[#3D3023]"
        style={{
          padding: "30px",
          transform: "translate(0px,0px)",
        }}
      >
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div
      className="space-y-10 bg-[#FAF7F0]"
      style={{
        padding: "10px 4px 40px",
        transform: "translate(0px,0px)",
      }}
    >
      {/* HEADER */}

      <div
        className="flex items-center justify-between gap-5"
        style={{
          padding: "8px 8px 0",
          transform: "translate(0px,0px)",
        }}
      >
        <div
          style={{
            padding: "0",
            transform: "translate(3px,0px)",
          }}
        >
          <h1
            className="text-5xl font-black text-[#3D3023]"
            style={{
              padding: "0",
              margin: "0",
              transform: "translate(0px,0px)",
            }}
          >
            Dashboard
          </h1>

          <p
            className="text-lg text-[#7A6B59]"
            style={{
              padding: "0",
              marginTop: "10px",
              transform: "translate(0px,0px)",
            }}
          >
            Welcome back Admin. Here's your business overview.
          </p>
        </div>

        <div
          className="flex items-center gap-4"
          style={{
            padding: "0",
            transform: "translate(-10px,0px)",
          }}
        >
          <Link
            to="/"
            className="rounded-2xl border border-[#D6E2C8] bg-[#FFD08A] font-semibold text-[#556B2F] transition hover:bg-[#FFB347]"
            style={{
              padding: "13px 20px",
              transform: "translate(0px,0px)",
            }}
          >
            🏠 Visit Website
          </Link>

          <div
            className="rounded-3xl border border-[#E6DAC8] bg-white shadow-md"
            style={{
              padding: "12px 22px",
              transform: "translate(0px,0px)",
            }}
          >
            <p
              className="text-sm text-[#8D7A63]"
              style={{
                padding: "0",
                margin: "0",
                transform: "translate(0px,0px)",
              }}
            >
              Today
            </p>

            <h2
              className="text-xl font-bold text-[#3D3023]"
              style={{
                padding: "0",
                margin: "2px 0 0",
                transform: "translate(0px,0px)",
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
      </div>

      {/* STATS */}

      <div
        className="grid grid-cols-4 gap-7"
        style={{
          padding: "8px 6px 12px",
          transform: "translate(0px,0px)",
        }}
      >
        {stats.map((item, index) => (
          <div
            key={item.title}
            className="rounded-[30px] border border-[#E8DDCC] bg-[#FFFDF9] shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
            style={{
              padding: "26px 28px 22px",
              minHeight: "255px",
              transform: "translate(0px,0px)",
              boxSizing: "border-box",
            }}
          >
            <div
              className="flex items-start justify-between"
              style={{
                padding: "0",
                transform: "translate(0px,0px)",
              }}
            >
              <div
                className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F3E5CF] text-3xl text-[#B28442]"
                style={{
                  padding: "0",
                  transform: "translate(0px,0px)",
                }}
              >
                {item.icon}
              </div>

              {item.growth !== null && (
                <div
                  className={`flex items-center gap-1 rounded-full ${
                    item.growth >= 0
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                  style={{
                    padding: "8px 12px",
                    transform: "translate(0px,0px)",
                  }}
                >
                  {item.growth >= 0 ? (
                    <FaArrowUp size={11} />
                  ) : (
                    <FaArrowDown size={11} />
                  )}
                  {Math.abs(item.growth)}%
                </div>
              )}
            </div>

            <div
              style={{
                padding: "0",
                marginTop: "20px",
                transform: "translate(0px,0px)",
              }}
            >
              <h2
                className="text-5xl font-black text-[#3D3023]"
                style={{
                  padding: "0",
                  margin: "0",
                  transform: "translate(0px,0px)",
                }}
              >
                {item.value}
              </h2>

              <p
                className="text-lg font-medium text-[#857260]"
                style={{
                  padding: "0",
                  margin: "8px 0 0",
                  transform: "translate(0px,0px)",
                }}
              >
                {item.title}
              </p>
            </div>

            <div
              className="rounded-full bg-[#F4ECE0]"
              style={{
                height: "8px",
                padding: "0",
                marginTop: "34px",
                transform: "translate(0px,0px)",
                overflow: "hidden",
              }}
            >
              <div
                className="h-full rounded-full bg-[#6A8F3A]"
                style={{
                  width: `${
                    index === 0
                      ? Math.min(
                          Math.abs(revenueGrowth) || 0,
                          100
                        )
                      : index === 1
                      ? Math.min(
                          dashboard.totalOrders * 4,
                          100
                        )
                      : index === 2
                      ? Math.min(
                          dashboard.totalCustomers * 4,
                          100
                        )
                      : index === 3
                      ? Math.min(
                          dashboard.totalProducts * 4,
                          100
                        )
                      : 50
                  }%`,
                  padding: "0",
                  transform: "translate(0px,0px)",
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* RECENT ORDERS + TOP PRODUCTS + LOW STOCK */}

      <div
        className="grid grid-cols-3 gap-7"
        style={{
          padding: "0 6px",
          transform: "translate(0px,0px)",
        }}
      >
        <div
          className="col-span-2 rounded-[30px] border border-[#E8DDCC] bg-[#FFFDF9] shadow-sm"
          style={{
            padding: "24px 26px 26px",
            minHeight: "430px",
            transform: "translate(0px,0px)",
            boxSizing: "border-box",
          }}
        >
          <div
            className="flex items-center justify-between"
            style={{
              padding: "0 0 18px",
              transform: "translate(0px,0px)",
              borderBottom: "1px solid #ECE2D3",
            }}
          >
            <h2
              className="text-3xl font-bold text-[#3D3023]"
              style={{
                padding: "0",
                margin: "0",
                transform: "translate(0px,0px)",
              }}
            >
              Recent Orders
            </h2>

            <Link
              to="/admin-v2/orders"
              className="rounded-full bg-[#F3E4CB] font-semibold text-[#8D6835]"
              style={{
                padding: "7px 20px",
                transform: "translate(0px,0px)",
              }}
            >
              View All
            </Link>
          </div>

          <div
            style={{
              padding: "0",
              transform: "translate(0px,0px)",
              overflowX: "auto",
            }}
          >
            <table
              className="w-full"
              style={{
                padding: "0",
                margin: "0",
                borderCollapse: "collapse",
              }}
            >
              <thead>
                <tr
                  style={{
                    borderBottom: "1px solid #ECE2D3",
                    transform: "translate(0px,0px)",
                  }}
                >
                  {["Order ID", "Customer", "Status", "Total"].map(
                    (head) => (
                      <th
                        key={head}
                        className="text-left text-sm font-bold text-[#8C7862]"
                        style={{
                          padding: "14px 10px",
                          transform: "translate(0px,0px)",
                        }}
                      >
                        {head}
                      </th>
                    )
                  )}
                </tr>
              </thead>

              <tbody>
                {recentOrders.length === 0 ? (
                  <tr>
                    <td
                      colSpan="4"
                      className="text-center text-[#7A6B59]"
                      style={{
                        padding: "50px 10px",
                        transform: "translate(0px,0px)",
                      }}
                    >
                      No orders found.
                    </td>
                  </tr>
                ) : (
                  recentOrders.map((order) => (
                    <tr
                      key={order._id}
                      className="border-b border-[#F1EBDF] hover:bg-[#FCF9F4]"
                      style={{
                        transform: "translate(0px,0px)",
                      }}
                    >
                      <td
                        className="font-bold text-[#3D3023]"
                        style={{
                          padding: "13px 10px",
                          transform: "translate(0px,0px)",
                        }}
                      >
                        #{order._id?.slice(-6)}
                      </td>

                      <td
                        className="text-[#6F6252]"
                        style={{
                          padding: "13px 10px",
                          transform: "translate(0px,0px)",
                        }}
                      >
                        {order.user?.name || "-"}
                      </td>

                      <td
                        style={{
                          padding: "13px 10px",
                          transform: "translate(0px,0px)",
                        }}
                      >
                        <span
                          className="rounded-full bg-[#EFE4D1] text-[#A37430]"
                          style={{
                            display: "inline-block",
                            padding: "5px 18px",
                            transform: "translate(0px,0px)",
                          }}
                        >
                          {order.status || "Pending"}
                        </span>
                      </td>

                      <td
                        className="font-bold text-[#3D3023]"
                        style={{
                          padding: "13px 10px",
                          transform: "translate(0px,0px)",
                        }}
                      >
                        ₹{Number(
                          order.totalPrice || 0
                        ).toLocaleString("en-IN")}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div
          className="space-y-6"
          style={{
            padding: "0",
            transform: "translate(0px,0px)",
          }}
        >
          {/* TOP PRODUCTS */}

          <div
            className="rounded-[30px] border border-[#E8DDCC] bg-[#FFFDF9] shadow-sm"
            style={{
              padding: "22px 24px",
              minHeight: "205px",
              transform: "translate(0px,0px)",
            }}
          >
            <h2
              className="text-2xl font-bold text-[#3D3023]"
              style={{
                padding: "0 0 14px",
                margin: "0",
                transform: "translate(0px,0px)",
              }}
            >
              Top Products
            </h2>

            <div
              className="space-y-3"
              style={{
                padding: "0",
                transform: "translate(0px,0px)",
              }}
            >
              {topProducts.length === 0 ? (
                <p
                  className="text-sm text-[#8C7862]"
                  style={{
                    padding: "15px 0",
                    margin: "0",
                    transform: "translate(0px,0px)",
                  }}
                >
                  No product sales data yet.
                </p>
              ) : (
                topProducts.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 rounded-2xl bg-[#FAF6EE]"
                    style={{
                      padding: "9px 12px",
                      transform: "translate(0px,0px)",
                    }}
                  >
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-14 w-14 rounded-xl object-cover"
                        style={{
                          padding: "0",
                          transform: "translate(0px,0px)",
                        }}
                      />
                    ) : (
                      <div
                        className="h-14 w-14 rounded-xl bg-[#E8D3A8]"
                        style={{
                          padding: "0",
                          transform: "translate(0px,0px)",
                        }}
                      />
                    )}

                    <div
                      style={{
                        padding: "0",
                        transform: "translate(0px,0px)",
                      }}
                    >
                      <h3
                        className="font-bold text-[#3D3023]"
                        style={{
                          padding: "0",
                          margin: "0",
                          transform: "translate(0px,0px)",
                        }}
                      >
                        {item.name}
                      </h3>

                      <p
                        className="text-sm text-[#7A6B59]"
                        style={{
                          padding: "0",
                          margin: "3px 0 0",
                          transform: "translate(0px,0px)",
                        }}
                      >
                        {item.sales} Sales
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* LOW STOCK */}

          <div
            className="rounded-[30px] border border-[#E8DDCC] bg-[#FFFDF9] shadow-sm"
            style={{
              padding: "22px 24px",
              minHeight: "195px",
              transform: "translate(0px,0px)",
            }}
          >
            <h2
              className="text-2xl font-bold text-[#3D3023]"
              style={{
                padding: "0 0 14px",
                margin: "0",
                transform: "translate(0px,0px)",
              }}
            >
              Low Stock
            </h2>

            <div
              className="space-y-2"
              style={{
                padding: "0",
                transform: "translate(0px,0px)",
              }}
            >
              {lowStockProducts.length === 0 ? (
                <p
                  className="text-sm text-[#7A6B59]"
                  style={{
                    padding: "10px 0",
                    margin: "0",
                    transform: "translate(0px,0px)",
                  }}
                >
                  No low-stock products.
                </p>
              ) : (
                lowStockProducts.map((product) => (
                  <div
                    key={product._id}
                    className="flex items-center justify-between rounded-xl bg-[#FFF3EE]"
                    style={{
                      padding: "8px 12px",
                      transform: "translate(0px,0px)",
                    }}
                  >
                    <div
                      style={{
                        padding: "0",
                        transform: "translate(0px,0px)",
                      }}
                    >
                      <h3
                        className="font-semibold text-[#3D3023]"
                        style={{
                          padding: "0",
                          margin: "0",
                          transform: "translate(0px,0px)",
                        }}
                      >
                        {product.name}
                      </h3>

                      <p
                        className="text-sm text-[#7A6B59]"
                        style={{
                          padding: "0",
                          margin: "2px 0 0",
                          transform: "translate(0px,0px)",
                        }}
                      >
                        {product.stock} Left
                      </p>
                    </div>

                    <span
                      className="rounded-full bg-red-100 text-sm font-bold text-red-600"
                      style={{
                        padding: "5px 14px",
                        transform: "translate(0px,0px)",
                      }}
                    >
                      Alert
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* LATEST ACTIVITY + REVIEWS */}

      <div
        className="grid grid-cols-3 gap-7"
        style={{
          padding: "0 6px",
          transform: "translate(0px,0px)",
        }}
      >
        <div
          className="col-span-2 rounded-[30px] border border-[#E8DDCC] bg-[#FFFDF9] shadow-sm"
          style={{
            padding: "24px 26px",
            minHeight: "295px",
            transform: "translate(0px,0px)",
          }}
        >
          <h2
            className="text-2xl font-bold text-[#3D3023]"
            style={{
              padding: "0 0 16px",
              margin: "0",
              transform: "translate(0px,0px)",
            }}
          >
            Latest Activity
          </h2>

          <div
            className="space-y-2"
            style={{
              padding: "0",
              transform: "translate(0px,0px)",
            }}
          >
            {latestActivity.length === 0 ? (
              <p
                className="text-sm text-[#7A6B59]"
                style={{
                  padding: "20px 0",
                  margin: "0",
                  transform: "translate(0px,0px)",
                }}
              >
                No recent activity.
              </p>
            ) : (
              latestActivity.map((order) => (
                <div
                  key={order._id}
                  className="flex items-center gap-4 rounded-2xl bg-[#FAF6EE]"
                  style={{
                    padding: "10px 14px",
                    minHeight: "48px",
                    transform: "translate(0px,0px)",
                  }}
                >
                  <div
                    className="h-4 w-4 shrink-0 rounded-full bg-[#C39A57]"
                    style={{
                      padding: "0",
                      transform: "translate(0px,0px)",
                    }}
                  />

                  <div
                    className="flex-1"
                    style={{
                      padding: "0",
                      transform: "translate(0px,0px)",
                    }}
                  >
                    <h3
                      className="font-bold text-[#3D3023]"
                      style={{
                        padding: "0",
                        margin: "0",
                        transform: "translate(0px,0px)",
                      }}
                    >
                      Order Placed
                    </h3>

                    <p
                      className="text-sm text-[#7A6B59]"
                      style={{
                        padding: "0",
                        margin: "2px 0 0",
                        transform: "translate(0px,0px)",
                      }}
                    >
                      {order.user?.name || "-"}
                    </p>
                  </div>

                  <span
                    className="text-sm text-[#9A8A76]"
                    style={{
                      padding: "0",
                      transform: "translate(0px,0px)",
                    }}
                  >
                    {order.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        <div
          className="rounded-[30px] border border-[#E8DDCC] bg-[#FFFDF9] shadow-sm"
          style={{
            padding: "24px 26px",
            minHeight: "295px",
            transform: "translate(0px,0px)",
          }}
        >
          <h2
            className="text-2xl font-bold text-[#3D3023]"
            style={{
              padding: "0 0 16px",
              margin: "0",
              transform: "translate(0px,0px)",
            }}
          >
            Reviews
          </h2>

          {reviewData.length === 0 ? (
            <div
              className="rounded-2xl bg-[#FAF6EE] text-sm text-[#7A6B59]"
              style={{
                padding: "18px 14px",
                transform: "translate(0px,0px)",
              }}
            >
              No review data available from the backend yet.
            </div>
          ) : (
            <div
              className="space-y-3"
              style={{
                padding: "0",
                transform: "translate(0px,0px)",
              }}
            >
              {reviewData.map((review, index) => (
                <div
                  key={`${review.text}-${index}`}
                  className="rounded-2xl bg-[#FAF6EE]"
                  style={{
                    padding: "12px 14px",
                    transform: "translate(0px,0px)",
                  }}
                >
                  <div
                    className="flex items-center gap-1 text-[#E5AA21]"
                    style={{
                      padding: "0",
                      transform: "translate(0px,0px)",
                    }}
                  >
                    {Array.from({
                      length: Math.max(
                        1,
                        Math.min(
                          5,
                          Math.round(review.rating)
                        )
                      ),
                    }).map((_, starIndex) => (
                      <FaStar
                        key={starIndex}
                        size={14}
                      />
                    ))}
                  </div>

                  <p
                    className="mt-2 font-semibold text-[#3D3023]"
                    style={{
                      padding: "0",
                      margin: "6px 0 0",
                      transform: "translate(0px,0px)",
                    }}
                  >
                    {review.text}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* SALES GRAPH */}

      <div
        className="grid grid-cols-2 gap-7"
        style={{
          padding: "0 6px",
          transform: "translate(0px,0px)",
        }}
      >
        <div
          className="rounded-[30px] border border-[#E8DDCC] bg-[#FFFDF9] shadow-sm"
          style={{
            padding: "26px 28px",
            minHeight: "370px",
            transform: "translate(0px,0px)",
          }}
        >
          <div
            className="flex items-center justify-between"
            style={{
              padding: "0",
              transform: "translate(0px,0px)",
            }}
          >
            <div
              style={{
                padding: "0",
                transform: "translate(0px,0px)",
              }}
            >
              <h2
                className="text-3xl font-bold text-[#3D3023]"
                style={{
                  padding: "0",
                  margin: "0",
                  transform: "translate(0px,0px)",
                }}
              >
                Sales Overview
              </h2>

              <p
                className="text-[#7A6B59]"
                style={{
                  padding: "0",
                  margin: "7px 0 0",
                  transform: "translate(0px,0px)",
                }}
              >
                Monthly performance from orders
              </p>
            </div>

            <span
              className="rounded-2xl bg-[#EFE2CB] font-semibold text-[#8D6732]"
              style={{
                padding: "8px 16px",
                transform: "translate(0px,0px)",
              }}
            >
              Last 7 Months
            </span>
          </div>

          <div
            className="mt-8 flex h-[255px] items-end justify-between rounded-3xl bg-[#FAF6EE]"
            style={{
              padding: "20px 22px",
              transform: "translate(0px,0px)",
            }}
          >
            {monthlySales.map((item) => (
              <div
                key={item.label}
                className="flex h-full flex-col items-center justify-end"
                style={{
                  padding: "0",
                  transform: "translate(0px,0px)",
                }}
              >
                <div
                  className="w-9 rounded-t-xl bg-[#B68B4A]"
                  style={{
                    height: `${Math.max(
                      8,
                      (item.revenue /
                        maxMonthlyRevenue) *
                        175
                    )}px`,
                    padding: "0",
                    transform: "translate(0px,0px)",
                  }}
                  title={`₹${item.revenue.toLocaleString(
                    "en-IN"
                  )}`}
                />

                <p
                  className="text-sm text-[#7A6B59]"
                  style={{
                    padding: "0",
                    margin: "8px 0 0",
                    transform: "translate(0px,0px)",
                  }}
                >
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div
          className="rounded-[30px] border border-[#E8DDCC] bg-[#FFFDF9] shadow-sm"
          style={{
            padding: "26px 28px",
            minHeight: "370px",
            transform: "translate(0px,0px)",
          }}
        >
          <h2
            className="text-3xl font-bold text-[#3D3023]"
            style={{
              padding: "0",
              margin: "0",
              transform: "translate(0px,0px)",
            }}
          >
            Revenue Analytics
          </h2>

          <p
            className="text-[#7A6B59]"
            style={{
              padding: "0",
              margin: "7px 0 20px",
              transform: "translate(0px,0px)",
            }}
          >
            Monthly revenue generated from real orders
          </p>

          <div
            className="space-y-4"
            style={{
              padding: "0",
              transform: "translate(0px,0px)",
            }}
          >
            {monthlySales.map((item) => (
              <div
                key={item.label}
                style={{
                  padding: "0",
                  transform: "translate(0px,0px)",
                }}
              >
                <div
                  className="mb-2 flex items-center justify-between"
                  style={{
                    padding: "0",
                    transform: "translate(0px,0px)",
                  }}
                >
                  <span className="font-semibold text-[#6F6252]">
                    {item.label}
                  </span>

                  <span className="font-bold text-[#3D3023]">
                    ₹{item.revenue.toLocaleString("en-IN")}
                  </span>
                </div>

                <div
                  className="h-3 rounded-full bg-[#EEE3D2]"
                  style={{
                    padding: "0",
                    transform: "translate(0px,0px)",
                  }}
                >
                  <div
                    className="h-full rounded-full bg-[#B6884D]"
                    style={{
                      width: `${Math.max(
                        2,
                        (item.revenue /
                          maxMonthlyRevenue) *
                          100
                      )}%`,
                      padding: "0",
                      transform: "translate(0px,0px)",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div
            className="mt-6 rounded-2xl bg-[#F7EFD9]"
            style={{
              padding: "14px 16px",
              transform: "translate(0px,0px)",
            }}
          >
            <p
              className="text-sm text-[#7A6B59]"
              style={{
                padding: "0",
                margin: "0",
                transform: "translate(0px,0px)",
              }}
            >
              Current month growth
            </p>

            <p
              className={`text-2xl font-black ${
                revenueGrowth >= 0
                  ? "text-[#5B7D3A]"
                  : "text-red-600"
              }`}
              style={{
                padding: "0",
                margin: "4px 0 0",
                transform: "translate(0px,0px)",
              }}
            >
              {revenueGrowth >= 0 ? "+" : ""}
              {revenueGrowth}%
            </p>
          </div>
        </div>
      </div>

      {/* TODAY SUMMARY */}

      <div
        className="rounded-[30px] border border-[#E8DDCC] bg-[#FFFDF9] shadow-sm"
        style={{
          padding: "26px 30px",
          transform: "translate(0px,0px)",
        }}
      >
        <h2
          className="text-3xl font-bold text-[#3D3023]"
          style={{
            padding: "0",
            margin: "0",
            transform: "translate(0px,0px)",
          }}
        >
          Today's Summary
        </h2>

        <p
          className="text-[#7A6B59]"
          style={{
            padding: "0",
            margin: "6px 0 20px",
            transform: "translate(0px,0px)",
          }}
        >
          Live store activity
        </p>

        <div
          className="grid grid-cols-4 gap-5"
          style={{
            padding: "0",
            transform: "translate(0px,0px)",
          }}
        >
          {bottomStats.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl bg-[#FAF5EC]"
              style={{
                padding: "18px",
                transform: "translate(0px,0px)",
              }}
            >
              <p
                className="text-sm text-[#7A6B59]"
                style={{
                  padding: "0",
                  margin: "0",
                  transform: "translate(0px,0px)",
                }}
              >
                {item.label}
              </p>

              <h3
                className="text-3xl font-black text-[#3D3023]"
                style={{
                  padding: "0",
                  margin: "7px 0 0",
                  transform: "translate(0px,0px)",
                }}
              >
                {item.value}
              </h3>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}

      <div
        className="flex items-center justify-between text-sm text-[#81776B]"
        style={{
          padding: "8px 10px 0",
          transform: "translate(0px,0px)",
        }}
      >
        <span
          style={{
            padding: "0",
            transform: "translate(0px,0px)",
          }}
        >
          © {new Date().getFullYear()} Craft Corner Admin Dashboard
        </span>

        <span
          style={{
            padding: "0",
            transform: "translate(0px,0px)",
          }}
        >
          Version 2.0
        </span>
      </div>
    </div>
  );
}