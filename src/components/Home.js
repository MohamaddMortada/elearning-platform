import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

const Home = () => (
    <div>
        <h1>Welcome to the E-Learning Platform</h1>
        <p>Select a course to start learning!</p>
        <Link to="/courses" >View Courses</Link>
    </div>
);
export default Home;