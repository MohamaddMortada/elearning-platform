import React, { useState } from "react";

const CommentForm = ({ courseId, userId }) => {
    const [commentText, setCommentText] = useState("");
    const [commentType, setCommentType] = useState("public"); 
    const [message, setMessage] = useState("");

    const handleCommentChange = (e) => {
        setCommentText(e.target.value);
    };

    const handleCommentTypeChange = (e) => {
        setCommentType(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (commentText.trim() === "") {
            setMessage("Please enter a comment.");
            return;
        }

        const storedCourseId = localStorage.getItem("courseId");

        if (!storedCourseId) {
            setMessage("Course ID is missing.");
            return;
        }

        const commentData = {
            course_id: storedCourseId,
            user_id: userId,
            comment: commentText,
            visibility: commentType, 
        };
        console.log(commentData.course_id);
    };

    return (
        <div>
            <h3>Post a Comment</h3>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={commentText}
                    onChange={handleCommentChange}
                    placeholder="Write your comment..."
                    rows="4"
                    cols="50"
                    required
                ></textarea>
                <div>
                    <label>
                        <input
                            type="radio"
                            value="public"
                            checked={commentType === "public"}
                            onChange={handleCommentTypeChange}
                        />
                        Public
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="private"
                            checked={commentType === "private"}
                            onChange={handleCommentTypeChange}
                        />
                        Private
                    </label>
                </div>
                <button type="submit">Submit Comment</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default CommentForm;
