import { photographerMediaFactory } from './../factories/photographerMediaFactory.js';

function mediaCard(media, name) {
  const { id, photographerId, title, image, video, likes, date, price } = media;

  // Get the firstname of the photographer from the complete name
  const firstname = name.split(" ");
  // console.log(firstname[0]);

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
      createElement('a', {className: 'media__card__img__wrapper', href: picture, ariaLabel: `Vue rapprochée de l'image`}, undefined, 'div.media__card__wrapper');
    }

    if(media.video) {
    createElement('a', {className: 'media__card__img__wrapper', href: film, ariaLabel: `Vue rapprochée de la vidéo`}, undefined, 'div.media__card__wrapper');
    }

    //  Create img or video element in function of the type of the element
    if(media.image){
      photographerMediaFactory("image", media.image, picture);
    }
    
    if(media.video) {
      photographerMediaFactory("video", media.video, film);
      const videoElement = document.querySelectorAll('.video');
      const playButton = document.querySelectorAll('.playButton');
      
      playButton.forEach((button) => {
          button.addEventListener("click", playVideo);
      });
      function playVideo() {
        videoElement.play();
      }
      
      manageMediaControls();
    }

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

export { mediaCard };