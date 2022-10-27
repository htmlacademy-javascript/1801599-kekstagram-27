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

export {onUploadForm};


// ********************************************************************************
// ********************************************************************************


const pristine = new Pristine(uploadForm);

const hashtag = /^#[a-zа-яё0-9]{1,19}$/i;

const userHashtagArray = hashtagInput.value.split(' ');

const hashtagIsValid = userHashtagArray.every((item) => hashtag.test(item));

const duplicatedHashtags = userHashtagArray.filter((hastag, index, hashtags) => hashtags.indexOf(hashtag) !== index);

// eslint-disable-next-line no-console
console.log(duplicatedHashtags);

function validateHastag () {
  if(hashtagIsValid &&
  userHashtagArray.lenth <= 5 &&
  duplicatedHashtags.lenght === 0){
    return true;
  }
  else {
    return false;
  }
}

function validateUploadPhotoDescription(){
  return isCommentLengthValid(hashtagInput.value,140);
}

pristine.addValidator(hashtagInput, validateHastag);
pristine.addValidator(uploadPhotoDescription, validateUploadPhotoDescription);

// строка после решётки должна состоять из букв и чисел и не может содержать пробелы,
// спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.;

