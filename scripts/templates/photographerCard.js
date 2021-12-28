// Create the photographer card on photographer.html with all infos

function photographerCard(photographer) {
  const { name, id, city, country, tagline, price, portrait } = photographer;

  const picture = `assets/photographers/photographers_id_photos/${portrait}`;

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

export { photographerCard };