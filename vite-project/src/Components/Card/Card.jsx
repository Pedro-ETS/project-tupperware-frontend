import { FaShoppingCart } from 'react-icons/fa';
function Card({
  card,
  productView,
  handleAddProductToCart     
}) {

  const { _id, name, price,stock, link } = card;
   
const isOwn = true;
const isLiked =  true; 

  const cardDeleteButtonClassName = `card__btn-trash ${isOwn ? "card__btn-trash_visible" : "card__btn-trash_hidden"}`;
  const cardLikeButtonClassName = `card__btn-love ${isLiked ? "card__btn-love_activate" : ""}`;

  function handleLikeClick() {
    onCardLike(card);
  }
  function handleDeleteClick() {
    ontrashCard();
    handleCardData(card);
  }
  function handleImgCard() {
    productView({ link, name ,price, stock});    
  } 
  function handleCartProductsClick(){
    handleAddProductToCart ({_id, quantity: 1}) ;
  }
  return (
<div key={_id} className="card">
      <img src={link} className="card__image" alt={`Imagen de un hermoso paisaje llamado ${name}`} onClick={handleImgCard}/>
      <h2 className="card__subtitle"> {name} </h2>
     <p className="card__price">{"$:"+price}</p>
     <p className="card__price">{"Existencias:"+stock}</p>
      <div className="card__contet">
        <button className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
        <button className="card__add-to-cart-button" onClick={handleCartProductsClick}>
      <FaShoppingCart />
    </button>
      </div>
    </div>  
);
}
export default Card;
