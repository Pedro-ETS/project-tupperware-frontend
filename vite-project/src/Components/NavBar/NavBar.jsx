import React from "react";
import { NavLink } from "react-router-dom";

function NavBar(props) {
  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
          <a class="navbar-brand" href="#!">
          tupperware
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
              <li class="nav-item">
              <NavLink exact className="nav-link" to="/signin">
        Iniciar Sesion
      </NavLink>
              </li>

              <li class="nav-item">
              <NavLink exact className="nav-link" to="/signup">
        Registrate
      </NavLink>
               
              </li>

              
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
