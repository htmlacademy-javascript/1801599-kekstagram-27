import {isEscapeKey} from './util.js';
import {onPhotoSmallerClick, onPhotoBiggerClick} from './img-scale.js';
import {applyOriginalEffect} from './img-filter.js';
const scaleControlValue = document.querySelector('.scale__control--value');
const scaleControlStartValue = 100;

const uploadFormInput = document.querySelector('#upload-file');
const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const imgUploadModal = document.querySelector('.img-upload__overlay');

const hashtagInput = document.querySelector('.text__hashtags');
const uploadPhotoDescription = document.querySelector('.text__description');

const uploadPhoto = document.querySelector('.img-upload__preview');
const uploadPhotoImg = document.querySelector('.img-upload__preview').children;

const effectOriginal = document.querySelector('#effect-none');

const onUploadForm = () => {
  uploadFormInput.addEventListener('change', () =>{
    scaleControlValue.value = `${scaleControlStartValue}%`;
    const scaleControlSmaller = document.querySelector('.scale__control--smaller');
    const scaleControlBigger = document.querySelector('.scale__control--bigger');
    scaleControlSmaller.addEventListener('click', onPhotoSmallerClick);
    scaleControlBigger.addEventListener('click', onPhotoBiggerClick);

    imgUploadModal.classList.remove('hidden');
    const file = uploadFormInput.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
    if (matches) {
      uploadPhotoImg[0].src = URL.createObjectURL(file);
    }
    document.querySelector('body').classList.add('modal-open');
    document.addEventListener('keydown', onUploadFormlEscDown);
  });
};


const uploadFormCloseButton = document.querySelector('#upload-cancel');
function closeUploadForm(){
  imgUploadModal.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  uploadFormInput.value = '';
  hashtagInput.value = '';
  uploadPhotoDescription.value = '';
  document.removeEventListener('keydown', onUploadFormlEscDown);
  scaleControlValue.value = `${scaleControlStartValue}%`;
  uploadPhoto.style.transform = 'scale(1)';
  applyOriginalEffect();
  effectOriginal.checked = true;
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

export {closeUploadForm, onUploadForm};
