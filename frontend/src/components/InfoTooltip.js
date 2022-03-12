import React from "react";
import successLogo from "../images/auth/success_logo.svg"
import failLogo from "../images/auth/failed_logo.svg"

export default function InfoTooltip(props) {
  return (
    <div className={`popup ${props.isOpen ? "popup_opened" : ''}`}>
      <div className="popup__container popup__container_type_form">
        <button className="popup__close-button" type="button" aria-label="Закрыть" onClick={props.onClose}></button>
        <img className="popup__auth-logo" src={props.tooltipStatus ? successLogo : failLogo}/>
        <p className="popup__auth-tip">{props.tooltipStatus ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}</p>
      </div>
    </div>
  )
}