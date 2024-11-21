import React, { useState } from "react";

const PostForm = ({ courseId, instructorId }) => {
    const [type, setType] = useState("announcement");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

    };

    return (
        <div>
            <h2>Post {type === "announcement" ? "Announcement" : "Assignment"}</h2>
            <label htmlFor="postType">Select Type:</label>
            <select
                id="postType"
                value={type}
                onChange={(e) => setType(e.target.value)}
            >
                <option value="announcement">Announcement</option>
                <option value="assignment">Assignment</option>
            </select>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <textarea
                    placeholder={type === "announcement" ? "Content" : "Description"}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
                {type === "assignment" && (
                    <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        required
                    />
                )}
                <button type="submit">Submit</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default PostForm;
