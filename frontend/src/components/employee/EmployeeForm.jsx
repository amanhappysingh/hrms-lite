
import React, { useState } from "react";
import Button from "../common/Button";
import api from "../../services/api";


const EmployeeForm = ({ onSuccess }) => {
  const [form, setForm] = useState({
    employeeId: "",
    fullName: "",
    email: "",
    department: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      setLoading(true);
      await api.post("/employees", form);
      setForm({ employeeId: "", fullName: "", email: "", department: "" });
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add employee");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="bg-white border rounded p-4 space-y-3" onSubmit={handleSubmit}>
      <h3 className="text-lg font-medium">Add Employee</h3>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <input className="border p-2 w-full" name="employeeId" placeholder="Employee ID" value={form.employeeId} onChange={handleChange} required />
      <input className="border p-2 w-full" name="fullName" placeholder="Full Name" value={form.fullName} onChange={handleChange} required />
      <input className="border p-2 w-full" name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
      <input className="border p-2 w-full" name="department" placeholder="Department" value={form.department} onChange={handleChange} required />

      <Button disabled={loading}>{loading ? "Saving..." : "Add Employee"}</Button>
    </form>
  );
};

export default EmployeeForm;

