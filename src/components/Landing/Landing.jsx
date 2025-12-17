// import React and useState 
import React, { useState } from "react";
import "./Landing.css";



const Landing = () => {
  const API_KEY = "d69e1a3c";
  // using useState to store data istaed of global variable
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState("");

  async function searchMovies() {
    // this part prevent empty searches
    if (!query.trim()) return;

    // show the loading when we search
    setLoading(true);
    

    try {
       // Fetch data from OMDB API
      const response = await fetch(
        `https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`
      );
      const data = await response.json();

      // If movies are found, store them in state
      if (data.Response === "True") {
        // only keep the first 6 movies
        setMovies(data.Search.slice(0, 6));
      } else {
        // if no movies found clear the result
        setMovies([]);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
      setMovies([]);
    } finally {
      // hide the loading
      setLoading(false);
    }
  };

 

  // again sorting is done using state 
  const sortedMovies = [...movies].sort((a, b) => {
    if (sortBy === "newest") return Number(b.Year) - Number(a.Year);
    if (sortBy === "oldest") return Number(a.Year) - Number(b.Year);
    return 0;
  });

  return (
    <div>
      <nav className="navbar">
        <div className="logo-box">
          <h1 className="logo"> Movies</h1>
        </div>

        <div className="search-group">
          <input
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <div className="search-controls">
            <button onClick={searchMovies}>Search</button>

            <select
              className="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="">Sort movies...</option>
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </div>
      </nav>

       {/*
        conditional rendering instead of classList manipulation
      */}

      {loading && (
        <div className="movies movies__loading">
          <i className="fa-solid fa-spinner movies__loading--spinner"></i>
        </div>
      )}

      <div className="container">
        <div className="movie__wrapper">
          <div className="movie-results">
             {/*
              show message if no movies are found
            */}
            {!loading && sortedMovies.length === 0 && (
              <p>No movies found. Try another search.</p>
            )}

            {sortedMovies.map((movie) => (
              <div key={movie.imdbID} className="movie-card">
                <img
                  src={
                    movie.Poster !== "N/A"
                      ? movie.Poster
                      : "https://via.placeholder.com/300x450?text=No+Image"
                  }
                  alt={movie.Title}
                />
                <h3>{movie.Title}</h3>
                <p>{movie.Year}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;