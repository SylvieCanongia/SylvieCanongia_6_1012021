function ImageTag(tag, imgName, url) {
  const regex = new RegExp('[^.]+$');
  let ext = imgName.match(regex);
  if(ext == "jpg") {
    let obj = {
      'elementName': `${tag}`,
      'classIdAttr': {
        'className': "media__cardImg",
        'src': url
      },
      'textContent': undefined,
      'appendTo': "div.media__card__wrapper"
    }
    return createElement(obj.elementName, obj.classIdAttr, obj.textContent, obj.appendTo);
  } else {
    console.log("Sorry, this is not a valid format of image");
  }
}

function VideoTag(tag, videoName, url) {
  const regex = new RegExp('[^.]+$');
  let ext = videoName.match(regex);
  if(ext == "mp4") {
    let obj = {
      'elementName': `${tag}`,
      'classIdAttr': {
        'className': "media__cardImg",
        'src': url,
        'controls': 'controls'
      },
      'textContent': undefined,
      'appendTo': "div.media__card__wrapper"
    }
    return createElement(obj.elementName, obj.classIdAttr, obj.textContent, obj.appendTo);
  } else {
    console.log("Sorry, this is not a valid format of video");
  }
}

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
