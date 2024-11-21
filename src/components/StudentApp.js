import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import AdminCrud from "../pages/Admin/AdminCrud";
import CourseList from "../pages/Student/CourseList";
import AssignmentList from "../pages/Instructor/AssignmentList";
import AssignmentSubmissionForm from "../pages/Student/AssignmentSubmission";

const StudentApp = () => {
    return (
        <div>
            <AssignmentList/>
            <AssignmentSubmissionForm/>   
        </div>
    );
}
export default StudentApp;