import React, { useState } from "react";
import Style from "./Semester.module.css";

function Semester() {
  const [selectedSemester, setSelectedSemester] = useState("Choose Semester");
  const [isOpen, setIsOpen] = useState(false);

  const handleSelection = (semester) => {
    setSelectedSemester(semester);
    setIsOpen(false); // Close the dropdown after selection
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen); // Toggle dropdown visibility
  };

  return (
    <div className={Style.semesterDropdown}>
      <button
        className={Style.semesterButton}
        type="button"
        onClick={toggleDropdown}
      >
        {selectedSemester}
      </button>

      {isOpen && (
        <ul className={Style.semesterDropdownMenu}>
          <li>
            <button
              className={Style.semesterDropdownItem}
              onClick={() => handleSelection("C cycle")}
            >
              C cycle
            </button>
          </li>
          <li>
            <button
              className={Style.semesterDropdownItem}
              onClick={() => handleSelection("P cycle")}
            >
              P cycle
            </button>
          </li>
          <li>
            <button
              className={Style.semesterDropdownItem}
              onClick={() => handleSelection("Semester 3")}
            >
              Semester 3
            </button>
          </li>
          <li>
            <button
              className={Style.semesterDropdownItem}
              onClick={() => handleSelection("Semester 4")}
            >
              Semester 4
            </button>
          </li>
          <li>
            <button
              className={Style.semesterDropdownItem}
              onClick={() => handleSelection("Semester 5")}
            >
              Semester 5
            </button>
          </li>
          <li>
            <button
              className={Style.semesterDropdownItem}
              onClick={() => handleSelection("Semester 6")}
            >
              Semester 6
            </button>
          </li>
          <li>
            <button
              className={Style.semesterDropdownItem}
              onClick={() => handleSelection("Semester 7")}
            >
              Semester 7
            </button>
          </li>
          <li>
            <button
              className={Style.semesterDropdownItem}
              onClick={() => handleSelection("Semester 8")}
            >
              Semester 8
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}

export default Semester;
