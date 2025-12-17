import React from 'react'
import './Nav.css'

function Nav() {
  return (

       <nav>
        <div class="nav__container">
          <img class="logo" src="./movielogo.png" alt="" />
          <ul class="nav__links">
            <li><a href="#" class="nav__link">Home</a></li>
            <li><a href="#" class="nav__link">Contact</a></li>
            <li><a href="#" class="nav__link nav__link--primary">Movies</a></li>
          </ul>
          </div>
        </nav>


  )
}

export default Nav
