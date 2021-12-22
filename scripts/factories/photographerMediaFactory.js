// Returns the element img or video from 'models/image.js' or 'models/video.js'

function photographerMediaFactory(type, mediaName, url) {
    switch (type) {
      case "image":
        return ImageTag("img", mediaName, url);
        break;
      case "video":
        return VideoTag("video", mediaName, url);
        break;
      default:
        console.log("Sorry, media not found");
    }
  }
