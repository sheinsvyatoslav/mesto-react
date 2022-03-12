import React from 'react';
import PopupWithForm from './PopupWithForm'
export default function DeleteCardPopup(props) {

  function handleSubmit(e) {
    e.preventDefault();
    props.onDeleteCard();
  } 

  return (
    <PopupWithForm 
      name="delete" 
      title="Вы уверены?" 
      submitButtonName="Да" 
      openedPopupClassName={props.isOpen ? "popup_opened" : ''} 
      onClose={props.onClose} 
      onSubmit={handleSubmit} 
    />
  )
}