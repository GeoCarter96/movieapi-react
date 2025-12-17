import {React, useEffect, useRef} from 'react'
import './Landing.css'

//https://www.omdbapi.com/?i=tt3896198&apikey=d69e1a3c
const API_KEY = "d69e1a3c";

  




let currentMovies = []; 


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
  const ref = useRef();
  useEffect(() => {
    let el = document.getElementById('loadingSpinner')
    console.log(el)
  }, [])
  useEffect(() => {
    let el2 = document.getElementById('searchBtn')
    console.log(el2)
  }, [])
  useEffect(() => {
    let el3 = document.getElementById('searchInput')
    console.log(el3)
  }, [])
  useEffect(() => {
    let el4 = document.getElementById('sortSelect')
    console.log(el4)
  }, [])
  useEffect(() => {
    let el5 = document.getElementById('movieResults')
    console.log(el5)
  }, [])


  
  return (
   <div>
     <nav className="navbar">
      <div className='logo-box'>
      <h1 className="logo">🎬 Movies</h1>
</div>
      <div className="search-group">
        <input ref={ref} type="text" id="searchInput" placeholder="Search movies..."/>
        <div className="search-controls">
        <button ref={ref} id="searchBtn">Search</button>
        <select ref={ref} id="sortSelect" className="sort-select">
          <option value="" disabled="" >Sort movies...</option>
          <option value="az">Title A → Z</option>
          <option value="za">Title Z → A</option>
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
        </div>
      </div>
    </nav>

    <div className="movies movies__loading" ref={ref} id="loadingSpinner">
      <i className="fa-solid fa-spinner movies__loading--spinner"></i>
    </div>

    <div className="container">
        <div className="movie__wrapper">
      <div ref={ref} id="movieResults" className="movie-results"></div>
     
     
    </div>
        </div>
   

    
    <footer>
      <p>© 2025 MovieFinder</p>
    </footer>

</div>

  )
}

export default Landing
