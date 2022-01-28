/* eslint-disable no-use-before-define */
import { lightbox } from '../templates/lightbox.js';
import { lightboxFactory } from '../factories/lightboxFactory.js';

import { createElement, getExtension } from '../utils/functions.js';
import { manageMediaControls } from '../utils/custom-player.js';

/**
 * Create the lightbox and manage the medias inside
 */
function lightboxModal() {
  const links = Array.from(document.querySelectorAll('.media__card__img__wrapper'));
  const headings = Array.from(document.querySelectorAll('.media__CardHeading__h2'));

  const imagesUrls = links.map((link) => link.getAttribute('href'));

  // Launch the function get Lightbox that creates the lightbox template
  links.forEach((link) => link.addEventListener('click', getLightbox));

  /**
   * Get the template of the lightbox without the media inside
   * @param {Event} event
   */
  function getLightbox(event) {
    event.preventDefault();
    const lightboxModel = lightbox();
    const url = event.currentTarget.getAttribute('href');
    lightboxModel.buildLightbox(url);
    // Launch the function targetImage to display loader and then image
    targetImage(event);
  }

  /**
   * Target the media to display by url and retrieve its heading
   * @param {MouseEvent} event
   */
  function targetImage(event) {
    const url = event.currentTarget.getAttribute('href');

    // Get the heading of the targeted image or video
    let heading = '';
    heading = event.currentTarget.closest('.media__card').querySelector('h2>div').textContent;

    loadImage(heading, url);
  }

  /**
   * Load the media
   * @param {String} heading The heading of the media to display
   * @param {String} url The url of the media to display
   */
  function loadImage(heading, url) {
    const container = document.querySelector('.lightbox__container');
    container.innerHTML = '';

    const closingCross = document.querySelector('.lightbox__close');

    getImage(heading, url);

    document.querySelector('.lightbox__next').addEventListener('click', next);
    document.querySelector('.lightbox__prev').addEventListener('click', previous);

    document.querySelector('.lightbox__wrapper').addEventListener('keyup', changeMedia);
    document.querySelector('.lightbox__wrapper').addEventListener('keyup', onKeyUp);

    document.querySelector('.lightbox__close').addEventListener('click', close);
    document.querySelector('.lightbox__close').addEventListener('keyup', onKeyUp);

    // On the opening, focus on the cross that close the lightbox
    setTimeout(() => {
      function doFocus() {
        closingCross.focus();
      }
      doFocus();
    }, 300);
  }

  /**
   * Create an image or video element with its heading in function of the type of media to display
   * @param {String} heading The heading of the media to display
   * @param {String} url The url of the media to display
   */
  function getImage(heading, url) {
    const container = document.querySelector('.lightbox__container');

    //  Create img or video element in function of the type of the element
    // (based on file url extension)
    const ext = getExtension(url);
    if (ext[0] === 'jpg') {
      lightboxFactory('image', heading, url);

      const imageElement = document.querySelector('.lightbox-media');
      createElement('h2', { className: 'lightbox__imageHeading lightbox__heading' }, heading, 'div.lightbox__container');

      // Add a loader into 'container'
      const loader = createElement('div', { className: 'lightbox__loader' }, undefined, 'div.lightbox__container');

      // Remove the loader when the image has loaded
      imageElement.onload = () => {
        container.removeChild(loader);
      };
    }

    if (ext[0] === 'mp4') {
      lightboxFactory('video', heading, url);

      const videoElement = document.querySelector('.lightbox-media');
      container.querySelector('.lightbox-playPauseButton');

      createElement('h2', { className: 'lightbox__videoHeading lightbox__heading' }, heading, 'div.lightbox__container');

      // Manage controls from custom player
      manageMediaControls('lightbox');

      // Add a loader into 'container
      const loader = createElement('div', { className: 'lightbox__loader' }, undefined, 'div.lightbox__container');

      // Remove the loader when the video data have loaded
      videoElement.onloadedmetadata = () => {
        container.removeChild(loader);
      };
    }
  }

  // ====================
  // CLOSE THE LIGHTBOX
  // ====================

  /**
   * Call the function close to close the lightbox
   * @param {KeyboardEvent} event
   *
   */
  function onKeyUp(event) {
    if (event.key === 'Escape') {
      close(event);
    } else if (event.key === 'Enter') {
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
    let href = '';
    // Get the src attribute of the current media on the lightbox to focus on closing
    if (event.currentTarget.querySelector('.lightbox__container')) {
      href = event.currentTarget.querySelector('.lightbox__container .lightbox-media').getAttribute('src');
    } else if (event.currentTarget.closest('.lightbox')) {
      href = event.currentTarget.closest('.lightbox').querySelector('.lightbox__container .lightbox-media').getAttribute('src');
    }

    document.querySelector('.lightbox__close').removeEventListener('keyup', onKeyUp);
    document.querySelector('.lightbox__close').removeEventListener('click', close);
    document.querySelector('.lightbox__wrapper').removeEventListener('keyup', onKeyUp);

    function mediaToFocusOnClosing() {
      // Focus on the media of the photographer page that links
      // this lightbox media (href attr = src attribute)
      // eslint-disable-next-line no-shadow
      const mediaToFocusOnClosing = document.querySelector(`.media__card__img__wrapper[href="${href}"]`);
      mediaToFocusOnClosing.focus();
    }

    mediaToFocusOnClosing();
    document.querySelector('.lightbox__wrapper').remove();
  }

  // ==================================================
  // BUTTON NEXT AND PREV TO NAVIGATE INTO THE LIGHTBOX
  // ==================================================

  /**
     * Display the next media in the lightbox
     * @param {MouseEvent|KeyboardEvent} event mouse or keyboard event
     */
  function next() {
    let heading = document.querySelector('.lightbox__container h2').textContent;
    let url = document.querySelector('.lightbox__container .lightbox-media').getAttribute('src');
    const lightboxMedia = document.querySelector('.lightbox-media');
    const lightboxHeading = document.querySelector('.lightbox__heading');

    let currentIndex = imagesUrls.findIndex((mediaUrl) => mediaUrl === url);
    let nextUrl = '';
    let nextHeading = '';
    if (currentIndex === imagesUrls.length - 1) {
      currentIndex = -1;
    }

    nextUrl = imagesUrls[currentIndex + 1];
    nextHeading = headings[currentIndex + 1].textContent;

    // Remove the heading and media before creating the following
    lightboxMedia.remove();
    lightboxHeading.remove();

    url = nextUrl;
    heading = nextHeading;

    document.querySelector('.lightbox__next').removeEventListener('click', next);
    document.querySelector('.lightbox__prev').removeEventListener('click', previous);
    document.querySelector('.lightbox__wrapper').removeEventListener('keyup', changeMedia);

    loadImage(heading, url);
  }

  /**
     * Display the previous media in the lightbox
     * @param {MouseEvent|KeyboardEvent} event mouse or keyboard event
     */
  function previous() {
    let heading = document.querySelector('.lightbox__container h2').textContent;
    let url = document.querySelector('.lightbox__container .lightbox-media').getAttribute('src');
    const lightboxMedia = document.querySelector('.lightbox-media');
    const lightboxHeading = document.querySelector('.lightbox__heading');

    let currentIndex = imagesUrls.findIndex((mediaUrl) => mediaUrl === url);
    let previousUrl = '';
    let previousHeading = '';
    if (currentIndex === 0) {
      currentIndex = imagesUrls.length;
    }

    previousUrl = imagesUrls[currentIndex - 1];
    previousHeading = headings[currentIndex - 1].textContent;

    // Remove the heading and media before creating the following
    lightboxMedia.remove();
    lightboxHeading.remove();

    url = previousUrl;
    heading = previousHeading;

    document.querySelector('.lightbox__next').removeEventListener('click', next);
    document.querySelector('.lightbox__prev').removeEventListener('click', previous);
    document.querySelector('.lightbox__wrapper').removeEventListener('keyup', changeMedia);

    loadImage(heading, url);
  }

  /**
   * Call the function next or previous to display the next or previous media
   * @param {KeyboardEvent} event 
   */
  function changeMedia(event) {
    if (event.key === 'ArrowRight') {
      next();
    }
    if (event.key === 'ArrowLeft') {
      previous();
    }
  }
}

async function launchLightboxModal() {
  lightboxModal();
}

export { launchLightboxModal };
