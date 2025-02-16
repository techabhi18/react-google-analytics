import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Register() {
    const [formData, setFormData] = useState({ username: "", email: "", password: "" });
    const [message, setMessage] = useState({ text: "", type: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:8080/login-register/RegisterServlet", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "X-Requested-With": "XMLHttpRequest"
            },
            body: new URLSearchParams(formData),
            credentials: "include",
        });

        const data = await response.json();

        if (response.ok) {
            setMessage({ text: "Registration successful!", type: "success" });
            setTimeout(() => navigate("/login"), 100);
        } else {
            setMessage({ text: data.message || "Registration failed.", type: "error" });
        }
    };

    return (
        <div className="container">
            <h1>Register</h1>
            {message.text && (
                <p className={message.type === "success" ? "success-message" : "error-message"}>
                    {message.text}
                </p>
            )}
            <form onSubmit={handleSubmit}>
                <label>Username:</label>
                <input type="text" name="username" placeholder="Enter Username" onChange={handleChange} required />
                <br />
                <label>Email:</label>
                <input type="email" name="email" placeholder="Enter Email" onChange={handleChange} required />
                <br />
                <label>Password:</label>
                <input type="password" name="password" placeholder="Enter Password" onChange={handleChange} required />
                <br />
                <button type="submit">Register</button>
            </form>
            <NavLink to="/">Back to Home</NavLink>
        </div>
    );
}

export default Register;
