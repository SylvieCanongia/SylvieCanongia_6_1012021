import { lightbox } from './../templates/lightbox.js'

function lightboxModal() {
    const links = document.querySelectorAll('.media__card__img__wrapper');

    // Launch the function get Lightbox that creates the lightbox template
    links.forEach(link => link.addEventListener('click', getLightbox));
    // console.log(links);

    function getLightbox(event) {
      event.preventDefault();
      // console.log(event.currentTarget);
      const lightboxModel = lightbox();
      // console.log(lightboxModel);
      const url = event.currentTarget.getAttribute('href');
      const lightboxElement = lightboxModel.buildLightbox(url);
    }


    // Launch the function loadImage to display loader and then image
    links.forEach(link => link.addEventListener('click', loadImage));
   
    /**
     * 
     * @param {string} url URL of the image
     */
    function loadImage(event) {
      const url = event.currentTarget.getAttribute('href');
      const image = createElement('img', {src: url, alt:url}, undefined, 'div.lightbox__container');
      const container = document.querySelector('.lightbox__container');
      const loader = createElement('div', {className: 'lightbox__loader'}, undefined, 'div.lightbox__container');

      container.appendChild(loader);
      image.onload = function() {
        container.removeChild(loader);
      }
    }

    // Launch the function closeLightbox by click on the button
      const lightbox__wrapper = document.querySelector('lightbox__wrapper');
      console.log(lightbox__wrapper);
      lightbox__wrapper.addEventListener('click', closeLightbox);


    /**
     * 
     * @param {MouseEvent} event Close the lightbox
     */
    const closeLightbox = (event) => {
      event.preventDefault();
      const closeLightbox = document.querySelector('.lightbox__close');
      closeLightbox.className = 'fadeOut';
    }

    return { links, loadImage, closeLightbox };
}

export { lightboxModal };