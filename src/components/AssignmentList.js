import React, { useEffect, useState } from "react";

const AssignmentList = ({ courseId }) => {
    const [assignments, setAssignments] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetch(`http://localhost/elearning/servers/getAssignments.php?course_id=${courseId}`,{method:'POST'})
            .then((response) => response.json())
            .then((data) => {
                if (data.status === "success") {
                    setAssignments(data.assignments);
                } else {
                    setMessage(data.message || "Failed to load assignments.");
                }
            })
            .catch((error) => {
                console.error("Error fetching assignments:", error);
                setMessage("Failed to load assignments.");
            });
    }, [courseId]);

    return (
        <div>
            <h2>Assignments</h2>
            {message && <p>{message}</p>}
            <ul>
                {assignments.map((assignment) => (
                    <li key={assignment.id}>
                        <strong>{assignment.title}</strong> - Due: {assignment.due_date}
                        <p>{assignment.description}</p>
                        
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AssignmentList;
