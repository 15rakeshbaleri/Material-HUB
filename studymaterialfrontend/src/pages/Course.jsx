import React from "react";
import Navbar from "../components/Navbar";
import Coursecard from "../components/Coursecard";
import Footer from "../components/Footer";
import ExploreCources from "../assets/ExploreCources";
function Course() {
  return (
    <>
      <Navbar></Navbar>
      <ExploreCources />
      {/* <Coursecard /> */}
      <Footer></Footer>
    </>
  );
}

export default Course;
