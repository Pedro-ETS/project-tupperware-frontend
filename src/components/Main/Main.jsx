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
    handleAddProductToFavorites,
    cleanUserInformation
}) {
    return (
        <div>
            <Profile handleLogin={handleLogin} cleanUserInformation={cleanUserInformation}/>
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