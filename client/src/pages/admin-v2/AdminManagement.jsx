import { useEffect, useState } from "react";
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
} from "react-icons/fa";

export default function AdminManagement() {

  const [admins, setAdmins] = useState([]);
  const [editId, setEditId] = useState(null);

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
        error.response?.data?.message ||
        "Something went wrong"
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
      color: "from-[#C89B55] to-[#E2C48D]",
    },
    {
      title: "Super Admins",
      value: superAdmins,
      icon: <FaCrown />,
      color: "from-[#B68B4A] to-[#D9B980]",
    },
    {
      title: "Admins",
      value: normalAdmins,
      icon: <FaUserTie />,
      color: "from-[#B78A46] to-[#E7C98E]",
    },
    {
      title: "Permissions",
      value: totalPermissions,
      icon: <FaKey />,
      color: "from-[#C49A5D] to-[#F0D5A1]",
    },
  ];

  return (

    <div className="min-h-screen bg-[#FAF6EF] p-10">

      {/* HEADER */}

      <div className="flex items-center justify-between mb-10">

        <div
          style={{
            transform: "translate(10px,0px) scale(0.78)",
          }}
        >

          <h1
            className="text-5xl font-black text-[#3D3023]"
            style={{
              transform: "translate(0px,0px)",
            }}
          >
            Admin Management
          </h1>


          <p
            className="mt-3 text-lg text-[#7A6B59]"
            style={{
              transform: "translate(25px,0px)",
            }}
          >
            Manage administrators, roles and permissions.
          </p>

        </div>


        <div
          className="rounded-[30px] border border-[#E8DDCC] bg-white px-8 py-6 shadow-lg"
          style={{
            transform: "translate(-15px,0px) scale(1)",
          }}
        >

          <p
            className="text-sm text-[#8D7A63]"
            style={{
              transform: "translate(38px,1px) scale(0.9)",
            }}
          >
            Today
          </p>


          <h2
            className="text-2xl font-bold text-[#3D3023]"
            style={{
              transform: "translate(0px,-5px) scale(0.75)",
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

      <div className="grid grid-cols-4 gap-7 mb-10">


        {stats.map((item) => (

          <div
            key={item.title}
            className="group rounded-[30px] border border-[#E8DDCC] bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            style={{

              transform: "translate(10px,0px) scale(0.83)",
            }}
          >


            <div className="flex items-center justify-between">


              <div
                className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-3xl text-white`}
                style={{
                  transform: "translate(15px,35px) scale(0.85)",
                }}
              >

                {item.icon}

              </div>



              <div
                className="rounded-full bg-green-100 px-4 py-2"
                style={{
                  transform: "translate(-95px,35px) scale(1.05)",
                }}
              >

                <span
                  className="flex items-center gap-1 text-sm font-bold text-green-700"
                  style={{
                    transform: "scale(0.85)",
                  }}
                >

                  <FaArrowUp />

                  12%

                </span>

              </div>


            </div>



            <h2
              className="mt-8 text-5xl font-black text-[#3D3023]"
              style={{
                transform: "translate(65px,-25px) scale(0.7)",
              }}
            >

              {item.value}

            </h2>



            <p
              className="mt-3 text-lg text-[#7A6B59]"
              style={{

                transform: "translate(90px,-35px) scale(0.9)",
              }}
            >

              {item.title}

            </p>



            <div
              className="mt-6 h-2 rounded-full bg-[#F3EBDD]"
              style={{
                transform: "translate(5px,-15px) scale(0.85)",
              }}
            >


              <div
                className={`h-2 rounded-full bg-gradient-to-r ${item.color}`}
                style={{
                  width: "75%",
                  transform: "translate(5px,0px)",
                }}
              />


            </div>


          </div>


        ))}


      </div>




      {/* SEARCH + ACTION BAR */}


      <div
        className="mb-10 rounded-[32px] border border-[#E8DDCC] bg-white p-7 shadow-lg"
        style={{

          transform: "translate(10px,0px) scale(0.97)",
        }}
      >


        <div
          className="flex items-center justify-between gap-6"
          style={{

            transform: "translate(-22px,0px)",
          }}
        >


          <div
            className="relative w-[410px]"
            style={{

              transform: "translate(10px,0px) scale(0.94)",
            }}
          >


            <FaSearch
              className="absolute left-5 top-1/2 -translate-y-1/2 text-[#9A8466] text-lg"
            />



            <input
              type="text"
              placeholder="Search"
              className="w-full rounded-2xl border border-[#E6DAC8] bg-[#FCFAF7] py- pl-14 pr-5 text-[#3D3023] outline-none transition-all focus:border-[#B68B4A] focus:ring-4 focus:ring-[#F5E4C7]"
            />


          </div>



          <button
            className="flex items-center gap-3 rounded-2xl bg-gradient-to-r from-[#B6884D] to-[#DDBD83] px-8 py-4 font-bold text-white shadow-lg"
            style={{
              paddingLeft: "30px",
              paddingRight: "30px",
              transform: "translate(22px,0px) scale(0.99)",
            }}
          >

            <FaPlus />

            {editId ? "Editing Admin" : "Add New Admin"}

          </button>


        </div>


      </div>


      {/* MAIN GRID */}

      <div className="grid grid-cols-12 gap-8">


        {/* LEFT PANEL */}

        <div
          className="col-span-5"
          style={{

            transform: "translate(15px,0px)",
          }}
        >


          <div
            className="rounded-[34px] border border-[#E8DDCC] bg-white p-8 shadow-xl"
            style={{
              transform: "scale(0.94)",
            }}
          >


            <div
              className="flex items-center gap-4 mb-8"
              style={{
                transform: "translate(15px,0px) scale(0.95)",
              }}
            >


              <div
                className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#C99D5B] to-[#E3C78F] text-3xl text-white shadow-lg"
                style={{
                  transform: "translate(20px,1px) scale(0.75)",
                }}
              >

                <FaUserShield />

              </div>



              <div>

                <h2
                  className="text-3xl font-black text-[#3D3023]"
                  style={{

                    transform: "translate(10px,5px) scale(0.9)",
                  }}
                >

                  {editId ? "Edit Admin" : "Create Admin"}

                </h2>


                <p
                  className="mt-2 text-[#7A6B59]"
                  style={{
                    transform: "translate(5px,0px) scale(0.9)",
                  }}
                >

                  Create administrators and manage permissions.

                </p>


              </div>


            </div>
            {/* NAME */}

            <div
              className="mb-6"
              style={{
                transform: "translate(5px,0px) scale(0.95)",
              }}
            >

              <label
                className="mb-3 block font-semibold text-[#5E503F]"
                style={{
                  transform: "translate(10px,0px) scale(0.9)",
                }}
              >
                Full Name
              </label>


              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter admin name"
                className="w-full rounded-2xl border border-[#E6DAC8] bg-[#FCFAF7] px-5 py-4 text-[#3D3023] outline-none transition-all duration-300 focus:border-[#B68B4A] focus:ring-4 focus:ring-[#F8E7C8]"
                style={{
                  paddingLeft: "30px",
                  paddingRight: "30px",
                  transform: "translate(0px,0px) scale(0.95)",
                }}
              />

            </div>



            {/* EMAIL */}

            {/* EMAIL */}

            <div
              className="mb-6"
              style={{

                transform: "translate(5px,0px) scale(0.95)",
              }}
            >

              <label
                className="mb-3 block font-semibold text-[#5E503F]"
                style={{

                  transform: "translate(10px,0px) scale(0.9)",
                }}
              >
                Email Address
              </label>


              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="admin@email.com"
                className="w-full rounded-2xl border border-[#E6DAC8] bg-[#FCFAF7] px-5 py-4 text-[#3D3023] outline-none transition-all duration-300 focus:border-[#B68B4A] focus:ring-4 focus:ring-[#F8E7C8]"
                style={{
                  paddingLeft: "30px",
                  paddingRight: "30px",
                  transform: "translate(-1px,0px) scale(0.95)",
                }}
              />

            </div>



            {/* PASSWORD */}

            {/* PASSWORD */}

            <div
              className="mb-6"
              style={{
                transform: "translate(5px,0px) scale(0.95)",
              }}
            >

              <label
                className="mb-3 block font-semibold text-[#5E503F]"
                style={{
                  transform: "translate(10px,0px) scale(0.9)",
                }}
              >
                Password
              </label>


              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Create secure password"
                className="w-full rounded-2xl border border-[#E6DAC8] bg-[#FCFAF7] px-5 py-4 text-[#3D3023] outline-none transition-all duration-300 focus:border-[#B68B4A] focus:ring-4 focus:ring-[#F8E7C8]"
                style={{
                  paddingLeft: "30px",
                  paddingRight: "30px",
                  transform: "translate(0px,0px) scale(0.95)",
                }}
              />

            </div>



            {/* ROLE */}

            <div
              className="mb-8"
              style={{
                transform: "translate(5px,0px) scale(0.95)",
              }}
            >

              <label
                className="mb-3 block font-semibold text-[#5E503F]"
                style={{
                  transform: "translate(10px,0px) scale(0.9)",
                }}
              >
                Role
              </label>


              <select
  name="role"
  value={form.role}
  onChange={handleChange}
  className="w-full rounded-2xl border border-[#E6DAC8] bg-[#FCFAF7] px-5 py-4 text-[#3D3023] text-[#3D3023] outline-none transition-all duration-300 focus:border-[#B68B4A] focus:ring-4 focus:ring-[#F8E7C8]"
style={{
                  paddingLeft: "30px",
                  paddingRight: "30px",
                  transform: "translate(0px,0px) scale(0.95)",
                }}
>
  <option value="admin">Admin</option>
  <option value="superadmin">Super Admin</option>
</select>
                
            

            </div>



            {/* PERMISSIONS */}

            <h3
              className="mb-5 text-xl font-bold text-[#3D3023]"
              style={{
                transform: "translate(10px,0px) scale(0.9)",
              }}
            >
              Permissions
            </h3>

            <div
              className="grid grid-cols-2 gap-4"
              style={{
                transform: "translate(0px,0px) scale(0.95)",
              }}
            >

              {[
                "Dashboard",
                "Products",
                "Orders",
                "Customers",
                "Categories",
              ].map((item) => (

                <button
                  key={item}
                  type="button"
                  onClick={() => togglePermission(item)}
                  className={`rounded-2xl border p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${form.permissions.includes(item)
                      ? "border-[#B68B4A] bg-gradient-to-r from-[#C89B55] to-[#E7CA90] text-white shadow-lg"
                      : "border-[#E8DDCC] bg-[#FCFAF7] text-[#3D3023]"
                    }`}
                  style={{
                    paddingLeft: "20px",
                    paddingRight: "20px",
                    transform: "scale(0.9)",
                  }}
                >

                  <h4
                    className="font-bold"
                    style={{
                      transform: "translate(5px,0px) scale(0.95)",
                    }}
                  >
                    {item}
                  </h4>

                  <p
                    className="mt-2 text-sm opacity-80"
                    style={{
                      transform: "translate(5px,0px) scale(0.9)",
                    }}
                  >

                    Access {item.toLowerCase()} module
                  </p>

                </button>

              ))}

            </div>



            <button
              onClick={saveAdmin}
              className="mt-10 w-full rounded-2xl bg-gradient-to-r from-[#B6884D] to-[#DEBF86] py-5 text-lg font-bold text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
              style={{
                transform: "translate(0px,0px) scale(0.92)",
              }}
            >

              {editId ? "Update Administrator" : "Create Administrator"}

            </button>

          </div>

        </div>

        {/* RIGHT PANEL */}

        <div className="col-span-7"
          style={{
            transform: "translate(0px,5px)",
          }}>

          <div className="rounded-[34px] border border-[#E8DDCC] bg-white p-8 shadow-xl"
            style={{
              transform: "translate(-10px,8px)",
            }}>

            <div className="mb-8 flex items-center justify-between"
              style={{

                transform: "translate(0px,5px)",
              }}>

              <div>

                <h2 className="text-3xl font-black text-[#3D3023]"
                  style={{

                    transform: "translate(30px,-2px) scale(0.9)",
                  }}>
                  All Administrators
                </h2>

                <p className="mt-2 text-[#7A6B59]"
                  style={{

                    transform: "translate(40px,-10px)",
                  }}>
                  Manage all administrator accounts.
                </p>

              </div>

              <div className="rounded-2xl bg-[#F8F3EA] px-6 py-3"
                style={{
                  paddingLeft: "20px",
                  paddingRight: "20px",
                  transform: "translate(-20px,-8px)",
                }}>

                <span className="font-bold text-[#B6884D]"
                  style={{
                    paddingLeft: "20px",
                    paddingRight: "20px",
                    transform: "translate(1px,5px) scale(0.9)",
                  }}>
                  {admins.length} Admins
                </span>

              </div>

            </div>

            <div className="space-y-6"
              style={{

                transform: "translate(5px,-10px)scale(0.96)",
              }}>

              {admins.length === 0 ? (

                <div className="rounded-[28px] border-2 border-dashed border-[#E7D9C4] py-20 text-center"
                  style={{


                    transform: "translate(0px,8px)",
                  }} >

                  <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-[#F5E7CD] text-5xl text-[#B6884D]"
                    style={{

                      transform: "translate(0px,5px)",
                    }}
                  >

                    <FaUsers />

                  </div>

                  <h3 className="text-3xl font-bold text-[#3D3023]"
                    style={{

                      transform: "translate(0px,10px)",
                    }}
                  >
                    No Admin Found
                  </h3>

                  <p className="mt-3 text-[#7A6B59]"
                    style={{
                      transform: "translate(0px,5px)",
                    }}
                  >
                    Create your first administrator account.
                  </p>

                </div>

              ) : (

                admins.map((admin) => (

                  <div
                    key={admin._id}
                    className="group rounded-[28px] border border-[#E8DDCC] bg-[#FFFEFC] p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"

                    style={{

                      transform: "translate(0px,5px)",
                    }}
                  >

                    <div className="flex items-start justify-between"

                      style={{

                        transform: "translate(0px,5px)",
                      }}
                    >

                      <div className="flex items-center gap-5"
                        style={{

                          transform: "translate(15px,-8px) scale(0.93)",
                        }}>

                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#C89B55] to-[#E6CA91] text-2xl font-bold text-white shadow-lg"
                          style={{

                            transform: "translate(0px,-1px)",
                          }}>

                          {admin.name?.charAt(0).toUpperCase()}

                        </div>

                        <div>

                          <h3 className="text-2xl font-bold text-[#3D3023]"
                            style={{

                              transform: "translate(0px,8px)",
                            }}
                          >

                            {admin.name}

                          </h3>

                          <p className="mt-1 text-[#7A6B59]"
                            style={{

                              transform: "translate(0px,5px)",
                            }}
                          >

                            {admin.email}

                          </p>

                          <div className="mt-4"
                            style={{
                              transform: "translate(180px,-18px)scale(0.89)",
                            }}
                          >

                            <span
                              className={`rounded-full !px-4 py-2 text-sm font-bold ${admin.role === "Super Admin"
                                
                                  ? "bg-[#FFF0CF] text-[#A26C13]"
                                  : "bg-[#EDF5FF] text-[#3568B8]"
                                  
                                }`}
                            >

                              {admin.role}

                            </span>

                          </div>

                        </div>

                      </div>

                      <div className="flex gap-3"
                        style={{

                          transform: "translate(-15px,20px)",
                        }}
                      >

                        <button
                          onClick={() => editAdmin(admin)}
                          className="rounded-xl border border-[#D9B77E] bg-white px-5 py-3 font-semibold text-[#B6884D] transition-all hover:bg-[#FFF6E8]"

                          style={{
                            paddingLeft: "20px",
                            paddingRight: "20px",
                            transform: "translate(0px,-4px)",
                          }}
                        >

                          Edit

                        </button>

                        <button
                          onClick={() => deleteAdmin(admin._id)}
                          className="rounded-xl bg-gradient-to-r from-red-500 to-red-400 px-5 py-3 font-semibold text-white transition-all hover:scale-105"
                          style={{
                            paddingLeft: "20px",
                            paddingRight: "10px",
                            transform: "translate(0px,-4px)",
                          }}
                        >

                          Delete

                        </button>

                      </div>

                    </div>

                    <div className="mt-6 flex flex-wrap gap-3"

                      style={{
                        transform: "translate(0px,1px)",
                      }}
                    >

                      {admin.permissions?.map((permission) => (

                        <span
                          key={permission}
                          className="rounded-full bg-gradient-to-r from-[#F7E7C9] to-[#F2D8A3] px-4 py-2 text-sm font-semibold text-[#7B5A28]"
                          style={{
                            paddingLeft: "10px",
                            paddingRight: "10px",
                            transform: "translate(10px,-10px) scale(0.78)",
                          }}
                        >

                          {permission}

                        </span>

                      ))}

                    </div>

                  </div>

                ))

              )}

            </div>

          </div>

        </div>

      </div>

      {/* FOOTER */}

      <div className="mt-12 rounded-[34px] border border-[#E8DDCC] bg-gradient-to-r from-[#FFFDF8] via-[#FCF6EC] to-[#F7EEDB] p-8 shadow-xl"

        style={{
          transform: "translate(25px,-1px)",
        }}
      >

        <div className="flex flex-col md:flex-row items-center justify-between gap-6"

          style={{

            transform: "translate(0px,-1px) scale(0.9)",
          }}
        >

          <div>

            <h2 className="text-3xl font-black text-[#3D3023]"

              style={{
                transform: "translate(0px,6px)",
              }}
            >
              Craft Corner Admin Panel
            </h2>

            <p className="mt-2 text-[#7A6B59]"

              style={{
                transform: "translate(0px,2px)",
              }}
            >
              Premium Admin Management Dashboard
            </p>

          </div>

          <div className="flex gap-6"
            style={{
              transform: "translate(0px,-3px)",
            }}
          >

            <div className="rounded-2xl bg-white px-8 py-5 shadow"
              style={{
                transform: "translate(0px,4px)",
              }}
            >

              <p className="text-sm text-[#8D7A63]"
                style={{
                  transform: "translate(0px,4px) scale(0.89)",
                }}
              >
                Total Admins
              </p>

              <h2 className="mt-2 text-3xl font-black text-[#B6884D]"
                style={{
                  transform: "translate(38px,-2px)",
                }}
              >

                {totalAdmins}

              </h2>

            </div>

            <div className="rounded-2xl bg-white px-8 py-5 shadow"
              style={{
                transform: "translate(0px,5px)",
              }}
            >

              <p className="text-sm text-[#8D7A63]"
                style={{
                  transform: "translate(0px,3px) scale(0.9)",
                }}
              >
                Super Admins
              </p>

              <h2 className="mt-2 text-3xl font-black text-[#B6884D]"
                style={{
                  transform: "translate(38px,-2px) ",
                }}
              >

                {superAdmins}

              </h2>

            </div>

          </div>

        </div>

      </div>



      <div className="mt-10 flex items-center justify-between border-t border-[#E9DDCC] pt-8"
        style={{
          transform: "translate(0px,5px)",
        }}
      >

        <p className="text-[#8D7A63]"
          style={{
            transform: "translate(0px,2px) scale(0.89)",
          }}
        >
          © {new Date().getFullYear()} Craft Corner Admin Dashboard
        </p>

        <p className="font-semibold text-[#B6884D]"
          style={{
            transform: "translate(0px,1px) scale(0.9) ",
          }}
        >
          Version 2.0
        </p>

      </div>

    </div>

  );

}