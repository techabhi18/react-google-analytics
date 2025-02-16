import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Welcome({ user, setUser }) {
    const navigate = useNavigate();
    const userdata = localStorage.getItem("user");

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem("user");
        navigate("/");
    };

    useEffect(() => {
        setUser(userdata);
    }, []);

    return (
        <div className="container">
            <h1>Welcome, {user}!</h1>
            <p><button onClick={handleLogout}>LOGOUT</button></p>
        </div>
    );
}

export default Welcome;
