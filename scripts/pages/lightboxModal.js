import { lightbox } from './../templates/lightbox.js'
import { lightboxFactory } from './../factories/lightboxFactory.js';

// Medias data from the json file
import { getMedias } from './../data/mediasData.js';

import { createElement, getExtension } from './../utils/functions.js';

 // Retrieve medias data and display medias card
 const { medias } = await getMedias();
 

function lightboxModal(medias) {
    const links = document.querySelectorAll('.media__card__img__wrapper');

    // Launch the function get Lightbox that creates the lightbox template
    links.forEach(link => link.addEventListener('click', getLightbox));

    function getLightbox(event) {
      event.preventDefault();
      const lightboxModel = lightbox();
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
      const lightbox__wrapper = document.querySelector('.lightbox__wrapper');
      const url = event.currentTarget.getAttribute('href');

      //  Create img or video element in function of the type of the element (based on file url extension)
      let ext = getExtension(url);
 
      // GET THE PAGE URL OF THE LIGHTBOX IMAGE OR VIDEO to extract the photographer name
      const queryString_url = window.location.search;
      const urlSearchParams = new URLSearchParams(queryString_url);
      let name = urlSearchParams.get('name');

      // Get the heading of the targeted image or video
      let heading = "";
      heading = event.currentTarget.closest('.media__card').querySelector('h2>div').textContent;

      if(ext == "jpg"){

        lightboxFactory("image", heading , url);

        const container = document.querySelector('.lightbox__container');
        const media = document.querySelector('.lightbox img');

        createElement('h2', { className: 'lightbox__imageHeading lightbox__heading'}, heading, 'div.lightbox__container');
        
         // Add a loader into 'container'
        const loader = createElement('div', {className: 'lightbox__loader'}, undefined, 'div.lightbox__container');
        
        // Remove the loader when the image has loaded
        media.onload = function() {
          container.removeChild(loader);
        }
      }
    
      if(ext == "mp4") {
        lightboxFactory("video", heading, url);
        
        const container = document.querySelector('.lightbox__container');
        const videoElement = document.querySelector('.lightbox-video');
        const playButton = container.querySelector('.lightbox-playPauseButton');

        createElement('h2', { className: 'lightbox__videoHeading lightbox__heading'}, heading, 'div.lightbox__container');

        // Manage controls from custom player
        manageMediaControls('lightbox');
       
        // Add a loader into 'container
        const loader = createElement('div', {className: 'lightbox__loader'}, undefined, 'div.lightbox__container');
        
        // Remove the loader when the video data have loaded
        videoElement.onloadedmetadata = function() {
          container.removeChild(loader);
        }
      }

    // Close the lightbox by click on the button
      const closeLightbox = document.querySelector('.lightbox__close');
      closeLightbox.addEventListener('click', close);

    /**
     * 
     * @param {MouseEvent} event Close the lightbox
     */
    function close(event) {
      event.preventDefault();
      lightbox__wrapper.remove();
    }
  }
    return { links, loadImage };
}

async function launchLightboxModal() {
  // Retrieve medias data and display medias card
  const { medias } = await getMedias();
  lightboxModal(medias)
}

export { launchLightboxModal };