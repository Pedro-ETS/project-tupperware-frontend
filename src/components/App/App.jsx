import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "../Header/Header";
import Login from "../Login/Login.jsx";
import Register from "../Register/Register.jsx";
import Main from "../Main/Main.jsx";
import Footer from "../Footer/Footer";
import Cart from "../Cart/Cart.jsx";
import Favorites from "../Favorites/favorites.jsx";
import api from "../../utils/api.js";
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";
import ProtectedRoute from "../../components/ProtectedRoute/ProtectedRoute.jsx";
import * as auth from "../../utils/auth.js";
function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [cards, setCards] = useState([]);
  const [producto, setProducto] = useState(null);
  const [cartProducts, setCartProducts] = useState([]);
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const navigate = useNavigate();

  const closeAllPopups = () => {
    setProducto(null);
  };
  function handleLogin(data) {
    setToken(data);
  }

  function cleanUserInformation(){
    setCartProducts([]);
    setCurrentUser(null);
    setFavoriteProducts([]);
  }
  function productView({ name, link, image2, price, stock }) {
    setProducto({ name, link, image2, price, stock });
  }
  function tokenCheck() {
    console.log("se llamo el tokenchek");

    if (localStorage.getItem("token")) {
      const jwt = localStorage.getItem("token");
      auth.checkToken(jwt).then((res) => {
        if (res) {
          setCurrentUser(res);
          setToken(jwt);
          setCartProducts(res.cart);
          setFavoriteProducts(res.favorites);
          console.log("se ejecuto el /");
          navigate("/");
        }
      });
    }
  }
  async function handleAddProductToCart(dataProduct) {
    let productId = dataProduct.productId;

    console.log(dataProduct); 
    try {
      const res = await api.AddProductToCart(
        `users/${productId}/add-to-cart`,
        dataProduct
      );
      const CartProducts = await api.getProductsCart("users/products/Cart");
      const newCartProducts = [...CartProducts.data];
      setCartProducts(newCartProducts);
    } catch (error) {
      alert("Error al agregar un producto al carrito, debes iniciar sesion", error);
    }
  }

  async function handleSubtractFromCartQuantity(dataProduct) {
    let productId = dataProduct.productId;
    console.log(dataProduct);
    try {
      const res = await api.RemoveProductQuantity(
        `users/${productId}/delete-to-cart`
      );
      const cartProducts = await api.getProductsCart("users/products/Cart");
      const newCartProducts = [...cartProducts.data];
      setCartProducts(newCartProducts);
    } catch (error) {
      alert("Error al restar una cantidad del producto:", error);
    }
  }

  async function handleAddProductToFavorites(dataProduct) {
    let productId = dataProduct.productId;
    try {
      const res = await api.AddProductToFavorites(
        `users/${productId}/add-to-favorites`,
        dataProduct
      );
      const initialFavoritesProducts = await api.getFavoritesProducts(
        "users/products/favorites"
      );
      const newfavoritesProducts = [...initialFavoritesProducts.data];
      setFavoriteProducts(newfavoritesProducts);
    } catch (error) {
      alert("Error al agregar un producto a favoritos,   debes iniciar sesion", error);
    }
  }  

  async function handleRemoveProductToFavorites(productId) {
    try {
      const res = await api.RemoveProductfavorites(
        `users/${productId}/remove-to-favorites`
      );
      const initialFavoritesProducts = await api.getFavoritesProducts(
        "users/products/favorites"
      );
      const newfavoritesProducts = [...initialFavoritesProducts.data];
      setFavoriteProducts(newfavoritesProducts);
    } catch (error) {
      alert("Error al eliminar  un producto a favoritos:", error);
    }
  }  

  async function handleRemoveProductToFavorites(productId) {
    try {
      const res = await api.RemoveProductfavorites(
        `users/${productId}/remove-to-favorites`
      );
      const initialFavoritesProducts = await api.getFavoritesProducts(
        "users/products/favorites"
      );
      const newfavoritesProducts = [...initialFavoritesProducts.data];
      setFavoriteProducts(newfavoritesProducts);
    } catch (error) {
      alert("Error al eliminar  un producto a favoritos:", error);
    }
  }

  useEffect(() => {
    (async () => {
      try { 
          const initialCardsData = await api.getInitialCards("cards");
          setCards(initialCardsData.data);
          if (token) {
            await tokenCheck();
                   }
      } catch (error) {
        console.log("Error al obtener datos:", error);
      }
    })();
  }, [token]);

  return (
    <>
      <div className="page">
        <CurrentUserContext.Provider value={currentUser}>
          <Header
            cartProducts={cartProducts}
            favoriteProducts={favoriteProducts}
          />
          <Routes>
            <Route
              exact
              path="/"
              element={
                    <Main
                      cards={cards}
                      cartProducts={cartProducts}
                      favoriteProducts={favoriteProducts}
                      handleLogin={handleLogin}
                      productView={productView}
                      productoData={producto}
                      closeAllPopups={closeAllPopups}
                      handleAddProductToCart={handleAddProductToCart}
                      handleAddProductToFavorites={handleAddProductToFavorites}
                      cleanUserInformation={cleanUserInformation}
                      token={token}
                    />
                
              }
            />
            <Route
              path="/signin"
              element={<Login handleLogin={handleLogin} />}
            />
            <Route path="/signup" element={<Register />} />
            <Route
              path="/cart"
              element={
                <ProtectedRoute
                  token={token}
                  element={
                    <Cart
                      cartProducts={cartProducts}
                      handleAddProductToCart={handleAddProductToCart}
                      handleSubtractFromCartQuantity={
                        handleSubtractFromCartQuantity
                      }
                    />
                  }
                ></ProtectedRoute>
              }
            />
            <Route
              path="/favorites"
              element={
                <ProtectedRoute
                  token={token}
                  element={<Favorites 
                  favoriteProducts={favoriteProducts} 
                  handleAddProductToCart={handleAddProductToCart} 
                  handleRemoveProductToFavorites={handleRemoveProductToFavorites}
                  />}
                ></ProtectedRoute>
              }
            />
          </Routes>
          <Footer />
        </CurrentUserContext.Provider>
      </div>
    </>
  );
}

export default App;
