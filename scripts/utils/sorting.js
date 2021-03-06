/**
 * Sorts the medias of the photographer by title, date or popularity via the select
 * @param {Objects[]} photographerMedias Array containing all the medias of the photographer
 */
function sorting(event, mediasArray) {
  if (event.currentTarget.value === 'popularity') {
    mediasArray.sort((a, b) => (a.likes - b.likes));
    mediasArray.reverse();
  }

  if (event.currentTarget.value === 'date') {
    mediasArray.sort((a, b) => {
      if (a.date < b.date) {
        return -1;
      }
      if (a.date > b.date) {
        return 1;
      }
      return 0;
    });
  }

  if (event.currentTarget.value === 'title') {
    mediasArray.sort((a, b) => {
      if (a.title < b.title) {
        return -1;
      }
      if (a.title > b.title) {
        return 1;
      }
      return 0;
    });
  }
}

export { sorting };
