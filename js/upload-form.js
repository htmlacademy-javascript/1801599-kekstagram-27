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


const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
scaleControlBigger.disabled = true;
const scaleControlValue = document.querySelector('.scale__control--value');
const uploadPhoto = document.querySelector('.img-upload__preview');
let scaleControlStartValue = 100;
const scaleStep = 25;
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

  if(scaleControlStartValue <= scaleStep){
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

  if(scaleControlStartValue >= 100){
    scaleControlBigger.disabled = true;
  }
}

scaleControlSmaller.addEventListener('click', makePhotoSmaller);
scaleControlBigger.addEventListener('click', makePhotoBigger);


export {onUploadForm};
