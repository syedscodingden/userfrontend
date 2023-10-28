import React, { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./HomeComponents/Landing";
import NavBar from "./AppBarComponent/NavBar";
import Login from "./AuthComponents/Login";
import Signup from "./AuthComponents/Signup";
import Home from "./HomeComponents/Home";
import Courses from "./CoursesComponent/Courses";
import MyCourses from "./MyCoursesComponent/MyCourses";

function App() {
  return (
    <Fragment>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/mycourses" element={<MyCourses />} />
        </Routes>
      </Router>
    </Fragment>
  );
}

export default App;
