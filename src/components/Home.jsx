import React from "react";
import { NavLink } from "react-router-dom";

function Home() {
    return (
        <div className="container">
            <h1>Welcome</h1>
            <div className="links">
                <NavLink to="/login">Login</NavLink>
                <NavLink to="/register">Register</NavLink>
            </div>
        </div>
    );
}

export default Home;
