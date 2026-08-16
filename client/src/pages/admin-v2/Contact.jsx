import React, { useEffect, useState } from "react";
import api from "../../api";

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


  const fetchComplaints = async () => {

    try {

      setLoading(true);

      const response = await api.get("/complaints");

      setComplaints(
        response.data.complaints || []
      );

    } catch (error) {

      console.error(
        "COMPLAINT FETCH ERROR:",
        error
      );

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

      await api.delete(
        `/complaints/${id}`
      );

      setComplaints((prev) =>
        prev.filter(
          (item) => item._id !== id
        )
      );

    } catch (error) {

      console.error(
        "DELETE COMPLAINT ERROR:",
        error
      );

    }
  };


  const updateStatus = async (
    id,
    status
  ) => {

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

      console.error(
        "STATUS UPDATE ERROR:",
        error
      );

    }
  };


  const filteredComplaints =
    complaints.filter((complaint) => {

      const text =
        `${complaint.name}
        ${complaint.email}
        ${complaint.subject}
        ${complaint.message}`
          .toLowerCase();

      return text.includes(
        search.toLowerCase()
      );

    });


  const getStatusClass = (status) => {

    if (status === "Resolved") {
      return "bg-[#E3F1E1] text-[#4B7B37]";
    }

    if (status === "In Progress") {
      return "bg-[#E6EEF7] text-[#41658A]";
    }

    return "bg-[#FFF0D4] text-[#B56800]";
  };


  return (

    <div
      className="min-h-screen bg-[#F7F5EF]"
      style={{
        padding: "28px",
        transform: "translate(0px,0px)",
      }}
    >


      {/* HEADER */}

      <div
        className="flex items-center justify-between mb-8"
        style={{
          padding: "5px 0px",
          transform: "translate(0px,0px)",
        }}
      >

        <div>

          <h1 className="text-4xl font-black text-[#2F3A2D]">
            Complaints
          </h1>

          <p className="text-[#716B60] mt-2">
            View and manage customer complaints
          </p>

        </div>


        <div
          className="flex items-center gap-4"
          style={{
            padding: "0px",
            transform: "translate(0px,0px)",
          }}
        >

          <div className="relative">

            <FaSearch
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8A887F]"
            />

            <input
              type="text"
              placeholder="Search complaints..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-[340px] rounded-2xl border border-[#E1DED5] bg-white py-3 pl-11 pr-4 outline-none focus:border-[#556B2F]"
            />

          </div>


          <button
            className="flex items-center gap-2 rounded-2xl border border-[#E1DED5] bg-white px-5 py-3 font-semibold text-[#4E4334]"
          >

            <FaFilter />

            Filters

          </button>

        </div>

      </div>


      {/* TABLE CARD */}

      <div
        className="overflow-hidden rounded-[24px] border border-[#E4E0D6] bg-white shadow-[0_8px_25px_rgba(70,80,40,0.08)]"
        style={{
          padding: "0px",
          transform: "translate(0px,0px)",
        }}
      >

        {/* TABLE HEADER */}

        <div className="grid grid-cols-[60px_1.3fr_1.5fr_1.4fr_150px_130px_190px] items-center border-b border-[#ECE9E1] bg-[#FBFAF7] px-5 py-4 text-sm font-bold text-[#4E4334]">

          <span>ID</span>

          <span>Customer</span>

          <span>Email</span>

          <span>Subject</span>

          <span>Status</span>

          <span>Date</span>

          <span>Action</span>

        </div>


        {/* LOADING */}

        {loading && (

          <div className="px-6 py-12 text-center text-[#77736A]">
            Loading complaints...
          </div>

        )}


        {/* EMPTY */}

        {!loading &&
          filteredComplaints.length === 0 && (

            <div className="px-6 py-16 text-center">

              <FaComments
                className="mx-auto mb-4 text-[#A7B695]"
                size={40}
              />

              <p className="text-lg font-semibold text-[#4E4334]">
                No complaints found
              </p>

              <p className="mt-1 text-[#8A887F]">
                Customer complaints will appear here.
              </p>

            </div>

          )}


        {/* ROWS */}

        {!loading &&
          filteredComplaints.map(
            (complaint, index) => (

              <div
                key={complaint._id}
                className="grid grid-cols-[60px_1.3fr_1.5fr_1.4fr_150px_130px_190px] items-center border-b border-[#F0EEE8] px-5 py-4 transition hover:bg-[#FCFBF7]"
              >


                {/* ID */}

                <span className="text-[#596052]">
                  {index + 1}
                </span>


                {/* CUSTOMER */}

                <div className="flex items-center gap-3">

                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#EAF1E4] font-bold text-[#556B2F]">

                    {complaint.name
                      ?.charAt(0)
                      .toUpperCase()}

                  </div>


                  <div>

                    <p className="font-bold text-[#4E4334]">
                      {complaint.name}
                    </p>

                    <p className="text-sm text-[#8A887F]">
                      Customer
                    </p>

                  </div>

                </div>


                {/* EMAIL */}

                <span className="truncate text-[#596052]">
                  {complaint.email}
                </span>


                {/* SUBJECT */}

                <span className="truncate font-medium text-[#4E4334]">
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
                  className={`w-fit rounded-full border-0 px-4 py-2 text-sm font-semibold outline-none ${getStatusClass(
                    complaint.status
                  )}`}
                >

                  <option>
                    Pending
                  </option>

                  <option>
                    In Progress
                  </option>

                  <option>
                    Resolved
                  </option>

                </select>


                {/* DATE */}

                <span className="text-sm text-[#77736A]">

                  {new Date(
                    complaint.createdAt
                  ).toLocaleDateString(
                    "en-IN",
                    {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    }
                  )}

                </span>


                {/* ACTION */}

                <div className="flex items-center gap-3">

                  <button
                    onClick={() =>
                      alert(
                        `Message:\n\n${complaint.message}`
                      )
                    }
                    className="flex items-center gap-2 rounded-full border border-[#7A915A] px-5 py-2 font-semibold text-[#556B2F] hover:bg-[#EEF3E8]"
                  >

                    <FaEye />

                    View

                  </button>


                  <button
                    onClick={() =>
                      deleteComplaint(
                        complaint._id
                      )
                    }
                    className="flex items-center gap-2 rounded-full border border-red-300 px-5 py-2 font-semibold text-red-500 hover:bg-red-50"
                  >

                    <FaTrash />

                    Delete

                  </button>

                </div>

              </div>

            )
          )}

      </div>

    </div>

  );
}