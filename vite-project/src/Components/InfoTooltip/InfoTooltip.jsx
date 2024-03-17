import React from "react";
function InfoTooltip({ mensaje, image, handleCloseTooltip }) {
  return (
    <div className="InfoTooltip">
      <div className="InfoTooltip__window">
        <button
          type="button"
          className="InfoTooltip__btn-closet"
          onClick={handleCloseTooltip}
        ></button>
        <img
          src={image}
          className="InfoTooltip__img"
          alt="Una imagen de alerta"
        />
        <h1 className="InfoTooltip__titulo">{mensaje}</h1>
      </div>
    </div>
  );
}

export default InfoTooltip;
