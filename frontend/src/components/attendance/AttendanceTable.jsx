import React from "react";

const AttendanceTable = ({ records }) => {
  if (!records.length) {
    return <p className="text-gray-500">No attendance records found</p>;
  }

  return (
    <table className="w-full bg-white border">
      <thead className="bg-gray-100">
        <tr>
          <th className="border p-2">Employee ID</th>
          <th className="border p-2">Employee Name</th>
          <th className="border p-2">Date</th>
          <th className="border p-2">Status</th>
        </tr>
      </thead>
      <tbody>
        {records?.map((r) => (
          <tr key={r._id}>
            <td className="border p-2">
              {r.employeeId?.employeeId}
            </td>
            <td className="border p-2">
              {r.employeeId?.fullName}
            </td>
            <td className="border p-2">
              {new Date(r.date).toLocaleDateString()}
            </td>
            <td className="border p-2">
              {r.status}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AttendanceTable;
