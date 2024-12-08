import React from "react";
import Style from "./Coursecard.module.css";
import CourseResource from "../pages/CourseResource";
function Coursecard({
  coursename,
  sem,
  credit,
  ppt,
  textbook,
  modelpapers,
  labPrograms,
}) {
  const handleCardClick = () => {
    <CourseResource
      key={code}
      coursename={title}
      sem={semester}
      credit={credit}
      ppt={ppt}
      textbook={textbook}
      modelpapers={modelpapers}
      labPrograms={labPrograms}
    />;

    console.log(`${coursename} card clicked`);
  };

  return (
    <>
      <button
        className={`card shadow-sm ${Style.card}`}
        onClick={handleCardClick}
      >
        <div className={`card-body ${Style.cardBody}`}>
          <center className={Style.cardText}>{coursename}</center>
          <br />
          <div className="d-flex justify-content-evenly align-items-center">
            <small className={`${Style.textMuted}`}>Semester: {sem}</small>
            <small className={`${Style.textMuted}`}>Credits: {credit}</small>
          </div>
        </div>
      </button>
    </>
  );
}

export default Coursecard;
