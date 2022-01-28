import { createElement, getExtension } from '../utils/functions.js';

function ImageTag(imgTag, imgName, altText, url) {
  const ext = getExtension(imgName);

  if (ext[0] === 'jpg') {
    const obj = {
      elementName: `${imgTag}`,
      classIdAttr: {
        className: 'media__cardImg',
        src: url,
        alt: '',
      },
      textContent: undefined,
      appendTo: 'div.media__card__wrapper',
    };
    return createElement(obj.elementName, obj.classIdAttr, obj.textContent, obj.appendTo);
  }
  // eslint-disable-next-line no-console
  console.log('Sorry, this is not a valid format of image');
}

export { ImageTag };
