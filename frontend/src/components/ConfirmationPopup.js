import PopupWithForm from './PopupWithForm';

function ConfirmationPopup({card, isLoading, onClose, onConfirmCardDelete}) {

  const submitButtonText = isLoading ? 'Удаление...' : 'Да';

  function handleSubmit(e) {
    e.preventDefault();
    if (!isLoading) {
      onConfirmCardDelete(card);
    }
  }

  return (
    <PopupWithForm name='avatar' title='Вы уверены?' submitButtonText={submitButtonText}
                   isSubmitButtonEnabled={!isLoading} isOpen={!!card}
                   onClose={onClose} onSubmit={handleSubmit}/>
  );
}

export default ConfirmationPopup;
