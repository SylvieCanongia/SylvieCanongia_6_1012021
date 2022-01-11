/**
 * 
 * @returns { Function } Function that manage the media likes increment on click on the medias heart and the sum of the the likes that is displayed at the bottom of the page
 */
function manageLikes() {
  // Dom Elements of each media
  // nb of likes and heart icon
  const mediaLikesElements = document.querySelectorAll('.media__likes');
  const mediaHeartsElements = document.querySelectorAll('.media__heart');

  // Total likes element on the bottom of the page
  const pageLikesElement = document.querySelector('.medias__pageLikesPrice .totalLikes');

  /**
   * 
   * @param {MouseEvent} event 
   * @returns The number of likes of the media, incremented by one.
   */
  const incrementMediaLikes = (event) => {
    let heart = event.currentTarget;
    // Selects the number of likes corresponding to the heart
    let likes = heart.parentElement.querySelector('.media__likes');
    // Increment by 1 the number of likes
    likes.textContent =  Number(likes.textContent) + 1;
  }

  /**
   * Calculates and displays the sum of all the likes of the page at the bottom of the page
   * @returns { String }
   */
  const sumOfAllMediasLikes = () => {
    let listOfLikes = [];
    let sumOfLikes = 0;
    // Creates an array of likes numbers
    mediaLikesElements.forEach((like) => {
      listOfLikes.push(Number(like.textContent));
    });
    sumOfLikes = listOfLikes.reduce(function(a, b) { return a + b }, 0);
    // Display of the sum of the likes on the bottom of the page
    return pageLikesElement.textContent = sumOfLikes;
  }

  // Display the sum of the likes on the bottom of the page
  pageLikesElement.textContent = sumOfAllMediasLikes();
  
  const likesCounter = document.querySelector('.medias__pageLikesPrice');
  likesCounter.style.top = window.innerHeight - 42 +"px";
  likesCounter.style.right = "20px";

  /**
   * Function called on the click event on the media heart.
   * Re-calculates the new total of the page likes and display it;
   * @param {MouseEvent} event 
   */
  const managePageLikes = (event) => {
    sumOfAllMediasLikes();
  }

  /**
   * Add two listeners on each media heart with click event. The first calls a function that increment
   * the nb of likes by 1 on click. The second calls the function that calculates and display the sum of all likes
   * on the bottom of the page 
   */
  const manageMediaLikes = () => {
    mediaHeartsElements.forEach((mediaHeart) => {
      mediaHeart.addEventListener('click', incrementMediaLikes);
      mediaHeart.addEventListener('click', managePageLikes);
    });
  }
  return { manageMediaLikes }
}

export { manageLikes };