const galleryFilterContainer = document.querySelector('.img-filters');
const defaultGalleryFilterButton = document.querySelector('#filter-default');
const randomGalleryFilterButton = document.querySelector('#filter-random');
const RANDOM_PHOTOS_COUNT = 10;
const discussedGalleryFilterButton = document.querySelector('#filter-discussed');
const allGalleryFilterButtons = Array.from(document.querySelectorAll('.img-filters__button'));

const setDefaultClick = (cb) => {
  defaultGalleryFilterButton.addEventListener('click', () => {
    cb();
    allGalleryFilterButtons.forEach((button) =>
      button.classList.remove('img-filters__button--active')
    );
    defaultGalleryFilterButton.classList.add('img-filters__button--active');
  });
};

const compareComments = (commentA, commentB) =>
  commentB.comments.length - commentA.comments.length;

const setDiscussedClick = (cb) => {
  discussedGalleryFilterButton.addEventListener('click', () => {
    allGalleryFilterButtons.forEach((button) =>
      button.classList.remove('img-filters__button--active')
    );
    discussedGalleryFilterButton.classList.add('img-filters__button--active');
    cb();
  });
};

const setRandomClick = (cb) => {
  randomGalleryFilterButton.addEventListener('click', () => {
    allGalleryFilterButtons.forEach((button) =>
      button.classList.remove('img-filters__button--active')
    );
    randomGalleryFilterButton.classList.add('img-filters__button--active');
    cb();
  });
};

function showFilterContainer() {
  galleryFilterContainer.classList.remove('img-filters--inactive');
}

const getDiscussedPhotos = (photos) => photos.slice().sort(compareComments);
const getRandomPhotos = (photos) => photos.slice()
  .sort(() => (Math.random() > 0.5 ? 1 : -10))
  .slice(0, RANDOM_PHOTOS_COUNT);

export {
  showFilterContainer,
  getDiscussedPhotos,
  setDefaultClick,
  getRandomPhotos,
  setRandomClick,
  setDiscussedClick,
};
