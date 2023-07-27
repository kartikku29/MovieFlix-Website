import React, { useState, useContext } from "react";
import Context from "../main";
import { Link, Navigate } from "react-router-dom";
import "../Style/Login.css";
import axios from "axios";
import { toast } from "react-hot-toast";
export const Login = () => {
  const { isAuthenticated, setIsAuthenticated, user, setUser } =
    useContext(Context);
  setIsAuthenticated(false);
  const [loginDetail, setLoginDetail] = useState({ email: "", password: "" });
  const SubmitHandler = async (e) => {
    e.preventDefault();
    const { email, password } = loginDetail;
    const { data } = await axios.post(
      "http://localhost:3000/movieflix/login",
      { email, password },
      { headers: { "Content-Type": "application/Json" }, withCredentials: true }
    );
    if (data.message == "Wrong Password") {
      toast.error("Entered Wrong Password");
    } else {
      setIsAuthenticated(true);
      setUser(data.message);
      toast.success("Welcome " + data.message);
    }
  };
  if (isAuthenticated) return <Navigate to={"/movieflix"} />;
  const setData = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setLoginDetail((prev) => {
      return { ...prev, [name]: value };
    });
  };
  return (
    <>
      <section className="loginBody">
        <div className="login">
          <div className="loginHeader">
            <h1>LogIn</h1>
          </div>
          <div className="loginForm">
            <form onSubmit={SubmitHandler}>
              <div className="emailField">
                <label htmlFor="email">Email</label>
                <input
                  name="email"
                  type="email"
                  id="email"
                  placeholder="Email"
                  required
                  value={loginDetail.email}
                  onChange={setData}
                />
              </div>
              <div className="passwordField">
                <label htmlFor="password">Password</label>
                <input
                  name="password"
                  type="password"
                  id="password"
                  placeholder="Password"
                  required
                  value={loginDetail.password}
                  onChange={setData}
                />
              </div>
              <button className="submit" type="submit">
                Submit
              </button>
            </form>
          </div>
          <div>
            <p>
              New to Movieflix?
              <Link className="registraionLink" to="/movieflix/registration">
                Sign up Now
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};
export default Login;
