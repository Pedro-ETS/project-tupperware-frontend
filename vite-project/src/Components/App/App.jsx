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
  const navigate = useNavigate();

  const closeAllPopups = () => {
    setProducto(null);
  };
  function handleLogin(data) {
    setToken(data);
  }

  
  // function handleCartProducts(newData) {  esta funcion imitaba datos de la bd con un array en memoria 
  //   setCartProducts(prevData => [...prevData, newData]);
  // }


  function productView({name, link, price, stock}){
    setProducto({name,link,price,stock});
  console.log(name+price+stock);
  }
 
  function tokenCheck() {
    const jwt = localStorage.getItem("token");
    if (jwt) {
      auth.checkToken(jwt).then((res) => {
        if (res) {
          console.log(res);
          setCurrentUser(res);
          setToken(jwt);
          navigate("/");
        }
      });
    }
  }


  async function handleAddProductToCart(dataCart) {
    const cardId=dataCart._id;
    try {
      const res = await api.AddProductToCart(`carts/${cardId}/quantity`);//agrego un producto al carro
      const cartProducts= await api.getInitialProductsCart("carts");//obtengo los productos de mi carro actualizado
        setCartProducts(cartProducts.data);
    } catch (error) {
      alert("Error al agregar un producto al carrito:", error);
    }
  }


  async function handleSubtractFromCartQuantity(dataCart) {
 const cardId=dataCart._id;
    try {
      const res = await api.RemoveProductQuantity(`carts/${cardId}/quantity`);//elimino un producto al carro
      const cartProducts= await api.getInitialProductsCart("carts");//obtengo los productos de mi carro actualizado
        setCartProducts(cartProducts.data);
    } catch (error) {
      alert("Error al restar una cantidad del producto:", error);
    }
  }
  

  useEffect(() => {
    (async () => {
      try {
        await tokenCheck();
        const initialCardsData = await api.getInitialCards("cards");
        setCards(initialCardsData.data);
        
        const initialCartProducts= await api.getInitialProductsCart("carts");
        console.log(initialCartProducts);
        setCartProducts(initialCartProducts.data);
      } catch (error) {
        console.log("Error al obtener datos:", error);
      }
    })();
  }, [token]);
  
  return (
    <>
     <div className="page">
     <CurrentUserContext.Provider value={currentUser}>
     <Header/>
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
                  handleLogin={handleLogin}
                  productView={productView}
                  productoData={producto}
                  closeAllPopups={closeAllPopups}
                  handleAddProductToCart={handleAddProductToCart}
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
            
            </Routes>
     
     <Footer/>
     </CurrentUserContext.Provider>
    </div>
    </>
  )
}

export default App
