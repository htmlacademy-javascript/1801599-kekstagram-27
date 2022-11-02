import {renderComments} from './comments.js';
import {isEscapeKey} from './util.js';

const body = document.querySelector('body');
const commentsCountContainer = document.querySelector('.social__comment-count');

const fullPictureContainer = document.querySelector('.big-picture');
const fullPicture = fullPictureContainer.querySelector('img');
const fullPictureLikes = document.querySelector('.likes-count');
const fullPictureCommentsCount = document.querySelector('.comments-count');
const fullPictureDescription = document.querySelector('.social__caption');
const loadMoreComments = document.querySelector('.comments-loader');
const allCommentsList = document.querySelector('.social__comments');

function addPhoto (photo){
  fullPicture.src = photo.url;
  fullPictureLikes.textContent = photo.likes;
  fullPictureCommentsCount.textContent = photo.comments.length;
  fullPictureDescription.textContent = photo.description;

  renderComments(photo.comments);
}

function removePhoto() {
  fullPicture.innerHTML = ' ';
}

function closeModal() {
  fullPictureContainer.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onModalEscDown);
  loadMoreComments.classList.remove('hidden');
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
    body.classList.add('modal-open');

    const allComments = Array.from(allCommentsList.children);

    allComments.forEach((comment) => comment.classList.add('visually-hidden'));

    let n = 5;
    const displayedComments = allComments.slice(0, n);
    displayedComments.forEach((comment) => {comment.classList.remove('visually-hidden');});

    let hiddenComments = allCommentsList.querySelectorAll('.visually-hidden');
    let displayedCommentsCount = allComments.length - hiddenComments.length;
    commentsCountContainer.textContent = `${displayedCommentsCount } из ${fullPictureCommentsCount.textContent} комментариев`;
    if(hiddenComments.length === 0){loadMoreComments.classList.add('hidden');}

    loadMoreComments.addEventListener('click', () => {
      const displayedCommentsNumber = 5;
      const newDisplayedComments = allComments.slice(n, n + displayedCommentsNumber);
      newDisplayedComments.forEach((comment) => {comment.classList.remove('visually-hidden');});
      n += displayedCommentsNumber;
      hiddenComments = allCommentsList.querySelectorAll('.visually-hidden');
      displayedCommentsCount = allComments.length - hiddenComments.length;
      commentsCountContainer.textContent = `${displayedCommentsCount } из ${fullPictureCommentsCount.textContent} комментариев`;
      if(hiddenComments.length === 0){loadMoreComments.classList.add('hidden');}
    });

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
