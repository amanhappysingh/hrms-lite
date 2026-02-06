import { useState } from "react";

import Button from "./Button";
import api from "../services/api";

const EmployeeForm = ({ onSuccess }) => {
  const [form, setForm] = useState({
    employeeId: "",
    fullName: "",
    email: "",
    department: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);
      await api.post("/employees", form);
      setForm({
        employeeId: "",
        fullName: "",
        email: "",
        department: "",
      });
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border rounded p-4 space-y-3 bg-white"
    >
      <h3 className="font-medium text-lg">Add Employee</h3>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <input
        name="employeeId"
        placeholder="Employee ID"
        value={form.employeeId}
        onChange={handleChange}
        className="border p-2 w-full"
        required
      />

      <input
        name="fullName"
        placeholder="Full Name"
        value={form.fullName}
        onChange={handleChange}
        className="border p-2 w-full"
        required
      />

      <input
        name="email"
        placeholder="Email"
        type="email"
        value={form.email}
        onChange={handleChange}
        className="border p-2 w-full"
        required
      />

      <input
        name="department"
        placeholder="Department"
        value={form.department}
        onChange={handleChange}
        className="border p-2 w-full"
        required
      />

      <Button disabled={loading}>
        {loading ? "Saving..." : "Add Employee"}
      </Button>
    </form>
  );
};

export default EmployeeForm;
