import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Coursecard from "../components/Coursecard";
import Footer from "../components/Footer";
import Style from "./Course.module.css";
import ExploreCources from "../assets/ExploreCources";
function Course() {
  const { dept } = useParams();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/course/${dept}`)
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });
  }, [dept]); // Run when the 'dept' changes

  return (
    <>
      <Navbar />
      <ExploreCources />
      <div className={Style.courseContainer}>
        {courses.length > 0 ? (
          courses.map((course) => (
            <Coursecard
              // Ensure each course has a unique key
              code={course.code}
              coursename={course.title}
              sem={course.semester}
              credit={course.credits}
            />
          ))
        ) : (
          <p>No courses available for {dept}</p>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Course;
