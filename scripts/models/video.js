const addVideoControls = () => {
  let controls = createElement('div', {className: "controls"}, undefined, 'article .media__card__wrapper');
  let playPauseButton = createElement('button', {className: "playPauseButton"}, undefined, 'div.controls');
  playPauseButton.setAttribute('data-icon', 'P');
  // let iconPlay = createElement('i', {className: 'fas fa-play'}, undefined, '.playPauseButton');
  
  // let iconPause = createElement('i', {className: 'fas fa-pause'}, undefined, '.playButton');
  // iconPause.setAttribute('data-icon', 'pause');

  // let pauseButton = createElement('div', {className: "pauseButton"}, undefined, 'div.controls');
  // let iconPause = createElement('i', {className: 'fas fa-pause'}, undefined, '.pauseButton');

  let stopButton = createElement('button', {className: "stopButton"}, undefined, 'div.controls');
  stopButton.setAttribute('data-icon', 'S');
  // let iconStop = createElement('i', {className: 'fas fa-stop'}, undefined, '.stopButton');
  

  let timer = createElement('div', {className: "timer"}, undefined, 'div.controls');
  let timerDiv = createElement('div', {className: "progressBar"}, undefined, 'div.timer');
  let timerDisplay = createElement('span', {ariaLabel: "timer"}, "00:00", 'div.timer');

  let rewardButton = createElement('button', {className: "rewardButton", ariaLabel:"retour arrière"}, undefined, 'div.controls');
  rewardButton.setAttribute('data-icon', 'B');
  let forwardButton = createElement('button', {className: "forwardButton", ariaLabel:"avance rapide"}, undefined, 'div.controls');
  forwardButton.setAttribute('data-icon', 'F');

  return { controls };
}

function VideoTag(tag, videoName, url) {

  let ext = getExtension(videoName);

  if(ext == "mp4") {
    let obj = {
      'elementName': `${tag}`,
      'classIdAttr': {
        'className': "media__cardImg video",
        'src': url,
        'controls': 'controls'
      },
      'textContent': undefined,
      'appendTo': "div.media__card__wrapper"
    }
    let videoElement = createElement(obj.elementName, obj.classIdAttr, obj.textContent, obj.appendTo);

    addVideoControls();

    return { videoElement, addVideoControls };
  } else {
    console.log("Sorry, this is not a valid format of video");
  }
}

export { VideoTag};
