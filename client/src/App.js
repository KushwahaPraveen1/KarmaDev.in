import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import Register from './pages/Register';
import Login from './pages/Login';
import CreatePost from './pages/CreatePost';
import './App.css'

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState('');

    useEffect(() => {
        // Check if the user is already logged in by checking for a token
        const token = localStorage.getItem('token');
        const savedUsername = localStorage.getItem('username');
        if (token) {
            setIsAuthenticated(true);
            setUsername(savedUsername);
        }
    }, []);

    const handleLogin = (token, username) => {
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);
        setIsAuthenticated(true);
        setUsername(username);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        setIsAuthenticated(false);
        setUsername('');
    };

    return (
        <Router>
            <Navbar isAuthenticated={isAuthenticated} username={username} handleLogout={handleLogout} />
            <Routes>
                <Route path="/" element={<HomePage />} />
                {!isAuthenticated && (
                    <>
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login onLogin={handleLogin} />} />
                    </>
                )}
                {isAuthenticated && (
                    <Route path="/create" element={<CreatePost />} />
                )}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
}

export default App;
