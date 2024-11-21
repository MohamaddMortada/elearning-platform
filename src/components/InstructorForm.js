import React, { useState } from 'react';

const CreateInstructor = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [assignedCourses, setAssignedCourses] = useState(''); 

    const handleSubmit = async (event) => {
        event.preventDefault();

        const instructorData = {
            name,
            email,
            assigned_courses: assignedCourses,
        };

        try {
            const response = await fetch('http://localhost/elearning-platform/servers/createInstructor.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(instructorData),
            });

            const data = await response.json();
            if (data.status === 'success') {
                alert('Instructor created successfully!');
            } else {
                alert(data.message);
            }
        } catch (error) {
            alert('Error creating instructor');
        }
    };

    return (
        <div>
            <h2>Create Instructor</h2>
            <form onSubmit={handleSubmit}>
                <label>Name:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                <br />
                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <br />
                <label>Assigned Courses (comma-separated IDs):</label>
                <input
                    type="text"
                    value={assignedCourses}
                    onChange={(e) => setAssignedCourses(e.target.value)}
                />
                <br />
                <button type="submit">Create Instructor</button>
            </form>
        </div>
    );
};

export default CreateInstructor;
