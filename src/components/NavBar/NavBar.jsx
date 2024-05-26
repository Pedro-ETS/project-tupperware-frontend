import React, {useState} from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaShoppingCart, FaUser, FaUserPlus, FaHeart } from 'react-icons/fa';


const NavBar = ({cartProducts,favoriteProducts,handleSearchProduct}) => {
  const totalCartItems = cartProducts.reduce((total, product) => total + product.quantity, 0);
  const totalFavoritesItems = favoriteProducts.length;
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };
  
  const handleSearchSubmit = () => {
    if (searchValue.trim() === "") {
      handleSearchProduct(""); // Si el campo de búsqueda está vacío, mostrar todos los productos
    } else {
      handleSearchProduct(searchValue);
    }

  };
  
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <NavLink to="/" className="navbar-brand" style={{ color: '#F206FD', fontWeight: 'bold' }}>
          Tupperware
        </NavLink>
        <div className="d-flex">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Buscar"
            aria-label="Buscar"
            onChange={handleSearchChange}
          />
          <button className="btn btn-outline-light" type="submit" onClick={handleSearchSubmit}>
            Buscar
          </button>
        </div>
        <button
          className="navbar-toggler collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse " id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink exact="true" className="nav-link" to="/">
                <FaHome /> 
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink  className="nav-link" to="/favorites">
                <FaHeart /> 
                {totalFavoritesItems  > 0 && <span className="badge bg-secondary">{totalFavoritesItems }</span>} 
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink  className="nav-link" to="/cart">
                <FaShoppingCart /> 
                {totalCartItems > 0 && <span className="badge bg-secondary">{totalCartItems}</span>} 
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
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
