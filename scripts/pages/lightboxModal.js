import { lightbox } from './../templates/lightbox.js'
import { lightboxFactory } from './../factories/lightboxFactory.js';

// Medias data from the json file
import { getMedias } from './../data/mediasData.js';

import { createElement, getExtension } from './../utils/functions.js';

 // Retrieve medias data and display medias card
 const { medias } = await getMedias();


function lightboxModal(medias) {

  const links = Array.from(document.querySelectorAll('.media__card__img__wrapper'));
  // let imagesUrls = links.map(link => link.getAttribute('href'));
  const headings = Array.from(document.querySelectorAll('.media__CardHeading__h2'));

  // Launch the function get Lightbox that creates the lightbox template
  links.forEach(link => link.addEventListener('click', getLightbox));

  /**
   * Get the template of the lightbox
   * @param {Event} event 
   */
  function getLightbox(event) {
    event.preventDefault();
    const lightboxModel = lightbox();
    const url = event.currentTarget.getAttribute('href');
    const lightboxElement = lightboxModel.buildLightbox(url);
  }

  // Launch the function loadImage to display loader and then image
  links.forEach(link => link.addEventListener('click', targetImage));

  /**
   * 
   * @param {MouseEvent} event
   */
  function targetImage(event) {
    // console.log(event);
  
    let url = event.currentTarget.getAttribute('href');

      // Get the heading of the targeted image or video
      let heading = "";
      heading = event.currentTarget.closest('.media__card').querySelector('h2>div').textContent;

      loadImage(heading, url);
  }

  function loadImage(heading, url) {
    let imagesUrls = links.map(link => link.getAttribute('href'));
    const container = document.querySelector('.lightbox__container');
    container.innerHTML = "";
  
    const lightbox__wrapper = document.querySelector('.lightbox__wrapper');

    //  Create img or video element in function of the type of the element (based on file url extension)
    let ext = getExtension(url);

    // GET THE PAGE URL OF THE LIGHTBOX IMAGE OR VIDEO to extract the photographer name
    // const queryString_url = window.location.search;
    // const urlSearchParams = new URLSearchParams(queryString_url);
    // let name = urlSearchParams.get('name');

    getImage(heading, url);

    function getImage(heading, url) {
      if(ext == "jpg"){
        lightboxFactory("image", heading , url);

        const imageElement = document.querySelector('.lightbox-media');

        createElement('h2', { className: 'lightbox__imageHeading lightbox__heading'}, heading, 'div.lightbox__container');
        
        // Add a loader into 'container'
        // const loader = createElement('div', {className: 'lightbox__loader'}, undefined, 'div.lightbox__container');
        // console.log(loader);
        // console.log(container);
        
        // Remove the loader when the image has loaded
        // imageElement.onload = function() {
        //     container.removeChild(loader);
        // }
        // console.log(container);
      }
    
      if(ext == "mp4") {
        lightboxFactory("video", heading, url);

        const videoElement = document.querySelector('.lightbox-media');
        const playButton = container.querySelector('.lightbox-playPauseButton');

        createElement('h2', { className: 'lightbox__videoHeading lightbox__heading'}, heading, 'div.lightbox__container');

        // Manage controls from custom player
        manageMediaControls('lightbox');
      
        // Add a loader into 'container
        // const loader = createElement('div', {className: 'lightbox__loader'}, undefined, 'div.lightbox__container');
        // console.log(loader);
        // console.log(container);

        // Remove the loader when the video data have loaded
        // videoElement.onloadedmetadata = function() {
        //     container.removeChild(loader);
        // }
        // console.log(container);
      }
    }

    // CLOSE THE LIGHTBOX BY CLICK ON THE CROSS OR PRESS ESC KEY

    /**
   * Close the lightbox
   * @param {MouseEvent|KeyboardEvent} event
   * 
   */
    function close(event) {
      event.preventDefault();
      lightbox__wrapper.remove();
      document.removeEventListener('keyup', onKeyUp);
    }
    
    /**
   * @param {KeyboardEvent} event
   * 
   */
    function onKeyUp(event) {
      if (event.key === 'Escape') {
        close(event);
        // document.removeEventListener('keyup', onKeyUp);
      }
    }

    const closeLightbox = document.querySelector('.lightbox__close');
    closeLightbox.addEventListener('click', close);
    document.addEventListener('keyup', onKeyUp);

    // BUTTON NEXT AND PREV TO NAVIGATE INTO THE LIGHTBOX
    
    /**
     * 
     * @param {MouseEvent|KeyboardEvent} event 
     */
    function next(event) {
      event.preventDefault();
      // console.log(event.currentTarget);
      let currentIndex = imagesUrls.findIndex(mediaUrl => mediaUrl === url);
      
      console.log(imagesUrls);
    
      let nextUrl;
      let nextHeading;
      if (currentIndex == imagesUrls.length -1) {
        currentIndex = -1;
      }

      nextUrl = imagesUrls[currentIndex + 1];
      nextHeading = headings[currentIndex + 1].textContent;
        
        // Remove the heading and media before creating the following
      const lightboxMedia = document.querySelector('.lightbox-media');
      const lightboxHeading = document.querySelector('.lightbox__heading');
      lightboxMedia.remove();
      lightboxHeading.remove();

      url = nextUrl;
      heading = nextHeading;
      // console.log(heading);
      // console.log(url);
      document.querySelector('.lightbox__next').removeEventListener('click', next);
      loadImage(heading, url);
    }

    /**
     * 
     * @param {MouseEvent|KeyboardEvent} event 
     */
    function previous(event) {
      event.preventDefault();
      // console.log(event.currentTarget);
      let currentIndex = imagesUrls.findIndex(mediaUrl => mediaUrl === url);
      console.log(imagesUrls);
      
      let previousUrl;
      let previousHeading;
      if (currentIndex == 0) {
        currentIndex = imagesUrls.length;
        // console.log(currentIndex);
      }
        previousUrl = imagesUrls[currentIndex - 1];
        previousHeading = headings[currentIndex -1].textContent;
        // console.log(previousUrl);
        // console.log(previousHeading);
        // console.log(currentIndex - 1);

        // Remove the heading and media before creating the following
      const lightboxMedia = document.querySelector('.lightbox-media');
      const lightboxHeading = document.querySelector('.lightbox__heading');
      lightboxMedia.remove();
      lightboxHeading.remove();

      url = previousUrl;
      heading = previousHeading;
      // console.log(heading);
      // console.log(url);
      document.querySelector('.lightbox__prev').removeEventListener('click', previous);
      loadImage(heading, url);
    }

    document.querySelector('.lightbox__next').addEventListener('click', next);
    document.querySelector('.lightbox__prev').addEventListener('click', previous);
  }
    return { links, loadImage };
}

async function launchLightboxModal() {
  // Retrieve medias data and display medias card
  const { medias } = await getMedias();
  lightboxModal(medias)
}

export { launchLightboxModal };