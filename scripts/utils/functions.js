// create an element with classes Ids or attributes, text content and append to another element
  // Parameters : ( 'element', { className: class, Id: attrValue or attrName: value }, 'textContent', parentElement )
  const createElement = (elementName, classIdAttr, textContent, appendTo) => {
    let element = document.createElement(elementName);
    // create an array of class, id or attributes
    Object.keys(classIdAttr).forEach(function(i) {
      element[i] = classIdAttr[i];
    });
    // if there is no textContent, parameter to indicate is undefined
    if (textContent !== undefined) {
      element.textContent = textContent;
    }
    if (appendTo !== undefined) {
      let parent = document.querySelectorAll(appendTo);
      parent.forEach((item) => {
        item.appendChild(element);
      })
    }
   return element;
  }