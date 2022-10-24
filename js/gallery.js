import {createdPhotos} from './thumbnails.js';
import {updateComments} from './comments.js';

const body = document.querySelector('body');
const commentsCountContainer = document.querySelector('.social__comment-count');
const newCommentLoader = document.querySelector('.comments-loader');

const thumbNails = document.querySelectorAll('.picture');

const fullPictureContainer = document.querySelector('.big-picture');
const fullPicture = fullPictureContainer.querySelector('img');
const fullPictureLikes = document.querySelector('.likes-count');
const fullPictureCommentsCount = document.querySelector('.comments-count');
const fullPictureDescription = document.querySelector('.social__caption');

const addThumbnailClickHandler = function (thumbNail, photo) {
  thumbNail.addEventListener('click', () => {
    fullPicture.src = photo.url;
    fullPictureLikes.textContent = photo.likes;
    fullPictureCommentsCount.textContent = photo.comments.length;
    fullPictureDescription.textContent = photo.description;

    updateComments(photo.comments);

    fullPictureContainer.classList.remove('hidden');
    commentsCountContainer.classList.add('hidden');
    newCommentLoader.classList.add('hidden');
    body.classList.add('modal-open');
  });
};

for (let i = 0; i < thumbNails.length; i++) {

  addThumbnailClickHandler(thumbNails[i], createdPhotos[i]);
}

const closeModal = () => {
  fullPictureContainer.classList.add('hidden');
  commentsCountContainer.classList.remove('hidden');
  newCommentLoader.classList.remove('hidden');
  body.classList.remove('modal-open');
};

const closeFullPictureButton = document.querySelector('.big-picture__cancel');
closeFullPictureButton.addEventListener('click', closeModal);

document.addEventListener('keydown', (evt) => {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    closeModal();
  }
});
