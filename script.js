console.log('Engineer Training!');

const modalButton = document.getElementById('modalButton');
const modalContainer = document.getElementById('modalContainer');
console.log('modalButton', modalButton);
modalButton.addEventListener('click', whenClicked);
function whenClicked() {
  console.log('Clicked!');
  modalContainer.classList.toggle('hidden');
  const closeModalButton =
    document.getElementsByClassName('close-modal-button');
  console.log('closeModalButton', closeModalButton);
}
