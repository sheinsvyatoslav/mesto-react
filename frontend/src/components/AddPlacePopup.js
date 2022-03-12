import React, { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm'

export default function AddPlacePopup(props) {
  const [place, setPlace] = useState('')
  const [image, setImage] = useState('')

  function handleChangePlace(e) {
    setPlace(e.target.value);
  }

  function handleChangeImage(e) {
    setImage(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddCard({place, image});
  }

  useEffect(() => {
    if(props.isOpen) {
      setPlace('');
      setImage('');
    }
  }, [props.isOpen])

  return (
    <PopupWithForm name="add" title="Новое место" submitButtonName="Создать" openedPopupClassName={props.isOpen ? "popup_opened" : ''} onClose={props.onClose} onSubmit={handleSubmit}>
      <label className="form__field">
        <input className="form__input form__input_type_place" value={place} onChange={handleChangePlace} type="text" id="place-input" name="place" placeholder="Название" required minLength="2" maxLength="30"/>
        <span className="form__input-error place-input-error"></span>
      </label>
      <label className="form__field">
        <input className="form__input form__input_type_image" value={image} onChange={handleChangeImage} type="url" id="image-input" name="image" placeholder="Ссылка на картинку" required/>
        <span className="form__input-error image-input-error"></span>
      </label>
    </PopupWithForm>
  )
}