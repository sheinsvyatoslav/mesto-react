import React, {useRef, useEffect} from 'react';
import PopupWithForm from './PopupWithForm'

export default function EditAvatarPopup(props) {
  const avatar = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({avatar: avatar.current.value});
  }
  
  useEffect(() => {
    if(props.isOpen) {
      avatar.current.value = ''
    }
  }, [props.isOpen])

  return (
    <PopupWithForm name="avatar" title="Обновить аватар" submitButtonName="Сохранить" openedPopupClassName={props.isOpen ? "popup_opened" : ''} onClose={props.onClose} onSubmit={handleSubmit}>
      <label className="form__field">
        <input className="form__input form__input_type_avatar" ref={avatar} type="url" id="avatar-input" name="avatar" placeholder="Ссылка на картинку" required/>
        <span className="form__input-error avatar-input-error"></span>
      </label>
    </PopupWithForm>
  )
}