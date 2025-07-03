import React from "react";
import { useNavigate } from "react-router-dom";
import Style from "./Coursecard.module.css";

function Coursecard({ code, coursename, sem, credit, id }) {
  const navigate = useNavigate();
  const handleCardClick = () => {
    navigate(`/course/id/${id}`);
  };

  return (
    <button
      className={`card shadow-sm ${Style.card}`}
      onClick={handleCardClick}
    >
      <div className={`card-body ${Style.cardBody}`}>
        <center className={Style.cardText}>{coursename}</center>
        <br />
        <div className="d-flex justify-content-evenly align-items-center">
          <small className={`${Style.textMuted}`}>Code: {code}</small>
          <small className={`${Style.textMuted}`}>Semester: {sem}</small>
          <small className={`${Style.textMuted}`}>Credits: {credit}</small>
        </div>
      </div>
    </button>
  );
}

export default Coursecard;
