import EmployeeForm from './components/pages/EmployeeForm';
import EmployeeList from './components/pages/EmployeeList';
import UpdateEmployee from './components/pages/UpdateEmployee';

function App() {

    return (
        <div>

            <h1>Employee Manager</h1>

            <EmployeeForm />

            <hr />

            <EmployeeList />

        </div>
    );
}

export default App;