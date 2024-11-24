import Style from "./Coursecard.module.css";
function Coursecard(coursename, sem, credit) {
  return (
    <>
      <button
        className={`card shadow-sm ${Style.card}`}
        onClick={() => handleCardClick("Course Name")}
      >
        <div className={`card-body ${Style.cardBody}`}>
          <center className={Style.cardText}>{coursename}</center>
          <br />
          <div className="d-flex justify-content-evenly align-items-center">
            <small className={`${Style.textMuted}`}>Semester:{sem}</small>
            <small className={`${Style.textMuted}`}>Credits:{credit}</small>
          </div>
        </div>
      </button>
    </>
  );
}

export default Coursecard;
