import React, { useEffect, useState } from "react";

const CourseList = () => {
    const [courses, setCourses] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetch("http://localhost/elearning-platform/servers/getCourse.php",{method:"POST",})
            .then((response) => response.json())
            .then((data) => {
                console.log("Response Data:", data);
                if (data.status === "success") {
                    setCourses(data.courses);
                } else {
                    setMessage("Failed to load courses.");
                }
            })
            .catch((error) => {
                console.error("Error fetching courses:", error);
                setMessage("Error loading courses.");
            });
    }, []);

    const enrollInCourse = (courseId) => {
        fetch("http://localhost/elearning-platform/servers/enroll.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ student_id: 1, course_id: courseId }), 
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.status === "success") {
                    setMessage(`Successfully enrolled in course: ${data.courseTitle}`);
                } else {
                    setMessage(data.message || "Enrollment failed.");
                }
            })
            .catch((error) => {
                console.error("Error enrolling in course:", error);
                setMessage("Enrollment failed.");
            });
    };

    return (
        <div>
            <h1>Courses</h1>
            {message && <p>{message}</p>}
            <ul>
                {courses.map((course) => (
                    <li key={course.id}>
                        <strong>{course.title}</strong> - {course.description}
                        <button onClick={() => enrollInCourse(course.id)}>Enroll</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CourseList;
