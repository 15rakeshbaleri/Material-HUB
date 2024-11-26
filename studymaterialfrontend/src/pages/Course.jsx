import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Coursecard from "../components/Coursecard";
import Footer from "../components/Footer";
import ExploreCourses from "../assets/ExploreCources";
import Style from "./Course.module.css";
function Course() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/course")
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });
  }, []);

  return (
    <>
      <Navbar />
      <ExploreCourses />

      <div className={Style.courseContainer}>
        {courses.length > 0 ? (
          courses.map((course) => (
            <Coursecard
              key={course.code}
              coursename={course.title}
              sem={course.semester}
              credit={course.credits}
            />
          ))
        ) : (
          <p>No course Avilable</p>
        )}
      </div>

      <Footer />
    </>
  );
}

export default Course;
