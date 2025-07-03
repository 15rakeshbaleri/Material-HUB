import React, { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import logo from "../resources/materialhublogo.png";
import Style from "./Login.module.css";
import Loginpop from "../assets/Loginpop";

import Adminloginpop from "../assets/Adminloginpop";
function Login() {
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useParams(); // "admin" or "student"
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      if (isRegisterMode) {
        const response = await axios.post(
          `http://localhost:8080/api/auth/${user}/register`,
          {
            username,
            name,
            email,
            password,
          }
        );

        if (response.status === 200) {
          alert("Registered successfully! Please log in.");
          setIsRegisterMode(false);
        }
      } else {
        const response = await axios.post(
          "http://localhost:8080/api/auth/login",
          {
            username,
            password,
          }
        );

        if (response.status === 200 && response.data.token) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("role", response.data.role); // Optional
          navigate(from, { replace: true });
        }
      }
    } catch (error) {
      setErrorMessage("Invalid credentials or error occurred");
      console.error(error);
    }
  };

  return (
    <>
      {user === "student" && <Loginpop />}
      {user === "admin" && <Adminloginpop />}

      <div className={Style.container}>
        <form className={Style.formin} onSubmit={handleSubmit}>
          <img
            className={Style.logo}
            src={logo}
            alt="Material Hub Logo"
            width="100"
            height="60"
          />

          {isRegisterMode && (
            <>
              <input
                type="text"
                className={Style.input}
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="email"
                className={Style.input}
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </>
          )}

          <input
            type="text"
            className={Style.input}
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            type="password"
            className={Style.input}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {errorMessage && (
            <div className={Style.errorMessage}>{errorMessage}</div>
          )}

          <div className={Style.formbuttondiv}>
            <button type="submit">
              {isRegisterMode ? "Register" : "Sign in"}
            </button>

            {/* Show toggle button only if not admin */}
            {user !== "admin" && (
              <button
                type="button"
                onClick={() => setIsRegisterMode((prev) => !prev)}
              >
                {isRegisterMode ? "Already have an account?" : "New user?"}
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
