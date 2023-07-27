import React from "react";

const MovieFlix = () => {
  const fetchtrending = async () => {
    try {
      const res = await fetch(
        "https://api.themoviedb.org/3/discover/movie?api_key=8e07d895e6ae8d4503312b59702a5a4b&with_genres=28&page=2"
      );
      const resData = await res.json();
      console.log(resData);
    } catch (e) {
      console.log(e);
    }
  };
  return <div>MovieFlix</div>;
};

export default MovieFlix;
