import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";


import Employees from "./pages/Employees";


import Navbar from "./components/layout/Navbar";

import AllAttendance from "./pages/AllAttendance";
import Attendance from "./pages/Attendance";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <main className="max-w-6xl mx-auto p-6">
        <Routes>
          <Route path="/" element={<Navigate to="/employees" />} />

          <Route path="/employees" element={<Employees />} />
          <Route path="/mark-attendance" element={<Attendance />} />
          <Route path="/all-attendance" element={<AllAttendance />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
