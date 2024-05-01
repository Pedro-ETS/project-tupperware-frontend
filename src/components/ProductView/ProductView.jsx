import React, { useEffect } from "react";
function ProductView({ productoData, closeAllPopups }) {
   // Función para manejar el evento de presionar la tecla "Esc"
   const handleEscKey = (event) => {
    if (event.key === "Escape") {
      closeAllPopups();
    }
  };

  // Agregar un event listener cuando el componente se monta
  useEffect(() => {
    document.addEventListener("keydown", handleEscKey);
    // Remover el event listener cuando el componente se desmonta
    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, []);
  return (
    <div className={`product-viwe ${productoData ? "product-viwe_opened" : ""}`}>
      <div className="product-viwe__content">
        <img src={productoData.link} className="product-viwe__image-normal" alt={`Una imagen muy hermosa del lugar${productoData.name}`}/>  
        <h2 className="product-viwe__name">{productoData.name}</h2>
        <p className="product-viwe__price">{"Precio: "+productoData.price}</p>
        <p className="product-viwe__stock">{"Existencia:"+productoData.stock}</p>
        <button className="product-viwe__btn-close" onClick={closeAllPopups}></button>
      </div>
    </div>
  );
}
export default ProductView;
