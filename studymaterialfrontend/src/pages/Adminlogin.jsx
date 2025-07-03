import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Login from "../components/Login";
function Adminlogin(user) {
  return (
    <div>
      <Navbar />
      <Login user={user}></Login>
      <Footer />
    </div>
  );
}

export default Adminlogin;
