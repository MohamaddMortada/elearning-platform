import React, { useEffect, useState } from "react";

const AdminDashboard = () => {
    const [students, setStudents] = useState([]);
    const [instructors, setInstructors] = useState([]);
    const [courses, setCourses] = useState([]);

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
                        </li>
                    ))}
                </ul>
            </section>

            <section>
                <h2>Courses</h2>
                <ul>
                    {courses.map((course) => (
                        <li key={course.id}>
                            {course.title} - Instructor: {course.instructor_name}
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
};

export default AdminDashboard;
