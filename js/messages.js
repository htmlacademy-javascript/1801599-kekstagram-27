import {isEscapeKey} from './util.js';

const ALERT_SHOW_TIME = 5000;

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '25%';
  alertContainer.style.bottom = '100px';
  alertContainer.style.right = '25%';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.lineHeight = '40px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'grey';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

// const close = () => {
//   document.body.remove(currentOpenMessage);
//   document.removeEventListener('keydown', onUploadFormlEscDown);
// };

const showMessage = (message, button) => {
  document.body.append(message);

  const close = () => {
    message.remove();
    window.removeEventListener('keydown', onMessagelEscDown);
  };

  button.addEventListener('click', () => {
    close();
  });

  message.addEventListener('click', (evt) => {
    if(evt.target === message){
      close();
    }
  });

  function onMessagelEscDown(evt) {
    if(isEscapeKey(evt)) {
      evt.preventDefault();
      close();
    }
  }
  window.addEventListener('keydown', onMessagelEscDown);
};

const showSuccessMessage = () => {
  const message = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
  const button = message.querySelector('.success__button');

  showMessage(message, button);
};

const showUploadErrorMessage = () => {
  const message = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
  const button = message.querySelector('.error__button');

  showMessage(message, button);
};

export {showAlert, showSuccessMessage, showUploadErrorMessage};
