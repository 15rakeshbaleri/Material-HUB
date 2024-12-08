import React, { useState } from "react";
import Style from "./Add_course.module.css";
import Addcourse from "../assets/Addcourse";
import axios from "axios"; // Assuming axios is required for API calls

function Add_course() {
  const [code, setcode] = useState("");
  const [title, settitle] = useState("");
  const [branches, setbranches] = useState([]);
  const [credits, setcredits] = useState("");
  const [semester, setsemester] = useState("");
  const [ppt, setppt] = useState("");
  const [textbook, settextbook] = useState("");
  const [modelpapers, setmodelpapers] = useState("");
  const [labPrograms, setlabPrograms] = useState("");

  const handleBranchChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setbranches([...branches, value]);
    } else {
      setbranches(branches.filter((branch) => branch !== value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!code || !title || branches.length === 0 || !credits || !semester) {
      console.log("All the data are required!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/course", {
        code,
        title,
        branches,
        credits,
        semester,
        ppt,
        textbook,
        modelpapers,
        labPrograms,
      });

      if (response.status === 200) {
        console.log("Response Data:", JSON.stringify(response.data, null, 2));
      }
    } catch (error) {
      console.error(
        error.response
          ? `Error: ${JSON.stringify(error.response.data, null, 2)}`
          : "An error occurred"
      );
    }
  };

  return (
    <>
      <Addcourse />
      <div className={`${Style.container}`}>
        <div className={`${Style.container_form}`}>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="courseCode">Course Code</label>
              <input
                type="text"
                className={`${Style.input}`}
                id="courseCode"
                value={code}
                placeholder="Course Code"
                onChange={(e) => setcode(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="courseTitle">Course Title</label>
              <input
                type="text"
                className={`${Style.input}`}
                id="courseTitle"
                placeholder="Course Title"
                value={title}
                onChange={(e) => settitle(e.target.value)}
              />
            </div>

            <div>
              <label>Branch</label>
              <div className={Style.checkboxGroup}>
                <label>
                  <input
                    type="checkbox"
                    value="ISE"
                    onChange={handleBranchChange}
                  />{" "}
                  ISE
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="CSE"
                    onChange={handleBranchChange}
                  />{" "}
                  CSE
                </label>
              </div>
            </div>

            <div>
              <label htmlFor="semester">Semester</label>
              <select
                id="semester"
                value={semester}
                className={`${Style.input}`}
                onChange={(e) => setsemester(e.target.value)}
              >
                <option value="">Select Semester</option>
                <option value="P">P</option>
                <option value="C">C</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
              </select>
            </div>

            <div>
              <label htmlFor="credits">Credits</label>
              <input
                type="text"
                value={credits}
                className={`${Style.input}`}
                id="credits"
                placeholder="Credits"
                onChange={(e) => setcredits(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="ppt">PPT Links</label>
              <input
                type="text"
                value={ppt}
                className={`${Style.input}`}
                id="ppt"
                placeholder="PPT Links (comma-separated)"
                onChange={(e) => setppt(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="textbook">Textbooks</label>
              <input
                type="text"
                value={textbook}
                className={`${Style.input}`}
                id="textbook"
                placeholder="Textbooks (comma-separated)"
                onChange={(e) => settextbook(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="modelPapers">Model Papers</label>
              <input
                type="text"
                value={modelpapers}
                className={`${Style.input}`}
                id="modelPapers"
                placeholder="Model Papers (comma-separated)"
                onChange={(e) => setmodelpapers(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="labPrograms">Lab Programs</label>
              <input
                type="text"
                value={labPrograms}
                className={`${Style.input}`}
                id="labPrograms"
                placeholder="Lab Programs (comma-separated)"
                onChange={(e) => setlabPrograms(e.target.value)}
              />
            </div>

            <button type="submit">Add Course</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Add_course;
