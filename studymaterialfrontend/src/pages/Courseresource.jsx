import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Style from "./CourseResource.module.css";
import CourseResourcetitle from "../assets/CourseResourcetitle";
import { useNavigate } from "react-router-dom";

function CourseResource() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/course/id/${id}`)
      .then((response) => setCourse(response.data))
      .catch((error) => console.error("Error fetching course:", error));
  }, [id]);

  return (
    <>
      <Navbar />
      <CourseResourcetitle />
      <div className={Style.container}>
        {course ? (
          <>
            <h1 className={Style.title}>{course.title}</h1>
            <p className={Style.details}>Semester: {course.semester}</p>
            <p className={Style.details}>Credits: {course.credits}</p>
            <div className={Style.resources}>
              <h3>Resources</h3>
              <div className={Style.buttonGroup}>
                {course.ppt && (
                  <button
                    className={Style.resourceButton}
                    onClick={() => window.open(course.ppt, "_blank")}
                  >
                    PPT
                  </button>
                )}
                {course.textbook && (
                  <button
                    className={Style.resourceButton}
                    onClick={() => window.open(course.textbook, "_blank")}
                  >
                    Textbook
                  </button>
                )}
                {course.labPrograms && (
                  <button
                    className={Style.resourceButton}
                    onClick={() => window.open(course.labPrograms, "_blank")}
                  >
                    Lab Programs
                  </button>
                )}
                {course.modelpapers && (
                  <button
                    className={Style.resourceButton}
                    onClick={() => window.open(course.modelpapers, "_blank")}
                  >
                    Sample Papers
                  </button>
                )}
              </div>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}

        <button onClick={() => navigate(`/course/all`)}>Go to Branch</button>
      </div>
      <Footer />
    </>
  );
}

export default CourseResource;
