import React, {useEffect, useRef} from 'react';
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({isOpen, isLoading, onClose, onUpdateAvatar}) {

  const inputAvatar = useRef();
  const submitButtonText = isLoading ? 'Сохранение...' : 'Сохранить';

  useEffect(() => {
    inputAvatar.current.value = '';
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!isLoading) {
      onUpdateAvatar(inputAvatar.current.value);
    }
  }

  return (
    <PopupWithForm name='avatar' title='Обновить аватар' submitButtonText={submitButtonText}
                   isSubmitButtonEnabled={!isLoading} isOpen={isOpen}
                   onClose={onClose} onSubmit={handleSubmit}>
      <input className="form__input form__input_target_avatar" id="input-profile-avatar-link"
             name="input-profile-avatar-link"
             required type="url" placeholder="Ссылка на картинку" ref={inputAvatar}/>
      <span className="form__input-error form__input-error_target_avatar input-profile-avatar-link-error"/>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
