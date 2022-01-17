import { photographerMediaFactory } from './../factories/photographerMediaFactory.js';

import { createElement } from './../utils/functions.js';

function mediaCard(media, name) {
  const { id, photographerId, title, image, video, likes, date, price } = media;
  const altText = media['alt-text'];

  // Get the firstname of the photographer from the complete name
  const firstname = name.split(" ");

  const picture = `assets/photographers/${firstname[0]}/${image}`;
  const film = `assets/photographers/${firstname[0]}/${video}`;

  // ==============================================
  // Create the media card with all infos necessary
  function createMediaCard() {

    // article element as card wrapper. Use of the function createElement to create various elements
    let article = createElement('article', {className: 'media__card'}, undefined, 'div.medias__section');

    // img and its wrapper
    createElement('div', {className: 'media__card__wrapper'}, undefined, 'article');

    // link wrapper of the img or the video
    if(media.image){
      createElement('a', {className: 'media__card__img__wrapper', href: picture}, undefined, 'div.media__card__wrapper');
    }

    if(media.video) {
    createElement('a', {className: 'media__card__img__wrapper', href: film}, undefined, 'div.media__card__wrapper');
    }

    // Create img or video element in function of the type of the element
    if(media.image){
      photographerMediaFactory("image", media.image, altText, picture);
    }
    
    if(media.video) {
      photographerMediaFactory("video", media.video, altText, film);
      const videoElement = document.querySelectorAll('.video');
      const playButton = document.querySelectorAll('.playPauseButton');
      
      playButton.forEach((button) => {
          button.addEventListener("click", playVideo);
      });
      function playVideo() {
        videoElement.play();
      }
      
      manageMediaControls('photographer');
    }

    // heading
    createElement('h2', {className: 'media__CardHeading'}, undefined, 'article');
    createElement('div', {className: 'media__CardHeading__h2'}, title, 'h2.media__CardHeading')

    createElement('div', {className: 'media__likes__wrapper'}, undefined, 'h2.media__CardHeading');

    // span into the heading with heart icon
    createElement('span', {role: 'img', ariaLabel: "likes", className: "media__likes"}, likes, 'div.media__likes__wrapper');
    createElement('i', {className: 'heart-icon-filled fas fa-heart media__heart', tabIndex: '0'}, undefined, 'div.media__likes__wrapper');
    
    return (article);
  }

return { id, photographerId, title, image, likes, date, price, createMediaCard }
}

export { mediaCard };