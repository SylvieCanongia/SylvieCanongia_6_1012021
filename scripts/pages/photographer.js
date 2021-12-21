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

const queryString_url = window.location.search;
console.log(queryString_url);
const urlSearchParams = new URLSearchParams(queryString_url);
console.log(urlSearchParams);


async function displayPhotographerCard(photographers) {
  const photograph_header = document.querySelector(".photograph__header__infos");
  const photograph__portrait = document.querySelector(".photograph__header__portrait");

  let photographerUrlId = urlSearchParams.get('id');
  console.log(photographerUrlId);
  let name = urlSearchParams.get('name');
  console.log(name);

  let photographerIndex = photographers.findIndex(function(el) {
    return el.id == photographerUrlId;
  });
  console.log(photographerIndex);

  // Display the photographer infos card before the button
  const photographerCardModel = photographerCard(photographers[photographerIndex]);
  console.log(photographerCardModel);
  const photographCard = photographerCardModel.createPhotographerCard();
  console.log(photographCard);
  photograph_header.appendChild(photographCard);

  // Create an img element and display the photographer portrait 
  let portrait = photographers[photographerIndex].portrait;
  let picture = `assets/photographers/photographers_id_photos/${portrait}`;
  
  let img = document.createElement('img');
  img.setAttribute('src', picture);
  console.log(img);
  photograph__portrait.appendChild(img);
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
    }
  });
}

async function init() {

  const { photographers } = await getPhotographerData();
  displayPhotographerCard(photographers);

  // Retrieve medias data
  const { medias } = await getMedias();
  displayMediaData(medias);
}

init();