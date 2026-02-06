import React, { useEffect, useState } from "react";

import Loader from "../components/common/Loader";
import EmptyState from "../components/common/EmptyState";
import EmployeeForm from "../components/employee/EmployeeForm";
import EmployeeTable from "../components/employee/EmployeeTable";
import api from "../services/api";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadEmployees = async () => {
    setLoading(true);
    try {
      const res = await api.get("/employees");
      setEmployees(res.data.data);
    } finally {
      setLoading(false);
    }
  };

  const deleteEmployee = async (id) => {
    if (!confirm("Delete this employee?")) return;
    await api.delete(`/employees/${id}`);
    loadEmployees();
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  return (
    <section className="space-y-6">
      <h2 className="text-xl font-semibold">Employee Management</h2>

      <EmployeeForm onSuccess={loadEmployees} />

      {loading && <Loader />}
      {!loading && employees.length === 0 && (
        <EmptyState message="No employees found" />
      )}
      {!loading && employees.length > 0 && (
        <EmployeeTable employees={employees} onDelete={deleteEmployee} />
      )}
    </section>
  );
};

export default Employees;
