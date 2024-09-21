import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ isAuthenticated, username, handleLogout }) {
    return (
        <nav className="navbar">
            <h1>My Blog</h1>
            <ul>
                <li><Link to="/">Home</Link></li>
                {isAuthenticated && <li><Link to="/create">Create Post</Link></li>}
                {!isAuthenticated ? (
                    <>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/register">Register</Link></li>
                    </>
                ) : (
                    <>
                        <li><span>Welcome, {username}</span></li>
                        <li><button onClick={handleLogout}>Logout</button></li>
                    </>
                )}
            </ul>
        </nav>
    );
}

export default Navbar;
