import React from "react";
import Style from "./Add_course.module.css";
import Addcourse from "../assets/Addcourse";
function Add_course() {
  return (
    <>
      <Addcourse />
      <div className={`${Style.container}`}>
        <div className={`${Style.container_form}`}>
          <form>
            <div>
              <label htmlFor="courseCode">Course Code</label>
              <input
                type="text"
                className={`${Style.input} `}
                id="courseCode"
                placeholder="Course Code"
              />
            </div>

            <div>
              {" "}
              <label htmlFor="courseTitle">Course Title</label>
              <input
                type="text"
                className={`${Style.input} `}
                id="courseTitle"
                placeholder="Course Title"
              />
            </div>

            <div>
              <label>Branch</label>
              <div className={Style.checkboxGroup}>
                <label>
                  <input type="checkbox" value="ISE" /> ISE
                </label>
                <label>
                  <input type="checkbox" value="CSE" /> CSE
                </label>
              </div>
            </div>

            <div>
              <label htmlFor="semester">Semester</label>
              <select id="semester" className={`${Style.input} `}>
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
                className={`${Style.input} `}
                id="credits"
                placeholder="Credits"
              />
            </div>

            <div>
              {" "}
              <label htmlFor="ppt">PPT Links</label>
              <input
                type="text"
                className={`${Style.input} `}
                id="ppt"
                placeholder="PPT Links (comma-separated)"
              />
            </div>

            <div>
              {" "}
              <label htmlFor="textbook">Textbooks</label>
              <input
                type="text"
                className={`${Style.input} `}
                id="textbook"
                placeholder="Textbooks (comma-separated)"
              />
            </div>

            <div>
              <label htmlFor="modelPapers">Model Papers</label>
              <input
                type="text"
                className={`${Style.input} `}
                id="modelPapers"
                placeholder="Model Papers (comma-separated)"
              />
            </div>

            <button type="submit">Add Course</button>
          </form>
        </div>
      </div>{" "}
    </>
  );
}

export default Add_course;
