import React , { useEffect, useState } from 'react';
import Profile from '../Profile/Profile';
import Cards from '../Cards/Cards';
import ProductView from "../ProductView/ProductView";
import Preloader from '../Preloader/Preloader';
import CurrentUserContext from '../../contexts/CurrentUserContext';

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
    cleanUserInformation,
    token
}) {
    const currentUser = React.useContext(CurrentUserContext);
    const objDataUser = currentUser || {};
     const [loading, setLoading] = useState(true);

     useEffect(() => {
         // Si hay datos de productos o de perfil del usuario, establece loading en falso
         if (cards.length > 0 || Object.keys(objDataUser).length > 0) {
             setLoading(false);
         }

     }, [cards,currentUser]);

    return (
        <div>
            {loading && <Preloader/>}
             {!loading && (
                <Profile
                    handleLogin={handleLogin}
                    cleanUserInformation={cleanUserInformation}
                    token={token}
                />
            )}

{!loading && (
                <Cards
                    cards={cards}
                    productView={productView}
                    handleAddProductToCart={handleAddProductToCart}
                    cartProducts={cartProducts}
                    handleAddProductToFavorites={handleAddProductToFavorites}
                    favoriteProducts={favoriteProducts}
                />
            )}

            {/* Muestra la vista del producto solo cuando no hay carga */}
            {!loading && productoData !== null && (
                <ProductView
                    productoData={productoData}
                    closeAllPopups={closeAllPopups}
                />
            )}

           
        </div>
    );
}

export default Main;