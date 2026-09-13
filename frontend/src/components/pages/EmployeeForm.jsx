import { useState } from "react";
import { createEmployee, getEmployee } from "../services/employeeServices";

const EmployeeForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [department, setDepartment] = useState("");
    const [salary, setSalary] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
       
        try {
            const employeeData = { name, email, department, salary: Number(salary) };

            await createEmployee(employeeData);
            // Reset form fields after successful submission
            setName("");
            setEmail("");
            setDepartment("");
            setSalary("");
            alert("Employee created successfully!");

            getEmployee(); // Refresh the employee list after creating a new employee

        } catch (error) {
            console.error("Error creating employee:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input
                type="text"
                placeholder="Employee Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="email">Email:</label>
            <input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="department">Department:</label>
            <input
                type="text"
                placeholder="Department"
                required
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
            />
            <label htmlFor="salary">Salary:</label>
            <input
                type="number"
                placeholder="Salary"
                required
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
            />
            <button type="submit">Create Employee</button>
        </form>
    );
}

export default EmployeeForm;