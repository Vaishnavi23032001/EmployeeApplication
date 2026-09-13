const API_URL = "http://localhost:1337";

export const getEmployee = async () => {
    try {
        const response = await fetch(`${API_URL}/api/employees`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    }
    catch (error) {
        console.error("Error fetching employee data:", error);
        throw error;
    }
}

export const createEmployee = async (employeeData) => {
    try {
        const response = await fetch(`${API_URL}/api/employees`, {  
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(employeeData)
        });
        return response.json();
    }
    catch (error) {
        console.error("Error creating employee:", error);
        throw error;
    }
}

export const updateEmployee = async (employeeId, updatedData) => {
    try {
        const response = await fetch(`${API_URL}/api/employees/${employeeId}`, { 
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedData)
        });
        console.log("Update response:", response);
        return response.json();
    } 
    catch (error) {
        console.error("Error updating employee:", error);
        throw error;
    }
}

export const deleteEmployee = async (employeeId) => {  
    try {
        const response = await fetch(`${API_URL}/api/employees/${employeeId}`, {
            method: "DELETE"
        });
        return response.json();
    }
    catch (error) {
        console.error("Error deleting employee:", error);
        throw error;
    }
}