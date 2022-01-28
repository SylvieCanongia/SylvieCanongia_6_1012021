import { createElement, getExtension } from '../utils/functions.js';

const addVideoControls = () => {
  const controls = createElement('div', { className: 'photographer-controls' }, undefined, 'article .media__card__wrapper');
  const playPauseButton = createElement('button', { className: 'photographer-playPauseButton', ariaLabel: 'Lecture ou pause' }, undefined, 'div.photographer-controls');
  playPauseButton.setAttribute('data-icon', 'P');
  // let iconPlay = createElement('i', {className: 'fas fa-play'}, undefined, '.playPauseButton');
  // let iconPause = createElement('i', {className: 'fas fa-pause'}, undefined, '.playButton');
  // iconPause.setAttribute('data-icon', 'pause');

  // let pauseButton = createElement('div', {className: "pauseButton"}, undefined, 'div.controls');
  // let iconPause = createElement('i', {className: 'fas fa-pause'}, undefined, '.pauseButton');

  const stopButton = createElement('button', { className: 'photographer-stopButton', ariaLabel: 'Stop' }, undefined, 'div.photographer-controls');
  stopButton.setAttribute('data-icon', 'S');
  // let iconStop = createElement('i', {className: 'fas fa-stop'}, undefined, '.stopButton');

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
