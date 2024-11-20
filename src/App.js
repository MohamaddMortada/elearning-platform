import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import CourseList from "./components/CourseList";
import Home from "./components/Home";
import AssignmentList from "./components/AssignmentList";


const App = () => {
    return (
        <Router>
            <div>
                {}
                <nav>
                    <Link to="/">Home</Link>
                    <Link to="/courses">Courses</Link>
                </nav>

                {}
                <Routes>
                    <Route
                        path="/"
                        element={<Home />}
                    />
                    <Route
                        path="/courses"
                        element={<CourseList />}
                    />
                    <Route 
                        path="/courses/:courseId/assignments" 
                        element={<AssignmentList/>} 
                    />
                </Routes>
            </div>
        </Router>
    );
};




export default App;
