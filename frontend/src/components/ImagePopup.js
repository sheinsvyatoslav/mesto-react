export default function ImagePopup(props) {
  return (
    <div className={`popup popup_type_image ${props.card.link ? "popup_opened" : ''}`}>
      <div className="popup__container popup__container_type_image">
        <button className="popup__close-button" type="button" aria-label="Закрыть" onClick={props.onClose}></button>
        <img className="popup__picture" src={props.card.link} alt={props.card.name}/>
        <p className="popup__name">{props.card.name}</p>
      </div>
    </div>
  )
}