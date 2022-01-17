import { createElement, getExtension } from './../utils/functions.js';

function ImageTag(imgTag, imgName, altText, url) {

  let ext = getExtension(imgName);
  
  if(ext == "jpg") {
    let obj = {
      'elementName': `${imgTag}`,
      'classIdAttr': {
        'className': "media__cardImg",
        'src': url,
        'alt': `${altText}, vue rapprochée de l'image`
      },
      'textContent': undefined,
      'appendTo': "div.media__card__wrapper"
    }
    return createElement(obj.elementName, obj.classIdAttr, obj.textContent, obj.appendTo);
  } else {
    console.log("Sorry, this is not a valid format of image");
  }
}

export { ImageTag };