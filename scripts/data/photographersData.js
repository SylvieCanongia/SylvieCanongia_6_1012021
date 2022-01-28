async function getPhotographers() {
  let photographers;

  await fetch('./data/photographers.json')
    .then((res) => res.json())
    .then((res) => {
      res.photographers;
      photographers = res.photographers;
    })
    // eslint-disable-next-line no-console
    .catch((err) => console.log('an error occurs', err));

  return {
    photographers,
  };
}

export { getPhotographers };
