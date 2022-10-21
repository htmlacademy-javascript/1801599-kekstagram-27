// Заведите модуль, который будет отвечать за отрисовку окна с полноразмерным изображением.
// Для отображения окна нужно удалять класс hidden у элемента .big-picture и каждый раз заполнять его данными о конкретной фотографии:
// Адрес изображения url подставьте как src изображения внутри блока .big-picture__img.
// Количество лайков likes подставьте как текстовое содержание элемента .likes-count.
// Количество комментариев comments подставьте как текстовое содержание элемента .comments-count.


// Список комментариев под фотографией: комментарии должны вставляться в блок .social__comments. Разметка каждого комментария должна выглядеть так:

// <li class="social__comment">
//     <img
//         class="social__picture"
//         src="{{аватар}}"
//         alt="{{имя комментатора}}"
//         width="35" height="35">
//     <p class="social__text">{{текст комментария}}</p>
// </li>
// Описание фотографии description вставьте строкой в блок .social__caption.

// Подключите модуль в проект.


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
