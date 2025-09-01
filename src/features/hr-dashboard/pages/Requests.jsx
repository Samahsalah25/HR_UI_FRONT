import React, { useState, useEffect } from "react";
import axios from "axios";
import RequestsTable from "../components/RequestsTablePage";
import RequestModal from "../components/RequestModal";
import NoteModal from "../components/NoteModal";

const Requests = () => {
  const [filter, setFilter] = useState("الكل");
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showNote, setShowNote] = useState(false);

  const statusMap = {
    الكل: "الكل",
    مقبولة: "مقبول",
    مرفوضة: "مرفوض",
    "قيد المراجعة": "قيد المراجعة",
  };

  // جلب كل الطلبات حسب الفلتر
  const fetchRequests = async (filter) => {
    try {
      setLoading(true);
      let url = "http://localhost:4000/api/requests";
      if (filter !== "الكل") url += `?status=${statusMap[filter]}`;
      const res = await axios.get(url);
      setRequests(res.data.items || []);
    } catch (err) {
      console.error("Error fetching requests:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests(filter);
  }, [filter]);

  // جلب تفاصيل الطلب الفردي بالـ ID
  const fetchRequestDetails = async (id) => {
    if (!id) return;
    try {
      const res = await axios.get(`http://localhost:4000/api/requests/${id}`);
      setSelectedRequest(res.data);
      setShowNote(false);
    } catch (err) {
      console.error("Error fetching request details:", err.response?.data || err.message);
    }
  };

  const baseColumns = ["اسم الموظف", "نوع الطلب", "تاريخ التقديم", "الحالة"];
  let columns = [...baseColumns];
  if (filter === "مقبولة") columns.push("تاريخ القبول");
  if (filter === "مرفوضة") columns.push("تاريخ الرفض");
  if (filter === "قيد المراجعة") columns.push("إجراء سريع");
  if (filter === "الكل") columns.push("إجراء سريع");

  return (
    <div className="p-b-4">
      {/* التابز */}
      <div className="flex">
        {["الكل", "مقبولة", "قيد المراجعة", "مرفوضة"].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-2 transition w-[172px] rounded-tl-[16px] rounded-tr-[16px]  ${
              filter === tab
                ? "bg-[#FF9831] text-white"
                : "bg-[#F8F8F866] text-[#6f7272]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* الجدول */}
      {loading ? (
        <p className="p-4">جاري التحميل...</p>
      ) : (
        <RequestsTable
          columns={columns}
          data={requests}
          filter={filter}
          onRowClick={(row) => fetchRequestDetails(row.id)}
         
  fetchRequests={fetchRequests}
        />
      )}

      {/* المودالات */}
      {selectedRequest && !showNote && (
        <RequestModal
          request={selectedRequest}
          onClose={() => setSelectedRequest(null)}
          onAddNote={() => setShowNote(true)}
           onUpdate={() => fetchRequests(filter)} // هينادي بعد approve/reject/forward
        />
      )}

   {selectedRequest && showNote && (
  <NoteModal
    requestId={selectedRequest._id} 
    onClose={() => {
      setSelectedRequest(null);
      setShowNote(false);
    }}
    onBack={() => setShowNote(false)}
    onUpdate={() => fetchRequests(filter)} 
  />
)}

    </div>
  );
};

export default Requests;
