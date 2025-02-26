import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Style from "./Department.module.css";
import ise from "../resources/ise.png";
import cse from "../resources/cse.png";

function Departmentchoice() {
  const navigate = useNavigate();

  const handleCardClick = (dept) => {
    navigate(`/course/${dept}`);
  };

  return (
    <>
      <div className={Style.outtercotainer} bis_skin_checked="1">
        <div className={Style.innerContainer} bis_skin_checked="1">
          <button
            className={Style.singlecard}
            bis_skin_checked="1"
            onClick={() => handleCardClick("ise")}
          >
            <div className={Style.cardimg}>
              <img src={ise} alt="Information Science" width={220} />
              <p className="card-text">Information Science</p>
            </div>
          </button>

          <button
            className={Style.singlecard}
            bis_skin_checked="1"
            onClick={() => handleCardClick("cse")}
          >
            <div className={Style.cardimg}>
              <img src={cse} alt="Computer Science" width={220} />
              <p className="card-text">Computer Science</p>
            </div>
          </button>
        </div>
      </div>
    </>
  );
}

export default Departmentchoice;
