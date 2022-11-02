// import './data.js';
// import './thumbnails.js';
// import './gallery.js';
// import './comments.js';


// // eslint-disable-next-line no-console
// console.log(randomPhotos);

import {randomPhotos} from './data.js';
import {renderThumbNails} from './thumbnails.js';
import {addThunbnailsEventListeners} from './gallery.js';
import {onUploadForm} from './upload-form.js';

const PHOTO_COUNT = 24;
const createdPhotos = randomPhotos(PHOTO_COUNT);

renderThumbNails(createdPhotos);

addThunbnailsEventListeners(createdPhotos);

onUploadForm();
