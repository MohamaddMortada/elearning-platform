import React, { useState } from "react";

const PostForm = ({ courseId, instructorId }) => {
    const [type, setType] = useState("announcement"); 
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div>
            <h2>Post Announcement</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <textarea
                    placeholder={"Description"}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />  
                <button type="submit">Submit</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default PostForm;
