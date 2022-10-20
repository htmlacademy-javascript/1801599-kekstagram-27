// Отобразить фотографии других пользователей.

// Заведите модуль, который будет отвечать за отрисовку миниатюр.

//  На основе временных данных для разработки и шаблона #picture создайте DOM-элементы, соответствующие фотографиям, и заполните их данными: */

// Адрес изображения url подставьте как атрибут src изображения.
// Количество лайков likes выведите в блок .picture__likes.
// Количество комментариев comments выведите в блок .picture__comments.
// Отрисуйте сгенерированные DOM-элементы в блок .pictures. Для вставки элементов используйте DocumentFragment.

// Подключите модуль в проект.

import {randomPhotos} from './data.js';

const PICTURES_LIST = document.querySelector('.pictures');
const PICTURE_TEMPLATE = document.querySelector('#picture').content;

const PICTURE_FRAGMENT = document.createDocumentFragment();

const createdPhotos = randomPhotos(10);

createdPhotos.forEach(({url, likes, comments}) => {
  const newPhoto = PICTURE_TEMPLATE.cloneNode(true);
  newPhoto.querySelector('.picture__img').src = url;
  newPhoto.querySelector('.picture__likes').textContent = likes;
  newPhoto.querySelector('.picture__comments').textContent = comments;
  PICTURE_FRAGMENT.appendChild(newPhoto);
});

PICTURES_LIST.appendChild(PICTURE_FRAGMENT);
