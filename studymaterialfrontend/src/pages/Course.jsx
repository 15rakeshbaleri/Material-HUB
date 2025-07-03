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
  const [filteredCourses, setFilteredCourses] = useState([]); // For filtered courses
  const [selectedSemester, setSelectedSemester] = useState(""); // Track selected semester

  // Fetch courses on component mount
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/courses/branch/${dept}`)
      .then((response) => {
        console.log(response.data.data);
        setCourses(response.data.data);
        setFilteredCourses(response.data.data); // Initially show all courses
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });
  }, [dept]);

  // Handle semester selection
  const handleSemesterSelect = (semester) => {
    setSelectedSemester(semester);

    if (semester === "" || semester === "All") {
      setFilteredCourses(courses);
    } else {
      const filtered = courses.filter(
        (course) => course.semester.toLowerCase() === semester.toLowerCase()
      );
      setFilteredCourses(filtered);
    }
  };

  return (
    <>
      <Navbar />
      <ExploreCources />

      <div className={Style.semesterFilter}>
        <div className={Style.buttonContainer}>
          <button
            onClick={() => handleSemesterSelect("")}
            className={Style.semesterButton}
            style={
              selectedSemester === ""
                ? { backgroundColor: "#daa520", color: "black" }
                : {}
            }
          >
            All
          </button>
          <button
            onClick={() => handleSemesterSelect("P")}
            className={Style.semesterButton}
            style={
              selectedSemester === "P"
                ? { backgroundColor: "#daa520", color: "black" }
                : {}
            }
          >
            P Cycle
          </button>
          <button
            onClick={() => handleSemesterSelect("C")}
            className={Style.semesterButton}
            style={
              selectedSemester === "C"
                ? { backgroundColor: "#daa520", color: "black" }
                : {}
            }
          >
            C Cycle
          </button>
          <button
            onClick={() => handleSemesterSelect("3")}
            className={Style.semesterButton}
            style={
              selectedSemester === "3"
                ? { backgroundColor: "#daa520", color: "black" }
                : {}
            }
          >
            Semester 3
          </button>
          <button
            onClick={() => handleSemesterSelect("4")}
            className={Style.semesterButton}
            style={
              selectedSemester === "4"
                ? { backgroundColor: "#daa520", color: "black" }
                : {}
            }
          >
            Semester 4
          </button>
          <button
            onClick={() => handleSemesterSelect("5")}
            className={Style.semesterButton}
            style={
              selectedSemester === "5"
                ? { backgroundColor: "#daa520", color: "black" }
                : {}
            }
          >
            Semester 5
          </button>
          <button
            onClick={() => handleSemesterSelect("6")}
            className={Style.semesterButton}
            style={
              selectedSemester === "6"
                ? { backgroundColor: "#daa520", color: "black" }
                : {}
            }
          >
            Semester 6
          </button>
          <button
            onClick={() => handleSemesterSelect("7")}
            className={Style.semesterButton}
            style={
              selectedSemester === "7"
                ? { backgroundColor: "#daa520", color: "black" }
                : {}
            }
          >
            Semester 7
          </button>
          <button
            onClick={() => handleSemesterSelect("8")}
            className={Style.semesterButton}
            style={
              selectedSemester === "8"
                ? { backgroundColor: "#daa520", color: "black" }
                : {}
            }
          >
            Semester 8
          </button>
        </div>
      </div>

      <div className={Style.courseContainer}>
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => {
            console.log(course.id);
            return (
              <Coursecard
                key={course.id}
                id={course.id}
                code={course.code}
                coursename={course.title}
                sem={course.semester}
                credit={course.credits}
              />
            );
          })
        ) : (
          <p>
            No courses available for{" "}
            {selectedSemester || "the selected semester"}
          </p>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Course;
