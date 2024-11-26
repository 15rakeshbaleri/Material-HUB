import React from "react";
import logo from "../resources/materialhublogo.png";
import Style from "./Login.module.css";

function Login() {
  return (
    <div className={`${Style.container}`}>
      <div className={`${Style.container_form}`}>
        <form>
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
              className={`${Style.input} `}
              placeholder="admin login"
              required
            />
            {/* <label htmlFor="floatingInput">Email address</label> */}
          </div>
          <div>
            <input
              type="password"
              className={`${Style.input} `}
              id="floatingPassword"
              placeholder="Password"
              required
            />
            {/* <label htmlFor="floatingPassword">Password</label> */}
          </div>

          <button type="submit">Sign in</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
