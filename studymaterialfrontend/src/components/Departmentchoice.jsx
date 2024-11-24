import Style from "./Department.module.css";
import ise from "../resources/ise.png";
import cse from "../resources/cse.png";
function Departmentchoice() {
  return (
    <>
      <div className={Style.outtercotainer} bis_skin_checked="1">
        <div className={Style.innerContainer} bis_skin_checked="1">
          <div className={Style.singlecard} bis_skin_checked="1">
            <div className={Style.cardimg}>
              <img src={ise} alt="" width={220} />
              <p class="card-text">Information Science</p>
            </div>
          </div>

          <div className={Style.singlecard} bis_skin_checked="1">
            <div className={Style.cardimg}>
              <img src={cse} alt="" width={220} />
              <p class="card-text">Computer Science</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Departmentchoice;
