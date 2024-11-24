import Style from "./Coursecard.module.css";
import ExploreCources from "../assets/ExploreCources";
function Coursecard() {
  return (
    <>
      <main>
        <section className="py-1 text-center container">
          <div className="row py-lg-2">
            <div className="col-lg-6 col-md-5 mx-auto">
              <ExploreCources />
            </div>
          </div>
        </section>

        <div className={Style.container}>
          <div className={`card shadow-sm ${Style.card}`}>
            <svg
              className="bd-placeholder-img card-img-top"
              width="100%"
              height="225"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label="Placeholder"
              preserveAspectRatio="xMidYMid slice"
              focusable="false"
            >
              <rect width="100%" height="100%" fill="#55595c"></rect>
            </svg>
            <div className={`card-body ${Style.cardBody}`}>
              <center className={Style.cardText}>Course Name</center>
              <br />
              <div className="d-flex justify-content-evenly align-items-center">
                <small className={` ${Style.textMuted}`}>semester</small>
                <small className={`${Style.textMuted}`}>credits</small>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Coursecard;
