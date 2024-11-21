import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import AdminCrud from "../pages/Admin/AdminCrud";

const AdminApp = () => {
    return (
        <Router>
            <Link to="/assignments">assignments</Link>        
        </Router>

    );
}
export default AdminApp;