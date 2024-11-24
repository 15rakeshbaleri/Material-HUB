import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Home from "./pages/Home";
import Course from "./pages/Course";
import Style from "./App.module.css";

function App() {
  return (
    <div>
      <Home />
      <Course />
    </div>
  );
}

export default App;