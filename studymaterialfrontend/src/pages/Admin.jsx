import React from "react";
import { Navigate } from "react-router-dom";
import AdminPanel from "../pages/AdminPanel";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Admin = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/login/admin" />;
  }

  if (role !== "admin") {
    alert("You are not authorized to access this page. Only admin can access.");
    return <Navigate to="/" />;
  }

  return (
    <div>
      <Navbar />
      <AdminPanel />
      <Footer />
    </div>
  );
};

export default Admin;
