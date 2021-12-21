function photographerCard(photographer) {
  const { name, id, city, country, tagline, price, portrait } = photographer;

  const picture = `assets/photographers/photographers_id_photos/${portrait}`;


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

  // Create the photographer card with all infos except id
  function createPhotographerCard() {

    // article element as card wrapper
    let article = createElement('article', {className: 'header__infos__card'}, undefined, 'div.photograph__header__infos');

    // heading
    createElement('h2', {className: 'header__infos__heading'}, name, 'article');

    // div that contains all texts except heading
    createElement('div', {className: 'header__infos__desc'}, undefined, 'article.header__infos__card');
     
    createElement('p', {className: 'city'}, `${city}, ${country}`, 'div.header__infos__desc');
    createElement('p', {className: 'tagline'}, `${tagline}`, 'div.header__infos__desc');

    return (article);
  }

return { name, id, city, country, tagline, price, picture, createPhotographerCard }
}