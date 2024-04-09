import React from 'react';
import Profile from '../Profile/Profile';
import Cards from '../Cards/Cards';
import ProductView from "../ProductView/ProductView";
function Main({
    cards,
    handleLogin,
    productView,
    productoData,
    closeAllPopups,
    handleAddProductToCart
}) {
    return (
        <div>
            <Profile handleLogin={handleLogin}/>
            <Cards cards={cards} productView={productView} handleAddProductToCart={handleAddProductToCart}/>
            {productoData !== null ? (<ProductView productoData={productoData} closeAllPopups={closeAllPopups}/>) : null}
          
        </div>
    );
}

export default Main;