function Card({
  card,
  productView,
  handleAddProductToCart,
  cartProducts,
  handleAddProductToFavorites,
  favoriteProducts,
}) {
  const { _id, name, price, stock, link, image2 } = card;
  const isProductInCart = cartProducts.some(
    (product) => product.productId === _id
  );
  const isLiked = favoriteProducts.some(
    (product) => product.productId === _id
  );
  const cardLikeButtonClassName = `card__btn-love ${
    isLiked ? "card__btn-love_activate" : ""
  }`;
  const cardCartButtonClassName = `card__add-to-cart ${
    isProductInCart ? "card__add-to-cart_activate" : ""
  }`;

  function handleImgCard() {
    productView({ link, image2, name, price, stock });
  }
  function handleCartProductsClick(productId, link, productName, price, stock) {
    handleAddProductToCart({ productId, link, productName, price, stock });
  }
  function handleAddFavorites(productId, link, productName, price, stock) {
    handleAddProductToFavorites({ productId, link, productName, price, stock });
  }

  return (
    <div key={_id} className="card">
      <img
        src={link}
        className="card__image"
        alt={`Imagen de un producto llamado ${name}`}
        onClick={handleImgCard}
      />
      <h2 className="card__subtitle"> {name} </h2>
      <p className="card__price">{"mxn $:" + price}</p>
      <p className="card__price">{"Existencias:" + stock}</p>
      <div className="card__contet">
        <button
          className={cardLikeButtonClassName}
          onClick={() => handleAddFavorites(_id, link, name, price, stock)}
        ></button>

        <button
          className={cardCartButtonClassName}
          onClick={() => handleCartProductsClick(_id, link, name, price, stock)}
        ></button>
      </div>
    </div>
  );
}
export default Card;
