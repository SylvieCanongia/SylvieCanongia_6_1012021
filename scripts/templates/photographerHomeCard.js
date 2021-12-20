function photographerHomeCard(photographer) {
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
  function createHomeCard() {

    // article element as card wrapper
    let article = createElement('article', {className: 'photographer__card'}, undefined, 'div.photographer__section');

    // link wrapper of the card content
    createElement('a', {className: 'photographer__card__content__wrapper', href: `./photographer.html?name=${name}&id=${id}`}, undefined, 'article');

    // img and its wrapper
    createElement('div', {className: 'cardImg__wrapper'}, undefined, 'article');
    createElement('img', {className: 'cardImg', src: picture}, undefined, 'div.cardImg__wrapper');

    // heading
    createElement('h2', {className: 'cardHeading'}, name, 'article');

    // div that contains all texts except heading
    createElement('div', {className: 'cardText'}, undefined, 'article');
    createElement('p', {className: 'city'}, `${city}, ${country}`, 'div.cardText');
    createElement('p', {className: 'tagline'}, `${tagline}`, 'div.cardText');
    createElement('p', {className: 'price'}, `${price} €/jour`, 'div.cardText');

    return (article);
  }

return { name, id, city, country, tagline, price, createHomeCard }
}