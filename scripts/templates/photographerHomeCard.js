function photographerHomeCard(photographer) {
  const { name, id, city, country, tagline, price, portrait } = photographer;

  const picture = `assets/photographers/photographers_id_photos/${portrait}`;


  // Create the photographer card with all infos except id
  function createHomeCard() {

    // article element as card wrapper
    let article = createElement('article', {className: 'photographer__card'}, undefined, 'div.photographer__section');

    // create a wrapper for img and heading link to the photographer page
    createElement('div', {className: 'link__container'}, undefined, 'article');

     // link wrapper of the card content. Insert the photographer name and id in the url parameters
     createElement('a', {className: 'photographer__card__content__wrapper', href: `./photographer.html?name=${name}&id=${id}`, ariaLabel: name}, undefined, 'div.link__container');

    // img and its wrapper
    createElement('div', {className: 'cardImg__wrapper'}, undefined, 'div.link__container');
    createElement('img', {className: 'cardImg', src: picture, alt: ''}, undefined, 'div.cardImg__wrapper');

    // heading
    createElement('h2', {className: 'cardHeading'}, name, 'div.link__container');

    // div that contains all texts except heading
    createElement('div', {className: 'cardText'}, undefined, 'article');
    createElement('p', {className: 'city'}, `${city}, ${country}`, 'div.cardText');
    createElement('p', {className: 'tagline'}, `${tagline}`, 'div.cardText');
    createElement('p', {className: 'price'}, `${price} €/jour`, 'div.cardText');

    return (article);
  }

return { name, id, city, country, tagline, price, createHomeCard }
}