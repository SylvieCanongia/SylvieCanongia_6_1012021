function VideoTag(tag, videoName, url) {
  
  let ext = getExtension(videoName);

  if(ext == "mp4") {
    let obj = {
      'elementName': `${tag}`,
      'classIdAttr': {
        'className': "media__cardImg video",
        'src': url,
        'controls': 'controls'
      },
      'textContent': undefined,
      'appendTo': "div.media__card__wrapper"
    }
    let videoElement = createElement(obj.elementName, obj.classIdAttr, obj.textContent, obj.appendTo);
    return videoElement
  } else {
    console.log("Sorry, this is not a valid format of video");
  }
}