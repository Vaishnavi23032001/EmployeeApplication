import { useState } from "react";
import { signupuser } from "../services/authService";

const Signup = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
       setFormData({
            ...formData,    
            [name]: value,
        });

    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await signupuser(formData);
            setMessage(data.message);
            setFormData({
                username: "",
                email: "",
                password: "",
            });
        } catch (error) {
            setMessage(error.message);
        }
    }



return (

    <div className="auth-page">

            <form
                onSubmit={handleSubmit}
                className="auth-form"
            >

                <p className="eyebrow eyebrow-blue">Employee hub</p>
                <h1>Create account</h1>
                <p className="intro">Set up your access to the employee directory.</p>

                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    className="auth-input"
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="auth-input"
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="auth-input"
                />

                <button
                    type="submit"
                    className="auth-button blue-button"
                >
                    Signup
                </button>

                {message && (
                    <p className="message">
                        {message}
                    </p>
                )}

                <button
                    type="button"
                    onClick={() => window.location.href = "/"}
                    className="secondary-button"
                >
                    Back to login           
                

                </button>

            </form>

        </div>
    );
};

export default Signup;