import React, {useContext} from "react"
import Card from './Card'
import {CurrentUserContext} from '../contexts/CurrentUserContext'

export default function Main(props){
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
        <section className="profile">
          <div className="profile__header">
            <button className="profile__avatar-button" type="button" onClick={props.onEditAvatar} style={{ backgroundImage: `url(${currentUser.avatar})` }} aria-label="Аватар профиля"></button>
            <div className="profile__info">
              <div className="profile__title">
                <h1 className="profile__name">{currentUser.name}</h1>
                <button className="profile__edit-button" type="button" aria-label="Редактировать" onClick={props.onEditProfile}></button>
              </div>
              <p className="profile__about">{currentUser.about}</p>
            </div>
          </div>
          <button className="profile__add-button" type="button" aria-label="Добавить" onClick={props.onAddPlace}></button>
        </section>
        <section className="cards">
          {props.cards.map((card) => (
            <Card card={card} key={card._id} onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete} />
          ))}
        </section>
      </main>
  )
}