function photographerHomeCard(photographer) {
  const { name, id, city, country, tagline, price, portrait } = photographer;

  const picture = `assets/photographers/photographers_id_photos/${portrait}`;


  // Create the photographer card with all infos except id
  function createHomeCard() {

    // article element as card wrapper
    let article = createElement('article', {className: 'photographer__card'}, undefined, 'div.photographer__section');

    // link wrapper of the card content. Insert the photographer name and id in the url parameters
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