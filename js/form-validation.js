import {isCommentLengthValid} from './util.js';
import {showSuccessMessage, showUploadErrorMessage} from './messages.js';

const MAX_COMMENT_LENGTH = 140;
const MAX_HASHTAG_COUNT = 5;

const hashtagInput = document.querySelector('.text__hashtags');
const submitButton = document.querySelector('#upload-submit');
const uploadPhotoDescription = document.querySelector('.text__description');
const uploadForm = document.querySelector('#upload-select-image');


const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});

const validateHastag = () => {
  const hashtagRegularExpression = /^#[a-zа-яё0-9]{1,19}$/i;
  const userHashtagArray = hashtagInput.value.split(' ').filter((item) => item.length > 0);
  const hashtagIsValid = userHashtagArray.every((item) => hashtagRegularExpression.test(item));
  const duplicatedHashtags = userHashtagArray.filter((hashtag, index, hashtags) => hashtags.indexOf(hashtag) !== index);
  return hashtagIsValid && userHashtagArray.length <= MAX_HASHTAG_COUNT && duplicatedHashtags.length === 0;
};

const validateUploadPhotoDescription = () => isCommentLengthValid(uploadPhotoDescription.value,MAX_COMMENT_LENGTH);

pristine.addValidator(hashtagInput, validateHastag, 'хештеги должны разделяться пробелами и начинатся с #. Максимальная длина хештега - 20 символов. Не более 5 хештегов ');
pristine.addValidator(uploadPhotoDescription, validateUploadPhotoDescription);

const setUserFormSubmit = (onClose) => {
  pristine.reset();

  uploadForm.addEventListener('submit', (evt) => {
    const isValid = pristine.validate();
    evt.preventDefault();
    if(isValid) {
      const formData = new FormData(evt.target);
      fetch(
        'https://27.javascript.pages.academy/kekstagram',
        {
          method: 'POST',
          body: formData,
        },
      ) .then(submitButton.disabled = true)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }

          throw new Error(`${response.status} ${response.statusText}`);
        })
        .then(() => {
          showSuccessMessage();
          onClose();
          // closeUploadForm();
        })
        .then(submitButton.disabled = false)
        .catch(() => {
          showUploadErrorMessage();
        });
    }
  });
};

export {pristine, setUserFormSubmit};
