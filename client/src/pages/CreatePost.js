import React, { useState } from 'react';
import axios from 'axios';

function CreatePost() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleCreatePost = async () => {
        const token = localStorage.getItem('token');
        try {
            await axios.post('http://localhost:5000/api/posts', 
                { title, content }, 
                { headers: { Authorization: `Bearer ${token}` } });
            alert('Post created successfully!');
        } catch (err) {
            alert('Error creating post. Please try again.');
        }
    };

    return (
        <div className="container">
            <h2>Create Post</h2>
            <input 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                placeholder="Title" 
            />
            <textarea 
                value={content} 
                onChange={(e) => setContent(e.target.value)} 
                placeholder="Content"
            ></textarea>
            <button onClick={handleCreatePost}>Create Post</button>
        </div>
    );
}

export default CreatePost;
