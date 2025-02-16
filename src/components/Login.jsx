import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Login({ setUser }) {
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [message, setMessage] = useState({ text: "", type: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:8080/login-register/LoginServlet", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "X-Requested-With": "XMLHttpRequest"
            },
            body: new URLSearchParams(formData),
            credentials: "include",
        });

        if (response.ok) {
            setUser(formData.username);
            localStorage.setItem("user", formData.username);
            setMessage({ text: "Login successful!", type: "success" });
            setTimeout(() => navigate("/welcome"), 100);
        } else {
            setMessage({ text: "Invalid username or password.", type: "error" });
        }
    };

    return (
        <div className="container">
            <h1>Login</h1>
            {message.text && (
                <p className={message.type === "success" ? "success-message" : "error-message"}>
                    {message.text}
                </p>
            )}
            <form onSubmit={handleSubmit}>
                <label>Username:</label>
                <input type="text" name="username" placeholder="Enter Email" onChange={handleChange} required />
                <br />
                <label>Password:</label>
                <input type="password" name="password" placeholder="Enter Password" onChange={handleChange} required />
                <br />
                <button type="submit">Login</button>
            </form>
            <NavLink to="/">Back to Home</NavLink>
        </div>
    );
}

export default Login;
