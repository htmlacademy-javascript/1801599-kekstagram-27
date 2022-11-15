import {getPhotos} from './data.js';
import {renderThumbNails} from './thumbnails.js';
import {addThunbnailsEventListeners} from './gallery.js';
import {showAlert} from './messages.js';
import {onUploadForm} from './upload-form.js';
import {closeUploadForm} from './upload-form.js';
import {setUserFormSubmit} from './upload-form.js';
import {showFilterContainer, getDiscussedPhotos,getRandomPhotos, setDefaultClick, setRandomClick, setDiscussedClick} from './gallery-filter.js';
import {debounce} from './util.js';

const RERENDER_DELAY = 1000;

setUserFormSubmit(closeUploadForm);

getPhotos((photos) => {
  renderThumbNails(photos);
  addThunbnailsEventListeners(photos);
  showFilterContainer();

  setDefaultClick(debounce(
    () => {
      renderThumbNails(photos);
      addThunbnailsEventListeners(photos);
    }, RERENDER_DELAY
  ));

  setDiscussedClick(debounce(
    () => {
      const discussedPhotos = getDiscussedPhotos(photos);
      renderThumbNails(discussedPhotos);
      addThunbnailsEventListeners(discussedPhotos);
    },
    RERENDER_DELAY,
  ));

  setRandomClick(debounce(
    () => {
      const randomPhotos = getRandomPhotos(photos);
      renderThumbNails(randomPhotos);
      addThunbnailsEventListeners(randomPhotos);
    }, RERENDER_DELAY
  ));

}, showAlert);

onUploadForm();

