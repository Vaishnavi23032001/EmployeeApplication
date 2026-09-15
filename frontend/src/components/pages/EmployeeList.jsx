import {useState, useEffect} from "react";
import { getEmployee, updateEmployee, deleteEmployee } from "../services/employeeServices";

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    const fetchEmployees = async () => {
        try {
            const data = await getEmployee();
            setEmployees(data);
            console.log("Fetched employees:", data);
            if (Array.isArray(data)) {
                setEmployees(data);
                console.log("Fetched employees:", data);
            } else {
                console.error("Data is not an array:", data);
                setEmployees([]);
            }
        }   
        catch (error) {
            console.error("Error fetching employees:", error);
            setEmployees([]);
        }
    }

    const handleUpdate = (employee) => {
        setSelectedEmployee({...employee});
    };

    const handleFormChange = (event) => {
        const {name, value} = event.target;
        setSelectedEmployee((employee) => ({...employee, [name]: value}));
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const employeeId = selectedEmployee.objectId;
            const updatedResponse = await updateEmployee(employeeId, selectedEmployee);
            const updatedEmployee = updatedResponse.employee || updatedResponse;
            setEmployees((currentEmployees) =>
                currentEmployees.map((employee) =>
                    employee.objectId === employeeId
                        ? (updatedEmployee || selectedEmployee)
                        : employee
                )
            );
            setSelectedEmployee(null);
        } catch (error) {
            console.error("Error updating employee:", error);
        }
    };

    const handleDelete = async (employeeId) => {
        try {
            await deleteEmployee(employeeId);
            setEmployees((currentEmployees) =>
                currentEmployees.filter((employee) => employee.objectId !== employeeId)
            );
        } catch (error) {
            console.error("Error deleting employee:", error);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

return (
    <div>
        <h1>Employee List</h1>
        {employees.length === 0 ? (
            <p>No employees found.</p>
        ) : (
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Department</th>
                        <th>Salary</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                {employees.map((employee) => (
                    <tr key={employee.objectId}>
                        <td>{employee.name}</td>
                        <td>{employee.email}</td>
                        <td>{employee.department}</td>
                        <td>{employee.salary}</td>
                        <td>
                            <button onClick={() => handleUpdate(employee)}>Update</button>
                            <button onClick={() => handleDelete(employee.objectId)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        )}
        {selectedEmployee && (
            <div role="dialog" aria-modal="true">
                <div>
                    <h2>Update Employee</h2>
                    <form onSubmit={handleFormSubmit}>
                        <label>
                            Name
                            <input name="name" value={selectedEmployee.name || ""} onChange={handleFormChange} required />
                        </label>
                        <label>
                            Email
                            <input type="email" name="email" value={selectedEmployee.email || ""} onChange={handleFormChange} required />
                        </label>
                        <label>
                            Department
                            <input name="department" value={selectedEmployee.department || ""} onChange={handleFormChange} required />
                        </label>
                        <label>
                            Salary
                            <input type="number" name="salary" value={selectedEmployee.salary || ""} onChange={handleFormChange} required />
                        </label>
                        <button type="submit">Save</button>
                        <button type="button" onClick={() => setSelectedEmployee(null)}>Cancel</button>
                    </form>
                </div>
            </div>
        )}
    </div>
);
}

export default EmployeeList;
