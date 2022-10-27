// import {createdPhotos} from './thumbnails.js';
import {updateComments} from './comments.js';
import {isEscapeKey} from './util.js';

const body = document.querySelector('body');
const commentsCountContainer = document.querySelector('.social__comment-count');
const newCommentLoader = document.querySelector('.comments-loader');

const fullPictureContainer = document.querySelector('.big-picture');
const fullPicture = fullPictureContainer.querySelector('img');
const fullPictureLikes = document.querySelector('.likes-count');
const fullPictureCommentsCount = document.querySelector('.comments-count');
const fullPictureDescription = document.querySelector('.social__caption');

function addPhoto (photo){
  fullPicture.src = photo.url;
  fullPictureLikes.textContent = photo.likes;
  fullPictureCommentsCount.textContent = photo.comments.length;
  fullPictureDescription.textContent = photo.description;

  updateComments(photo.comments);
}

function removePhoto() {
  fullPicture.innerHTML = ' ';
}

function closeModal() {
  fullPictureContainer.classList.add('hidden');
  commentsCountContainer.classList.remove('hidden');
  newCommentLoader.classList.remove('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onModalEscDown);
  removePhoto();
}

function onModalEscDown (evt){
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModal();
  }
}

const closeFullPictureButton = document.querySelector('.big-picture__cancel');
closeFullPictureButton.addEventListener('click', closeModal);

const addThumbnailClickHandler = function (thumbNail, photo) {
  thumbNail.addEventListener('click', () => {
    addPhoto(photo);

    fullPictureContainer.classList.remove('hidden');
    commentsCountContainer.classList.add('hidden');
    newCommentLoader.classList.add('hidden');
    body.classList.add('modal-open');


    document.addEventListener('keydown', onModalEscDown);
  });
};

function addThunbnailsEventListeners(createdPhotos){
  const thumbNails = document.querySelectorAll('.picture');
  for (let i = 0; i < thumbNails.length; i++) {

    addThumbnailClickHandler(thumbNails[i], createdPhotos[i]);
  }
}

export {addThunbnailsEventListeners};
