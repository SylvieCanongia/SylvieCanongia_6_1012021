/* eslint-disable no-underscore-dangle */
/* eslint-disable no-use-before-define */
// Photographers and medias from json file
import { getPhotographers } from '../data/photographersData.js';
import { getMedias } from '../data/mediasData.js';

// Photographer card template
import { photographerCard } from '../templates/photographerCard.js';

// Medias cards template
import { mediaCard } from '../templates/mediaCard.js';
import { launchLightboxModal } from './lightboxModal.js';

import { createElement } from '../utils/functions.js';

import { sorting } from '../utils/sorting.js';
import { manageLikes } from '../utils/likes.js';

// === DISPLAY OF THE PHOTOGRAPHER CARD ===
// Using import of photographers and medias data above

// GET THE URL

const queryStringUrl = window.location.search;

const urlSearchParams = new URLSearchParams(queryStringUrl);

async function displayPhotographerCard(photographers) {
  const photographHeader = document.querySelector('.photograph__header__infos');

  const photographerUrlId = urlSearchParams.get('id');

  const name = urlSearchParams.get('name');

  // Find the index of the photographer with the url id.
  // eslint-disable-next-line eqeqeq
  const photographerIndex = photographers.findIndex((el) => el.id == photographerUrlId);

  // Display the photographer card infos (before the button) based on his id
  const photographerCardModel = photographerCard(photographers[photographerIndex]);

  const photographCard = photographerCardModel.createPhotographerCard();

  photographHeader.appendChild(photographCard);

  // Create an img element and display the photographer portrait
  const { portrait } = photographers[photographerIndex];
  const picture = `assets/photographers/photographers_id_photos/${portrait}`;

  createElement('img', { alt: name, src: picture }, undefined, '.photograph__header__portrait');
}

// === DISPLAY OF THE MEDIAS CARDS ===

async function displayMediaData(medias, photographers) {
  const mediasSection = document.querySelector('.medias__section');
  const pricePerDayElement = document.querySelector('.pricePerDay');

  const photographerUrlId = urlSearchParams.get('id');
  const name = urlSearchParams.get('name');
  const mediasArray = [];

  // Sorts the media by popularity because option 'popularity' is by default on select
  medias.sort((a, b) => a.likes - b.likes);

  medias.reverse();

  // Create the media cards sorted by popularity and display them on the page
  medias.forEach((media) => {
    if (media.photographerId == photographerUrlId) {
      const mediasModel = mediaCard(media, name);
      const mediasCard = mediasModel.createMediaCard();
      mediasSection.appendChild(mediasCard);
      // Create an array with all the photographer medias
      mediasArray.push(media);
    }
  });

  // SORTING OF THE PHOTOGRAPHER'S MEDIAS via the select
  const selectElement = document.querySelector('#sorting__list');
  selectElement.addEventListener('change', manageSorting);
  selectElement.addEventListener('change', manageLikesUpdate);

  function manageSorting(event) {
    // const mediaLikesElementsArray = Array.from(document.querySelectorAll('.media__likes'));
    // mediaLikesElementsArray.forEach((element) => {

    // });
    sorting(event, mediasArray);

    mediasSection.innerHTML = '';

    mediasArray.forEach((media) => {
      const mediasModel = mediaCard(media, name);
      const mediasCard = mediasModel.createMediaCard();
      mediasSection.appendChild(mediasCard);
    });

    // Launch the lightbox with sorted medias
    launchLightboxModal();
  }

  function manageLikesUpdate() {
    // Function that increment the likes on each media and the total likes on the bottom of the page
    const _manageLikes = manageLikes();
    // Manage the listeners on the medias heart for incrementing and display of the total
    _manageLikes.manageMediaLikes();
  }
  manageLikesUpdate();

  // Insert the price per day after the likes on the bottom of the page
  photographers.forEach((photographer) => {
    if (photographer.id == photographerUrlId) {
      const pricePerDay = photographer.price;
      pricePerDayElement.textContent = `${pricePerDay}€/jour`;
    }
  });
}

async function init() {
  // Retrieve photographer data and display photographer card
  const { photographers } = await getPhotographers();
  displayPhotographerCard(photographers);

  // Retrieve medias data and display medias card
  const { medias } = await getMedias();
  displayMediaData(medias, photographers);

  launchLightboxModal();
  manageLikes();
}

init();
