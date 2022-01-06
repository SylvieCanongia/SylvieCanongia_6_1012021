/**
 * Sorts the medias of the photographer by title, date or popularity via the select
 * @param {Objects[]} photographerMedias Array containing all the medias of the photographer
 */
function sorting(event, photographerMedias) {
  console.log(photographerMedias);

  // sorting by heading via select
  // const headingsElements = Array.from(document.querySelectorAll('.media__CardHeading__h2'));
  // let headings = [];

  // headingsElements.forEach(heading => {
  // console.log(heading.textContent);
  // let sortedHeadings = headings.push(heading.textContent);
  // console.log(sortedHeadings);
  // });

  if (event.currentTarget.value === "title") {
    photographerMedias.sort(function compare(a, b) {
      if (a.title < b.title) {
        console.log("1ère option");
        return -1;
      }
      if (a.title > b.title) {
        console.log("2ère option");
        return 1;
      }
      return 0;
    });
  }
  console.log(photographerMedias);
  return { photographerMedias };
}

export { sorting };
