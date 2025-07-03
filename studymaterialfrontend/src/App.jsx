import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Home from "./pages/Home";
import Course from "./pages/Course";
import Style from "./App.module.css";
import Adminlogin from "./pages/Adminlogin";
import Add_course from "./pages/Add_course";
import CourseResource from "./pages/CourseResource";
import Aboutus from "./components/Aboutus";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from "./pages/Admin";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/course/:dept" element={<Course />} />
        <Route path="/login/:user" element={<Adminlogin />} />
        <Route path="/about" element={<Aboutus />} />
        <Route path="/course/id/:id" element={<CourseResource />} />

        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
