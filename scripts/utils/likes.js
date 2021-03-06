/**
 * @returns { Function } Function that manage the media likes increment on click
 * on the medias heart and the sum of the the likes that is displayed at the bottom of the page
 */
function manageLikes() {
  // Dom Elements of each media
  // nb of likes and heart icon
  const mediaLikesNumberElements = document.querySelectorAll('.media__likes');
  // let mediaLikesNumberElementsArray = Array.from(mediaLikesNumberElements);
  const mediaHeartsElements = document.querySelectorAll('.media__heart');
  // let mediaHeartsElementsArray = Array.from(mediaHeartsElements);

  // Total likes element on the bottom of the page
  const pageLikesElement = document.querySelector('.totalLikes');

  /**
   * Increment the number of likes on a media, by 1
   * @param {MouseEvent} event
   * @returns The number of likes of the media, incremented by one.
   */
  const incrementMediaLikes = (event) => {
    const heart = event.currentTarget;

    // Selects the number of likes corresponding to the heart
    const likes = heart.parentElement.querySelector('.media__likes');

    // Increment by 1 the number of likes
    likes.textContent = Number(likes.textContent) + 1;
  };

  /**
   * Calculates and displays the sum of all the likes of the page at the bottom of the page
   * @returns { String }
   */
  const sumOfAllMediasLikes = () => {
    const listOfLikes = [];
    let sumOfLikes = 0;
    // Creates an array of likes numbers
    mediaLikesNumberElements.forEach((like) => {
      listOfLikes.push(Number(like.textContent));
    });
    sumOfLikes = listOfLikes.reduce((a, b) => a + b, 0);
    // Display of the sum of the likes on the bottom of the page
    return pageLikesElement.textContent = sumOfLikes;
  };

  // Display the sum of the likes on the bottom of the page
  pageLikesElement.textContent = sumOfAllMediasLikes();

  /**
   * Function called on the click event on the media heart.
   * Re-calculates the new total of the page likes and display it;
   * @param {MouseEvent} event
   */
  const managePageLikes = () => {
    sumOfAllMediasLikes();
  };

  /**
   * @param {KeyboardEvent} event
   *
   */
  function onKeyUp(event) {
    if (event.key === 'Enter') {
      incrementMediaLikes(event);
      managePageLikes();
    }
  }

  /**
   * Add two listeners on each media heart with click event.
   * The first calls a function that increment the nb of likes by 1 on click.
   * The second calls the function that calculates and display the sum of all likes
   * on the bottom of the page
   */
  const manageMediaLikes = () => {
    mediaHeartsElements.forEach((mediaHeart) => {
      mediaHeart.addEventListener('click', incrementMediaLikes);
      mediaHeart.addEventListener('click', managePageLikes);
      mediaHeart.addEventListener('keyup', onKeyUp);
    });
  };
  return { manageMediaLikes };
}

export { manageLikes };
