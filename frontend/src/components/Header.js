import React, {useState} from 'react';
import headerLogo from '../images/header/logo.svg'
import unwrapIcon from '../images/header/wrap-logo.svg'
import closeIcon from '../images/popup/close_button_icon.svg'
import { Link, Route } from 'react-router-dom';
import { useLocation } from "react-router";
import { useMediaQuery } from 'react-responsive'
import NavBar from './NavBar'

export default function Header(props) {
  const isBigScreen = useMediaQuery({ query: '(min-width: 768px)' })
  const location = useLocation();
  const [navBarOpen, setNavBarOpen] = useState(false);

  function handleNavBarOpen() {
    setNavBarOpen(!navBarOpen)
  }

  function handleNavBarClose() {
    setNavBarOpen(false)
    props.signOut();
  }

  function renderNavBar() {     
    return (
    <>
      {location.pathname === '/' && isBigScreen && <NavBar handleNavBarClose={handleNavBarClose} userEmail={props.userEmail}/>}
      <Route path="/signup">
        <Link className="header__link" to="/signin">Войти</Link>
      </Route>
      <Route path="/signin">
        <Link className="header__link" to="/signup">Регистрация</Link>
      </Route>
    </>
    )
  }

  return ( 
    <>
      {!isBigScreen && navBarOpen && <NavBar handleNavBarClose={handleNavBarClose} userEmail={props.userEmail}/>}
      <header className="header">
        <img className="header__image" src={headerLogo}  alt="Логотип проекта"/>
        {!isBigScreen && location.pathname === '/' && <button 
          onClick={handleNavBarOpen} 
          className="header__wrap-button" 
          type="button" 
          style={{  
          backgroundImage: `url(${navBarOpen ? closeIcon : unwrapIcon})`
          }}
        />}
        {renderNavBar()}
      </header>
    </>
  )
}