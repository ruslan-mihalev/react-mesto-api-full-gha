import {useContext} from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Card({card, onCardClick, onCardLike, onCardDelete}) {

  const currentUser = useContext(CurrentUserContext);
  const {name, link, likes, owner: {_id: ownerId}} = card;

  const currentUserId = currentUser?._id;
  const allLikesCount = likes.length;
  const hasLikes = allLikesCount > 0;
  const isLikedByCurrentUser = likes.some(like => like._id === currentUserId);
  const cardLikeButtonClassName = `card-grid__item-like-button ${isLikedByCurrentUser ? 'card-grid__item-like-button_active' : ''}`;
  const canDelete = ownerId === currentUserId;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleCardDelete() {
    onCardDelete(card);
  }

  return (
    <>
      <div className="card-grid__item-image-container">
        <img className="card-grid__item-image"
             src={link}
             alt={name}
             onClick={handleClick}/>
      </div>
      <div className="card-grid__item-caption-container">
        <h2 className="card-grid__item-caption">{name}</h2>
        <div className="card-grid__item-like-button-container">
          <button className={cardLikeButtonClassName} type="button" aria-label="Лайк" onClick={handleLikeClick}/>
          { hasLikes ? (<span className="card-grid__item-like-count card-grid__item-like-count_active">{allLikesCount}</span>) : null }
        </div>
      </div>
      {
        canDelete
          ? <button className="card-grid__item-delete-button card-grid__item-delete-button_active"
                    type="button"
                    aria-label="Удалить карточку" onClick={handleCardDelete}/>
          : null
      }
    </>
  );
}

export default Card;
