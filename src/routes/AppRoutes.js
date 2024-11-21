import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import AdminCrud from "../pages/Admin/AdminCrud";
import AssignCourse from "../pages/Admin/AssignCourse";
import InstructorForm from "../pages/Admin/InstructorForm";
import Announcements from "../pages/Instructor/announcements";
import AssignmentList from "../pages/Instructor/AssignmentList";
import InvitationForm from "../pages/Instructor/InvitationForm";
import CourseList from "../pages/Student/CourseList";
import AssignmentSubmission from "../pages/Student/AssignmentSubmission";
import Comments from "../pages/Student/comments";


const AppRoutes = () => {
  return (
    <Router>
      <Routes>

        <Route path="/Admin/AdminDashboard" element={<AdminDashboard />} />
        <Route path="/Admin/AdminCrud" element={<AdminCrud />} />
        <Route path="/Admin/AssignCourse" element={<AssignCourse />} />
        <Route path="/Admin/InstructorForm" element={<InstructorForm />} />
        <Route path="/instructor/Announcements" element={<Announcements />} />
        <Route path="/instructor/AssignmentList" element={<AssignmentList />} />
        <Route path="/instructor/InvitationForm" element={<InvitationForm />} />
        <Route path="/student/CourseList" element={<CourseList />} />
        <Route path="/student/AssignmentSubmission" element={<AssignmentSubmission />} />
        <Route path="/student/Comments" element={<Comments />} />

      </Routes>
    </Router>
  );
};

export default AppRoutes;
