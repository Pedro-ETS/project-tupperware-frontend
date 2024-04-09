import React from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaShoppingCart, FaUser, FaUserPlus, FaHeart } from 'react-icons/fa';

const NavBar = (props) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <NavLink to="/" className="navbar-brand">
          Tupperware
        </NavLink>
        <div className="d-flex">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Buscar"
            aria-label="Buscar"
          />
          <button className="btn btn-outline-light" type="submit">
            Buscar
          </button>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink exact className="nav-link" to="/">
                <FaHome /> 
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink  className="nav-link" to="/favorites">
                <FaHeart /> 
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink  className="nav-link" to="/cart">
                <FaShoppingCart /> 
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink  className="nav-link" to="/signin">
                <FaUser /> 
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/signup">
                <FaUserPlus /> 
              </NavLink>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink  className="nav-link" to="/departamento/ofertas">
                ofertas
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink  className="nav-link" to="/departamento/productos">
                productos
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
