import {renderThumbNails} from './thumbnails.js';
import {addThunbnailsEventListeners} from './gallery.js';
import {showAlert} from './messages.js';
import {onUploadForm} from './upload-form.js';
import {closeUploadForm} from './upload-form.js';
import {setUserFormSubmit} from './upload-form.js';

setUserFormSubmit(closeUploadForm);

fetch('https://27.javascript.pages.academy/kekstagram/data')
  .then((response) => {
    if (response.ok) {
      return response.json();
    }

    throw new Error(`${response.status} ${response.statusText}`);
  })
  .then((photos) => {
    renderThumbNails(photos);
    addThunbnailsEventListeners(photos);
  })
  .catch(() => {
    showAlert('Не удалось загрузить фотографии пользователей. Попробуйте ещё раз');
  });

onUploadForm();
