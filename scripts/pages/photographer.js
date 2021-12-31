import { photographerCard } from './../templates/photographerCard.js';
import { mediaCard } from './../templates/mediaCard.js';
import { lightboxModal } from './../pages/lightboxModal.js';

// === DISPLAY OF THE PHOTOGRAPHER CARD ===

async function getPhotographerData() {
  let photographers;

  await fetch("./data/photographers.json")
    .then((res) => res.json())
    .then((res) => {
      res.photographers;
      photographers = res.photographers;
    })
    .catch((err) => console.log("an error occurs", err));

  return {
    photographers,
  };
}

// ===========
// Get the URL

const queryString_url = window.location.search;

const urlSearchParams = new URLSearchParams(queryString_url);

async function displayPhotographerCard(photographers) {
  const photograph_header = document.querySelector(".photograph__header__infos");

  let photographerUrlId = urlSearchParams.get('id');
  
  let name = urlSearchParams.get('name');
  
  // Find the index of the photographer with the url id.
  let photographerIndex = photographers.findIndex(function(el) {
    return el.id == photographerUrlId;
  });

  // Display the photographer card infos (before the button) based on his id
  const photographerCardModel = photographerCard(photographers[photographerIndex]);
  
  const photographCard = photographerCardModel.createPhotographerCard();
  
  photograph_header.appendChild(photographCard);

  // Create an img element and display the photographer portrait 
  let portrait = photographers[photographerIndex].portrait;
  let picture = `assets/photographers/photographers_id_photos/${portrait}`;
  
  createElement('img', {ariaLabel: name, src: picture}, undefined, '.photograph__header__portrait' )
}


// === DISPLAY OF THE MEDIAS CARDS ===

async function getMedias() {
  let medias;

  await fetch("./data/photographers.json")
    .then((res) => res.json())
    .then((res) => {
      res.medias;
      medias = res.medias;
    })
    .catch((err) => console.log("an error occurs", err));
    
  return {
    medias
  };
}

async function displayMediaData(medias) {
  const mediasSection = document.querySelector(".medias__section");

  let photographerUrlId = urlSearchParams.get('id');
  let name = urlSearchParams.get('name');
  
  medias.forEach((media) => {
    
    if (media.photographerId == photographerUrlId) {
    const mediasModel = mediaCard(media, name);
    const mediasCard = mediasModel.createMediaCard();
    
    mediasSection.appendChild(mediasCard);

    // Sorting of the media with the select
    // manageMediaSorting(media);
    }
  });

  // function manageMediaSorting(media) {
  //   console.log(media);
  //   return mediaSorting(media);
  // }
}

async function init() {
  // Retrieve photographer data and display photographer card
  const { photographers } = await getPhotographerData();
  displayPhotographerCard(photographers);

  // Retrieve medias data and display medias card
  const { medias } = await getMedias();
  displayMediaData(medias);

  lightboxModal();
}

init();