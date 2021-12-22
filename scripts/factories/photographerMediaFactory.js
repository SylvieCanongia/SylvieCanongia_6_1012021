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
