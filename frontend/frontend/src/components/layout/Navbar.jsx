import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const linkClass = ({ isActive }) =>
    `px-4 py-2 rounded-lg transition-all duration-200 font-medium ${
      isActive
        ? "bg-blue-600 text-white shadow-md"
        : "text-gray-700 hover:bg-gray-100"
    }`;

  return (
    <header className="bg-white border-b shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-md">
            <span className="text-white font-bold text-lg">HR</span>
          </div>
          <h1 className="text-xl font-bold text-gray-800">HRMS Lite</h1>
        </div>

        <nav className="flex space-x-2">
          <NavLink to="/employees" className={linkClass}>
            Employees
          </NavLink>
          <NavLink to="/mark-attendance" className={linkClass}>
            Mark Attendance
          </NavLink>
          <NavLink to="/all-attendance" className={linkClass}>
            All Attendance
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;