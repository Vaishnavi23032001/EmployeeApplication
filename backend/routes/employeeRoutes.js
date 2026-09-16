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


router.post("/", createEmployee);

router.get(
    "/",
    requireAuth,
    getEmployees
);
router.get("/:id", getEmployeeById);

router.put("/:id", updateEmployee);

router.delete("/:id", deleteEmployee);


module.exports = router;