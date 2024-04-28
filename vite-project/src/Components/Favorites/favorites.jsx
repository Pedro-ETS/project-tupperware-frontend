import React from 'react';

const Favorites = ({ favoriteProducts }) => {
  return (
    <div className="favorites">
      <h2 className="favorites__title">Mis Productos Favoritos</h2>
      <ul className="favorites__list">
        {favoriteProducts.map((item) => (
          <li key={item.productId} className="favorites__item">
            <div className="favorites__item-details">
              <h3 className="favorites__item-name">producto: {item.productName}</h3>
              <p className="favorites__item-description">Existencias: {item.stock}</p>
              <span className="favorites__item-price">mxn $: {item.price}</span>
              <div className="favorites__item-add-to-cart-container">
                <button className="favorites__item-add-to-cart">
                  Agregar al carrito
                </button>
              </div>
             
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favorites;