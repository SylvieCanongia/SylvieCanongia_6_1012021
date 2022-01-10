function manageLikes() {
  // Elements of each media
  const mediaLikes = document.querySelectorAll('.media__likes');
  const mediaHearts = document.querySelectorAll('.media__heart');
  // console.log(mediaLikes, mediaHearts);

  // Sum of the likes element on the bottom of the page
  const mediasLikesElement = document.querySelector('.medias__likes');
  // console.log(mediasLikesElement);

  const incrementLikes = (event) => {
    let heart = event.currentTarget;
    // Select the number of likes element
    let likes = heart.parentElement.querySelector('.media__likes');
    // Increment of 1 of the number of likes
    return likes.textContent = Number(likes.textContent) + 1;
  }

  const manageMediaLikes = () => {
    // Add an event on each heart => function that increment the nb of likes by 1 on click
    mediaHearts.forEach((mediaHeart) => {
      mediaHeart.addEventListener('click', incrementLikes);
      return mediaHeart.textContent;
    })
  }
  return { manageMediaLikes }
}

export { manageLikes };