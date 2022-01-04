// Photographers data from jsno file
import { getPhotographers } from './../data/photographersData.js';

// Template of the photographer home card
import { photographerHomeCard } from './../templates/photographerHomeCard.js';


async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer__section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerHomeCard(photographer);
    const photographerCard = photographerModel.createHomeCard();
    // console.log(photographerCard);
    photographersSection.appendChild(photographerCard);
  });
}

async function init() {
  // Retrieve photographers data
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

init();