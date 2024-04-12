import React, { useState, useEffect } from "react";

const Cart = ({cartProducts,
  onRemoveCart,
  handleAddProductToCart,
  handleSubtractFromCartQuantity
}) => {
  const priceTag="precio total:";

  function handleAddQuantity(_id) {
     handleAddProductToCart({_id});
  }
  function handleRestQuantity(_id){
    handleSubtractFromCartQuantity({_id});
  }
  return (
    <div className="cart">
      <h2 className="cart__title">Carrito de Compras</h2>
      <div className="cart__items">
        {cartProducts.products.map((item) => (
          <div key={item.product._id} className="cart__item">
            <span className="cart__item-name">{item.product.name}</span>
            <span className="cart__item-stock">Existencias:{item.product.stock ? item.product.stock : "Agotado"}</span>
            <span className="cart__item-price">precio: {item.product.price}</span>
            <span className="cart__item-total">{priceTag+item.product.price*item.quantity}</span>     
            <div className="cart__item-quantity">
            <button onClick={() => handleRestQuantity(item.product._id)} className="cart__item-action cart__item-action--remove">
                -
              </button>
              <span className="cart__item-quantity-value">{item.quantity}</span>
              <button onClick={() => handleAddQuantity(item.product._id)} className="cart__item-action cart__item-action--add">
                +
              </button>
            </div>
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default Cart;