import React from "react";
import "./nav.css";


function Nav() {
      return (
        <>
        <header>
        <img id="logo"src="logo.png"></img>
        <nav>
          <ul>
            <li><a href="#about">Create Project</a></li>
            <li><a href="#portfolio">Select Project</a></li>
            <li><a href="#contact">Login/SignUp</a></li>
            <li><a> Search</a></li>
          </ul>
        </nav>
      </header>
      </>
      );

  }


export default Nav;
