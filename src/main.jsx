import React, { useEffect, useReducer } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import reducer from "./reducer.js";
import { createContext, useState } from "react";
const Context = createContext({ isAuthenticated: false });
let API =
  "https://api.themoviedb.org/3/discover/movie?api_key=8e07d895e6ae8d4503312b59702a5a4b&with_genres=";
const intialState = {
  isLoading: true,
  with_genres: 28,
  total_pages: 0,
  page: 1,
  results: [],
};

const AppWrapper = () => {
  let data;
  const [video, setVideo] = useState("");
  const [state, dispatch] = useReducer(reducer, intialState);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [homeData, setHomeData] = useState(null);
  const [user, setUser] = useState("");
  const fetchApiData = async (url) => {
    try {
      const res = await fetch(url);
      const resData = await res.json();
      data = resData;
    } catch (e) {
      console.log(e);
    }
  };
  const getDetailWithGenres = (id) => {
    dispatch({
      type: "GENRES_DETAILS",
      payload: {
        with_genres: id,
        results: data.results,
        total_pages: data.total_pages,
      },
    });
    setHomeData("2");
  };

  useEffect(() => {
    // console.log(`${API}${state.with_genres}&page=${state.page}`);
    fetchApiData(`${API}${state.with_genres}&page=${state.page}`);
  }, [state.with_genres, state.page, state.results, isAuthenticated, video]);
  return (
    <Context.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        loading,
        setLoading,
        user,
        setUser,
        ...state,
        getDetailWithGenres,
        video,
        setVideo,
        homeData,
        setHomeData,
      }}
    >
      <App />
    </Context.Provider>
  );
};
ReactDOM.createRoot(document.getElementById("root")).render(<AppWrapper />);
export default Context;
