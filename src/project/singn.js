import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function Signupex() {
    const [user, setUser] = useState({
        name: "",
        pwd: "",
        gender: "",
        mail: ""
    });
    const [loading, setLoading] = useState(false); 
    const [error, setError] = useState(""); 
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!user.name || !user.pwd || !user.gender || !user.mail) {
            setError("All fields are required.");
            return;
        }

        setLoading(true);
        setError("");

        axios.post(`http://92.205.109.210:8070/api/signup`, user)
            .then(res => {
                setLoading(false);
                alert("Sign up successful!");
                navigate('/Logex');
            })
            .catch(err => {
                setLoading(false);
                setError("Signup failed. Please try again.");
            });
    };

    return (
        <div className='signup-container'>
            <h1>Create Your Account</h1>
            <form className="signup-form" onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    name="name" 
                    placeholder="Full Name" 
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
                <input 
                    type="text" 
                    name="gender" 
                    placeholder="Gender (Male/Female/Other)" 
                    value={user.gender} 
                    onChange={handleChange} 
                    required
                />
                <input 
                    type="email" 
                    name="mail" 
                    placeholder="Email Address" 
                    value={user.mail} 
                    onChange={handleChange} 
                    required
                />
                
                {error && <p className="error-message">{error}</p>}
                
                <button type="submit" disabled={loading}>
                    {loading ? 'Creating Account...' : 'Sign Up'}
                </button>
            </form>

            <div className="divider">OR</div>
            
        
        </div>
    );
}

export default Signupex;