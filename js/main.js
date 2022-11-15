import {getPhotos} from './data.js';
import {renderThumbNails} from './thumbnails.js';
import {addThunbnailsEventListeners} from './gallery.js';
import {showAlert} from './messages.js';
import {onUploadForm, closeUploadForm} from './upload-form.js';
import {setUserFormSubmit} from './form-validation.js';
import {showFilterContainer, getDiscussedPhotos,getRandomPhotos, setFilterButtonClick} from './gallery-filter.js';
import {debounce} from './util.js';


const defaultGalleryFilterButton = document.querySelector('#filter-default');
const discussedGalleryFilterButton = document.querySelector('#filter-discussed');
const randomGalleryFilterButton = document.querySelector('#filter-random');
const RERENDER_DELAY = 1000;

setUserFormSubmit(closeUploadForm);

getPhotos((photos) => {
  renderThumbNails(photos);
  addThunbnailsEventListeners(photos);
  showFilterContainer();

  setFilterButtonClick(defaultGalleryFilterButton, debounce(
    () => {
      renderThumbNails(photos);
      addThunbnailsEventListeners(photos);
    }, RERENDER_DELAY
  ));

  setFilterButtonClick(discussedGalleryFilterButton, debounce(
    () => {
      const discussedPhotos = getDiscussedPhotos(photos);
      renderThumbNails(discussedPhotos);
      addThunbnailsEventListeners(discussedPhotos);
    },
    RERENDER_DELAY,
  ));

  setFilterButtonClick(randomGalleryFilterButton, debounce(
    () => {
      const randomPhotos = getRandomPhotos(photos);
      renderThumbNails(randomPhotos);
      addThunbnailsEventListeners(randomPhotos);
    }, RERENDER_DELAY
  ));

}, showAlert);

onUploadForm();

