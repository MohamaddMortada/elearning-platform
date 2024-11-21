import React from "react";
import { Link } from "react-router-dom";

const Header = ({ userType }) => {
  return (
    <nav>
      <ul>
        {userType === "admin" && (
          <>
            <li><Link to="/admin/dashboard">Dashboard</Link></li>
            <li><Link to="/admin/manage-courses">Manage Courses</Link></li>
            <li><Link to="/admin/assign-course">Assign Course</Link></li>
            <li><Link to="/admin/add-instructor">Add Instructor</Link></li>
          </>
        )}
        {userType === "instructor" && (
          <>
            <li><Link to="/instructor/announcements">Announcements</Link></li>
            <li><Link to="/instructor/assignments">Assignments</Link></li>
            <li><Link to="/instructor/invite">Invite Students</Link></li>
          </>
        )}
        {userType === "student" && (
          <>
            <li><Link to="/student/courses">Courses</Link></li>
            <li><Link to="/student/submit-assignment">Submit Assignment</Link></li>
            <li><Link to="/student/comments">Comments</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Header;
