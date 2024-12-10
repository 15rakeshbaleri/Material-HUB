import React, { useState } from "react";
import axios from "axios"; // Make sure axios is imported
import logo from "../resources/materialhublogo.png";
import Style from "./Login.module.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/user/login", {
        username: username,
        password: password,
      });

      if (response.status === 200) {
        console.log("Login successful!");
      }
    } catch (error) {
      setErrorMessage("Invalid username or password");
    }
  };

  return (
    <div className={`${Style.container}`}>
      <form className={`${Style.formin}`} onSubmit={handleSubmit}>
        {" "}
        {/* Attach handleSubmit here */}
        <img
          className="mb-4"
          src={logo}
          alt="Material Hub Logo"
          width="100"
          height="60"
        />
        <div>
          <input
            type="email"
            className={`${Style.input}`}
            placeholder="admin login"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="password"
            className={`${Style.input}`}
            id="floatingPassword"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {errorMessage && <div className="error-message">{errorMessage}</div>}{" "}
        {/* Show error message */}
        <button type="submit">Sign in</button>
      </form>
    </div>
  );
}

export default Login;
