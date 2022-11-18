const uploadPhoto = document.querySelector('.img-upload__preview');
const effectSliderContainer = document.querySelector('.effect-level__slider');
const effectValue = document.querySelector('.effect-level__value');
const effectOriginal = document.querySelector('#effect-none');
const effectChrome = document.querySelector('#effect-chrome');
const effectSepia = document.querySelector('#effect-sepia');
const effectMarvin = document.querySelector('#effect-marvin');
const effectPhobos = document.querySelector('#effect-phobos');
const effectHeat = document.querySelector('#effect-heat');
let effectCurrentClass;
let isSliderInitialized = false;

const applyOriginalEffect = () => {
  uploadPhoto.classList.remove(effectCurrentClass);
  uploadPhoto.style.filter = '';
  if(isSliderInitialized) {
    effectSliderContainer.noUiSlider.destroy();
    isSliderInitialized = false;
  }
};

effectOriginal.addEventListener('change', () => {
  if(effectOriginal.checked){
    applyOriginalEffect();
  }
});


const activateFilter = (filterEffectClass, getFilterStyle) => {
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
};


effectChrome.addEventListener('change', (evt) => {
  if(evt.target.checked){
    activateFilter('effects__preview--chrome', (currentValue) => `grayscale(${ currentValue })`);

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

export {applyOriginalEffect};
