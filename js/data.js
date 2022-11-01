import {getRandomNumber} from './util.js';
import {getUniqueRandomNumber} from './util.js';

const DESCRIPTION = [
  'Home sweet home',
  'Breakfast with friends',
  'Looks like heaven',
  'My lovely family',
  'Chill day'
];

const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = ['Roma', 'Dima', 'Nikita', 'Yana', 'Sveta', 'Maria'];
const MAX_ID_NUMBER = 1000000;
const MIN_AVATAR_NUMBER = 1;
const MAX_AVATAR_NUMBER = 6;
const MIN_COMMENT_NUMBER = 1;
const MAX_COMMENT_NUMBER = 3;
const MIN_LIKES_NUMBER = 15;
const MAX_LIKES_NUMBER = 200;

const createComment = () => {
  const commentId = getUniqueRandomNumber(0,MAX_ID_NUMBER);
  const randomCommentIndex = getRandomNumber(0, COMMENTS.length - 1);
  const randomNameIndex = getRandomNumber(0, NAMES.length - 1);
  return {
    id:commentId,
    avatar:`img/avatar-${getRandomNumber(MIN_AVATAR_NUMBER, MAX_AVATAR_NUMBER)}.svg`,
    message:COMMENTS[randomCommentIndex],
    name:NAMES[randomNameIndex]
  };
};

let id = 1;
const createPhoto = () => {
  const randomDescriptionIndex = getRandomNumber(0, DESCRIPTION.length - 1);
  return {
    id: id++,
    url: `photos/${id}.jpg`,
    description: DESCRIPTION[randomDescriptionIndex],
    likes:getRandomNumber(MIN_LIKES_NUMBER, MAX_LIKES_NUMBER),
    comments:Array.from({length: getRandomNumber(MIN_COMMENT_NUMBER, MAX_COMMENT_NUMBER)}, createComment)
  };
};

const randomPhotos = (count) => Array.from({length: count}, createPhoto);

export {randomPhotos};
