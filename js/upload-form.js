import {isEscapeKey} from './util.js';
import {isCommentLengthValid} from './util.js';

const uploadForm = document.querySelector('#upload-select-image');

const uploadFormInput = document.querySelector('#upload-file');
const imgUploadModal = document.querySelector('.img-upload__overlay');

const hashtagInput = document.querySelector('.text__hashtags');
const uploadPhotoDescription = document.querySelector('.text__description');

function onUploadForm() {
  uploadFormInput.addEventListener('change', () =>{
    imgUploadModal.classList.remove('hidden');
    document.querySelector('body').classList.add('modal-open');

    document.addEventListener('keydown', onUploadFormlEscDown);
  });
}


const uploadFormCloseButton = document.querySelector('#upload-cancel');
function closeUploadForm(){
  imgUploadModal.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  uploadFormInput.value = '';
  hashtagInput.value = '';
  uploadPhotoDescription.value = '';
  document.removeEventListener('keydown', onUploadFormlEscDown);
}

function onUploadFormlEscDown (evt){
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUploadForm();
  }
}


uploadFormCloseButton.addEventListener('click',closeUploadForm);

hashtagInput.addEventListener('focus', () => {
  document.removeEventListener('keydown', onUploadFormlEscDown);
});
hashtagInput.addEventListener('blur', () => {
  document.addEventListener('keydown', onUploadFormlEscDown);
});

uploadPhotoDescription.addEventListener('focus', () => {
  document.removeEventListener('keydown', onUploadFormlEscDown);
});
uploadPhotoDescription.addEventListener('focus', () => {
  document.addEventListener('keydown', onUploadFormlEscDown);
});

// *****************************************************
// Валидация полей описания и хештега

function validateHastag () {
  const hashtagRX = /^#[a-zа-яё0-9]{1,19}$/i;

  const userHashtagArray = hashtagInput.value.split(' ');

  const hashtagIsValid = userHashtagArray.every((item) => hashtagRX.test(item));

  const duplicatedHashtags = userHashtagArray.filter((hashtag, index, hashtags) => hashtags.indexOf(hashtag) !== index);

  if(hashtagIsValid &&
  userHashtagArray.length <= 5 &&
  duplicatedHashtags.length === 0){
    return true;
  }
  else {
    return false;
  }
}

function validateUploadPhotoDescription(){
  return isCommentLengthValid(uploadPhotoDescription.value,140);
}

const pristine = new Pristine(uploadForm);
pristine.addValidator(hashtagInput, validateHastag);
pristine.addValidator(uploadPhotoDescription, validateUploadPhotoDescription);
uploadForm.addEventListener('submit', (evt) => {
  const valid = pristine.validate();

  if (!valid) {
    evt.preventDefault();
  }
});

// *****************************************************
// Изменение масштаба изображения

const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
scaleControlBigger.disabled = true;
const scaleControlValue = document.querySelector('.scale__control--value');
const uploadPhoto = document.querySelector('.img-upload__preview');
let scaleControlStartValue = 100;
const scaleStep = 25;
const scaleMin = 25;
const scaleMax = 100;
const transformStep = 0.25;
let transformStartValue = 1;

scaleControlValue.value = `${scaleControlStartValue}%`;
function makePhotoSmaller(evt) {
  evt.preventDefault();
  scaleControlStartValue -= scaleStep;
  scaleControlValue.value = `${scaleControlStartValue}%`;

  transformStartValue -= transformStep;
  const transformScale = `scale(${ transformStartValue })`;
  uploadPhoto.style.transform = transformScale;

  scaleControlBigger.disabled = false;

  if(scaleControlStartValue <= scaleMin){
    scaleControlSmaller.disabled = true;
  }
}
function makePhotoBigger(evt) {
  evt.preventDefault();
  scaleControlStartValue += scaleStep;
  scaleControlValue.value = `${scaleControlStartValue}%`;

  transformStartValue += transformStep;
  const transformScale = `scale(${ transformStartValue })`;
  uploadPhoto.style.transform = transformScale;

  scaleControlSmaller.disabled = false;

  if(scaleControlStartValue >= scaleMax){
    scaleControlBigger.disabled = true;
  }
}

scaleControlSmaller.addEventListener('click', makePhotoSmaller);
scaleControlBigger.addEventListener('click', makePhotoBigger);

// *****************************************************
// Наложение фильтров

const effectSliderContainer = document.querySelector('.img-upload__effect-level');
const effectValue = document.querySelector('.effect-level__value');
let effectCurrentClass;
const effectOriginal = document.querySelector('#effect-none');
const effectChrome = document.querySelector('#effect-chrome');
const effectSepia = document.querySelector('#effect-sepia');
const effectMarvin = document.querySelector('#effect-marvin');
const effectPhobos = document.querySelector('#effect-phobos');
const effectHeat = document.querySelector('#effect-heat');
let isSliderInitialized = false;

effectOriginal.addEventListener('change', () => {
  if(effectOriginal.checked){
    uploadPhoto.classList.remove(effectCurrentClass);
    uploadPhoto.style.filter = '';
    if(isSliderInitialized) {
      effectSliderContainer.noUiSlider.destroy();
      isSliderInitialized = false;
    }
  }
});


function activateFilter(filterEffectClass, getFilterStyle) {
  if (!isSliderInitialized){
    noUiSlider.create(effectSliderContainer, {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
      connect: 'lower',
    });
    isSliderInitialized = true;
  }
  uploadPhoto.classList.remove(effectCurrentClass);
  effectSliderContainer.noUiSlider.off();
  uploadPhoto.classList.add(filterEffectClass);
  effectCurrentClass = filterEffectClass;
  effectSliderContainer.noUiSlider.on('update', () => {
    effectValue.value = effectSliderContainer.noUiSlider.get();
    uploadPhoto.style.filter = getFilterStyle(effectValue.value);
  });
}


effectChrome.addEventListener('change', (evt) => {
  if(evt.target.checked){
    activateFilter('effects__preview--chrome', (currentValue) => `greyscale(${ currentValue })`);

    effectSliderContainer.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    });
  }
});

effectSepia.addEventListener('change', (evt) => {
  if(evt.target.checked){
    activateFilter('effects__preview--sepia', (currentValue) => `sepia(${ currentValue })`);

    effectSliderContainer.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    });
  }
});

effectMarvin.addEventListener('change', (evt) => {
  if(evt.target.checked){
    activateFilter('effects__preview--marvin', (currentValue) => `invert(${ currentValue }%)`);
    effectSliderContainer.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1,
    });
  }
});

effectPhobos.addEventListener('change', (evt) => {
  if(evt.target.checked){
    activateFilter('effects__preview--phobos', (currentValue) => `blur(${ currentValue }px)`);
    effectSliderContainer.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 3,
      },
      start: 3,
      step: 0.1,
    });
  }
});

effectHeat.addEventListener('change', (evt) => {
  if(evt.target.checked){
    activateFilter('effects__preview--heat', (currentValue) => `brightness(${ currentValue })`);
    effectSliderContainer.noUiSlider.updateOptions({
      range: {
        min: 1,
        max: 3,
      },
      start: 3,
      step: 0.1,
    });
  }
});

export {onUploadForm};
