import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Home from "./pages/Home";
import Course from "./pages/Course";
import Style from "./App.module.css";
import Adminlogin from "./pages/Adminlogin";
import Add_course from "./pages/Add_course";
function App() {
  return (
    <div>
      <Home />
      <Course />
      <Adminlogin />
      <Add_course />
    </div>
  );
}

export default App;
