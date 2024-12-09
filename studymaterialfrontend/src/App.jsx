import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Home from "./pages/Home";
import Course from "./pages/Course";
import Style from "./App.module.css";
import Adminlogin from "./pages/Adminlogin";
import Add_course from "./pages/Add_course";
import CourseResource from "./pages/CourseResource";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/Home" element={<Home />} />
        <Route path="/all-course" element={<Course />} />
        <Route path="/login" element={<Adminlogin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
