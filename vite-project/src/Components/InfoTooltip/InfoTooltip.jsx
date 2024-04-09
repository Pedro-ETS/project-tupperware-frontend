import React from "react";
function InfoTooltip({ mensaje, image, handleCloseTooltip }) {
  return (
    <div className="infoTooltip">
      <div className="infoTooltip__window">
        <button
          type="button"
          className="infoTooltip__btn-closet"
          onClick={handleCloseTooltip}
        ></button>
        <img
          src={image}
          className="infoTooltip__img"
          alt="Una imagen de alerta"
        />
        <h1 className="infoTooltip__titulo">{mensaje}</h1>
      </div>
    </div>
  );
}

export default InfoTooltip;
