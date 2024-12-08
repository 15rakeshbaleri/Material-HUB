import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Style from "./CourseResource.module.css";
import CourseResourcetitle from "../assets/CourseResourcetitle";
import Resource from "../components/Resource";

function CourseResource({
  coursename,
  sem,
  credit,
  ppt,
  textbook,
  modelpapers,
  labPrograms,
}) {
  const [selectedResource, setSelectedResource] = useState(null);

  const resources = [
    { name: "PPT", content: ppt },
    { name: "Text book", content: textbook },
    { name: "Sample paper", content: modelpapers },
    { name: "Lab program", content: labPrograms },
  ];

  const handleResourceClick = (resource) => {
    setSelectedResource(resource);
  };

  return (
    <>
      <Navbar />
      <CourseResourcetitle name={coursename} />
      <p>Credits: {credit}</p>
      <div className={`${Style.external}`}>
        <div className={`${Style.container1}`}>
          {resources.map((resource, index) => (
            <button
              className={`${Style.card}`}
              key={index}
              onClick={() => handleResourceClick(resource)}
            >
              <div className={`${Style.cardtext}`}>
                <p>{resource.name}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Conditionally render the selected resource */}
      {selectedResource && <Resource content={selectedResource.content} />}
      <Footer />
    </>
  );
}

export default CourseResource;
