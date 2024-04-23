import React, { useEffect, useState } from "react";

const Cart = ({ cartProducts, handleAddProductToCart, handleSubtractFromCartQuantity }) => {
  const priceTag = "Precio total MXN$: ";
  const priceTotalCart = "Total de compra MXN$: ";

  const calculateTotalCart = (products) => {
    return products.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  };

  const [totalCart, setTotalCart] = useState(calculateTotalCart(cartProducts));

  useEffect(() => {
    setTotalCart(calculateTotalCart(cartProducts));
  }, [cartProducts]);

  const handleAddQuantity = (productId, productName, price, stock) => {
    handleAddProductToCart({ productId, productName, price, stock });
  };

  const handleRestQuantity = (productId) => {
    handleSubtractFromCartQuantity({ productId });
  };

  return (
    <div className="cart">
      <h2 className="cart__title">Carrito de Compras</h2>
      <div className="cart__items">
        {cartProducts.map((item) => (
          <div key={item.productId} className="cart__item">
            <span className="cart__item-name">{item.productName}</span>
            <span className="cart__item-stock">Existencias: {item.stock ? item.stock : "Agotado"}</span>
            <span className="cart__item-price">Precio MXN$: {item.price}</span>
            <span className="cart__item-total">{priceTag + item.price * item.quantity}</span>
            <div className="cart__item-quantity">
              <button onClick={() => handleRestQuantity(item.productId)} className="cart__item-action cart__item-action--remove">-</button>
              <span className="cart__item-quantity-value">{item.quantity}</span>
              <button onClick={() => handleAddQuantity(item.productId, item.productName, item.price, item.stock)} className="cart__item-action cart__item-action--add">+</button>
            </div>
          </div>
        ))}
      </div>
      <p className="cart__total">{priceTotalCart + totalCart}</p>
      <button className="cart__checkout">Seguir con la compra</button>
    </div>
  );
};

export default Cart;