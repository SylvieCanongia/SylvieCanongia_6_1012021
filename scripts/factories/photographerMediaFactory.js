import { ImageTag } from '../models/image.js';
import { VideoTag } from '../models/video.js';

// Returns the element img or video from 'models/image.js' or 'models/video.js'
function photographerMediaFactory(type, mediaName, altText, url) {
  switch (type) {
    case 'image':
      ImageTag('img', mediaName, altText, url);
      break;
    case 'video':
      VideoTag('video', mediaName, altText, url);
      break;
    default:
      // eslint-disable-next-line no-console
      console.log('Sorry, media not found');
  }
}

export { photographerMediaFactory };
