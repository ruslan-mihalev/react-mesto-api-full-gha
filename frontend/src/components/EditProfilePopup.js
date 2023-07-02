import PopupWithForm from "./PopupWithForm";
import {useEffect, useContext} from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import {useForm} from "../hooks/useForm";

function EditProfilePopup({isOpen, isLoading, onClose, onUpdateUser}) {

  const {values, handleChange, setValues} = useForm({name: '', about: ''});
  const currentUser = useContext(CurrentUserContext);
  const submitButtonText = isLoading ? 'Сохранение...' : 'Сохранить';

  useEffect(() => {
    if (currentUser) {
      setValues({
        name: currentUser.name,
        about: currentUser.about,
      });
    }
  }, [currentUser, isOpen, setValues]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!isLoading) {
      onUpdateUser({
        name: values.name,
        about: values.about,
      });
    }
  }

  return (
    <PopupWithForm name='profile' title='Редактировать профиль' submitButtonText={submitButtonText}
                   isSubmitButtonEnabled={!isLoading} isOpen={isOpen}
                   onClose={onClose} onSubmit={handleSubmit}>
      <input className="form__input form__input_target_name" id="input-name" name="name" required
             type="text"
             minLength={2} maxLength={40} placeholder="Имя" value={values.name} onChange={handleChange}/>
      <span className="form__input-error form__input-error_target_name input-name-error"/>

      <input className="form__input form__input_target_info" id="input-aboutme" name="about" required
             type="text" minLength={2} maxLength={200} placeholder="О себе" value={values.about}
             onChange={handleChange}/>
      <span className="form__input-error form__input-error_target_info input-aboutme-error"/>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
