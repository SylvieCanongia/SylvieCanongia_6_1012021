function photographerMediaCard(media, name) {
  const { id, photographerId, title, image, likes, date, price } = media;

  // Get the firstname of the photographer from the complete name
  const firstname = name.split(" ");
  // console.log(firstname[0]);

  const picture = `assets/photographers/${firstname[0]}/${image}`;


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


  // Create the media card with all infos necessary
  function createMediaCard() {

    // article element as card wrapper
    let article = createElement('article', {className: 'media__card'}, undefined, 'div.medias__section');

    // link wrapper of the card content
    // createElement('a', {className: 'media__card__content__wrapper', href: `./photographer.html?id=${id}`}, undefined, 'article');

    // img and its wrapper
    createElement('div', {className: 'media__cardImg__wrapper'}, undefined, 'article');


    createElement('img', {className: 'media__cardImg', src: picture}, undefined, 'div.media__cardImg__wrapper');

    // heading
    createElement('h2', {className: 'media__CardHeading'}, title, 'article');

    createElement('div', {className: 'media__likes__wrapper'}, undefined, 'h2.media__CardHeading');

    // span into the heading with heart icon
    createElement('span', {role: 'img', ariaLabel: "Heart for liking", className: "likes"}, likes, 'div.media__likes__wrapper');
    createElement('i', {className: 'heart-icon-filled fas fa-heart'}, undefined, 'div.media__likes__wrapper');
    
    return (article);
  }

return { id, photographerId, title, image, likes, date, price, createMediaCard }
}