import { useState } from "react";
import { loginuser } from "../services/authService";

const Login = () => {

    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });

    const [message, setMessage] = useState("");

    const handleChange = (event) => {

        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };


    const handleSubmit = async (event) => {

        event.preventDefault();

        try {

            const data = await loginuser(formData);

            // Save session token
            localStorage.setItem(
                "sessionToken",
                data.sessionToken
            );

            // Save user
            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );

            setMessage("Login successful");

            console.log(data);

        } catch (error) {

            setMessage(error.message);
        }
    };


    return (
        <div className="auth-page">

            <form
                onSubmit={handleSubmit}
                className="auth-form"
            >

                <p className="eyebrow eyebrow-green">Employee hub</p>
                <h1>Welcome back</h1>
                <p className="intro">Sign in to manage your team directory.</p>

                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
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
                    className="auth-button green-button"
                >
                    Login
                </button>
                <div className="auth-divider"><span />Don't have an account?<span /></div>

                <button 
                    type="button"
                    onClick={() => window.location.href = "/signup"}
                    className="secondary-button"
                >
                    signup
                </button>

                {message && (
                    <p className="message">
                        {message}

                        <hr />
                        <button
                            type="button"
                            onClick={() => window.location.href = "/employees"}
                            className="link-button"
                        >
                          <span className="mx-1">Go to</span>  dashboard
                        </button>
                    </p>
                )}


            </form>

        </div>
    );
};

export default Login;