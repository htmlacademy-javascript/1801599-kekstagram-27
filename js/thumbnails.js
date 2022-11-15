const picturesList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content;


const renderThumbNails = (createdPhotos) => {
  const pictureFragment = document.createDocumentFragment();

  createdPhotos.forEach(({url, likes, comments}) => {
    const newPhoto = pictureTemplate.cloneNode(true);
    newPhoto.querySelector('.picture__img').src = url;
    newPhoto.querySelector('.picture__likes').textContent = likes;
    newPhoto.querySelector('.picture__comments').textContent = comments.length;
    pictureFragment.appendChild(newPhoto);
  });

  const allPictures = document.querySelectorAll('.picture');
  allPictures.forEach((e) => e.remove());
  picturesList.appendChild(pictureFragment);
};


export {renderThumbNails};


