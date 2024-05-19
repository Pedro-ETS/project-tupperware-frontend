import React from 'react';

const Favorites = ({ favoriteProducts, handleAddProductToCart,handleRemoveProductToFavorites }) => {

  function handleCartProductsClick(productId, link, productName, price, stock) {
    handleAddProductToCart({ productId, link, productName, price, stock });
  }
  function handleProductsFavorites(productId){
    handleRemoveProductToFavorites(productId);
  }
 
  return (
    <div className="favorites">
      <h2 className="favorites__title">Mis Productos Favoritos</h2>
      <ul className="favorites__list">
        {favoriteProducts.map((item) => (
          <li key={item.productId} className="favorites__item">
            <div className="favorites__item-details">
              <img src={item.imageUrl} alt={item.productName} className="favorites__item-image" />
              <h3 className="favorites__item-name">producto: {item.productName}</h3>
              <p className="favorites__item-description">Existencias: {item.stock}</p>
              <span className="favorites__item-price">mxn $: {item.price}</span>
              <div className="favorites__item-add-to-cart-container">
                <button className="favorites__item-add-to-cart"   onClick={() => handleCartProductsClick(item.productId,item.imageUrl,item.productName,item.price, item.stock)}>
                  Agregar al carrito
                </button>
                <button className="favorites__item-delete-favorites"
                onClick={()=>handleProductsFavorites(item.productId)}
                >
                  Eliminar de favoritos
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