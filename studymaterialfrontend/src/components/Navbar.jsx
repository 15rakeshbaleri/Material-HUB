import React from "react";
import logo from "../resources/materialhublogo.png";

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
                  <a className="nav-link text-warning" href="/courses">
                    All Courses
                  </a>
                </li>

                <li className="nav-item">
                  <a className="nav-link text-warning" href="">
                    Contact Us
                  </a>
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
