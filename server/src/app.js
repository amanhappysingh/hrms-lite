const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// ❗ MongoDB connect but NEVER crash app
mongoose
  .connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 5000,
  })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
    // ❌ NO process.exit()
  });

// Health check (VERY IMPORTANT)
app.get("/", (req, res) => {
  res.send("HRMS Lite Backend is running 🚀");
});

app.use("/api/employees", require("./routes/employee.routes"));
app.use("/api/attendance", require("./routes/attendance.routes"));

module.exports = app;
