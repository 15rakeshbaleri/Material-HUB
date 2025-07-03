import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./AdminPanel.module.css";
import Navbar from "../components/Navbar";
const AdminPanel = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [filter, setFilter] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [showCourseForm, setShowCourseForm] = useState(false);
  const [newCourse, setNewCourse] = useState({
    code: "",
    title: "",
    semester: "",
    credits: "",
    branches: [],
  });

  // New: State to track expanded courses and their materials
  const [expandedCourseIds, setExpandedCourseIds] = useState([]);
  const [materialsByCourseId, setMaterialsByCourseId] = useState({});
  const [newMaterial, setNewMaterial] = useState({ type: "", file: null });

  const [showMaterialForm, setShowMaterialForm] = useState(null); // store courseId instead of true/false

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login/admin";
    }
  }, []);

  const fetchCourses = async () => {
    const res = await axios.get("http://localhost:8080/api/courses");
    const data = res.data.data || [];
    setCourses(data);
    setFilteredCourses(data);
  };

  const handleFilterChange = (e) => {
    const value = e.target.value.toLowerCase();
    setFilter(value);
    const filtered = courses.filter(
      (c) =>
        c.title.toLowerCase().includes(value) ||
        c.code.toLowerCase().includes(value) ||
        c.semester.toLowerCase().includes(value)
    );
    setFilteredCourses(filtered);
  };

  const handleSemesterSelect = (semester) => {
    setSelectedSemester(semester);
    const filtered = courses.filter((course) =>
      semester === "" || semester === "All"
        ? true
        : course.semester.toString().toLowerCase() === semester.toLowerCase()
    );
    setFilteredCourses(filtered);
  };
  const handleAddCourse = async () => {
    const { code, title, semester, credits, branches } = newCourse;

    // Basic form validation
    if (!code || !title || !semester || !credits || branches.length === 0) {
      alert("Please fill in all fields including branches.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/courses",
        newCourse
      );

      if (response.status === 200 || response.status === 201) {
        alert("Course added successfully!");
        setShowCourseForm(false);
        setNewCourse({
          code: "",
          title: "",
          semester: "",
          credits: "",
          branches: [],
        });
        fetchCourses(); // Refresh course list
      } else {
        alert("Failed to add course. Please try again.");
      }
    } catch (error) {
      console.error("Error adding course:", error);
      alert("Error adding course. Check console for details.");
    }
  };
  const handleDeleteCourse = async (courseId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this course?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:8080/api/courses/${courseId}`);
      alert("Course deleted successfully.");
      fetchCourses();
    } catch (error) {
      console.error("Error deleting course:", error);
      alert("Failed to delete course.");
    }
  };
  const handleAddMaterial = async (courseId) => {
    const token = localStorage.getItem("token");

    if (!newMaterial.file || !newMaterial.type) {
      alert("Please select a file and type.");
      return;
    }

    const formData = new FormData();
    formData.append("file", newMaterial.file);
    formData.append("type", newMaterial.type);

    try {
      const response = await axios.post(
        `http://localhost:8080/materials/upload/${courseId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Material uploaded successfully!");
      setShowMaterialForm(false);
      setNewMaterial({ type: "", file: null });

      // Refresh materials for the current course
      const updatedRes = await axios.get(
        `http://localhost:8080/materials/course/${courseId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMaterialsByCourseId((prev) => ({
        ...prev,
        [courseId]: updatedRes.data,
      }));
    } catch (error) {
      console.error("Error uploading material:", error);
      alert("Failed to upload material. Check console.");
    }
  };

  const toggleCourse = async (courseId) => {
    if (expandedCourseIds.includes(courseId)) {
      // collapse
      setExpandedCourseIds((prev) => prev.filter((id) => id !== courseId));
    } else {
      // expand + fetch materials
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get(
          `http://localhost:8080/materials/course/${courseId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMaterialsByCourseId((prev) => ({
          ...prev,
          [courseId]: res.data,
        }));
        setExpandedCourseIds((prev) => [...prev, courseId]);
      } catch (err) {
        console.error("Failed to fetch materials:", err);
      }
    }
  };
  const handleDeleteMaterial = async (materialId, courseId) => {
    const token = localStorage.getItem("token");
    if (!window.confirm("Are you sure you want to delete this material?"))
      return;
    try {
      await axios.delete(`http://localhost:8080/materials/${materialId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Material deleted successfully!");

      // Refresh material list for that course
      const updated = await axios.get(
        `http://localhost:8080/materials/course/${courseId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMaterialsByCourseId((prev) => ({
        ...prev,
        [courseId]: updated.data,
      }));
    } catch (error) {
      console.error("Failed to delete material:", error);
      alert("Failed to delete material.");
    }
  };

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
    <div>
      <div className={styles.container}>
        <h2 className={styles.header}>Admin Panel</h2>
        <div className={styles.topBar}>
          <button
            className={styles.primaryButton}
            onClick={() => setShowCourseForm(true)}
          >
            Add Course
          </button>
          <input
            type="text"
            placeholder="Search by title, code or semester"
            value={filter}
            onChange={handleFilterChange}
            className={styles.filterInput}
          />
        </div>

        <div className={styles.semesterFilter}>
          {["All", "P", "C", "3", "4", "5", "6", "7", "8"].map((sem) => (
            <button
              key={sem}
              onClick={() => handleSemesterSelect(sem)}
              className={styles.semesterButton}
              style={
                selectedSemester === sem ||
                (sem === "All" && selectedSemester === "")
                  ? { backgroundColor: "#daa520", color: "black" }
                  : {}
              }
            >
              {sem === "All"
                ? "All"
                : sem === "P"
                ? "P Cycle"
                : sem === "C"
                ? "C Cycle"
                : `Semester ${sem}`}
            </button>
          ))}
        </div>
        {showCourseForm && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
              <h3>Add New Course</h3>
              <form className={styles.form}>
                <label>Code</label>
                <input
                  value={newCourse.code}
                  onChange={(e) =>
                    setNewCourse({ ...newCourse, code: e.target.value })
                  }
                />
                <label>Title</label>
                <input
                  value={newCourse.title}
                  onChange={(e) =>
                    setNewCourse({ ...newCourse, title: e.target.value })
                  }
                />
                <label>Semester</label>
                <select
                  value={newCourse.semester}
                  onChange={(e) =>
                    setNewCourse({ ...newCourse, semester: e.target.value })
                  }
                >
                  <option value="">-- Select Semester --</option>
                  <option value="P">P Cycle</option>
                  <option value="C">C Cycle</option>
                  <option value="3">Semester 3</option>
                  <option value="4">Semester 4</option>
                  <option value="5">Semester 5</option>
                  <option value="6">Semester 6</option>
                  <option value="7">Semester 7</option>
                  <option value="8">Semester 8</option>
                </select>

                <label>Credits</label>
                <select
                  value={newCourse.credits}
                  onChange={(e) =>
                    setNewCourse({ ...newCourse, credits: e.target.value })
                  }
                >
                  <option value="">-- Select Credits --</option>
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>

                <label>Branches</label>
                <select
                  multiple
                  value={newCourse.branches}
                  onChange={(e) =>
                    setNewCourse({
                      ...newCourse,
                      branches: Array.from(
                        e.target.selectedOptions,
                        (option) => option.value
                      ),
                    })
                  }
                >
                  <option value="CSE">CSE</option>
                  <option value="ISE">ISE</option>
                </select>
              </form>
              <div className={styles.modalActions}>
                <button onClick={handleAddCourse}>Save</button>
                <button onClick={() => setShowCourseForm(false)}>Cancel</button>
              </div>
            </div>
          </div>
        )}

        <div className={styles.cardGrid}>
          {filteredCourses.map((course) => (
            <div key={course.id} className={styles.card}>
              <h4>{course.title}</h4>
              <p>Code: {course.code}</p>
              <p>Semester: {course.semester}</p>
              <p>Credits: {course.credits}</p>
              <p>Branches: {course.branches.join(", ")}</p>
              <button
                className="danger-button"
                onClick={() => handleDeleteCourse(course.id)}
              >
                Delete
              </button>
              <button
                className={styles.secondaryButton}
                onClick={() => toggleCourse(course.id)}
              >
                {expandedCourseIds.includes(course.id)
                  ? "Hide Materials"
                  : "View Materials"}
              </button>
              <button onClick={() => setShowMaterialForm(course.id)}>
                Add Materials
              </button>

              {expandedCourseIds.includes(course.id) &&
                materialsByCourseId[course.id] && (
                  <div className={styles.materialSection}>
                    <h5>Materials</h5>
                    {materialsByCourseId[course.id].length > 0 ? (
                      materialsByCourseId[course.id].map((mat) => (
                        <div key={mat.id} className={styles.materialCard}>
                          <p>
                            <strong>{mat.type}</strong>: {mat.title}
                          </p>
                          <button
                            onClick={handleDownloadClick(mat.id, mat.title)}
                          >
                            Download
                          </button>

                          <button
                            className="danger-button"
                            onClick={() =>
                              handleDeleteMaterial(mat.id, course.id)
                            }
                          >
                            Delete
                          </button>
                        </div>
                      ))
                    ) : (
                      <p>No materials found.</p>
                    )}
                  </div>
                )}
              {showMaterialForm === course.id && (
                <div>
                  <input
                    type="file"
                    accept=".pdf,.ppt,.doc,.docx,.zip"
                    onChange={(e) =>
                      setNewMaterial({
                        ...newMaterial,
                        file: e.target.files[0],
                      })
                    }
                  />
                  <select
                    value={newMaterial.type}
                    onChange={(e) =>
                      setNewMaterial({ ...newMaterial, type: e.target.value })
                    }
                  >
                    <option value="">-- Select Type --</option>
                    <option value="PDF">PDF</option>
                    <option value="PPT">PPT</option>
                    <option value="DOC">DOC</option>
                    <option value="ZIP">ZIP</option>
                  </select>
                  <button onClick={() => handleAddMaterial(course.id)}>
                    Upload
                  </button>
                  <button onClick={() => setShowMaterialForm(null)}>
                    Cancel
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
