import { createElement, getExtension } from '../utils/functions.js';

/**
 * Create all the controls of the video
 * @returns An HTML Element with all the video controls and a timer
 */
const addVideoControls = () => {
  const controls = createElement('div', { className: 'lightbox-controls' }, undefined, 'div.lightbox__container');
  const playPauseButton = createElement('button', { className: 'lightbox-playPauseButton' }, undefined, 'div.lightbox-controls');
  playPauseButton.setAttribute('data-icon', 'P');

  const stopButton = createElement('button', { className: 'lightbox-stopButton' }, undefined, 'div.lightbox-controls');
  stopButton.setAttribute('data-icon', 'S');

  createElement('div', { className: 'lightbox-timer' }, undefined, 'div.lightbox-controls');
  createElement('div', { className: 'lightbox-progressBar' }, undefined, 'div.lightbox-timer');
  createElement('span', { ariaLabel: 'timer' }, '00:00', 'div.lightbox-timer');

  const rewardButton = createElement('button', { className: 'lightbox-rewardButton', ariaLabel: 'retour arrière' }, undefined, 'div.lightbox-controls');
  rewardButton.setAttribute('data-icon', 'B');
  const forwardButton = createElement('button', { className: 'lightbox-forwardButton', ariaLabel: 'avance rapide' }, undefined, 'div.lightbox-controls');
  forwardButton.setAttribute('data-icon', 'F');
  return { controls };
};

/**
 * Create a video element
 * @param {String} videoTag tag of the media element : 'video'
 * @param {String} videoName Heading of the video for the 'alt' attribute
 * @param {URL} url URL of the video
 * @returns {HTMLElement} A 'video' element with classes, { src, alt and controls attributes },
 * textContent and append it into '.lightbox__container'
 */
function LightboxVideoTag(videoTag, videoName, url) {
  const ext = getExtension(url);

  if (ext[0] === 'mp4') {
    const obj = {
      elementName: `${videoTag}`,
      classIdAttr: {
        className: 'media__cardImg lightbox-video lightbox-media',
        src: url,
        alt: videoName,
        controls: 'controls',
      },
      textContent: undefined,
      appendTo: 'div.lightbox__container',
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

export { LightboxVideoTag};
