import React, { useContext } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import Context from "../main";
import "../Style/Header.css";
import Profile from "../pages/Profile";
import axios from "axios";
const Header = () => {
  const { isAuthenticated, setIsAuthenticated, user, setUser } =
    useContext(Context);

  const logoutHandler = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:3000/movieflix/logout",
        { withCredentials: true }
      );
      toast.success(data.message);
      setUser("");
    } catch (e) {
      toast.error(e);
    }
  };
  return (
    <>
      {" "}
      <div className="header">
        <div>
          <Link className="headerPage" to={"/movieflix/"}>
            MovieFlix
          </Link>
        </div>
        <div>
          <Link className="headerPage" to={"/movieflix/"}>
            Home
          </Link>
          <button className="headerPage">
            {user != "" ? user : "Profile"}
          </button>
          {user != "" ? (
            <button onClick={logoutHandler} className="headerPage logout">
              Logout
            </button>
          ) : (
            <Link className="headerPage" to={"/movieflix/login"}>
              Login
            </Link>
          )}
        </div>
      </div>
    </>
  );
};
export default Header;
