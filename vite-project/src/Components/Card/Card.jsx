import { useState } from "react";
import { FaShoppingCart } from 'react-icons/fa';
function Card({
  card,
  productView,
  handleAddProductToCart     
}) {
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const { _id, name, price,stock, link } = card;
   
const isLiked =  false; 
const isLikedCart =  true; 

  const cardLikeButtonClassName = `card__btn-love ${isLiked ? "card__btn-love_activate" : ""}`;
  const cardCartButtonClassName = `card__add-to-cart ${isLikedCart ? "card__add-to-cart_activate" : ""}`;
  function handleLikeClick() {
    onCardLike(card);
  }
  function handleImgCard() {
    productView({ link, name ,price, stock});    
  } 
  function handleCartProductsClick(_id){
    handleAddProductToCart ({_id}) ;
    setIsAddedToCart(true);
  }
  return (
<div key={_id} className="card">
      <img src={link} className="card__image" alt={`Imagen de un hermoso paisaje llamado ${name}`} onClick={handleImgCard}/>
      <h2 className="card__subtitle"> {name} </h2>
     <p className="card__price">{"$:"+price}</p>
     <p className="card__price">{"Existencias:"+stock}</p>
      <div className="card__contet">
        <button className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
        {isAddedToCart ? (
          <button className="card__cart-button"></button>
        ) : (
          <button className={cardCartButtonClassName } onClick={() => handleCartProductsClick(_id)}>
            
          </button>
        )}
      </div>
    </div>  
);
}
export default Card;
