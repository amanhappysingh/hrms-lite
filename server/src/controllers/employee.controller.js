const Employee = require("../models/Employee");

exports.createEmployee = async (req, res) => {
  try {
    const { employeeId, fullName, email, department } = req.body;
    if (!employeeId || !fullName || !email || !department) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    const existingEmployee = await Employee.findOne({
      $or: [{ employeeId }, { email }],
    });

    if (existingEmployee) {
      return res.status(409).json({
        message: "Employee with same ID or email already exists",
      });
    }
    const employee = await Employee.create({
      employeeId,
      fullName,
      email,
      department,
    });

    res.status(201).json({
      message: "Employee created successfully",
      data: employee,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create employee",
      error: error.message,
    });
  }
};

exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().sort({ createdAt: -1 });

    res.status(200).json({
      data: employees,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch employees",
      error: error.message,
    });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const employee = await Employee.findByIdAndDelete(id);

    if (!employee) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }

    res.status(200).json({
      message: "Employee deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete employee",
      error: error.message,
    });
  }
};
