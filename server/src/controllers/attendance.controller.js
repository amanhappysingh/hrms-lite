const Attendance = require("../models/Attendance");
const Employee = require("../models/Employee");

exports.markAttendance = async (req, res) => {
  try {
    const { employeeId, status } = req.body;

    if (!employeeId || !status) {
      return res.status(400).json({
        message: "Employee and status are required",
      });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }

    const alreadyMarked = await Attendance.findOne({
      employeeId,
      date: today,
    });

    if (alreadyMarked) {
      return res.status(409).json({
        message: "Attendance already marked for today",
      });
    }

    const attendance = await Attendance.create({
      employeeId,
      date: today,
      status,
    });

    res.status(201).json({
      message: "Attendance marked successfully",
      data: attendance,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to mark attendance",
      error: error.message,
    });
  }
};

exports.getAllAttendance = async (req, res) => {
  try {
    const { from, to } = req.query;

    let filter = {};

    if (from && to) {
      filter.date = {
        $gte: new Date(from),
        $lte: new Date(to),
      };
    }

    const records = await Attendance.find(filter)
      .populate("employeeId", "employeeId fullName department")
      .sort({ date: -1 });

    res.status(200).json({
      data: records,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch attendance",
    });
  }
};



exports.getAttendanceByEmployee = async (req, res) => {
  try {
    const { employeeId } = req.params;

    const attendanceRecords = await Attendance.find({ employeeId })
      .populate("employeeId", "fullName employeeId department")
      .sort({ date: -1 });

    res.status(200).json({
      data: attendanceRecords,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch attendance",
      error: error.message,
    });
  }
};
