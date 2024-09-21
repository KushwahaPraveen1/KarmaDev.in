import React, { useState } from 'react';
import axios from 'axios';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        await axios.post('http://localhost:5000/api/users/register', { username, password });
        alert('Registration successful!');
    };

    return (
        <div className="container">
            <h2>Register</h2>
            <input 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                placeholder="Username" 
                type="text"
            />
            <input 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Password" 
                type="password"
            />
            <button onClick={handleRegister}>Register</button>
        </div>
    );
}

export default Register;
