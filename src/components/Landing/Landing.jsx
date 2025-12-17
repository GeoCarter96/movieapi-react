import React from 'react'
import './Landing.css'

//https://www.omdbapi.com/?i=tt3896198&apikey=d69e1a3c
const API_KEY = "d69e1a3c";

const loadingSpinner = document.getElementById("loadingSpinner");
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");
const movieResults = document.getElementById("movieResults");

let currentMovies = []; 

searchBtn.addEventListener("click", searchMovies);

searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") searchMovies();
});

sortSelect.addEventListener("change", () => {
  displayMovies(currentMovies); 
});


async function searchMovies() {
  const query = searchInput.value.trim();
  if (!query) return;

  loadingSpinner.classList.add("active");
  movieResults.innerHTML = "";

  const response = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`);
  const data = await response.json();

  loadingSpinner.classList.remove("active");

  if (data.Response === "True") {
    currentMovies = data.Search; 
    displayMovies(currentMovies);
  } else {
    movieResults.innerHTML = "No movies found. Try another search.";
  }
}

function displayMovies(movies) {
  const sortBy = sortSelect.value;
  let sortedMovies = [...movies]; 

  if (sortBy === "az") {
    sortedMovies.sort((a, b) => a.Title.localeCompare(b.Title));
  } else if (sortBy === "za") {
    sortedMovies.sort((a, b) => b.Title.localeCompare(a.Title));
  } else if (sortBy === "newest") {
    sortedMovies.sort((a, b) => Number(b.Year) - Number(a.Year));
  } else if (sortBy === "oldest") {
    sortedMovies.sort((a, b) => Number(a.Year) - Number(b.Year));
  }

  const firstSix = sortedMovies.slice(0, 6); 

  movieResults.innerHTML = firstSix
    .map(
      (movie) => `
    <div class="movie-card">
      <img 
        src="${movie.Poster}"
        alt="${movie.Title}"
      >
      <h3>${movie.Title}</h3>
      <p>${movie.Year}</p>
    </div>
  `
    )
    .join("");
}


const Landing = () => {
  return (
    <>
     <nav className="navbar">
      <h1 className="logo">🎬 MovieFinder</h1>

      <div className="search-group">
        <input type="text" id="searchInput" placeholder="Search movies..."/>
        <div className="search-controls">
        <button id="searchBtn">Search</button>
        <select id="sortSelect" className="sort-select">
          <option value="" disabled="" selected="">Sort movies...</option>
          <option value="az">Title A → Z</option>
          <option value="za">Title Z → A</option>
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
        </div>
      </div>
    </nav>

    <div className="movies movies__loading" id="loadingSpinner">
      <i className="fa-solid fa-spinner movies__loading--spinner"></i>
    </div>

    <div className="container">
        <div className="movie__wrapper">
      <div id="movieResults" class="movie-results"></div>
     
     
    </div>
        </div>
   

    <footer>
      <p>© 2025 MovieFinder. Built with OMDb API.</p>
    </footer>
</>


  )
}

export default Landing
