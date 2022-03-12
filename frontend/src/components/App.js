import React, { useState, useEffect } from 'react';
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'
import ImagePopup from './ImagePopup'
import DeleteCardPopup from './DeleteCardPopup'
import {CurrentUserContext} from '../contexts/CurrentUserContext'
import {CardsContext} from '../contexts/CardsContext'
import api from "../utils/api"
import { Route, Switch, useHistory } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import * as auth from '../utils/auth.js';

export default function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false)
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState({name: '', link: ''})
  const [currentUser, setCurrentUser] = useState({})
  const [cards, setCards] = useState([])
  const [deletedCard, setDeletedCard] = useState({})
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('jwt') ? true : false)
  const [userEmail, setUserEmail] = useState('')
  const [tooltipStatus, setTooltipStatus] = useState(false);
  const history = useHistory();

  //добавление первоначальных карточек и инфо о пользователе
  useEffect(() => {
    Promise.all([
      api.getUserInfo(),
      api.getInitialCards(),
    ])
    .then(([userData, cards]) => {
      setCurrentUser(userData)
      setCards(cards)
    })
    .catch(err => console.log(err))
  }, [])


  //открытие попапов
  function handleEditProfileClick () {
    setIsEditProfilePopupOpen(true)
  }


  function handleAddPlaceClick () {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick () {
    setIsEditAvatarPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleDeleteCardClick(card) {
    setIsDeleteCardPopupOpen(true);
    setDeletedCard(card)
  }

  //закрытие попапов
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setIsInfoToolTipOpen(false);
    setSelectedCard({name: '', link: ''});
  }

  //закрытие попапов на ESC и оверлей
  useEffect(() => {
    function handleEscClose(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    function handleOverlayClose(evt) {
      if (evt.target.classList.contains('popup_opened')) {
        closeAllPopups();
      }
    }

    document.addEventListener('click', handleOverlayClose);
    document.addEventListener('keydown', handleEscClose);
    
    return () => {
      document.removeEventListener('keydown', handleEscClose);
      document.removeEventListener('click', handleOverlayClose);
    } 
  }, [])

  //добавление карточки
  function handleAddPlaceSubmit(data) {
    api.addCard({name: data.place, link: data.image})
    .then(newCard => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
    .catch(err => console.log(err))
  }

  //обновление инфо о пользователе
  function handleUpdateUser({name, about}) {
    api.setUserInfo({name, about})
    .then(userData => {
      setCurrentUser(userData)
      console.log(userData)
      closeAllPopups();
    })
    .catch(err => console.log(err))
  } 

  //обновление аватара
  function handleUpdateAvatar(avatar) {
    api.setAvatar(avatar)
    .then(data => {
      setCurrentUser(data)
      closeAllPopups();
    })
    .catch(err => console.log(err))
  }

  //ставим/убираем лайки
  function handleCardLike(card) {
    const isLiked = card.likes.some(like => like._id === currentUser._id);
 
    api.toggleLike(card._id, isLiked)
    .then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch(err => console.log(err))
}

  //удаление карточки
  function handleCardDelete() {
    api.deleteCard(deletedCard._id)
    .then(() => {
      setCards((state) => state.filter((c) => c._id !== deletedCard._id))
      closeAllPopups();
    })
    .catch(err => console.log(err))
  }

  function handleRegister(password, email) {
    auth.register(password, email)
    .then(() => {
      setTooltipStatus(true)
      handleLogin(password, email)
    })
    .catch(err => {
      setTooltipStatus(false)
      console.log(err)
    })
    .finally(() => {
      setIsInfoToolTipOpen(true);
    })
  }

  function handleLogin(password, email) {
    auth.authorize(password, email)
    .then((data) => {
      if (data.token){
        setLoggedIn(true)
        localStorage.setItem('jwt', data.token);
        setUserEmail(email)
        history.push('/');
      }  
    })
    .catch(err => console.log(err))
  }

  function handleTokenCheck() {
    if (localStorage.getItem('jwt')){
      const token = localStorage.getItem('jwt');
      auth.checkToken(token)
      .then(res => {
        if(res) {
          setLoggedIn(true)
          setUserEmail(res.data.email)
          history.push('/');
        }
      })
    }
  }

  useEffect(() => {
    handleTokenCheck();
  }, [])

  function signOut(){
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    setUserEmail('')
    history.push('/signin');
  }

  return ( 
    <CurrentUserContext.Provider value={currentUser}>
      <CardsContext.Provider value={cards}>
        <Header userEmail={userEmail} signOut={signOut} />
        <Switch>
          <ProtectedRoute 
            exact path="/" 
            loggedIn={loggedIn} 
            component={Main} 
            onEditAvatar={handleEditAvatarClick} 
            onEditProfile={handleEditProfileClick} 
            onAddPlace={handleAddPlaceClick} 
            onCardClick={handleCardClick} 
            onCardLike={handleCardLike} 
            onCardDelete={handleDeleteCardClick} 
            cards={cards}
          />
          <Route path="/signup">
            <Register handleRegister={handleRegister}/>
          </Route>
          <Route path="/signin">
            <Login handleLogin={handleLogin} />
          </Route>
        </Switch>
        <Footer />
        <AddPlacePopup 
          isOpen={isAddPlacePopupOpen} 
          onClose={closeAllPopups} 
          onAddCard={handleAddPlaceSubmit}
        />
        <EditProfilePopup 
          isOpen={isEditProfilePopupOpen} 
          onClose={closeAllPopups} 
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>
        <DeleteCardPopup isOpen={isDeleteCardPopupOpen} onClose={closeAllPopups} onDeleteCard={handleCardDelete}/>
        <ImagePopup onClose={closeAllPopups} card={selectedCard}/>
        <InfoTooltip isOpen={isInfoToolTipOpen} onClose={closeAllPopups} tooltipStatus={tooltipStatus}/>
      </CardsContext.Provider>
    </CurrentUserContext.Provider>
  );
}
