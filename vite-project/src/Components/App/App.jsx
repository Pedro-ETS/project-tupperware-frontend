import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from '../Header/Header';
import Login from '../Login/Login.jsx';
import Register from '../Register/Register.jsx';
import Main from '../Main/Main.jsx';  
import Footer from '../Footer/Footer';
import Cart from '../Cart/Cart.jsx';
import api from "../../utils/api.js";
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";
import ProtectedRoute from "../../components/ProtectedRoute/ProtectedRoute.jsx";
import * as auth from "../../utils/auth.js";
function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(null);
  const [cards, setCards] = useState([]);
  const [producto, setProducto] = useState(null);
  const [cartProducts, setCartProducts] = useState([]);
  const [productsFavorities, setproductsFavorities] = useState([]);
  const navigate = useNavigate();

  const closeAllPopups = () => {
    setProducto(null);
  };
  function handleLogin(data) {
    setToken(data);
  }
  function clearCartStatus(){
    setCartProducts([]);
  }
  function clearCurrentUsert(){ 
    setCurrentUser(null);
  }

  function productView({name, link, price, stock}){
    setProducto({name,link,price,stock});
  }
  function tokenCheck() {
    const jwt = localStorage.getItem("token");
    if (jwt) {
      auth.checkToken(jwt).then((res) => {  
        if (res) {
          setCurrentUser(res);
          setToken(jwt);
          setCartProducts(res.cart);
          setproductsFavorities(res.favorites);
          navigate("/");
        } 
      });
    }
  }

  async function handleAddProductToCart(dataProduct) { 
    let productId=dataProduct.productId; 
    try {
      const res = await api.AddProductToCart(`users/${productId}/add-to-cart`,dataProduct);
        const CartProducts= await api.getProductsCart("users/products/Cart");
        const newCartProducts = [...CartProducts.data]; 
        setCartProducts(newCartProducts);
        
    } catch (error) {
      alert("Error al agregar un producto al carrito:", error);
    }
  }


    async function handleSubtractFromCartQuantity(dataProduct) { 
      let productId=dataProduct.productId; 
    try {
      const res = await api.RemoveProductQuantity(`users/${productId}/delete-to-cart`);
      const cartProducts= await api.getProductsCart("users/products/Cart");
      const newCartProducts = [...cartProducts.data]; 
        setCartProducts(newCartProducts);
    } catch (error) {
      alert("Error al restar una cantidad del producto:", error);
    }
  }

  async function handleAddProductToFavorites(dataProduct) { 
    let productId=dataProduct.productId; 

    try {
      const res = await api.AddProductToFavorites(`users/${productId}/add-to-favorites`,dataProduct);
      const favoritesProducts= await api.getFavoritesProducts("users/products/favorites");
      const newfavoritesProducts = [...favoritesProducts.data]; 
        setproductsFavorities(newfavoritesProducts);
    } catch (error) {
      alert("Error al agregar un producto a favoritos:", error);
    }
  }
     
  useEffect(() => { 
    console.log("se actualizo el useEffect");
    (async () => {
      try {
          await tokenCheck();
          if (token) { 
          const initialCardsData = await api.getInitialCards("cards");
          setCards(initialCardsData.data);
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
     <Header cartProducts={cartProducts}/>
     <Routes>
            <Route path="/signin" element={<Login handleLogin={handleLogin}/>}/>
            <Route path="/signup" element={<Register/>}/>
            <Route 
            exact
            path="/" 
            element={
              <ProtectedRoute
                token={token}
                element={
                  <Main
                  cards={cards}
                  cartProducts={cartProducts}
                  productsFavorities={productsFavorities}
                  handleLogin={handleLogin}
                  productView={productView}
                  productoData={producto}
                  closeAllPopups={closeAllPopups}
                  handleAddProductToCart={handleAddProductToCart}
                  clearCartStatus={clearCartStatus}
                  clearCurrentUsert={clearCurrentUsert}
                  handleAddProductToFavorites={handleAddProductToFavorites}
                  />
                  
                  }>
              </ProtectedRoute>
            }
            />
            <Route 
            path="/cart"
            element={
              <ProtectedRoute
                token={token}
                element={<Cart 
                  cartProducts={cartProducts}
                  handleAddProductToCart={handleAddProductToCart}
                  handleSubtractFromCartQuantity={handleSubtractFromCartQuantity}
                  />
              }>
                </ProtectedRoute>
              
              }/>



          <Route 
            path="/favorites"
            element={
              <ProtectedRoute
                token={token}
                element={
                <Cart 
                  cartProducts={cartProducts}
                  handleAddProductToCart={handleAddProductToCart}
                  handleSubtractFromCartQuantity={handleSubtractFromCartQuantity}
                  />
              }>
                </ProtectedRoute>
              
              }/>

            


            </Routes>
     
     <Footer/>
     </CurrentUserContext.Provider>
    </div>
    </>
  )
}

export default App
