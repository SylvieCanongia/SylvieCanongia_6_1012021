function ImageTag(tag, imgName, url) {

  let ext = getExtension(imgName);
  
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