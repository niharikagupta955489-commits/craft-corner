import { useEffect, useMemo, useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";

import {
  FaUserShield,
  FaUsers,
  FaUserTie,
  FaCrown,
  FaKey,
  FaSearch,
  FaPlus,
  FaArrowUp,
  FaEdit,
  FaTrash,
  FaComments,
  FaBoxOpen,
  FaShoppingBag,
  FaTags,
  FaUser,
  FaLock,
} from "react-icons/fa";

export default function AdminManagement() {
  const [admins, setAdmins] = useState([]);
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const ADMINS_PER_PAGE = 5;

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "admin",
    permissions: [],
  });

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const res = await api.get("/admin/all");
      setAdmins(res.data.admins || []);
    } catch (error) {
      toast.error("Failed to load admins");
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const togglePermission = (item) => {
    if (form.permissions.includes(item)) {
      setForm({
        ...form,
        permissions: form.permissions.filter((p) => p !== item),
      });
    } else {
      setForm({
        ...form,
        permissions: [...form.permissions, item],
      });
    }
  };

  const saveAdmin = async () => {
    try {
      if (editId) {
        await api.put(`/admin/${editId}`, {
          name: form.name,
          email: form.email,
          role: form.role,
          permissions: form.permissions,
        });

        toast.success("Admin Updated");
      } else {
        await api.post("/admin/create", {
          name: form.name,
          email: form.email,
          password: form.password,
          role: form.role,
          permissions: form.permissions,
        });

        toast.success("Admin Created");
      }

      fetchAdmins();
      setEditId(null);

      setForm({
        name: "",
        email: "",
        password: "",
        role: "admin",
        permissions: [],
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Something went wrong"
      );
    }
  };

  const editAdmin = (admin) => {
    setEditId(admin._id);

    setForm({
      name: admin.name,
      email: admin.email,
      password: "",
      role: admin.role,
      permissions: admin.permissions || [],
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const deleteAdmin = async (id) => {
    try {
      await api.delete(`/admin/${id}`);
      toast.success("Admin Deleted");
      fetchAdmins();
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  const totalAdmins = admins.length;

  const superAdmins = admins.filter(
    (a) => a.role === "Super Admin"
  ).length;

  const normalAdmins = admins.filter(
    (a) => a.role === "Admin"
  ).length;

  const totalPermissions = admins.reduce(
    (sum, admin) => sum + (admin.permissions?.length || 0),
    0
  );

  const stats = [
    {
      title: "Total Admins",
      value: totalAdmins,
      icon: <FaUsers />,
      iconBg: "bg-[#EEF3E5]",
      iconText: "text-[#55763A]",
      bar: "bg-[#668D48]",
    },
    {
      title: "Super Admins",
      value: superAdmins,
      icon: <FaCrown />,
      iconBg: "bg-[#FFF2D7]",
      iconText: "text-[#B77A16]",
      bar: "bg-[#C99536]",
    },
    {
      title: "Admins",
      value: normalAdmins,
      icon: <FaUserTie />,
      iconBg: "bg-[#EEF3E5]",
      iconText: "text-[#55763A]",
      bar: "bg-[#779C5B]",
    },
    {
      title: "Permissions",
      value: totalPermissions,
      icon: <FaKey />,
      iconBg: "bg-[#FFF2D7]",
      iconText: "text-[#B77A16]",
      bar: "bg-[#D2A24A]",
    },
  ];

  const filteredAdmins = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return admins;

    return admins.filter((admin) => {
      const permissions = (admin.permissions || []).join(" ");

      return `${admin.name} ${admin.email} ${admin.role} ${permissions}`
        .toLowerCase()
        .includes(query);
    });
  }, [admins, search]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredAdmins.length / ADMINS_PER_PAGE)
  );

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const startIndex = (currentPage - 1) * ADMINS_PER_PAGE;

  const paginatedAdmins = filteredAdmins.slice(
    startIndex,
    startIndex + ADMINS_PER_PAGE
  );

  const permissionItems = [
    {
      name: "Dashboard",
      description: "Access dashboard module",
      icon: <FaUserShield />,
    },
    {
      name: "Products",
      description: "Access products module",
      icon: <FaBoxOpen />,
    },
    {
      name: "Orders",
      description: "Access orders module",
      icon: <FaShoppingBag />,
    },
    {
      name: "Customers",
      description: "Access customers module",
      icon: <FaUsers />,
    },
    {
      name: "Categories",
      description: "Access categories module",
      icon: <FaTags />,
    },
    {
      name: "Complaints",
      description: "Access complaints module",
      icon: <FaComments />,
    },
  ];

  const resetForm = () => {
    setEditId(null);
    setForm({
      name: "",
      email: "",
      password: "",
      role: "admin",
      permissions: [],
    });
  };

  return (
    <div
      className="min-h-screen w-full bg-[#FAF7F0] text-[#302A24]"
      style={{
        transform: "translate(0px, 0px)",
        padding: "28px 28px 40px",
        margin: "0px",
      }}
    >
      {/* HEADER */}
      <div
        className="flex items-start justify-between gap-8"
        style={{
          transform: "translate(0px, 0px)",
          padding: "0px 4px 26px",
          margin: "0px",
        }}
      >
        <div
          style={{
            transform: "translate(0px, 0px)",
            padding: "0px",
            margin: "0px",
          }}
        >
          <div
            className="flex items-center gap-5"
            style={{
              transform: "translate(0px, 0px)",
              padding: "0px",
              margin: "0px",
            }}
          >
            <div
              className="flex h-16 w-16 items-center justify-center rounded-[20px] bg-[#EAF0DE] text-3xl text-[#55763A]"
              style={{
                transform: "translate(0px, 0px)",
                padding: "0px",
                margin: "0px",
              }}
            >
              <FaUserShield />
            </div>

            <div
              style={{
                transform: "translate(0px, 0px)",
                padding: "0px",
                margin: "0px",
              }}
            >
              <h1
                className="text-[46px] font-black leading-none tracking-[-1.5px] text-[#29241F]"
                style={{
                  transform: "translate(0px, 0px)",
                  padding: "0px",
                  margin: "0px",
                }}
              >
                Admin Management
              </h1>

              <p
                className="text-[18px] text-[#71695F]"
                style={{
                  transform: "translate(0px, 9px)",
                  padding: "0px",
                  margin: "0px",
                }}
              >
                Manage administrators, roles and permissions.
              </p>
            </div>
          </div>
        </div>

        <div
          className="rounded-[28px] border border-[#E8DFD1] bg-white shadow-[0_8px_24px_rgba(70,60,45,0.08)]"
          style={{
            transform: "translate(0px, 0px)",
            padding: "14px 24px",
            margin: "0px",
            minWidth: "255px",
          }}
        >
          <p
            className="text-[14px] text-[#81776B]"
            style={{
              transform: "translate(0px, 0px)",
              padding: "0px",
              margin: "0px",
            }}
          >
            Today
          </p>

          <h2
            className="text-[21px] font-bold text-[#29241F]"
            style={{
              transform: "translate(0px, 2px)",
              padding: "0px",
              margin: "0px",
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
      <div
        className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4"
        style={{
          transform: "translate(0px, 0px)",
          padding: "0px 0px 25px",
          margin: "0px",
        }}
      >
        {stats.map((item) => (
          <div
            key={item.title}
            className="rounded-[26px] border border-[#E9E0D3] bg-white shadow-[0_7px_20px_rgba(70,60,45,0.07)] transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            style={{
              transform: "translate(0px, 0px)",
              padding: "22px",
              margin: "0px",
            }}
          >
            <div
              className="flex items-start justify-between"
              style={{
                transform: "translate(0px, 0px)",
                padding: "0px",
                margin: "0px",
              }}
            >
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-[17px] ${item.iconBg} ${item.iconText} text-[25px]`}
                style={{
                  transform: "translate(0px, 0px)",
                  padding: "0px",
                  margin: "0px",
                }}
              >
                {item.icon}
              </div>

              <div
                className="flex items-center gap-1 rounded-full bg-[#EAF7E9] text-[12px] font-bold text-[#31843A]"
                style={{
                  transform: "translate(0px, 0px)",
                  padding: "5px 9px",
                  margin: "0px",
                }}
              >
                <FaArrowUp size={10} />
                12%
              </div>
            </div>

            <div
              style={{
                transform: "translate(0px, 0px)",
                padding: "20px 0px 0px",
                margin: "0px",
              }}
            >
              <h2
                className="text-[38px] font-black leading-none text-[#29241F]"
                style={{
                  transform: "translate(0px, 0px)",
                  padding: "0px",
                  margin: "0px",
                }}
              >
                {item.value}
              </h2>

              <p
                className="text-[16px] text-[#71695F]"
                style={{
                  transform: "translate(0px, 7px)",
                  padding: "0px",
                  margin: "0px",
                }}
              >
                {item.title}
              </p>
            </div>

            <div
              className="h-2 overflow-hidden rounded-full bg-[#F1ECE2]"
              style={{
                transform: "translate(0px, 0px)",
                padding: "0px",
                margin: "18px 0px 0px",
              }}
            >
              <div
                className={`h-full w-[72%] rounded-full ${item.bar}`}
                style={{
                  transform: "translate(0px, 0px)",
                  padding: "0px",
                  margin: "0px",
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* SEARCH BAR */}
      <div
        className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
        style={{
          transform: "translate(0px, 0px)",
          padding: "0px 0px 18px",
          margin: "0px",
        }}
      >
        <div
          className="relative w-full md:max-w-[530px]"
          style={{
            transform: "translate(0px, 0px)",
            padding: "0px",
            margin: "0px",
          }}
        >
          <FaSearch
            className="absolute left-5 top-1/2 -translate-y-1/2 text-[#8B8174]"
            size={17}
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search admin..."
            className="w-full rounded-[18px] border border-[#E5DBCD] bg-white text-[15px] text-[#3C352D] outline-none transition focus:border-[#6B8D4A] focus:ring-4 focus:ring-[#EAF0DE]"
            style={{
              transform: "translate(0px, 0px)",
              padding: "15px 20px 15px 48px",
              margin: "0px",
            }}
          />
        </div>

        <button
          onClick={resetForm}
          className="flex items-center justify-center gap-3 rounded-[17px] bg-[#5B7D3A] font-bold text-white shadow-[0_6px_15px_rgba(75,100,45,0.18)] transition hover:bg-[#4F6E31]"
          style={{
            transform: "translate(0px, 0px)",
            padding: "14px 25px",
            margin: "0px",
            minWidth: "215px",
          }}
        >
          <FaPlus />
          {editId ? "Add New Admin" : "Add New Admin"}
        </button>
      </div>

      {/* MAIN GRID */}
      <div
        className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(390px,0.78fr)_minmax(650px,1.22fr)]"
        style={{
          transform: "translate(0px, 0px)",
          padding: "0px",
          margin: "0px",
        }}
      >
        {/* CREATE ADMIN */}
        <div
          className="rounded-[28px] border border-[#E8DED0] bg-white shadow-[0_8px_25px_rgba(70,60,45,0.07)]"
          style={{
            transform: "translate(0px, 0px)",
            padding: "24px",
            margin: "0px",
          }}
        >
          <div
            className="flex items-center gap-4"
            style={{
              transform: "translate(0px, 0px)",
              padding: "0px 0px 22px",
              margin: "0px",
            }}
          >
            <div
              className="flex h-14 w-14 items-center justify-center rounded-[17px] bg-[#EAF0DE] text-[24px] text-[#55763A]"
              style={{
                transform: "translate(0px, 0px)",
                padding: "0px",
                margin: "0px",
              }}
            >
              <FaUserTie />
            </div>

            <div
              style={{
                transform: "translate(0px, 0px)",
                padding: "0px",
                margin: "0px",
              }}
            >
              <h2
                className="text-[26px] font-black text-[#29241F]"
                style={{
                  transform: "translate(0px, 0px)",
                  padding: "0px",
                  margin: "0px",
                }}
              >
                {editId ? "Edit Admin" : "Create Admin"}
              </h2>

              <p
                className="text-[14px] text-[#746B61]"
                style={{
                  transform: "translate(0px, 3px)",
                  padding: "0px",
                  margin: "0px",
                }}
              >
                Create administrators and manage permissions.
              </p>
            </div>
          </div>

          {/* FORM FIELDS */}
          <div
            style={{
              transform: "translate(0px, 0px)",
              padding: "0px",
              margin: "0px",
            }}
          >
            <label
              className="block text-[14px] font-bold text-[#51483E]"
              style={{
                transform: "translate(0px, 0px)",
                padding: "0px 0px 7px",
                margin: "0px",
              }}
            >
              Full Name
            </label>

            <div
              className="relative"
              style={{
                transform: "translate(0px, 0px)",
                padding: "0px 0px 15px",
                margin: "0px",
              }}
            >
              <FaUser className="absolute left-4 top-1/2 -translate-y-[65%] text-[#9B7D42]" />

              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter full name"
                className="w-full rounded-[14px] border border-[#E6DDD1] bg-[#FFFEFC] text-[14px] outline-none focus:border-[#789957] focus:ring-4 focus:ring-[#EDF2E6]"
                style={{
                  transform: "translate(0px, 0px)",
                  padding: "12px 16px 12px 43px",
                  margin: "0px",
                }}
              />
            </div>

            <label
              className="block text-[14px] font-bold text-[#51483E]"
              style={{
                transform: "translate(0px, 0px)",
                padding: "0px 0px 7px",
                margin: "0px",
              }}
            >
              Email Address
            </label>

            <div
              className="relative"
              style={{
                transform: "translate(0px, 0px)",
                padding: "0px 0px 15px",
                margin: "0px",
              }}
            >
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter email address"
                className="w-full rounded-[14px] border border-[#E6DDD1] bg-[#FFFEFC] text-[14px] outline-none focus:border-[#789957] focus:ring-4 focus:ring-[#EDF2E6]"
                style={{
                  transform: "translate(0px, 0px)",
                  padding: "12px 16px",
                  margin: "0px",
                }}
              />
            </div>

            <label
              className="block text-[14px] font-bold text-[#51483E]"
              style={{
                transform: "translate(0px, 0px)",
                padding: "0px 0px 7px",
                margin: "0px",
              }}
            >
              Password
            </label>

            <div
              className="relative"
              style={{
                transform: "translate(0px, 0px)",
                padding: "0px 0px 15px",
                margin: "0px",
              }}
            >
              <FaLock className="absolute left-4 top-1/2 -translate-y-[65%] text-[#9B7D42]" />

              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="w-full rounded-[14px] border border-[#E6DDD1] bg-[#FFFEFC] text-[14px] outline-none focus:border-[#789957] focus:ring-4 focus:ring-[#EDF2E6]"
                style={{
                  transform: "translate(0px, 0px)",
                  padding: "12px 16px 12px 43px",
                  margin: "0px",
                }}
              />
            </div>

            <label
              className="block text-[14px] font-bold text-[#51483E]"
              style={{
                transform: "translate(0px, 0px)",
                padding: "0px 0px 7px",
                margin: "0px",
              }}
            >
              Role
            </label>

            <div
              style={{
                transform: "translate(0px, 0px)",
                padding: "0px 0px 19px",
                margin: "0px",
              }}
            >
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full rounded-[14px] border border-[#E6DDD1] bg-[#FFFEFC] text-[14px] text-[#40382F] outline-none focus:border-[#789957] focus:ring-4 focus:ring-[#EDF2E6]"
                style={{
                  transform: "translate(0px, 0px)",
                  padding: "12px 16px",
                  margin: "0px",
                }}
              >
                <option value="admin">Admin</option>
                <option value="superadmin">Super Admin</option>
              </select>
            </div>
          </div>

          {/* PERMISSIONS */}
          <div
            style={{
              transform: "translate(0px, 0px)",
              padding: "0px",
              margin: "0px",
            }}
          >
            <div
              className="flex items-center justify-between"
              style={{
                transform: "translate(0px, 0px)",
                padding: "0px 0px 12px",
                margin: "0px",
              }}
            >
              <h3
                className="text-[18px] font-black text-[#302A24]"
                style={{
                  transform: "translate(0px, 0px)",
                  padding: "0px",
                  margin: "0px",
                }}
              >
                Permissions
              </h3>

              <span
                className="rounded-full bg-[#F1F4E9] text-[12px] font-bold text-[#58723F]"
                style={{
                  transform: "translate(0px, 0px)",
                  padding: "5px 9px",
                  margin: "0px",
                }}
              >
                {form.permissions.length} selected
              </span>
            </div>

            <div
              className="grid grid-cols-1 gap-3 sm:grid-cols-2"
              style={{
                transform: "translate(0px, 0px)",
                padding: "0px",
                margin: "0px",
              }}
            >
              {permissionItems.map((item) => {
                const active = form.permissions.includes(item.name);

                return (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => togglePermission(item.name)}
                    className={`text-left transition duration-200 hover:-translate-y-[1px] ${
                      active
                        ? "border-[#739252] bg-[#EFF4E9]"
                        : "border-[#E8DED0] bg-[#FFFEFC]"
                    }`}
                    style={{
                      transform: "translate(0px, 0px)",
                      padding: "11px",
                      margin: "0px",
                      borderWidth: "1px",
                      borderStyle: "solid",
                      borderRadius: "15px",
                    }}
                  >
                    <div
                      className="flex items-center gap-3"
                      style={{
                        transform: "translate(0px, 0px)",
                        padding: "0px",
                        margin: "0px",
                      }}
                    >
                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] ${
                          active
                            ? "bg-[#DCE8D0] text-[#55763A]"
                            : "bg-[#F4EFE7] text-[#8E7550]"
                        }`}
                        style={{
                          transform: "translate(0px, 0px)",
                          padding: "0px",
                          margin: "0px",
                        }}
                      >
                        {item.icon}
                      </div>

                      <div
                        className="min-w-0 flex-1"
                        style={{
                          transform: "translate(0px, 0px)",
                          padding: "0px",
                          margin: "0px",
                        }}
                      >
                        <h4
                          className="truncate text-[13px] font-bold text-[#3A332C]"
                          style={{
                            transform: "translate(0px, 0px)",
                            padding: "0px",
                            margin: "0px",
                          }}
                        >
                          {item.name}
                        </h4>

                        <p
                          className="truncate text-[11px] text-[#81776B]"
                          style={{
                            transform: "translate(0px, 2px)",
                            padding: "0px",
                            margin: "0px",
                          }}
                        >
                          {item.description}
                        </p>
                      </div>

                      <span
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-[5px] border ${
                          active
                            ? "border-[#648746] bg-[#648746] text-white"
                            : "border-[#D8CDBE] bg-white"
                        }`}
                        style={{
                          transform: "translate(0px, 0px)",
                          padding: "0px",
                          margin: "0px",
                        }}
                      >
                        {active ? "✓" : ""}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* SAVE */}
          <button
            onClick={saveAdmin}
            className="w-full rounded-[15px] bg-[#5B7D3A] font-bold text-white shadow-[0_7px_15px_rgba(75,100,45,0.17)] transition hover:bg-[#4F6E31] hover:-translate-y-[1px]"
            style={{
              transform: "translate(0px, 0px)",
              padding: "14px 18px",
              margin: "20px 0px 0px",
            }}
          >
            <span
              className="flex items-center justify-center gap-3"
              style={{
                transform: "translate(0px, 0px)",
                padding: "0px",
                margin: "0px",
              }}
            >
              <FaPlus />
              {editId ? "Update Administrator" : "Create Administrator"}
            </span>
          </button>

          {editId && (
            <button
              onClick={resetForm}
              className="w-full text-[13px] font-semibold text-[#8B8175] hover:text-[#4F6E31]"
              style={{
                transform: "translate(0px, 0px)",
                padding: "9px 0px 0px",
                margin: "0px",
              }}
            >
              Cancel editing
            </button>
          )}
        </div>

        {/* ALL ADMINISTRATORS */}
        <div
          className="min-w-0 rounded-[28px] border border-[#E8DED0] bg-white shadow-[0_8px_25px_rgba(70,60,45,0.07)]"
          style={{
            transform: "translate(0px, 0px)",
            padding: "12px",
            margin: "0px",
            height: "60px",
            maxHeight: "1160px",
          }}
        >
          <div
            className="flex items-start justify-between gap-4"
            style={{
              transform: "translate(0px, 0px)",
              padding: "0px 4px 18px",
              margin: "0px",
            }}
          >
            <div
              style={{
                transform: "translate(0px, 0px)",
                padding: "0px",
                margin: "0px",
              }}
            >
              <h2
                className="text-[28px] font-black text-[#29241F]"
                style={{
                  transform: "translate(0px, -7px) scale(0.7)",
                  padding: "0px",
                  margin: "0px",
                }}
              >
                All Administrators
              </h2>

              <p
                className="text-[14px] text-[#746B61]"
                style={{
                  transform: "translate(17px, -15px)",
                  padding: "0px",
                  margin: "0px",
                }}
              >
                Manage all administrator accounts.
              </p>
            </div>

            <span
              className="shrink-0 rounded-full bg-[#F1F4E9] font-bold text-[#58723F]"
              style={{
                transform: "translate(0px, 0px)",
                padding: "8px 10px",
                margin: "0px",
              }}
            >
              {filteredAdmins.length} Admins
            </span>
          </div>

          <div
            className="!space-y-1.5 overflow-hidden"
            style={{
              transform: "translate(0px, -20px)",
              padding: "0px",
              margin: "0px",
              minHeight: "680px",
              maxHeight: "640px",
            }}
          >
            {filteredAdmins.length === 0 ? (
              <div
                className="rounded-[20px] border border-dashed border-[#DED2C2] text-center"
                style={{
                  transform: "translate(0px, 0px)",
                  padding: "55px 20px",
                  margin: "0px",
                }}
              >
                <FaUsers
                  className="mx-auto text-[#9CAC8C]"
                  size={42}
                />

                <h3
                  className="text-[20px] font-bold text-[#3D352D]"
                  style={{
                    transform: "translate(0px, 8px)",
                    padding: "0px",
                    margin: "0px",
                  }}
                >
                  No Admin Found
                </h3>

                <p
                  className="text-[13px] text-[#81776B]"
                  style={{
                    transform: "translate(0px, 12px)",
                    padding: "0px",
                    margin: "0px",
                  }}
                >
                  Create your first administrator account.
                </p>
              </div>
            ) : (
              paginatedAdmins.map((admin) => (
                <div
                  key={admin._id}
                  className="rounded-[20px] border border-[#E8DED0] bg-[#FFFEFC] transition duration-200 hover:-translate-y-[1px] hover:shadow-[0_7px_18px_rgba(70,60,45,0.08)]"
                  style={{
                    transform: "translate(0px, 0px)",
                    padding: "15px 16px",
                    margin: "0px",
                  }}
                >
                  <div
                    className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"
                    style={{
                      transform: "translate(0px, 0px)",
                      padding: "0px",
                      margin: "0px",
                    }}
                  >
                    <div
                      className="flex min-w-0 items-center gap-4"
                      style={{
                        transform: "translate(0px, 0px)",
                        padding: "0px",
                        margin: "0px",
                      }}
                    >
                      <div
                        className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#EAF0DE] text-[21px] font-bold text-[#55763A]"
                        style={{
                          transform: "translate(0px, 0px)",
                          padding: "0px",
                          margin: "0px",
                        }}
                      >
                        {admin.name?.charAt(0).toUpperCase()}
                      </div>

                      <div
                        className="min-w-0"
                        style={{
                          transform: "translate(0px, 0px)",
                          padding: "0px",
                          margin: "0px",
                        }}
                      >
                        <div
                          className="flex flex-wrap items-center gap-2"
                          style={{
                            transform: "translate(0px, 0px)",
                            padding: "0px",
                            margin: "0px",
                          }}
                        >
                          <h3
                            className="truncate text-[18px] font-black text-[#302A24]"
                            style={{
                              transform: "translate(0px, 0px)",
                              padding: "0px",
                              margin: "0px",
                            }}
                          >
                            {admin.name}
                          </h3>

                          <span
                            className={`rounded-full text-[10px] font-bold ${
                              admin.role === "Super Admin"
                                ? "bg-[#FFF0CF] text-[#A26C13]"
                                : "bg-[#EAF1F8] text-[#496C91]"
                            }`}
                            style={{
                              transform: "translate(0px, 0px)",
                              padding: "5px 9px",
                              margin: "0px",
                            }}
                          >
                            {admin.role}
                          </span>
                        </div>

                        <p
                          className="max-w-[320px] truncate text-[13px] text-[#746B61]"
                          style={{
                            transform: "translate(0px, 3px)",
                            padding: "0px",
                            margin: "0px",
                          }}
                        >
                          {admin.email}
                        </p>

                        <div
                          className="flex flex-wrap gap-1.5"
                          style={{
                            transform: "translate(0px, 8px)",
                            padding: "0px",
                            margin: "0px",
                          }}
                        >
                          {(admin.permissions || []).map((permission) => (
                            <span
                              key={permission}
                              className="rounded-full bg-[#F0F4E8] text-[10px] font-semibold text-[#55713D]"
                              style={{
                                transform: "translate(0px, 0px)",
                                padding: "4px 8px",
                                margin: "0px",
                              }}
                            >
                              {permission}
                            </span>
                          ))}

                          {(!admin.permissions ||
                            admin.permissions.length === 0) && (
                            <span
                              className="text-[10px] text-[#A09588]"
                              style={{
                                transform: "translate(0px, 0px)",
                                padding: "4px 0px",
                                margin: "0px",
                              }}
                            >
                              No permissions
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div
                      className="flex shrink-0 items-center gap-2"
                      style={{
                        transform: "translate(0px, 0px)",
                        padding: "0px",
                        margin: "0px",
                      }}
                    >
                      <button
                        onClick={() => editAdmin(admin)}
                        className="flex items-center gap-2 rounded-[12px] border border-[#D8C39F] bg-white font-semibold text-[#9B7131] transition hover:bg-[#FFF8EA]"
                        style={{
                          transform: "translate(0px, 0px)",
                          padding: "9px 14px",
                          margin: "0px",
                        }}
                      >
                        <FaEdit size={12} />
                        Edit
                      </button>

                      <button
                        onClick={() => deleteAdmin(admin._id)}
                        className="flex items-center gap-2 rounded-[12px] bg-[#FF4048] font-semibold text-white transition hover:bg-[#EA3038]"
                        style={{
                          transform: "translate(0px, 0px)",
                          padding: "9px 14px",
                          margin: "0px",
                        }}
                      >
                        <FaTrash size={12} />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div
            className="flex items-center justify-between border-t border-[#EEE7DD]"
            style={{
              transform: "translate(0px, 0px)",
              padding: "16px 2px 0px",
              margin: "18px 0px 0px",
            }}
          >
            <p
              className="text-[13px] text-[#81776B]"
              style={{
                transform: "translate(0px, 0px)",
                padding: "0px",
                margin: "0px",
              }}
            >
              Showing{" "}
              {filteredAdmins.length === 0 ? 0 : startIndex + 1}
              {" - "}
              {Math.min(startIndex + ADMINS_PER_PAGE, filteredAdmins.length)}
              {" of "}
              {filteredAdmins.length} admins
            </p>

            <div
              className="flex items-center gap-2"
              style={{
                transform: "translate(0px, 0px)",
                padding: "0px",
                margin: "0px",
              }}
            >
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() =>
                  setCurrentPage((page) => Math.max(1, page - 1))
                }
                className="rounded-[10px] border border-[#E2D9CC] bg-white text-[#81776B] disabled:cursor-not-allowed disabled:opacity-40 hover:bg-[#F7F3EC]"
                style={{
                  transform: "translate(0px, 0px)",
                  padding: "7px 12px",
                  margin: "0px",
                }}
              >
                ‹
              </button>

              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => setCurrentPage(page)}
                    className={
                      currentPage === page
                        ? "rounded-[10px] bg-[#5B7D3A] font-bold text-white"
                        : "rounded-[10px] border border-[#E2D9CC] bg-white text-[#81776B] hover:bg-[#F7F3EC]"
                    }
                    style={{
                      transform: "translate(0px, 0px)",
                      padding: "7px 13px",
                      margin: "0px",
                    }}
                  >
                    {page}
                  </button>
                )
              )}

              <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() =>
                  setCurrentPage((page) => Math.min(totalPages, page + 1))
                }
                className="rounded-[10px] border border-[#E2D9CC] bg-white text-[#81776B] disabled:cursor-not-allowed disabled:opacity-40 hover:bg-[#F7F3EC]"
                style={{
                  transform: "translate(0px, 0px)",
                  padding: "7px 12px",
                  margin: "0px",
                }}
              >
                ›
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div
        className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between"
        style={{
          transform: "translate(0px, 0px)",
          padding: "20px 4px 0px",
          margin: "0px",
        }}
      >
        <p
          className="text-[12px] text-[#93887A]"
          style={{
            transform: "translate(0px, 0px)",
            padding: "0px",
            margin: "0px",
          }}
        >
          © {new Date().getFullYear()} Craft Corner Admin Dashboard
        </p>

        <p
          className="text-[12px] font-semibold text-[#8B713F]"
          style={{
            transform: "translate(0px, 0px)",
            padding: "0px",
            margin: "0px",
          }}
        >
          Version 2.0
        </p>
      </div>
    </div>
  );
}
