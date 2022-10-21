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

import {PICTURES_LIST} from './thumbnails.js';
import {createdPhotos} from './thumbnails.js';

const body = document.querySelector('body');
const commentsCountContainer = document.querySelector('.social__comment-count');
const newCommentLoader = document.querySelector('.comments-loader');

const thumbnails = PICTURES_LIST.children;
const thumbnailsImages = document.querySelectorAll('.picture__img');
const thumbnailsUrls = [...thumbnailsImages].map((image) => image.src);
const fullPictureContainer = document.querySelector('.big-picture');
const fullPicture = fullPictureContainer.querySelector('img');

const fullPictureLikes = document.querySelector('.likes-count');
const thumbnailsLikes = document.querySelectorAll('.picture__likes');

const fullPictureCommentsCount = document.querySelector('.comments-count');
const thumbnailsComments = document.querySelectorAll('.picture__comments');

const thumbnailsDescriptions = [];
const fullPictureDescription = document.querySelector('.social__caption');

// eslint-disable-next-line no-console
console.log(thumbnailsDescriptions);

createdPhotos.forEach((description) => {
  thumbnailsDescriptions.push(description);
});
// eslint-disable-next-line no-console
console.log(thumbnailsComments);

const addThumbnailClickHandler = function (thumbnail, thumbnailsUrl, thumbnailsLike, thumbnailsDescription) {
  thumbnail.addEventListener('click', () => {
    fullPictureContainer.classList.remove('hidden');
    commentsCountContainer.classList.add('hidden');
    newCommentLoader.classList.add('hidden');
    body.classList.add('modal-open');
    fullPicture.src = thumbnailsUrl;
    thumbnailsLike.toString();
    fullPictureLikes.textContent = thumbnailsLike;
    fullPictureCommentsCount.textContent = thumbnailsComments.length;
    fullPictureDescription.textContent = thumbnailsDescription;
  });
};

for (let i = 0; i < thumbnails.length; i++) {
  addThumbnailClickHandler(thumbnails[i], thumbnailsUrls[i], thumbnailsLikes[i], thumbnailsDescriptions[i]);
}

const closeFullPictureButton = document.querySelector('.big-picture__cancel');
closeFullPictureButton.addEventListener('click', () => {
  fullPictureContainer.classList.add('hidden');
  commentsCountContainer.classList.remove('hidden');
  newCommentLoader.classList.remove('hidden');
  body.classList.remove('modal-open');
});

document.addEventListener('keydown', (evt) => {
  if (evt.keyCode === 27) {
    fullPictureContainer.classList.add('hidden');
    commentsCountContainer.classList.remove('hidden');
    newCommentLoader.classList.remove('hidden');
    body.classList.remove('modal-open');
  }
});
