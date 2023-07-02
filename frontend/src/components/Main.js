import {useContext} from 'react';
import Card from './Card';
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Main({onEditProfile, onAddPlace, onEditAvatar, cards, onCardClick, onCardLike, onCardDelete}) {

  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container">
          <img className="profile__avatar" alt="Ваш аватар" src={currentUser?.avatar}/>
          <button className="profile__avatar-edit-hint" type="button"
                  aria-label="Изменить аватар пользователя"
                  onClick={onEditAvatar}/>
        </div>
        <div className="profile__info">
          <div className="profile__person-name-container">
            <h1 className="profile__person-name">{currentUser?.name}</h1>
            <button className="profile__edit-button" type="button" aria-label="Изменить профиль"
                    onClick={onEditProfile}/>
          </div>
          <p className="profile__person-about">{currentUser?.about}</p>
        </div>
        <button className="profile__add-button" type="button" aria-label="Добавить карточку"
                onClick={onAddPlace}/>
      </section>

      <section className="card-grid" aria-label="Список мест для путешествий">
        <ul className="card-grid__container list">
          {cards.map((card) => (
            <li className="card-grid__item" key={card._id}>
              <Card card={card} userId={currentUser?._id} onCardClick={onCardClick} onCardLike={onCardLike}
                    onCardDelete={onCardDelete}/>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
