import React from 'react';
import Card from "../Card/Card";
function Cards({
  cards,
  productView,
  handleAddProductToCart
}) {
    return (
        <div className="cards">
          {cards.map((card) => (
            <Card
            key={card._id}
            card={card}
            productView={productView}
            handleAddProductToCart={handleAddProductToCart}
            />
          ))}
        </div>
    );
}

export default Cards;