import React, { useEffect, useState } from "react";
import AssignmentSubmissionForm from "../Student/AssignmentSubmission";

const AssignmentList = ({ courseId }) => {
    console.log(courseId);
    const [assignments, setAssignments] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const storedCourseId = localStorage.getItem("courseId");
      

        if (storedCourseId) {
            fetch(`http://localhost/elearning-platform/servers/getAllAssignments.php`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ course_id: storedCourseId }) 
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(storedCourseId)
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
        } else {
            setMessage("Course ID is missing.");
        }
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
                        <AssignmentSubmissionForm assignmentId={assignment.id} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AssignmentList;
