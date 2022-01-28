// create an element with classes Ids or attributes, text content
// and append to another element
// Parameters : ( 'element', { className: class, Id: attrValue or attrName: value },
// 'textContent', parentElement )

/**
   *
   * @param {HTMLElement} elementName the tag of the HTML element to create like 'div' or 'h2'
   * @param {OBJECT} classIdAttr An object with the classes or/and attributes of the element
   * like {className: 'myclassName', id: 'myId', src: url, ariaLabel: 'myAriaLabel'}
   * @param {String} textContent the text content for the element. If none write undefined.
   * @param {HTMLElement} appendTo the parent element where to append the element
   * like 'div.container'.If none write undefined.
   * @returns HTML Element
   */
const createElement = (elementName, classIdAttr, textContent, appendTo) => {
  const element = document.createElement(elementName);
  // create an array of class, id or attributes
  Object.keys(classIdAttr).forEach((i) => {
    element[i] = classIdAttr[i];
  });
  // if there is no textContent, parameter to indicate is undefined
  if (textContent !== undefined) {
    element.textContent = textContent;
  }
  if (appendTo !== undefined) {
    const parent = document.querySelectorAll(appendTo);
    parent.forEach((item) => {
      item.appendChild(element);
    });
  }
  return element;
};

// Get the extension of a media name
const getExtension = (mediaName) => {
  const regex = /[^.]+$/;
  const ext = mediaName.match(regex);

  return ext;
};

const getMediaNameWithExt = (url) => {
  const mediaName = url.substring(url.lastIndexOf('/') + 1);
  return mediaName;
};

export { createElement, getExtension, getMediaNameWithExt };
