const Parse = require("../config/parse");

// CREATE
const createEmployee = async (req, res) => {
    try {
        const { name, email, department, salary } = req.body;

        const Employee = Parse.Object.extend("Employee");
        const employee = new Employee();

        employee.set("name", name);
        employee.set("email", email);
        employee.set("department", department);
        employee.set("salary", Number(salary));

        const savedEmployee = await employee.save(null, {
            useMasterKey: true
        });

        res.status(201).json({
            message: "Employee created successfully",
            employee: savedEmployee.toJSON()
        });
    } catch (error) {
        console.error("Create employee error:", error);
        res.status(500).json({
            message: "Failed to create employee",
            error: error.message
        });
    }
};

// READ ALL
const getEmployees = async (req, res) => {
    try {
        const query = new Parse.Query("Employee");
        query.descending("createdAt");

        const employees = await query.find({
            useMasterKey: true
        });

        res.status(200).json(
            employees.map((employee) => employee.toJSON())
        );
    } catch (error) {
        console.error("Get employees error:", error);
        res.status(500).json({
            message: "Failed to get employees",
            error: error.message
        });
    }
};

// READ ONE
const getEmployeeById = async (req, res) => {
    try {
        const { id } = req.params;

        const query = new Parse.Query("Employee");
        const employee = await query.get(id, {
            useMasterKey: true
        });

        res.status(200).json(employee.toJSON());
    } catch (error) {
        console.error("Get employee error:", error);
        res.status(404).json({
            message: "Employee not found",
            error: error.message
        });
    }
};

// UPDATE
const updateEmployee = async (req, res) => {
    try {
        const { id } = req.params;

        const query = new Parse.Query("Employee");
        const employee = await query.get(id, {
            useMasterKey: true
        });

        const { name, email, department, salary } = req.body;

        if (name !== undefined) employee.set("name", name);
        if (email !== undefined) employee.set("email", email);
        if (department !== undefined) employee.set("department", department);
        if (salary !== undefined) employee.set("salary", Number(salary));

        const updatedEmployee = await employee.save(null, {
            useMasterKey: true
        });

        res.status(200).json({
            message: "Employee updated successfully",
            employee: updatedEmployee.toJSON()
        });
    } catch (error) {
        console.error("Update employee error:", error);
        res.status(500).json({
            message: "Failed to update employee",
            error: error.message
        });
    }
};

// DELETE
const deleteEmployee = async (req, res) => {
    try {
        const { id } = req.params;

        const query = new Parse.Query("Employee");
        const employee = await query.get(id, {
            useMasterKey: true
        });

        await employee.destroy({
            useMasterKey: true
        });

        res.status(200).json({
            message: "Employee deleted successfully"
        });
    } catch (error) {
        console.error("Delete employee error:", error);
        res.status(500).json({
            message: "Failed to delete employee",
            error: error.message
        });
    }
};

module.exports = {
    createEmployee,
    getEmployees,
    getEmployeeById,
    updateEmployee,
    deleteEmployee
};