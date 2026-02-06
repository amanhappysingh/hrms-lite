import React, { useState } from "react";

import AttendanceTable from "../components/attendance/AttendanceTable";
import Loader from "../components/common/Loader";
import Button from "../components/common/Button";
import api from "../services/api";

const AllAttendance = () => {
  const [records, setRecords] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchAttendance = async () => {
    setLoading(true);
    try {
      const res = await api.get("/attendance", {
        params: { from, to },
      });
      setRecords(res.data.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="items-center flex flex-col w-full">
          <h2 className="text-2xl font-bold text-gray-800">All Attendance</h2>
          <p className="text-sm text-gray-500 mt-1">
            View and filter attendance records
          </p>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
        <div className="flex gap-4 items-end flex-wrap">
          <div className="flex-1 min-w-[200px]">
            <label className="text-sm font-medium text-gray-700 block mb-2">
              From Date
            </label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            />
          </div>

          <div className="flex-1 min-w-[200px]">
            <label className="text-sm font-medium text-gray-700 block mb-2">
              To Date
            </label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />
          </div>

          <Button 
            onClick={fetchAttendance}
            className="px-6 py-2.5"
          >
            🔍 Filter Records
          </Button>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-12">
            <Loader />
          </div>
        ) : (
          <AttendanceTable records={records} />
        )}
      </div>
    </section>
  );
};

export default AllAttendance;