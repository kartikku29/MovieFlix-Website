import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import "../Style/Registration.css";
import Context from "../main";
import { Navigate } from "react-router-dom";
export const Registration = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const [registrationDetail, setRegistrationDetail] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const SubmitRegistrationHandler = async (e) => {
    e.preventDefault();
    const { name, email, password, cpassword } = registrationDetail;
    console.log(name, email, password, cpassword);
    try {
      const { data } = await axios.post(
        "http://localhost:3000/movieflix/register/new",
        { name, email, password, cpassword },
        {
          headers: {
            "Content-type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (
        data.message == "Email Id Already Register" ||
        data.message == "Password Didn't Match"
      ) {
        toast.error(data.message);
      } else {
        toast.success(data.message);
        setIsAuthenticated(true);
      }
    } catch (e) {
      console.log(e);
    }
  };
  if (isAuthenticated) {
    return <Navigate to="/movieflix/login" />;
  }
  const setRegistrationData = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setRegistrationDetail((prev) => {
      return { ...prev, [name]: value };
    });
  };
  return (
    <>
      <section className="registrationBody">
        <div className="registration">
          <div className="registrationHeader">
            <h1>Sign Up</h1>
          </div>
          <div className="registrationForm">
            <form onSubmit={SubmitRegistrationHandler}>
              <div className="field">
                <label htmlFor="name">Name</label>
                <input
                  name="name"
                  type="name"
                  id="name"
                  placeholder="Name"
                  required
                  value={registrationDetail.name}
                  onChange={setRegistrationData}
                />
              </div>
              <div className="field">
                <label htmlFor="email">Email</label>
                <input
                  name="email"
                  type="email"
                  id="email"
                  placeholder="Email"
                  required
                  value={registrationDetail.email}
                  onChange={setRegistrationData}
                />
              </div>
              <div className="field">
                <label htmlFor="password">Password</label>
                <input
                  name="password"
                  type="password"
                  id="password"
                  placeholder="Password"
                  required
                  value={registrationDetail.password}
                  onChange={setRegistrationData}
                />
              </div>
              <div className="field">
                <label htmlFor="cpassword">Confirm Password</label>
                <input
                  name="cpassword"
                  type="password"
                  id="cpassword"
                  placeholder="Confirm Password"
                  required
                  value={registrationDetail.cpassword}
                  onChange={setRegistrationData}
                />
              </div>
              <button className="submit" type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Registration;
