async function getPhotographers() {
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