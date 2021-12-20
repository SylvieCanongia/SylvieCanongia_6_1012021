//JavaScript code for photographer.html
async function getMedias() {
  let medias;

  await fetch("./data/photographers.json")
    .then((res) => res.json())
    .then((res) => {
      res.medias;
      medias = res.medias;
    })
    .catch((err) => console.log("an error occurs", err));
    console.log(medias);
    
  return {
    medias
  };
}

async function displayMediaData(medias) {
  // console.log(medias);
  const mediasSection = document.querySelector(".medias__section");

  const queryString_url = window.location.search;
  // console.log(queryString_url);
  const urlSearchParams = new URLSearchParams(queryString_url);
  // console.log(urlSearchParams);
  let photographerUrlId = urlSearchParams.get('id');
  let name = urlSearchParams.get('name');
  // console.log(photographId);
  console.log(name);
  
  medias.forEach((media) => {
    console.log(media.photographerId);
    // console.log(name);
    
    if (media.photographerId == photographerUrlId) {
    console.log(name);
    const mediaModel = photographerMediaCard(media, name);
    const mediaCard = mediaModel.createMediaCard();
    // console.log(mediaCard);
    mediasSection.appendChild(mediaCard);
    }
  });
}

async function init() {
  // Retrieve medias data
  const { medias } = await getMedias();
  displayMediaData(medias);
}

init();