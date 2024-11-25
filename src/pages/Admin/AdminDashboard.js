import React, { useEffect, useState } from "react";

const AdminDashboard = () => {
    const [students, setStudents] = useState([]);
    const [instructors, setInstructors] = useState([]);
    const [courses, setCourses] = useState([]);
    const [error, setError] = useState("");

    const fetchData = (endpoint, setState) => {
        fetch(`http://localhost/elearning-platform/servers/${endpoint}`,{method:'POST'})
            .then((res) => res.json())
            .then((data) => {
                if (data.status === "success") {
                    setState(data[endpoint.split('getAll')[1].toLowerCase()]);
                } else {
                    setError(data.message);
                }
            })
            .catch((err) => setError("Failed to load data"));
    };

    useEffect(() => {
        fetchData("getAllStudents.php", setStudents);
        fetchData("getAllInstructors.php", setInstructors);
        fetchData("getAllCourses.php", setCourses);
    }, []);

    const handleBanToggle = async (userId, role, isBanned) => {
        try {
          const response = await fetch('http://localhost/elearning-platform/servers/banUser.php', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: userId,
              role,
              ban: !isBanned,
            }),
          });
    
          if (!response.ok) {
            console.error("Failed to update user status");
          }
        } catch (error) {
          console.error("Error updating user status:", error);
        }
      };
    

    return (
        <div>
            <h1>Admin Dashboard</h1>
            {error && <p>{error}</p>}

            <section>
                <h2>Students</h2>
                <ul>
                    {students.map((student) => (
                        <li key={student.id}>
                            {student.name} - {student.email}
                                <strong>Status:</strong> {student.banned ? "Banned" : "Active"}
                                <button
                                onClick={() => handleBanToggle(student.id, 'student', student.banned)}>{student.banned ? "Unban" : "Ban"}
                                </button>
                        </li>
                    ))}
                </ul>
            </section>

            <section>
                <h2>Instructors</h2>
                <ul>
                    {instructors.map((instructor) => (
                        <li key={instructor.id}>
                            {instructor.name} - {instructor.email}
                            <strong>Status:</strong> {instructor.banned ? "Banned" : "Active"}
                                <button
                                onClick={() => handleBanToggle(instructor.id, 'instructor', instructor.banned)}>{instructor.banned ? "Unban" : "Ban"}
                                </button>
                        </li>
                    ))}
                </ul>
            </section>

            <section>
                <h2>Courses</h2>
                <ul>
                    {courses.map((course) => (
                        <li key={course.id}>
                            {course.title} - Instructor: {course.instructor_id}
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
};

export default AdminDashboard;
