(async function () {
  console.log('Engineer Training!');
  let dataLoaded = false;
  const modalButton = document.getElementById('modalButton');
  const modalContainer = document.getElementById('modalContainer');
  const closeModalButton =
    document.getElementsByClassName('close-modal-button');
  const gridContainer = document.getElementsByClassName('grid-container');

  function initModalButton() {
    return new Promise((resolve) => {
      modalButton.addEventListener('click', function () {
        modalContainer.classList.toggle('hidden');
        console.log('Clicked Button!');
        if (dataLoaded === false) {
          utils.loadData(() => {
            resolve();
            dataLoaded = true;
          });
        }
      });
    });
  }

  const utils = {
    renderData: function (data) {
      return new Promise((resolve) => {
        let response = '';
        console.log('jiraObject: ', data);
        data.jirasObject.forEach((object) => {
          const { link, title, icon } = object;
          response += `<li class="item">
              <a href= ${link}> 
              <i class="${icon}"></i> 
              ${title} 
              </a>
            </li>`;
        });
        resolve(response);
      });
    },
    loadData: async function (callback) {
      const response = await fetch('/getJiraTickets');
      const data = await response.json();
      console.log('data', data);

      this.renderData(data).then((response) => {
        setTimeout(() => {
          dataLoaded = true;
          gridContainer[0].innerHTML = response;
          modalContainer.classList.toggle('hidden');
          console.log('data loaded');
          return response;
        }, 3000);
      });
      callback();
    },
  };

  closeModalButton[0].addEventListener('click', whenClicked);
  function whenClicked() {
    console.log('Clicked!');
    modalContainer.classList.toggle('hidden');
  }
  console.log('BEFORE initModalButton is called');
  await initModalButton();
  console.log('AFTER initModalButton is called');
})();
