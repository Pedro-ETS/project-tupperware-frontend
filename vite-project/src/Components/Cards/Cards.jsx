import React from 'react';
import Card from '../Card/Card';
function Cards({
  cards,
  productView,
  handleAddProductToCart,
  cartProducts,
  handleAddProductToFavorites,
  productsFavorities
}) {
    return (
        <div className="cards">
          {cards.map((card) => (
            <Card
            key={card._id}
            card={card}
            productView={productView}
            handleAddProductToCart={handleAddProductToCart}
            cartProducts={cartProducts}
            handleAddProductToFavorites={handleAddProductToFavorites}
            productsFavorities={productsFavorities}
            />
          ))}
        </div>
    );
}

export default Cards;