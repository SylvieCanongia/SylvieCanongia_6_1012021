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