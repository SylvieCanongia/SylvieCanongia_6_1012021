import { createElement, getExtension } from './../utils/functions.js';

const addVideoControls = () => {
  let controls = createElement('div', {className: "lightbox-controls"}, undefined, 'div.lightbox__container');
  let playPauseButton = createElement('button', {className: "lightbox-playPauseButton"}, undefined, 'div.lightbox-controls');
  playPauseButton.setAttribute('data-icon', 'P');

  let stopButton = createElement('button', {className: "lightbox-stopButton"}, undefined, 'div.lightbox-controls');
  stopButton.setAttribute('data-icon', 'S');

  let timer = createElement('div', {className: "lightbox-timer"}, undefined, 'div.lightbox-controls');
  let timerDiv = createElement('div', {className: "lightbox-progressBar"}, undefined, 'div.lightbox-timer');
  let timerDisplay = createElement('span', {ariaLabel: "timer"}, "00:00", 'div.lightbox-timer');

  let rewardButton = createElement('button', {className: "lightbox-rewardButton", ariaLabel:"retour arrière"}, undefined, 'div.lightbox-controls');
  rewardButton.setAttribute('data-icon', 'B');
  let forwardButton = createElement('button', {className: "lightbox-forwardButton", ariaLabel:"avance rapide"}, undefined, 'div.lightbox-controls');
  forwardButton.setAttribute('data-icon', 'F');

  return { controls };
}

/**
 * 
 * @param {String} videoTag tag of the media element : 'video'
 * @param {String} videoName Heading of the video for the 'alt' attribute
 * @param {URL} url URL of the video
 * @returns {HTMLElement} A 'video' element with classes, { src, alt and controls attributes }, textContent and append it into '.lightbox__container'
 */
function LightboxVideoTag(videoTag, videoName, url) {

  let ext = getExtension(url);

  if(ext == "mp4") {
    let obj = {
      'elementName': `${videoTag}`,
      'classIdAttr': {
        'className': "media__cardImg lightbox-video lightbox-media",
        'src': url,
        'alt': videoName,
        'controls': 'controls'
      },
      'textContent': undefined,
      'appendTo': "div.lightbox__container"
    }
    let videoElement = createElement(obj.elementName, obj.classIdAttr, obj.textContent, obj.appendTo);

    addVideoControls();

    return { videoElement, addVideoControls };
  } else {
    console.log("Sorry, this is not a valid format of video");
  }
}

export { LightboxVideoTag};