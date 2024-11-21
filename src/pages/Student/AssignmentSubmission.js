import React, { useState } from "react";
const token = localStorage.getItem("token");
const AssignmentSubmissionForm = ({ assignmentId }) => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState("");

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!file) {
            setMessage("Please select a file to upload.");
            return;
        }

        const formData = new FormData();
        formData.append("student_id", 1);
        formData.append("assignment_id", assignmentId);
        formData.append("file", file);

        fetch("http://localhost/elearning/submitAssignment.php", {
            method: "POST",
            headers:{"Authorization": `${token}`,},
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.status === "success") {
                    setMessage("Assignment submitted successfully.");
                } else {
                    setMessage(data.message || "Submission failed.");
                }
            })
            .catch((error) => {
                console.error("Error submitting assignment:", error);
                setMessage("Submission failed.");
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="file" onChange={handleFileChange} />
            <button type="submit">Submit</button>
            {message && <p>{message}</p>}
        </form>
    );
};

export default AssignmentSubmissionForm;
