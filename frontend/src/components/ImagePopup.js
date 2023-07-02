import usePopupClose from "../hooks/usePopupClose";

function ImagePopup({card, onClose}) {

  const isOpen = !!card;

  usePopupClose(isOpen, onClose);

  return (
    <div className={`popup popup_type_image ${isOpen ? 'popup_active' : ''}`} role="dialog" aria-modal="true">
      <figure className="popup__container">
        <button className="popup__close-button" type="button" aria-label="Закрыть окно" onClick={onClose}/>
        <img className="popup__image" src={card?.link} alt={card?.name}/>
        <figcaption className="popup__image-caption">{card?.name}</figcaption>
      </figure>
    </div>
  );
}

export default ImagePopup;
