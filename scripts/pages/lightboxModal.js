import { lightbox } from './../templates/lightbox.js'
import { lightboxFactory } from './../factories/lightboxFactory.js';

// Medias data from the json file
import { getMedias } from './../data/mediasData.js';

import { createElement, getExtension } from './../utils/functions.js';

 // Retrieve medias data and display medias card
 const { medias } = await getMedias();


function lightboxModal(medias) {

  const links = Array.from(document.querySelectorAll('.media__card__img__wrapper'));
  const headings = Array.from(document.querySelectorAll('.media__CardHeading__h2'));

  let imagesUrls = links.map(link => link.getAttribute('href'));
  
  // Launch the function get Lightbox that creates the lightbox template
  links.forEach(link => link.addEventListener('click', getLightbox));
  // links.forEach(link => link.addEventListener('keyup', (event) => {
  //   if( event.key === 'Enter') {
  //     getLightbox;
  //   }}));

  /**
   * Get the template of the lightbox without the media inside
   * @param {Event} event 
   */
  function getLightbox(event) {
    event.preventDefault();
    const lightboxModel = lightbox();
    const url = event.currentTarget.getAttribute('href');
    const lightboxElement = lightboxModel.buildLightbox(url);
    // Launch the function targetImage to display loader and then image
    targetImage(event);
  }

  /**
   * 
   * @param {MouseEvent} event
   */
  function targetImage(event) {
  
    let url = event.currentTarget.getAttribute('href');

      // Get the heading of the targeted image or video
      let heading = "";
      heading = event.currentTarget.closest('.media__card').querySelector('h2>div').textContent;

      loadImage(heading, url);
  }

  function loadImage(heading, url) {
    // let imagesUrls = links.map(link => link.getAttribute('href'));
    const container = document.querySelector('.lightbox__container');
    container.innerHTML = "";
  
    const closingCross = document.querySelector('.lightbox__close');

    // const lightboxContainer = document.querySelector('.lightbox__container');
    console.log(`loadImage: heading : ${heading}`)
    console.log(`loadImage: url : ${url}`)

    getImage(heading, url);

    document.querySelector('.lightbox__next').addEventListener('click', function() {next(heading, url)});
    document.querySelector('.lightbox__prev').addEventListener('click', function() {previous(heading, url)});

    document.querySelector('.lightbox__wrapper').addEventListener('keyup', changeMedia);
    document.querySelector('.lightbox__wrapper').addEventListener('keydown', onKeyDown);

    document.querySelector('.lightbox__close').addEventListener('click', close);
    document.querySelector('.lightbox__close').addEventListener('keyup', onKeyUp);

    // On the opening, focus on the cross that close the lightbox
    setTimeout(() => {
      function doFocus() {
        closingCross.focus()
      }
      doFocus();
    }, 300);
  }

  function getImage(heading, url) {
      const container = document.querySelector('.lightbox__container');
      console.log("getImage : var container :", container) 

     //  Create img or video element in function of the type of the element (based on file url extension)
     let ext = getExtension(url);

    if(ext == "jpg"){
      lightboxFactory("image", heading , url);

      const imageElement = document.querySelector('.lightbox-media');

      createElement('h2', { className: 'lightbox__imageHeading lightbox__heading'}, heading, 'div.lightbox__container');
      
      // Add a loader into 'container'
      const loader = createElement('div', {className: 'lightbox__loader'}, undefined, 'div.lightbox__container');
      
      // Remove the loader when the image has loaded
      imageElement.onload = function() {
          container.removeChild(loader);
      }
    }
  
    if(ext == "mp4") {
      lightboxFactory("video", heading, url);

      const videoElement = document.querySelector('.lightbox-media');
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
  }

  
    // ====================
    // CLOSE THE LIGHTBOX
    // ====================

     /**
   * @param {KeyboardEvent} event
   * 
   */
      function onKeyUp(event) { 
        if (event.key === 'Escape') {
          close(event);
        }
        if (event.key === 'Enter') {
          close(event);
        }
      }

      function onKeyDown(event) { 
        if (event.key === 'Escape') {
          close(event);
        }
        if (event.key === 'Enter') {
          close(event);
        }
      }
    

    /**
   * Close the lightbox
   * @param {MouseEvent|KeyboardEvent} event
   * 
   */
    function close(event) {
      event.preventDefault();
      // const closingCross = document.querySelector('.lightbox__close');
      document.querySelector('.lightbox__close').removeEventListener('keyup', onKeyUp);
      document.querySelector('.lightbox__close').removeEventListener('click', close);
      document.querySelector('.lightbox__wrapper').removeEventListener('keydown',  onKeyDown);

      document.querySelector('.lightbox__wrapper').remove();
      
      function mediaToFocusOnClosing(event) {
        // Get the src attribute of the current media on the lightbox to focus on closing
        // on the media of the photographer page that links this lightbox media (href attr = src attribute)
        let href = event.currentTarget.closest('.lightbox').querySelector('.lightbox__container .lightbox-media').getAttribute('src');
        let mediaToFocusOnClosing = document.querySelector(`.media__card__img__wrapper[href="${href}"]`);
        mediaToFocusOnClosing.focus();
        console.log(mediaToFocusOnClosing)
      }

      console.log(event.currentTarget);
      mediaToFocusOnClosing(event);
    }

    // ==================================================
    // BUTTON NEXT AND PREV TO NAVIGATE INTO THE LIGHTBOX
    // ==================================================
    
    /**
     * 
     * @param {MouseEvent|KeyboardEvent} event 
     */
    function next(heading, url) {
      const lightboxMedia = document.querySelector('.lightbox-media');
      console.log(lightboxMedia)
      const lightboxHeading = document.querySelector('.lightbox__heading');
      console.log(`next : heading : ${heading}`)
      console.log(`next : url : ${url}`)
      let currentIndex = imagesUrls.findIndex(mediaUrl => mediaUrl === url);
      console.log(currentIndex)
      let nextUrl="";
      let nextHeading="";
      if (currentIndex == imagesUrls.length -1) {
        currentIndex = -1;
      }

      nextUrl = imagesUrls[currentIndex + 1];
      nextHeading = headings[currentIndex + 1].textContent;
        
      // Remove the heading and media before creating the following
      // const lightboxMedia = document.querySelector('.lightbox-media');
      // const lightboxHeading = document.querySelector('.lightbox__heading');
      
      lightboxMedia.remove();
      lightboxHeading.remove();

      url = nextUrl;
      heading = nextHeading;
      // loadImage(heading, url);

      document.querySelector('.lightbox__next').removeEventListener('click', function() {next(heading, url)});
      document.querySelector('.lightbox__prev').removeEventListener('click', function() {previous(heading, url)});
      // document.querySelector('.lightbox__container').removeEventListener('keyup', onKeyUp);
      // document.querySelector('.lightbox__close').removeEventListener('click', close);
      // document.querySelector('.lightbox__close').removeEventListener('keyup', onKeyUp);
      document.querySelector('.lightbox__wrapper').removeEventListener('keyup', changeMedia);

      loadImage(heading, url);
    }

    /**
     * 
     * @param {MouseEvent|KeyboardEvent} event 
     */
    function previous(heading, url) {
      console.log(`previous : heading : ${heading}`)
      console.log(`previous : url : ${url}`)
      let currentIndex = imagesUrls.findIndex(mediaUrl => mediaUrl === url);
      console.log(currentIndex)
      let previousUrl="";
      let previousHeading="";
      if (currentIndex == 0) {
        currentIndex = imagesUrls.length;
      }
      
      previousUrl = imagesUrls[currentIndex - 1];
      console.log(previousUrl)
      previousHeading = headings[currentIndex -1].textContent;
      console.log(previousHeading)

      // Remove the heading and media before creating the following
      const lightboxMedia = document.querySelector('.lightbox-media');
      const lightboxHeading = document.querySelector('.lightbox__heading');
      lightboxMedia.remove();
      lightboxHeading.remove();

      url = previousUrl;
      heading = previousHeading;
      
      document.querySelector('.lightbox__prev').removeEventListener('click', previous);
      document.querySelector('.lightbox__next').removeEventListener('click', next);
      // document.querySelector('.lightbox__container').removeEventListener('keyup', onKeyUp);
      // document.querySelector('.lightbox__close').removeEventListener('click', close);
      // document.querySelector('.lightbox__close').removeEventListener('keyup', onKeyUp);
      document.querySelector('.lightbox__wrapper').removeEventListener('keyup', changeMedia);

      loadImage(heading, url);
      
    }

    function changeMedia(event) {
      if (event.key === 'ArrowRight') {
        next(event);
      }
      if (event.key === 'ArrowLeft') {
        previous(event);
      }
    }
  
  // return { links, loadImage, getImage };
}

async function launchLightboxModal() {
  // Retrieve medias data and display medias card
  const { medias } = await getMedias();
  lightboxModal(medias)
}

export { launchLightboxModal };