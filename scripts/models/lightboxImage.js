import { createElement, getExtension } from './../utils/functions.js';

/**
 * 
 * @param {String} imgTag tag of the media element : 'img'
 * @param {String} imgName Heading of the image for the 'alt' attribute
 * @param {URL} url URL of the image
 * @returns {HTMLElement} An 'img' element with classes, { src and alt attributes }, textContent and append it into '.lightbox__container'
 */
function LightboxImageTag(imgTag, imgName, url) {

  let ext = getExtension(url);
  
  if(ext == "jpg") {
    let obj = {
      'elementName': `${imgTag}`,
      'classIdAttr': {
        'className': "lightbox__image lightbox-media",
        'src': url,
        'alt': imgName
      },
      'textContent': undefined,
      'appendTo': "div.lightbox__container"
    }
    return createElement(obj.elementName, obj.classIdAttr, obj.textContent, obj.appendTo);
  } else {
    console.log("Sorry, this is not a valid format of image");
  }
}

export { LightboxImageTag };