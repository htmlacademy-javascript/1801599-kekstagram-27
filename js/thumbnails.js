const PICTURES_LIST = document.querySelector('.pictures');
const PICTURE_TEMPLATE = document.querySelector('#picture').content;


const renderThumbNails = (createdPhotos) => {
  const PICTURE_FRAGMENT = document.createDocumentFragment();

  createdPhotos.forEach(({url, likes, comments}) => {
    const newPhoto = PICTURE_TEMPLATE.cloneNode(true);
    newPhoto.querySelector('.picture__img').src = url;
    newPhoto.querySelector('.picture__likes').textContent = likes;
    newPhoto.querySelector('.picture__comments').textContent = comments.length;
    PICTURE_FRAGMENT.appendChild(newPhoto);
  });

  const allPictures = document.querySelectorAll('.picture');
  allPictures.forEach((e) => e.remove());
  PICTURES_LIST.appendChild(PICTURE_FRAGMENT);
};


export {renderThumbNails};


