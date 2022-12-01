import React from "react";
import { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  async function getMoviesHandler() {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("https://swapi.dev/api/films");
      if (!response.ok) {
        throw new Error("something went wrong");
      }
      const data = await response.json();
      const transformedData = data.results.map((movieData) => {
        return {
          title: movieData.title,
          releaseDate: movieData.release_date,
          openingText: movieData.opening_crawl,
          id: movieData.episode_id,
        };
      });
      setMovies(transformedData);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={getMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {isLoading && <h1>Fetching data</h1>}
        {!error && !isLoading && movies.length === 0 && <p>No Movies Yet</p>}
        {!error && !isLoading && movies.length > 0 && (
          <MoviesList movies={movies} />
        )}
        {error && !isLoading && <p>{error}</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
