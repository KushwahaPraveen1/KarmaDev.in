import React, { useEffect, useState } from 'react';
import axios from 'axios';

function HomePage() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await axios.get('http://localhost:5000/api/posts');
            setPosts(res.data);
        };
        fetchPosts();
    }, []);

    return (
        <div className="container">
            <h2>All Blog Posts</h2>
            {posts.map(post => (
                <div key={post._id} className="post-card">
                    <h3>{post.title}</h3>
                    <p>{post.content}</p>
                </div>
            ))}
        </div>
    );
}

export default HomePage;
