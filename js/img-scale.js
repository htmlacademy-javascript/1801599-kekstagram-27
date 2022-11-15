
const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
scaleControlBigger.disabled = true;
const scaleControlValue = document.querySelector('.scale__control--value');
const uploadPhoto = document.querySelector('.img-upload__preview');

const SCALE_STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;
const TRANSFORM_STEP = 0.25;
let TRANSFORM_START_VALUE = 1;
let SCALE_START_VALUE = 100;

scaleControlValue.value = `${SCALE_START_VALUE}%`;

const onPhotoSmallerClick = (evt) => {
  evt.preventDefault();
  SCALE_START_VALUE -= SCALE_STEP;
  scaleControlValue.value = `${SCALE_START_VALUE}%`;

  TRANSFORM_START_VALUE -= TRANSFORM_STEP;
  const transformScale = `scale(${ TRANSFORM_START_VALUE })`;
  uploadPhoto.style.transform = transformScale;

  scaleControlBigger.disabled = false;

  if(SCALE_START_VALUE <= SCALE_MIN){
    scaleControlSmaller.disabled = true;
  }
};

const onPhotoBiggerClick = (evt) => {
  evt.preventDefault();
  SCALE_START_VALUE += SCALE_STEP;
  scaleControlValue.value = `${SCALE_START_VALUE}%`;

  TRANSFORM_START_VALUE += TRANSFORM_STEP;
  const transformScale = `scale(${ TRANSFORM_START_VALUE })`;
  uploadPhoto.style.transform = transformScale;

  scaleControlSmaller.disabled = false;

  if(SCALE_START_VALUE >= SCALE_MAX){
    scaleControlBigger.disabled = true;
  }
};

export {onPhotoSmallerClick, onPhotoBiggerClick};
