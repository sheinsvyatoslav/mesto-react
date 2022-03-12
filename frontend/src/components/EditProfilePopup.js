import React, { useState, useEffect, useContext } from 'react';
import PopupWithForm from './PopupWithForm'
import {CurrentUserContext} from '../contexts/CurrentUserContext'

export default function EditProfilePopup (props) { 
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const currentUser = useContext(CurrentUserContext);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({name, about: description});
  }

  useEffect(() => {
    if(props.isOpen) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [currentUser, props.isOpen]);

  return (
    <PopupWithForm name="edit" title="Редактировать профиль" submitButtonName="Сохранить" openedPopupClassName={props.isOpen ? "popup_opened" : ''} onClose={props.onClose} onSubmit={handleSubmit}>
      <label className="form__field">
        <input className="form__input form__input_type_name" value={name || ''} onChange={handleChangeName} type="text" id="name-input" name="name" placeholder="Введите имя" required minLength="2" maxLength="40"/>
        <span className="form__input-error name-input-error"></span>
      </label>
      <label className="form__field">
        <input className="form__input form__input_type_about" value={description || ''} onChange={handleChangeDescription} type="text" id="about-input" name="about" placeholder="Расскажите о себе" required minLength="2" maxLength="200"/>
        <span className="form__input-error about-input-error"></span>
      </label>
    </PopupWithForm>
  )
}