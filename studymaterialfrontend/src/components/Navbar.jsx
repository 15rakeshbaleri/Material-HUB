import React from "react";
import logo from "../resources/materialhublogo.png";

import { Link } from "react-router-dom";
function Navbar() {
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
                  <Link className="nav-link text-warning" to="/Home">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-warning" to="/all-course">
                    All Courses
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link text-warning" to="/all-course">
                    Contact Us
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-warning" to="/login">
                    Login
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
