import { useState, useEffect } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from '../utils/api';
import * as auth from '../utils/auth';
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmationPopup from "./ConfirmationPopup";
import Register from "./Register";
import Login from "./Login";
import ProtectedRouter from "./ProtectedRouter";
import InfoTooltip from "./InfoTooltip";

function App() {

  const navigate = useNavigate();

  const [localEmail, setLocalEmail] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [cards, setCards] = useState([]);

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [isInfoTooltipPopupStyleSuccess, setIsInfoTooltipPopupStyleSuccess] = useState(false);
  const [infoTooltipPopupMessage, setInfoTooltipPopupMessage] = useState('');
  const [selectedCard, setSelectedCard] = useState(null);
  const [cardToDelete, setCardToDelete] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  // Credentials validation
  useEffect(() => {
    const email = localStorage.getItem('email');
    if (email) {
      api.getUser()
        .then((user) => {
          setCurrentUser(user);
          setLocalEmail(email);
          navigate('/', { replace: true })
        })
        .catch(err => {
          if (err)
            console.log(`Ошибка проверки cookie: ${err}`);
        })
    }
  }, []);

  useEffect(() => {
    if (localEmail) {
      // Avoiding /user/me request duplication
      if (!currentUser) {
        api.getUser()
          .then((user) => {
            setCurrentUser(user);
          })
          .catch(err => {
            console.log(err);
          })
      }

      api.getCards()
        .then((initialCards) => {
          setCards(initialCards);
        })
        .catch(err => {
          console.log(err);
        })
    }
  }, [localEmail]);

  function handleRegister(email, password) {
    auth.register(email, password)
      .then(body => {
        navigate("/sign-in", {replace: true});
        // Покажем попап с подздравлением
        setIsInfoTooltipPopupStyleSuccess(true);
        setInfoTooltipPopupMessage('Вы успешно \nзарегистрировались!');
        setIsInfoTooltipPopupOpen(true);
      })
      .catch(err => {
        console.log(`Ошибка регистрации: ${err}`);
        // Покажем попап с ошибкой
        setIsInfoTooltipPopupStyleSuccess(false);
        setInfoTooltipPopupMessage('Что-то пошло не так! \nПопробуйте ещё раз.');
        setIsInfoTooltipPopupOpen(true);
      });
  }

  function handleLogin(email, password) {
    auth.authorize(email, password)
      .then(body => {
        localStorage.setItem('email', body.email)
        setCurrentUser(null);
        setLocalEmail(body.email);
        navigate("/", {replace: true});
      })
      .catch(err => {
        console.log(`Ошибка авторизации: ${err}`);
        // Покажем попап с ошибкой
        setIsInfoTooltipPopupStyleSuccess(false);
        setInfoTooltipPopupMessage('Что-то пошло не так! \nПопробуйте ещё раз.');
        setIsInfoTooltipPopupOpen(true);
      });
  }

  function handleSignOut() {
    auth.signout()
      .then(body => {
        localStorage.removeItem('email');
        setCurrentUser(null)
        setLocalEmail('');
        navigate("/sign-in", {replace: true});
      })
      .catch(err => {
        console.log(`Ошибка log out: ${err}`);
      });
  }

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  }

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
    setSelectedCard(null);
    setCardToDelete(null);
  };

  function handleCardLike(card) {
    const isLiked = card.likes.some(like => like._id === currentUser?._id);
    api.like(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => console.log(err));
  }

  function handleCardDelete(card) {
    setCardToDelete(card)
  }

  function handleConfirmCardDelete(card) {
    setIsLoading(true);
    api.deleteCard(card._id)
      .then(_ => {
        setCards((state) => state.filter((c) => c._id !== card._id));
        setCardToDelete(null);
      })
      .catch(err => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateUser(user) {
    setIsLoading(true);
    api.setUser(user)
      .then(newUser => {
        setCurrentUser(newUser);
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateAvatar(avatar) {
    setIsLoading(true);
    api.setAvatar(avatar)
      .then(newUser => {
        setCurrentUser(newUser);
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleAddPlaceSubmit(place) {
    setIsLoading(true);
    api.addCard(place)
      .then(newCard => {
        setCards((state) => [newCard, ...state]);
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header email={localEmail} onSignOut={handleSignOut}/>
        <Routes>
          <Route path="/" element={
            <>
              <ProtectedRouter element={Main}
                               isLoggedIn={!!localEmail}
                               onEditAvatar={handleEditAvatarClick}
                               onEditProfile={handleEditProfileClick}
                               onAddPlace={handleAddPlaceClick}
                               cards={cards}
                               onCardClick={handleCardClick}
                               onCardLike={handleCardLike}
                               onCardDelete={handleCardDelete}/>
              <Footer/>
            </>
          }/>
          <Route path="/sign-up" element={
            <Register onRegister={handleRegister}/>
          }/>
          <Route path="/sign-in" element={
            <Login onLogin={handleLogin} />
          }/>
          <Route path="*" element={!!localEmail ? <Navigate to="/" replace/> : <Navigate to="/sign-in" replace/>}/>
        </Routes>

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          isLoading={isLoading}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          isLoading={isLoading}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          isLoading={isLoading}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />

        <ConfirmationPopup
          card={cardToDelete}
          isLoading={isLoading}
          onClose={closeAllPopups}
          onConfirmCardDelete={handleConfirmCardDelete}
        />

        <InfoTooltip
          isOpen={isInfoTooltipPopupOpen}
          isOk={isInfoTooltipPopupStyleSuccess}
          message={infoTooltipPopupMessage}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
