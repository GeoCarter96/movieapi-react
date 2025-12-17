import React from 'react'
import './Hero.css'
import { useNavigate } from "react-router-dom";






function Hero() {
      const navigate = useNavigate();
   const heroBtn = () => {
    navigate("/movies");
   };

  return (
   <div className='hero_container'>
    <div className='hero_row'>
        <div className='hero-section'>
      <img  className="hero-pic" src="./pngegg.png" alt="movielogo" />
    </div>
    </div>
    <div className="search-group">
        <input type="text" id="searchInput" placeholder="Search movies..."/>
        <div className="search-controls">
        <button onClick={heroBtn} id="searchBtn">Search</button>
       </div>
       </div>
       <div className='black-car'>
        <img  className="black-car--pic"src="./blackcar.png" alt="blackcar" />
       </div>
       </div>
  )
}

export default Hero
