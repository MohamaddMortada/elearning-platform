import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";
import AdminCrud from "./AdminCrud";

const AdminApp = () => {
    return (
        <div>
            
            <AdminCrud/>
        </div>
    );
}
export default AdminApp;