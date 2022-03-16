import { createElement, getExtension } from '../utils/functions.js';

const addVideoControls = () => {
  const controls = createElement('div', { className: 'photographer-controls' }, undefined, 'article .media__card__wrapper');
  const playPauseButton = createElement('button', { className: 'photographer-playPauseButton', ariaLabel: 'Lecture ou pause' }, undefined, 'div.photographer-controls');
  playPauseButton.setAttribute('data-icon', 'P');

  const stopButton = createElement('button', { className: 'photographer-stopButton', ariaLabel: 'Stop' }, undefined, 'div.photographer-controls');
  stopButton.setAttribute('data-icon', 'S');

  createElement('div', { className: 'photographer-timer' }, undefined, 'div.photographer-controls');
  createElement('div', { className: 'photographer-progressBar' }, undefined, 'div.photographer-timer');
  createElement('span', { ariaLabel: 'timer' }, '00:00', 'div.photographer-timer');

  const rewardButton = createElement('button', { className: 'photographer-rewardButton', ariaLabel: 'retour arrière' }, undefined, 'div.photographer-controls');
  rewardButton.setAttribute('data-icon', 'B');
  const forwardButton = createElement('button', { className: 'photographer-forwardButton', ariaLabel: 'avance rapide' }, undefined, 'div.photographer-controls');
  forwardButton.setAttribute('data-icon', 'F');

  return { controls };
};

function VideoTag(tag, videoName, altText, url) {
  const ext = getExtension(videoName);

  if (ext[0] === 'mp4') {
    const obj = {
      elementName: `${tag}`,
      classIdAttr: {
        className: 'media__cardImg photographer-video',
        src: url,
        ariaLabel: '',
        controls: 'controls',
      },
      textContent: undefined,
      appendTo: 'div.media__card__wrapper',
    };
    const videoElement = createElement(
      obj.elementName,
      obj.classIdAttr,
      obj.textContent,
      obj.appendTo,
    );

    addVideoControls();

    return { videoElement, addVideoControls };
  }
  // eslint-disable-next-line no-console
  console.log('Sorry, this is not a valid format of video');
}

export { VideoTag };
