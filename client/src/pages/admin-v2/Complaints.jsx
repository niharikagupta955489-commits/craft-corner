import React, { useEffect, useState } from "react";
import api from "../../services/api";

import {
  FaSearch,
  FaFilter,
  FaEye,
  FaTrash,
  FaComments,
} from "react-icons/fa";

export default function Complaints() {
  const [complaints, setComplaints] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  const fetchComplaints = async () => {
    try {
      setLoading(true);

      const response = await api.get("/complaints");

      setComplaints(response.data.complaints || []);
    } catch (error) {
      console.error("COMPLAINT FETCH ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const deleteComplaint = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this complaint?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/complaints/${id}`);

      setComplaints((prev) =>
        prev.filter((item) => item._id !== id)
      );
    } catch (error) {
      console.error("DELETE COMPLAINT ERROR:", error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const response = await api.put(
        `/complaints/${id}`,
        { status }
      );

      setComplaints((prev) =>
        prev.map((item) =>
          item._id === id
            ? response.data.complaint
            : item
        )
      );
    } catch (error) {
      console.error("STATUS UPDATE ERROR:", error);
    }
  };

  const filteredComplaints = complaints.filter((complaint) => {
    const text = `
      ${complaint.name}
      ${complaint.email}
      ${complaint.subject}
      ${complaint.message}
    `.toLowerCase();

    return text.includes(search.toLowerCase());
  });

  const getStatusClass = (status) => {
    if (status === "Resolved") {
      return "bg-[#E4F1DE] text-[#52763D]";
    }

    if (status === "In Progress") {
      return "bg-[#E7EEF8] text-[#4C6687]";
    }

    return "bg-[#FFF0D4] text-[#B56800]";
  };

  return (
    <div
      className="min-h-screen w-full bg-[#F7F5EF]"
      style={{
        transform: "translate(0px, 0px)",
        padding: "0px",
        margin: "0px",
      }}
    >

      {/* MAIN CONTENT */}

      <div
        className="w-full"
        style={{
          transform: "translate(0px, 0px)",
          padding: "6px 10px 40px 10px",
        }}
      >

        {/* ================= HEADER ================= */}

        <div
          className="flex items-start justify-between"
          style={{
            transform: "translate(0px, 0px)",
            padding: "4px 0px 24px 0px",
            margin: "0px",
          }}
        >

          {/* TITLE */}

          <div
            style={{
              transform: "translate(0px, 0px)",
              padding: "0px",
            }}
          >

            <h1
              className="text-[44px] font-black leading-none text-[#292929]"
              style={{
                transform: "translate(0px, 0px)",
                padding: "0px",
                margin: "0px",
              }}
            >
              Complaints
            </h1>

            <p
              className="text-[18px] text-[#716F6A]"
              style={{
                transform: "translate(0px, 5px)",
                padding: "0px",
                margin: "0px",
              }}
            >
              View and manage your store complaints
            </p>

          </div>


          {/* SEARCH + FILTER */}

          <div
            className="flex items-center"
            style={{
              transform: "translate(0px, 3px)",
              padding: "0px",
              gap: "14px",
            }}
          >

            {/* SEARCH */}

            <div
              className="
                flex
                items-center
                bg-white
                border
                border-[#DEDCD6]
                rounded-[18px]
                shadow-sm
              "
              style={{
                transform: "translate(0px, 0px)",
                padding: "0px 18px",
                width: "340px",
                height: "56px",
              }}
            >

              <FaSearch
                className="text-[#8A887F]"
                size={17}
                style={{
                  transform: "translate(0px, 0px)",
                  padding: "0px",
                  marginRight: "10px",
                }}
              />

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search complaints..."
                className="
                  w-full
                  bg-transparent
                  outline-none
                  text-[#4E4334]
                  text-[16px]
                "
                style={{
                  transform: "translate(0px, 0px)",
                  padding: "0px",
                  margin: "0px",
                }}
              />

            </div>


            {/* FILTER */}

            <button
              className="
                flex
                items-center
                gap-2
                bg-white
                border
                border-[#DEDCD6]
                rounded-[18px]
                text-[#4E4334]
                font-semibold
                hover:bg-[#EEF1E7]
                transition
              "
              style={{
                transform: "translate(0px, 0px)",
                padding: "0px 20px",
                height: "56px",
                whiteSpace: "nowrap",
              }}
            >

              <FaFilter size={15} />

              <span>Filters</span>

            </button>

          </div>

        </div>


        {/* ================= TABLE CARD ================= */}

        <div
          className="
            w-full
            bg-white
            border
            border-[#E2DED4]
            rounded-[24px]
            shadow-[0_7px_22px_rgba(70,80,40,0.06)]
            overflow-hidden
          "
          style={{
            transform: "translate(0px, 0px)",
            padding: "0px",
            margin: "0px",
          }}
        >

          {/* TABLE HEADER */}

          <div
            className="
              grid
              grid-cols-[55px_minmax(190px,1.15fr)_minmax(220px,1.4fr)_minmax(160px,1fr)_130px_125px_205px]
              items-center
              bg-[#FBFAF7]
              border-b
              border-[#E7E4DC]
              text-[#4E4334]
              font-bold
              text-[15px]
            "
            style={{
              transform: "translate(0px, 0px)",
              padding: "14px 18px",
              margin: "0px",
              columnGap: "8px",
            }}
          >

            <span
              style={{
                transform: "translate(0px, 0px)",
                padding: "0px",
              }}
            >
              ID
            </span>

            <span
              style={{
                transform: "translate(0px, 0px)",
                padding: "0px",
              }}
            >
              Customer
            </span>

            <span
              style={{
                transform: "translate(0px, 0px)",
                padding: "0px",
              }}
            >
              Email
            </span>

            <span
              style={{
                transform: "translate(0px, 0px)",
                padding: "0px",
              }}
            >
              Subject
            </span>

            <span
              style={{
                transform: "translate(0px, 0px)",
                padding: "0px",
              }}
            >
              Status
            </span>

            <span
              style={{
                transform: "translate(0px, 0px)",
                padding: "0px",
              }}
            >
              Date
            </span>

            <span
              style={{
                transform: "translate(0px, 0px)",
                padding: "0px",
              }}
            >
              Action
            </span>

          </div>


          {/* LOADING */}

          {loading && (
            <div
              className="text-center text-[#77736A]"
              style={{
                transform: "translate(0px, 0px)",
                padding: "45px 20px",
                margin: "0px",
              }}
            >
              Loading complaints...
            </div>
          )}


          {/* EMPTY */}

          {!loading &&
            filteredComplaints.length === 0 && (

              <div
                className="text-center"
                style={{
                  transform: "translate(0px, 0px)",
                  padding: "70px 20px",
                  margin: "0px",
                }}
              >

                <FaComments
                  className="mx-auto text-[#A5B393]"
                  size={42}
                  style={{
                    transform: "translate(0px, 0px)",
                    padding: "0px",
                    marginBottom: "15px",
                  }}
                />

                <h3
                  className="font-bold text-[20px] text-[#4E4334]"
                  style={{
                    transform: "translate(0px, 0px)",
                    padding: "0px",
                    margin: "0px",
                  }}
                >
                  No complaints found
                </h3>

                <p
                  className="text-[#8A887F]"
                  style={{
                    transform: "translate(0px, 5px)",
                    padding: "0px",
                    margin: "0px",
                  }}
                >
                  Customer complaints will appear here.
                </p>

              </div>

            )}


          {/* ================= ROWS ================= */}

          {!loading &&
            filteredComplaints.map((complaint, index) => (

              <div
                key={complaint._id}
                className="
                  grid
                  grid-cols-[55px_minmax(190px,1.15fr)_minmax(220px,1.4fr)_minmax(160px,1fr)_130px_125px_205px]
                  items-center
                  border-b
                  border-[#EFEEE9]
                  hover:bg-[#FCFBF7]
                  transition
                "
                style={{
                  transform: "translate(0px, 0px)",
                  padding: "11px 18px",
                  margin: "0px",
                  columnGap: "8px",
                  minHeight: "82px",
                }}
              >

                {/* ID */}

                <span
                  className="text-[#5E6559] text-[16px]"
                  style={{
                    transform: "translate(0px, 0px)",
                    padding: "0px",
                  }}
                >
                  {index + 1}
                </span>


                {/* CUSTOMER */}

                <div
                  className="flex items-center"
                  style={{
                    transform: "translate(-20px, 0px)",
                    padding: "0px",
                    gap: "12px",
                  }}
                >

                  <div
                    className="
                      flex
                      items-center
                      justify-center
                      rounded-full
                      bg-[#E8F0E2]
                      text-[#55753D]
                      font-bold
                      text-[18px]
                      shrink-0
                    "
                    style={{
                      transform: "translate(0px, 0px)",
                      padding: "0px",
                      width: "48px",
                      height: "48px",
                    }}
                  >
                    {complaint.name
                      ?.charAt(0)
                      .toUpperCase()}
                  </div>


                  <div
                    className="min-w-0"
                    style={{
                      transform: "translate(0px, 0px)",
                      padding: "0px",
                    }}
                  >

                    <p
                      className="font-bold text-[#5B5A54] text-[17px] truncate"
                      style={{
                        transform: "translate(0px, 0px)",
                        padding: "0px",
                        margin: "0px",
                      }}
                    >
                      {complaint.name}
                    </p>

                    <p
                      className="text-[14px] text-[#88857D]"
                      style={{
                        transform: "translate(0px, 2px)",
                        padding: "0px",
                        margin: "0px",
                      }}
                    >
                      Customer
                    </p>

                  </div>

                </div>


                {/* EMAIL */}

                <span
                  className="truncate text-[#596052] text-[16px]"
                  title={complaint.email}
                  style={{
                    transform: "translate(-50px, 0px)",
                    padding: "0px",
                    margin: "0px",
                  }}
                >
                  {complaint.email}
                </span>


                {/* SUBJECT */}

                <span
                  className="truncate text-[#4E4334] font-medium text-[16px]"
                  title={complaint.subject}
                  style={{
                    transform: "translate(0px, 0px)",
                    padding: "0px",
                    margin: "0px",
                  }}
                >
                  {complaint.subject}
                </span>


                {/* STATUS */}

                <select
                  value={complaint.status}
                  onChange={(e) =>
                    updateStatus(
                      complaint._id,
                      e.target.value
                    )
                  }
                  className={`
                    border-none
                    outline-none
                    rounded-full
                    font-semibold
                    text-[14px]
                    cursor-pointer
                    ${getStatusClass(complaint.status)}
                  `}
                  style={{
                    transform: "translate(-40px, 0px)",
                    padding: "6px 14px",
                    width: "120px",
                  }}
                >

                  <option value="Pending">
                    Pending
                  </option>

                  <option value="In Progress">
                    In Progress
                  </option>

                  <option value="Resolved">
                    Resolved
                  </option>

                </select>


                {/* DATE */}

                <span
                  className="text-[#77736A] text-[14px]"
                  style={{
                    transform: "translate(-20px, 0px)",
                    padding: "0px",
                    margin: "0px",
                  }}
                >
                  {new Date(
                    complaint.createdAt
                  ).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </span>


                {/* ACTION */}

                <div
                  className="flex items-center"
                  style={{
                    transform: "translate(-20px, 0px)",
                    padding: "0px",
                    gap: "10px",
                  }}
                >

                  <button
                    onClick={() =>
                      setSelectedComplaint(complaint)
                    }
                    className="
                      flex
                      items-center
                      justify-center
                      gap-2
                      rounded-full
                      border
                      border-[#79945B]
                      text-[#556B2F]
                      font-semibold
                      hover:bg-[#EEF3E8]
                      transition
                    "
                    style={{
                      transform: "translate(0px, 0px)",
                      padding: "7px 18px",
                      minWidth: "78px",
                    }}
                  >

                    <FaEye size={14} />

                    View

                  </button>


                  <button
                    onClick={() =>
                      deleteComplaint(
                        complaint._id
                      )
                    }
                    className="
                      flex
                      items-center
                      justify-center
                      gap-2
                      rounded-full
                      border
                      border-[#FFB0B0]
                      text-[#FF3333]
                      font-semibold
                      hover:bg-[#FFF1F1]
                      transition
                    "
                    style={{
                      transform: "translate(0px, 0px)",
                      padding: "7px 16px",
                      minWidth: "88px",
                    }}
                  >

                    <FaTrash size={14} />

                    Delete

                  </button>

                </div>

              </div>

            ))}

        </div>


        {/* ================= FOOTER ================= */}

        {!loading && filteredComplaints.length > 0 && (

          <div
            className="flex items-center justify-between"
            style={{
              transform: "translate(0px, 0px)",
              padding: "18px 8px 5px 8px",
              margin: "0px",
            }}
          >

            <p
              className="text-[14px] text-[#77736A]"
              style={{
                transform: "translate(0px, 0px)",
                padding: "0px",
                margin: "0px",
              }}
            >
              Showing 1 to {filteredComplaints.length} complaints
            </p>


            <div
              className="flex items-center"
              style={{
                transform: "translate(0px, 0px)",
                padding: "0px",
                gap: "6px",
              }}
            >

              <button
                className="
                  border
                  border-[#DDD9D0]
                  rounded-lg
                  text-[#777]
                  bg-white
                "
                style={{
                  transform: "translate(0px, 0px)",
                  padding: "7px 13px",
                }}
              >
                ‹
              </button>

              <button
                className="
                  rounded-lg
                  bg-[#556B2F]
                  text-white
                  font-semibold
                "
                style={{
                  transform: "translate(0px, 0px)",
                  padding: "7px 13px",
                }}
              >
                1
              </button>

              <button
                className="
                  border
                  border-[#DDD9D0]
                  rounded-lg
                  text-[#777]
                  bg-white
                "
                style={{
                  transform: "translate(0px, 0px)",
                  padding: "7px 13px",
                }}
              >
                ›
              </button>

            </div>

          </div>

        )}

      </div>


      {/* ================= VIEW MODAL ================= */}

      {selectedComplaint && (

        <div
          className="
            fixed
            inset-0
            z-[100]
            flex
            items-center
            justify-center
            bg-black/40
          "
          style={{
            transform: "translate(0px, 0px)",
            padding: "25px",
            margin: "0px",
          }}
        >

          <div
            className="
              w-full
              max-w-[620px]
              rounded-[26px]
              bg-white
              shadow-2xl
            "
            style={{
              transform: "translate(0px, 0px)",
              padding: "30px",
              margin: "0px",
            }}
          >

            {/* MODAL HEADER */}

            <div
              className="flex items-center justify-between"
              style={{
                transform: "translate(0px, 0px)",
                padding: "0px 0px 20px",
                margin: "0px",
              }}
            >

              <div
                className="flex items-center"
                style={{
                  transform: "translate(0px, 0px)",
                  padding: "0px",
                  gap: "12px",
                }}
              >

                <div
                  className="
                    flex
                    items-center
                    justify-center
                    rounded-full
                    bg-[#E8F0E2]
                    text-[#556B2F]
                  "
                  style={{
                    transform: "translate(0px, 0px)",
                    padding: "0px",
                    width: "48px",
                    height: "48px",
                  }}
                >
                  <FaComments />
                </div>

                <div
                  style={{
                    transform: "translate(0px, 0px)",
                    padding: "0px",
                  }}
                >

                  <h2
                    className="text-[24px] font-bold text-[#3E4439]"
                    style={{
                      transform: "translate(0px, 0px)",
                      padding: "0px",
                      margin: "0px",
                    }}
                  >
                    Complaint Details
                  </h2>

                  <p
                    className="text-[14px] text-[#88857D]"
                    style={{
                      transform: "translate(0px, 2px)",
                      padding: "0px",
                      margin: "0px",
                    }}
                  >
                    Customer complaint information
                  </p>

                </div>

              </div>


              <button
                onClick={() =>
                  setSelectedComplaint(null)
                }
                className="
                  rounded-full
                  text-[#777]
                  hover:bg-[#F3F1EB]
                "
                style={{
                  transform: "translate(0px, 0px)",
                  padding: "9px 13px",
                }}
              >
                ✕
              </button>

            </div>


            {/* MODAL CONTENT */}

            <div
              style={{
                transform: "translate(0px, 0px)",
                padding: "8px 0px 0px",
                margin: "0px",
              }}
            >

              <div
                className="grid grid-cols-2"
                style={{
                  transform: "translate(0px, 0px)",
                  padding: "0px",
                  margin: "0px",
                  gap: "18px",
                }}
              >

                <div
                  style={{
                    transform: "translate(0px, 0px)",
                    padding: "0px",
                  }}
                >

                  <p
                    className="text-[13px] text-[#8A887F]"
                    style={{
                      transform: "translate(0px, 0px)",
                      padding: "0px",
                      margin: "0px 0px 5px",
                    }}
                  >
                    Customer
                  </p>

                  <p
                    className="font-semibold text-[#4E4334]"
                    style={{
                      transform: "translate(0px, 0px)",
                      padding: "0px",
                      margin: "0px",
                    }}
                  >
                    {selectedComplaint.name}
                  </p>

                </div>


                <div
                  style={{
                    transform: "translate(0px, 0px)",
                    padding: "0px",
                  }}
                >

                  <p
                    className="text-[13px] text-[#8A887F]"
                    style={{
                      transform: "translate(0px, 0px)",
                      padding: "0px",
                      margin: "0px 0px 5px",
                    }}
                  >
                    Email
                  </p>

                  <p
                    className="font-semibold text-[#4E4334] truncate"
                    style={{
                      transform: "translate(0px, 0px)",
                      padding: "0px",
                      margin: "0px",
                    }}
                  >
                    {selectedComplaint.email}
                  </p>

                </div>

              </div>


              {/* SUBJECT */}

              <div
                style={{
                  transform: "translate(0px, 0px)",
                  padding: "18px 0px 0px",
                }}
              >

                <p
                  className="text-[13px] text-[#8A887F]"
                  style={{
                    transform: "translate(0px, 0px)",
                    padding: "0px",
                    margin: "0px 0px 5px",
                  }}
                >
                  Subject
                </p>

                <p
                  className="font-semibold text-[#4E4334]"
                  style={{
                    transform: "translate(0px, 0px)",
                    padding: "0px",
                    margin: "0px",
                  }}
                >
                  {selectedComplaint.subject}
                </p>

              </div>


              {/* MESSAGE */}

              <div
                style={{
                  transform: "translate(0px, 0px)",
                  padding: "18px 0px 0px",
                }}
              >

                <p
                  className="text-[13px] text-[#8A887F]"
                  style={{
                    transform: "translate(0px, 0px)",
                    padding: "0px",
                    margin: "0px 0px 7px",
                  }}
                >
                  Message
                </p>

                <div
                  className="
                    rounded-[18px]
                    bg-[#F7F7F2]
                    text-[#5D6159]
                    leading-7
                  "
                  style={{
                    transform: "translate(0px, 0px)",
                    padding: "16px 18px",
                    margin: "0px",
                  }}
                >
                  {selectedComplaint.message}
                </div>

              </div>


              {/* STATUS */}

              <div
                style={{
                  transform: "translate(0px, 0px)",
                  padding: "18px 0px 0px",
                }}
              >

                <p
                  className="text-[13px] text-[#8A887F]"
                  style={{
                    transform: "translate(0px, 0px)",
                    padding: "0px",
                    margin: "0px 0px 6px",
                  }}
                >
                  Status
                </p>

                <span
                  className={`
                    inline-block
                    rounded-full
                    font-semibold
                    ${getStatusClass(
                      selectedComplaint.status
                    )}
                  `}
                  style={{
                    transform: "translate(0px, 0px)",
                    padding: "7px 15px",
                    margin: "0px",
                  }}
                >
                  {selectedComplaint.status}
                </span>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}