const RANDOM_PHOTOS_COUNT = 10;

const galleryFilterContainer = document.querySelector('.img-filters');
const allGalleryFilterButtons = Array.from(document.querySelectorAll('.img-filters__button'));

const setFilterButtonClick = (button, cb) => {
  button.addEventListener('click', () => {
    cb();
    allGalleryFilterButtons.forEach((item) =>
      item.classList.remove('img-filters__button--active')
    );
    button.classList.add('img-filters__button--active');
  });
};

const compareComments = (commentA, commentB) =>
  commentB.comments.length - commentA.comments.length;


const showFilterContainer = () =>
  galleryFilterContainer.classList.remove('img-filters--inactive');

const getDiscussedPhotos = (photos) => photos.slice().sort(compareComments);
const getRandomPhotos = (photos) => photos.slice()
  .sort(() => (Math.random() > 0.5 ? 1 : -10))
  .slice(0, RANDOM_PHOTOS_COUNT);

export {
  showFilterContainer,
  setFilterButtonClick,
  getDiscussedPhotos,
  getRandomPhotos,
};
