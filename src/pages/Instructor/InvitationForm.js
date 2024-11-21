import React, { useState } from "react";

const InvitationForm = ({ courseId }) => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email) {
            setMessage("Please enter an email.");
            return;
        }

        fetch("http://localhost/elearning-platform/servers/inviteStudent.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                course_id: courseId,
                student_email: email,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                setMessage(data.message);
                if (data.status === "success") {
                    setEmail("");
                }
            })
            .catch((err) => {
                console.error("Error sending invitation:", err);
                setMessage("Failed to send invitation.");
            });
    };

    return (
        <div>
            <h2>Invite Student</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Student Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit">Send Invitation</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default InvitationForm;
