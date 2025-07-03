import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Style from "./CourseResource.module.css";
import CourseResourcetitle from "../assets/CourseResourcetitle";

function CourseResource() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/courses/${id}`)
      .then((response) => setCourse(response.data.data))
      .catch((error) => console.error("Error fetching course:", error));
  }, [id]);
  const handleDownloadClick = (materialId, title) => () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in to download files.");
      navigate("/login/student");
      return;
    }

    axios
      .get(`http://localhost:8080/materials/download/${materialId}`, {
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const disposition = response.headers["content-disposition"];
        let filename = title + "file.zip";
        if (disposition && disposition.includes("filename=")) {
          filename = disposition.split("filename=")[1].replace(/"/g, "").trim();
        }

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error("Download failed:", error);
        alert("Failed to download file. Make sure you're authorized.");
      });
  };

  return (
    <>
      <Navbar />
      <CourseResourcetitle name={course ? course.title : "Loading..."} />

      <div className={Style.container}>
        {course ? (
          <>
            <h1 className={Style.title}>{course.title}</h1>
            <p className={Style.details}>Semester: {course.semester}</p>
            <p className={Style.details}>Credits: {course.credits}</p>

            <div className={Style.resources}>
              <h3 className={Style.sectionHeading}>Download</h3>
              <div className={Style.buttonGroup}>
                {course.materials &&
                course.materials.filter((m) => m.type === "ZIP").length > 0 ? (
                  course.materials
                    .filter((mat) => mat.type === "ZIP")
                    .map((zip) => (
                      <button
                        key={zip.id}
                        className={Style.downloadButton}
                        onClick={handleDownloadClick(zip.id, zip.title)}
                      >
                        {zip.title}
                      </button>
                    ))
                ) : (
                  <p className={Style.noResourcesText}>
                    No ZIP materials available.
                  </p>
                )}
              </div>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}

        <button
          className={Style.bacButton}
          onClick={() => navigate(`/course/all`)}
        >
          Go to Branch
        </button>
      </div>
      <Footer />
    </>
  );
}

export default CourseResource;
