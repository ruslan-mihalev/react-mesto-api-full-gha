import usePopupClose from "../hooks/usePopupClose";

function PopupWithForm({title, name, submitButtonText, isSubmitButtonEnabled, isOpen, onClose, children, onSubmit}) {

  usePopupClose(isOpen, onClose);

  return (
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_active' : ''}`} role="dialog" aria-modal="true">
      <div className="popup__container">
        <button className="popup__close-button" type="button" aria-label="Закрыть окно" onClick={onClose}/>

        <form className="popup__form" name={`${name}_popup__form`} onSubmit={onSubmit}>
          <h2 className="popup__title">{title}</h2>
          {children}
          <button className="form__button form__button_theme_light" type="submit"
                  disabled={!isSubmitButtonEnabled}>{submitButtonText}</button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
