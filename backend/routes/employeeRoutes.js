const express = require("express");

const {
  createEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee
} = require("../controllers/employeeControllers");

const { requireAuth } = require("../middleware/middleware");

const router = express.Router();




router.post("/", requireAuth, createEmployee);

router.get("/", requireAuth, getEmployees);

router.get("/:id", requireAuth, getEmployeeById);

router.put("/:id", requireAuth, updateEmployee);

router.delete("/:id", requireAuth, deleteEmployee);


module.exports = router;