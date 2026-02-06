import React, { useEffect, useState } from "react";
import Button from "../common/Button";
import api from "../../services/api";


const AttendanceForm = ({ onMarked }) => {
  const [employees, setEmployees] = useState([]);
  const [employeeId, setEmployeeId] = useState("");
  const [status, setStatus] = useState("Present");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/employees").then((res) => {
      setEmployees(res.data.data);
    });
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    if (!employeeId) {
      setError("Please select an employee");
      return;
    }
    setError("");
    try {
      setLoading(true);
      await api.post("/attendance", { employeeId, status });
      onMarked(employeeId);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to mark attendance");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="bg-white border rounded p-4 space-y-3" onSubmit={submit}>
      <h3 className="text-lg font-medium">Mark Attendance</h3>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <select
        className="border p-2 w-full"
        value={employeeId}
        onChange={(e) => setEmployeeId(e.target.value)}
      >
        <option value="">Select Employee</option>
        {employees.map((e) => (
          <option key={e._id} value={e._id}>
            {e.fullName} ({e.employeeId})
          </option>
        ))}
      </select>

      <select
        className="border p-2 w-full"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="Present">Present</option>
        <option value="Absent">Absent</option>
      </select>

      <Button disabled={loading}>
        {loading ? "Saving..." : "Mark Attendance"}
      </Button>
    </form>
  );
};

export default AttendanceForm;
