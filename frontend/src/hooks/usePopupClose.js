import {useEffect} from "react";

export default function usePopupClose(isOpen, closePopup) {

  useEffect(() => {
    // Если попап закрыт, останавливаем действие эффекта
    if (!isOpen) return;

    const handleOverlay = (event) => {
      // Если среди классов элемента есть 'popup_active' - значит это оверлей
      if (event.target.classList.contains("popup_active")) {
        closePopup();
      }
    };

    const handleEscape = (e) => {
      if (e.key === "Escape") {
        closePopup();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", handleOverlay);

    return() => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleOverlay);
    };

    // Обязательно следим за isOpen - чтобы срабатывало при открытии - а не всегда
  }, [isOpen, closePopup])
};
