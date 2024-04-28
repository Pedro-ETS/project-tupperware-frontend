import React from 'react';
import Profile from '../Profile/Profile';
import Cards from '../Cards/Cards';
import ProductView from "../ProductView/ProductView";
function Main({
    cards,
    cartProducts,
    favoriteProducts,
    handleLogin,
    productView,
    productoData,
    closeAllPopups,
    handleAddProductToCart,
    clearCartStatus,
    clearCurrentUsert,
    handleAddProductToFavorites,
    clearFavorites
}) {
    return (
        <div>
            <Profile handleLogin={handleLogin} clearCartStatus={clearCartStatus} clearCurrentUsert={clearCurrentUsert} clearFavorites={clearFavorites}/>
            <Cards cards={cards} 
            productView={productView} 
            handleAddProductToCart={handleAddProductToCart}
            cartProducts={cartProducts} 
            handleAddProductToFavorites={handleAddProductToFavorites}
            favoriteProducts={favoriteProducts}
            />
            {productoData !== null ? (<ProductView productoData={productoData} closeAllPopups={closeAllPopups}/>) : null}
          
        </div>
    );
}

export default Main;