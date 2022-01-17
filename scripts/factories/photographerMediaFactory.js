import { ImageTag } from './../models/image.js';
import { VideoTag } from './../models/video.js';


// Returns the element img or video from 'models/image.js' or 'models/video.js'
function photographerMediaFactory(type, mediaName, altText, url) {
    switch (type) {
      case "image":
        return ImageTag("img", mediaName, altText, url);
        break;
      case "video":
        return VideoTag("video", mediaName, altText, url);
        break;
      default:
        console.log("Sorry, media not found");
    }
  }

  export { photographerMediaFactory };