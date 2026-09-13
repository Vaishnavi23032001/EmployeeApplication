import { useState } from "react";

const UpdateEmployee = () => {
	const [employee, setEmployee] = useState({
		name: '',
		email: '',
		department: '',
		salary: ''
	});

	const handleChange = (event) => {
		const { name, value } = event.target;
		setEmployee((currentEmployee) => ({
			...currentEmployee,
			[name]: value
		}));
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log('Employee updated:', employee);
	};

	return (
		<div className="update-employee">
			<h2>Update Employee</h2>
			<form onSubmit={handleSubmit}>
				<label htmlFor="name">Name</label>
				<input
					id="name"
					name="name"
					type="text"
					value={employee.name}
					onChange={handleChange}
					required
				/>

				<label htmlFor="email">Email</label>
				<input
					id="email"
					name="email"
					type="email"
					value={employee.email}
					onChange={handleChange}
					required
				/>

				<label htmlFor="department">Department</label>
				<input
					id="department"
					name="department"
					type="text"
					value={employee.department}
					onChange={handleChange}
					required
				/>

				<label htmlFor="salary">Salary</label>
				<input
					id="salary"
					name="salary"
					type="number"
					min="0"
					value={employee.salary}
					onChange={handleChange}
					required
				/>

				<button type="submit">Update Employee</button>
			</form>
		</div>
	);
};

export default UpdateEmployee;