export default function PopupWithForm (props) {
  return (
    <div className={`popup ${props.openedPopupClassName}`}>
      <div className="popup__container popup__container_type_form">
        <button className="popup__close-button" type="button" aria-label="Закрыть" onClick={props.onClose}></button>
        <form className={`form form_type_${props.name}`} name={`form_${props.name}`} onSubmit={props.onSubmit}>
          <h2 className="form__title">{props.title}</h2>
          <fieldset className="form__set">
            {props.children}
            <button className="form__button" type="submit">{props.submitButtonName}</button>
          </fieldset>
        </form>
      </div>
    </div>
  )
}