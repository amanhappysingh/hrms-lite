import React, { useState } from "react";

import AttendanceForm from "../components/attendance/AttendanceForm";
import AttendanceTable from "../components/attendance/AttendanceTable";
import Loader from "../components/common/Loader";
import Button from "../components/common/Button";
import api from "../services/api";


const Attendance = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

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
      <h2 className="text-xl font-semibold">Attendance</h2>

      
      <AttendanceForm onMarked={fetchAttendance} />

 
      <div className="bg-white border rounded p-4 flex gap-4 items-end">
        <div>
          <label className="block text-sm">From</label>
          <input
            type="date"
            className="border p-2"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm">To</label>
          <input
            type="date"
            className="border p-2"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
        </div>

        <Button onClick={fetchAttendance}>Filter</Button>
      </div>
      {loading ? <Loader /> : <AttendanceTable records={records} />}
    </section>
  );
};

export default Attendance;
