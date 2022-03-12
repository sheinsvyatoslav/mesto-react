import React, { useContext } from "react"
import {CurrentUserContext} from '../contexts/CurrentUserContext'
export default function Card(props) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some(like => like._id === currentUser._id); 

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card)
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card)
  }

  return (
    <article className="card">
      <img className="card__image" src={props.card.link} alt={props.card.name} onClick={handleClick}/>
      <button className={isOwn ? 'card__delete-button' : 'card__delete-button_hidden'} type="button" aria-label="Удалить" onClick={handleDeleteClick}></button>
      <div className="card__caption">
        <h2 className="card__name">{props.card.name}</h2>
        <div className="card__like">
          <button className={`card__like-button ${isLiked ? 'card__like-button_active' : ''}`} onClick={handleLikeClick} type="button" aria-label="Мне нравится"></button>
          <p className="card__like-number">{props.card.likes.length}</p>
        </div>
      </div>
    </article>
  )
}