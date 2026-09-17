// import EmployeeForm from './EmployeeForm';
// import EmployeeList from './EmployeeList'; 


// const Employees = () => {
//     return (
//         <div className="dashboard">
//             <header className="dashboard-header">
//                 <p className="eyebrow eyebrow-green">Operations</p>
//                 <h1>Employee manager</h1>
//                 <p>Keep your team directory accurate and easy to scan.</p>
//             </header>
//             <EmployeeForm />
//             <EmployeeList />
//         </div>
//     );
// }

// export default Employees;


import EmployeeForm from "./EmployeeForm";
import EmployeeList from "./EmployeeList";
import { logoutUser } from "../services/authService";

const Employees = () => {

    const handleLogout = async () => {
        try {
            const sessionToken =
                localStorage.getItem("sessionToken");

            if (!sessionToken) {
                window.location.href = "/";
                return;
            }

            await logoutUser(sessionToken);

            // Remove login information
            localStorage.removeItem("sessionToken");
            localStorage.removeItem("user");

            // Go to login page
            window.location.href = "/";

        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    return (
        <div className="dashboard">

            <header className="dashboard-header">

                <p className="eyebrow eyebrow-green">
                    Operations
                </p>

                <div className="dashboard-header-content">

                    <h1>Employee manager</h1>

                    <button
                        className="secondary-button"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>

                </div>

                <p>
                    Keep your team directory accurate and easy to scan.
                </p>

            </header>

            <EmployeeForm />

            <EmployeeList />

        </div>
    );
};

export default Employees;