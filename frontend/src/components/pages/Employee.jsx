import EmployeeForm from './EmployeeForm';
import EmployeeList from './EmployeeList'; 


const Employees = () => {
    return (
        <div className="dashboard">
            <header className="dashboard-header">
                <p className="eyebrow eyebrow-green">Operations</p>
                <h1>Employee manager</h1>
                <p>Keep your team directory accurate and easy to scan.</p>
            </header>
            <EmployeeForm />
            <EmployeeList />
        </div>
    );
}

export default Employees;