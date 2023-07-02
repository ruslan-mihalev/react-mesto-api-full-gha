import usePopupClose from "../hooks/usePopupClose";

const InfoTooltip = ({isOpen, isOk, message, onClose}) => {

  const iconClass = isOk ? 'popup__icon_type_ok' : 'popup__icon_type_error';

  usePopupClose(isOpen, onClose);

  return (
    <div className={`popup popup_type_info-tooltip ${isOpen ? 'popup_active' : ''}`} role="dialog" aria-modal="true">
      <div className="popup__container">
        <button className="popup__close-button" type="button" aria-label="Закрыть окно" onClick={onClose}/>
        <div className="popup__info-container">
          <div className={`popup__icon ${iconClass}`}/>
          <p className="popup__text">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default InfoTooltip;
