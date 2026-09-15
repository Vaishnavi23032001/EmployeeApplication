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
    <div className="employee-list">
        <div className="list-heading">
            <div>
                <h1>Employee list</h1>
                <p>{employees.length} {employees.length === 1 ? "team member" : "team members"}</p>
            </div>
        </div>
        {employees.length === 0 ? (
            <p className="empty-list">No employees found.</p>
        ) : (
            <div className="table-wrap">
            <table className="employee-table">
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
                            <button className="table-action update-action" onClick={() => handleUpdate(employee)}>Update</button>
                            <button className="table-action delete-action" onClick={() => handleDelete(employee.objectId)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        )}
        {selectedEmployee && (
            <div className="modal-backdrop" role="dialog" aria-modal="true">
                <div className="modal-card">
                    <h2>Update employee</h2>
                    <form className="dialog-form" onSubmit={handleFormSubmit}>
                        <label htmlFor="update-name">
                            Name
                            <input id="update-name" name="name" value={selectedEmployee.name || ""} onChange={handleFormChange} required />
                        </label>
                        <label htmlFor="update-email">
                            Email
                            <input id="update-email" type="email" name="email" value={selectedEmployee.email || ""} onChange={handleFormChange} required />
                        </label>
                        <label htmlFor="update-department">
                            Department
                            <input id="update-department" name="department" value={selectedEmployee.department || ""} onChange={handleFormChange} required />
                        </label>
                        <label htmlFor="update-salary">
                            Salary
                            <input id="update-salary" type="number" name="salary" value={selectedEmployee.salary || ""} onChange={handleFormChange} required />
                        </label>
                        <div className="dialog-actions">
                            <button className="primary-action" type="submit">Save changes</button>
                            <button className="secondary-action" type="button" onClick={() => setSelectedEmployee(null)}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        )}
    </div>
);
}

export default EmployeeList;
