import React, {useState} from "react";

export default function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.handleLogin(password, email);
  }

  return (
    <div className="login">
      <form className="form" name="register" onSubmit={handleSubmit}>
        <h2 className="form__title form__title_theme_dark">Вход</h2>
        <fieldset className="form__set">
          <label className="form__field">
            <input className="form__input form__input_type_email form__input_theme_dark" value={email || ''} onChange={handleChangeEmail} type="email" id="email-input" name="email" placeholder="Email" required minLength="2" maxLength="40"/>
            <span className="form__input-error email-input-error"></span>
          </label>
          <label className="form__field">
            <input className="form__input form__input_type_password form__input_theme_dark" value={password || ''} onChange={handleChangePassword} type="password" id="password-input" name="password" placeholder="Пароль" required minLength="8" maxLength="20"/>
            <span className="form__input-error password-input-error"></span>
          </label>
          <button className="form__button form__button_theme_dark" type="submit" onSubmit={handleSubmit}>
            Войти
          </button>
        </fieldset>
      </form>
    </div> 
  )
}