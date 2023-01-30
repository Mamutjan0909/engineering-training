console.log('Engineer Training!');

const modalButton = document.getElementById('modalButton');
const modalContainer = document.getElementById('modalContainer');
const closeModalButton = document.getElementsByClassName('close-modal-button');
console.log('modalButton', modalButton);
modalButton.addEventListener('click', whenClicked);
closeModalButton[0].addEventListener('click', whenClicked);
function whenClicked() {
  console.log('Clicked!');
  modalContainer.classList.toggle('hidden');
  console.log('closeModalButton', closeModalButton);
}
