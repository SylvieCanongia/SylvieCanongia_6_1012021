function photographerMediaFactory(data) {
  const { name, portrait } = data;
  // console.log(data)
  const picture = `assets/photographers/${portrait}`;

  function createCard() {
    const article = document.createElement("article");
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    const h2 = document.createElement("h2");
    h2.textContent = name;
    article.appendChild(img);
    article.appendChild(h2);
    return article;
  }
  return { name, portrait, createCard };
}