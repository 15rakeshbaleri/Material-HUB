import React from "react";
import logo from "../resources/materialhublogo.png";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <div className="row w-100">
            <div className="col-lg-6 d-flex align-items-center">
              <img src={logo} alt="Material Hub Logo" height={70} />
              <p className="mb-0 text-light">
                <i className="bi bi-envelope-at-fill"></i>
                <span> materialhub@gmail.com</span>
              </p>
            </div>

            <div className="col-lg-6 d-flex justify-content-end align-items-center">
              <ul className="nav">
                <li className="nav-item">
                  <Link className="nav-link text-warning" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-warning" to="/course/all">
                    All Courses
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-warning" to="/about">
                    About Us
                  </Link>
                </li>

                {!token ? (
                  <>
                    <li className="nav-item">
                      <Link
                        className="nav-link text-warning"
                        to="/login/student"
                      >
                        Login
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link text-warning" to="/login/admin">
                        Admin Login
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    {role === "admin" && (
                      <li className="nav-item">
                        <Link className="nav-link text-warning" to="/admin">
                          Admin Panel
                        </Link>
                      </li>
                    )}
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
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
