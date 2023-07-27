import React, { useContext, useState, useEffect } from "react";
import "../Style/Home.css";
import Movies from "../components/Movies";
import Context from "../main";
const Home = () => {
  const { results, getDetailWithGenres, homeData, setHomeData } =
    useContext(Context);
  const [genreData, setGenreData] = useState([]);

  const [homeMovieData, sethomeMovieData] = useState([]);
  useEffect(() => {
    getGenre();
  }, []);

  const getGenre = async () => {
    const genre = await fetch(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=8e07d895e6ae8d4503312b59702a5a4b"
    );
    const jsonGenreData = await genre.json();
    if (jsonGenreData.genres.length > 0) {
      setGenreData(jsonGenreData.genres);
    }
    const homeMovie = await fetch(
      "https://api.themoviedb.org/3/discover/movie?api_key=8e07d895e6ae8d4503312b59702a5a4b&with_genres=28&page=1"
    );
    const jsonhomeMovie = await homeMovie.json();
    if (jsonhomeMovie.results.length > 0) {
      // console.log(jsonhomeMovie.results);
      sethomeMovieData(jsonhomeMovie.results);
    }
  };
  // console.log(results);
  return (
    <>
      <div className="homeBody">
        <div className="genre">
          <h2>Genre</h2>
          {genreData.map((value) => {
            return (
              <p
                onClick={() => {
                  getDetailWithGenres(value.id);
                }}
              >
                {value.name}
              </p>
            );
          })}
        </div>
        {homeData == null ? (
          <div className="movieContainer">
            {homeMovieData.map((val, index) => {
              return (
                <Movies
                  key={index}
                  id={val.id}
                  backdrop_path={val.backdrop_path}
                  poster_path={val.poster_path}
                  original_language={val.original_language}
                  overview={val.overview}
                  title={val.title}
                  release_date={val.release_date}
                ></Movies>
              );
            })}
          </div>
        ) : (
          <div className="movieContainer">
            {results.map((val, index) => {
              return (
                <Movies
                  key={index}
                  id={val.id}
                  backdrop_path={val.backdrop_path}
                  poster_path={val.poster_path}
                  original_language={val.original_language}
                  overview={val.overview}
                  title={val.title}
                  release_date={val.release_date}
                ></Movies>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};
export default Home;
