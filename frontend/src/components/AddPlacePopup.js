import PopupWithForm from "./PopupWithForm";
import {useForm} from "../hooks/useForm";
import {useEffect} from "react";

function AddPlacePopup({isOpen, isLoading, onClose, onAddPlace}) {

  const {values, handleChange, setValues} = useForm({name: '', link: ''});
  const submitButtonText = isLoading ? 'Создание...' : 'Создать';

  useEffect(() => {
    setValues({
      name: '',
      link: '',
    });
  }, [isOpen, setValues]);

  function handleSubmit(e) {
    e.preventDefault();

    if (!isLoading) {
      onAddPlace({
        name: values.name,
        link: values.link,
      });
    }
  }

  return (
    <PopupWithForm name='card' title='Новое место' submitButtonText={submitButtonText}
                   isSubmitButtonEnabled={!isLoading} isOpen={isOpen}
                   onClose={onClose} onSubmit={handleSubmit}>
      <input className="form__input form__input_target_name" id="input-card-name" name="name"
             required
             type="text" minLength={2} maxLength={30} placeholder="Название"
             value={values.name} onChange={handleChange}/>
      <span className="form__input-error form__input-error_target_name input-card-name-error"/>

      <input className="form__input form__input_target_info" id="input-card-image-link"
             name="link"
             required type="url" placeholder="Ссылка на картинку"
             value={values.link} onChange={handleChange}/>
      <span className="form__input-error form__input-error_target_info input-card-image-link-error"/>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
