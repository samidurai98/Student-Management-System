import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Logex() {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        name: "",
        pwd: ""
    });

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://92.205.109.210:8070/api/login", user)
            .then(res => {
                alert("Login successful!");
                navigate("/Student");
            })
            .catch(error => {
                console.error("Error logging in:", error);
                alert("Login failed. Please check your credentials.");
            });
    };

    return (
        <div className="login-container">
            <h1>Login</h1>
            <form className="login-form" onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    name="name" 
                    placeholder="Username" 
                    value={user.name} 
                    onChange={handleChange} 
                    required 
                />
                <input 
                    type="password" 
                    name="pwd" 
                    placeholder="Password" 
                    value={user.pwd} 
                    onChange={handleChange} 
                    required 
                />
                <button type="submit">Login</button>
            </form>
            <p className="signup-link">
                Don't have an account? <a href="/signup">Signup here</a>
            </p>
        </div>
    );
}

export default Logex;