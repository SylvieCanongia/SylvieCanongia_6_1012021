import { LightboxImageTag } from '../models/lightboxImage.js';
import { LightboxVideoTag } from './../models/lightboxVideo.js';


// Returns the element img or video from 'models/image.js' or 'models/video.js'
/**
 * 
 * @param {String} type Tag of the media like 'image' or 'video'
 * @param {String} mediaName heading of the media for tle 'alt' attribute
 * @param {*} url URL of the media for the 'src' attribute
 * @returns function that creates the 'type' element
 */
function lightboxFactory(type, mediaName, url) {
  switch (type) {
    case 'image':
      LightboxImageTag('img', mediaName, url);
      break;
    case 'video':
      LightboxVideoTag('video', mediaName, url);
      break;
    default:
    // eslint-disable-next-line no-console
      console.log('Sorry, media not found');
  }
}

export { lightboxFactory };
