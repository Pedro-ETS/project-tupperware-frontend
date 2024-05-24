import React, { useEffect,useState } from "react";
function ProductView({ productoData, closeAllPopups }) {
  const [mainImage, setMainImage] = useState(productoData.link);
  const defaultImage = "https://logodix.com/logo/598782.jpg";

   const handleEscKey = (event) => {
    if (event.key === "Escape") {
      closeAllPopups();
    }
  };
  const handleImageClick = (image) => {
    setMainImage(image);
  };

  const getAltText = (image) => {
    return !image  ? `imagen por default no hay una segunda foto de producto` : `Una imagen de un producto llamado ${productoData.name}`;
  };

  useEffect(() => {
    document.addEventListener("keydown", handleEscKey);
    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, []);
  return (
    <div className={`product-viwe ${productoData ? "product-viwe_opened" : ""}`}>
      <div className="product-viwe__content">
      <img
          src={mainImage}
          className="product-viwe__image-normal"
          alt={getAltText(mainImage)}
        />  
        <div> 
        <img
            src={productoData.link}
            className="product-view__thumbnail"
            onClick={() => handleImageClick(productoData.link)}
            alt={`Imagen pequeña  ${productoData.name}`}
          />
          <img
            src={productoData.image2|| defaultImage }
            className="product-view__thumbnail"
            onClick={() => handleImageClick(productoData.image2)}
            alt={`Imagen pequeña ${productoData.image2 ? "" : "(sin foto)"}`}
          />
        </div>
        <h2 className="product-viwe__name">{productoData.name}</h2>
        <p className="product-viwe__price">{"Precio mxn$: "+productoData.price}</p>
        <p className="product-viwe__stock">{"Existencias: "+productoData.stock}</p>
        <button className="product-viwe__btn-close" onClick={closeAllPopups}></button>
      </div>
    </div>
  );
}
export default ProductView;
