import React from "react";
import Navbar from "../components/Navbar";
import Footer from "./Footer";
import Style from "./CourseResource.module.css";

function CourseResource() {
  const resources = ["PPT", "TEXT BOOK", "SAMPLE PAPER", "LAB PROGRAM"];

  return (
    <div>
      <Navbar />
      <div className={`${Style.container1}`}>
        {resources.map((resource, index) => (
          <button className={`${Style.card}`} key={index}>
            <div className={`${Style.cardtext}`}>
              <p>{resource}</p>
            </div>
          </button>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default CourseResource;
