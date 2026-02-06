import React from "react";
import Button from "../common/Button";

const EmployeeTable = ({ employees, onDelete }) => {
  return (
    <table className="w-full bg-white border">
      <thead className="bg-gray-100">
        <tr>
          <th className="border p-2">Employee ID</th>
          <th className="border p-2">Name</th>
          <th className="border p-2">Email</th>
          <th className="border p-2">Department</th>
          <th className="border p-2">Action</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((emp) => (
          <tr key={emp._id}>
            <td className="border p-2">{emp.employeeId}</td>
            <td className="border p-2">{emp.fullName}</td>
            <td className="border p-2">{emp.email}</td>
            <td className="border p-2">{emp.department}</td>
            <td className="border p-2">
              <Button onClick={() => onDelete(emp._id)}>Delete</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EmployeeTable;
