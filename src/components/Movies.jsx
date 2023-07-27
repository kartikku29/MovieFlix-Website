import { useContext } from "react";
import React from "react";
import Context from "../main";
import "../Style/Movies.css";

const Movies = (props) => {
  const { video, setVideo } = useContext(Context);
  const playVideo = async (id) => {
    const API = `https://api.themoviedb.org/3/movie/${id}?api_key=8e07d895e6ae8d4503312b59702a5a4b&append_to_response=videos`;
    const data = await fetch(API);
    const res = await data.json();
    const key = res.videos.results[0].key;
    setVideo(key);
    window.location.href = `https://www.youtube.com/watch?v=${key}`;
  };
  return (
    <>
      <div className="movie">
        <div
          onClick={() => {
            playVideo(props.id);
          }}
          className="moviePhoto"
        >
          <img
            src={`http://image.tmdb.org/t/p/w500//${props.poster_path}`}
          ></img>
          <h1>{props.title}</h1>
        </div>
        <div className="movieproperties">
          <h1>Overview :</h1>
          <p>{props.overview}</p>
          <p>Original Language : {props.original_language}</p>
          <p>Release Date : {props.release_date}</p>
        </div>
      </div>
    </>
  );
};
export default Movies;
