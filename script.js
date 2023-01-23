console.log('Engineer Training!');

const modalButton = document.getElementById('modalButton');
const modalContainer = document.getElementById('modalContainer');
console.log('modalButton', modalButton);
modalButton.addEventListener('click', whenClicked);
function whenClicked() {
  console.log('Clicked!');
}

modalButton.addEventListener('click', () => {
  modalContainer.classList.toggle('hidden');
});
