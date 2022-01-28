async function getMedias() {
  let medias;

  await fetch('./data/photographers.json')
    .then((res) => res.json())
    .then((res) => {
      medias = res.medias;
    })
    // eslint-disable-next-line no-console
    .catch((err) => console.log('an error occurs', err));

  return {
    medias,
  };
}

export { getMedias };
