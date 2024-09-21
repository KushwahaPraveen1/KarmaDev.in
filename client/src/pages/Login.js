import React, { useState } from 'react';
import axios from 'axios';

function Login({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const res = await axios.post('http://localhost:5000/api/users/login', { username, password });
            const { token, username: loggedInUser } = res.data;
            onLogin(token, loggedInUser);  // Send token and username to App.js
            alert('Login successful!');
        } catch (err) {
            alert('Login failed. Please check your credentials.');
        }
    };

    return (
        <div className="container">
            <h2>Login</h2>
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
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}

export default Login;
