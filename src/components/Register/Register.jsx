import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
 import InfoTooltip from "../InfoTooltip/InfoTooltip";
import * as auth from "../../utils/auth";
import image from "../../images/sucesfull.svg";
import imageError from "../../images/error.svg";//error
function Register(props) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);
  const [showTooltipError, setShowTooltipError] = useState(false);//error
  const [nameErrorVisible, setNameErrorVisible] = useState(false);
  const [addressErrorVisible, setAddressErrorVisible] = useState(false);
  const [phoneErrorVisible, setPhoneErrorVisible] = useState(false);
  const [emailErrorVisible, setEmailErrorVisible] = useState(false);
  const [passwordErrorVisible, setPasswordErrorVisible] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const navigate = useNavigate();
  const mensaje = "¡Correcto!. Ya estas registrado";
  const mensajeError = "¡Lo siento!. No se completo el registro";

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "name") setName(value);
    if (name === "address") setAddress(value);
    if (name === "phone") setPhone(value);
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await auth.register(name, address, phone, email, password);
      console.log(data);
      if (data) {
        setName("");
        setAddress("");
        setPhone("");
        setEmail("");
        setPassword("");
        setShowTooltip(true);
        setTimeout(() => {
          setShowTooltip(false);
          navigate("/signin");
        }, 7000);
      }
    } catch (error) {
      console.log(error);
      setShowTooltipError(true);
    }
  };

  const handleCloseTooltip = () => {
    setShowTooltip(false);
    navigate("/signin");
  };

  const handleCloseTooltipError = () => {
    setShowTooltipError(false);
  };
  
  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailRegex.test(email);

    if (name.length > 0) {
      setNameErrorVisible(name.length<10);
    }
    if(address.length>0){
      setAddressErrorVisible(address.length<8);
    }
    if(phone.length>0){
      setPhoneErrorVisible(phone.length<10);
    }
    if (email.length > 0) {
      setEmailErrorVisible(!isEmailValid);
    }
    if(password.length>0){
      setPasswordErrorVisible(password.length<8);
    }
    setButtonDisabled(name.length>=10 &&  address.length>=8 && phone.length>=10 && isEmailValid && password.length>=8);
  }, [name,address,phone,email,password]);

  return (
    <div className="register">
      <form className="register-form" onSubmit={handleSubmit}>
        <h1 className="register-form__titulo">Registrate</h1>
        <input
          className="register-form__input"
          placeholder="Nombre Completo"
          required
          name="name"
          type="string"
          onChange={handleChange}
        />
         <span
            className={`register-form__input-error register-form-name-error ${
              nameErrorVisible ? "register-form__input-error_active" : ""
            }`}
          >
            10 caracteres minimo
          </span>
        <input
          className="register-form__input"
          placeholder="Direccion"
          required
          name="address"
          type="string"
          onChange={handleChange}
        />
        <span
            className={`register-form__input-error register-form-address-error ${
              addressErrorVisible ? "register-form__input-error_active" : ""
            }`}
          >
            8 caracteres minimo
          </span>
        <input
          className="register-form__input"
          placeholder="Telefono"
          required
          name="phone"
          type="string"
          onChange={handleChange}
        />
        <span
            className={`register-form__input-error register-form-phone-error ${
              phoneErrorVisible? "register-form__input-error_active" : ""
            }`}
          >
            10 digitos o mas
          </span>
        <input
          className="register-form__input"
          placeholder="Correo electronico"
          required
          name="email"
          type="email"
          value={email}
          onChange={handleChange}
        />
        <span
            className={`register-form__input-error register-form-email-error ${
              emailErrorVisible? "register-form__input-error_active" : ""
            }`}
          >
           correo invalido
          </span>
        <input
          className="register-form__input"
          placeholder="Contraseña"
          name="password"
          type="password"
          minLength={8}
          value={password}
          onChange={handleChange}
        />
        <span
            className={`register-form__input-error register-form-email-error ${
              passwordErrorVisible? "register-form__input-error_active" : ""
            }`}
          >
           8 caracteres minimo
          </span>

        <button  className={`register-form__btn-save ${
              buttonDisabled ? "" : "register-form__btn-save_disabled"
            }`}>Registrate</button>


        <Link className="register-form__link" to="/signin">
          ¿Ya eres miembro? Inicia sesion aqui
        </Link>
      </form>
      {showTooltip && (
        <InfoTooltip
          mensaje={mensaje}
          image={image}
          handleCloseTooltip={handleCloseTooltip}
        />
      )}
      {showTooltipError && (
        <InfoTooltip
          mensaje={mensajeError}
          image={imageError}
          handleCloseTooltip={handleCloseTooltipError}
        />
      )}
    </div>
  );
}

export default Register;
