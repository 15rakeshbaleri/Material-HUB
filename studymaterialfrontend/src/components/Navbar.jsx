import React from "react";
import logo from "../resources/materialhublogo.png";
import { Link, NavLink, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.clear();
    alert("Logged out successfully ");
    navigate("/");
  };

  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{ backgroundColor: "#000" }}
    >
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img
            src={logo}
            alt="Material Hub Logo"
            height={50}
            className="me-2"
          />
          <span className="d-none d-md-inline text-light small">
            <i className="bi bi-envelope-at-fill me-1"></i>
            materialhub@gmail.com
          </span>
        </Link>

        {/* Toggler for mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Nav links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink className="nav-link text-warning" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-warning" to="/">
                Dashboard
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-warning" to="/course/all">
                All Courses
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-warning" to="/about">
                About Us
              </NavLink>
            </li>

            {!token ? (
              <>
                <li className="nav-item">
                  <NavLink
                    className="nav-link text-warning"
                    to="/login/student"
                  >
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link text-warning" to="/login/admin">
                    Admin Login
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                {role === "admin" && (
                  <li className="nav-item">
                    <NavLink className="nav-link text-warning" to="/admin">
                      Admin Panel
                    </NavLink>
                  </li>
                )}
                <li className="nav-item">
                  <NavLink className="nav-link text-warning" to="/profile">
                    Profile
                  </NavLink>
                </li>
                <li className="nav-item">
                  <span
                    className="nav-link text-warning"
                    role="button"
                    onClick={handleLogout}
                  >
                    Logout
                  </span>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
