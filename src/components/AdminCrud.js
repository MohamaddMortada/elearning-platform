import React, { useState, useEffect } from "react";

const AdminCrud = () => {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({ id: null, name: "", description: "" });
  const [isEditing, setIsEditing] = useState(false);


  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch('http://localhost/elearning-platform/servers/getCourse.php', { method: "POST" });
      if (response.ok) {
        const data = await response.json();
        console.log("Fetched courses:", data); 
        if (Array.isArray(data)) {
          setCourses(data);
        } else {
          console.error("Fetched data is not an array:", data);
          setCourses([]);
        }
      } else {
        console.error("Failed to fetch courses");
        setCourses([]);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
      setCourses([]);
    }
  };
  
  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost/elearning-platform/servers/createCourse.php', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          description: form.description,
        }),
      });

      if (response.ok) {
        fetchCourses(); 
        setForm({ id: null, name: "", description: "" });
      } else {
        console.error("Failed to create course");
      }
    } catch (error) {
      console.error("Error creating course:", error);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost/elearning-platform/servers/editCourse.php', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: form.id,
          name: form.name,
          description: form.description,
        }),
      });

      if (response.ok) {
        fetchCourses(); 
        setForm({ id: null, name: "", description: "" });
        setIsEditing(false);
      } else {
        console.error("Failed to edit course");
      }
    } catch (error) {
      console.error("Error editing course:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch('http://localhost/elearning-platform/servers/deleteCourse.php', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        fetchCourses(); 
      } else {
        console.error("Failed to delete course");
      }
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>

      <form onSubmit={isEditing ? handleEdit : handleCreate}>
        <input
          type="text"
          name="name"
          placeholder="Course Name"
          value={form.name}
          onChange={handleInputChange}
          required
        />
        <textarea
          name="description"
          placeholder="Course Description"
          value={form.description}
          onChange={handleInputChange}
          required
        />
        <button type="submit">{isEditing ? "Update" : "Create"}</button>
      </form>

      <h2>Courses</h2>
      <ul>
        {courses.map((course) => (
          <li key={course.id}>
            <h3>{course.title}</h3>
            <p>{course.description}</p>
            <button onClick={() => setForm(course) || setIsEditing(true)}>
              Edit
            </button>
            <button onClick={() => handleDelete(course.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminCrud;
