const manageMediaControls = () => {
  const video = document.querySelector('video.video');
  
  const controls = document.querySelector('.controls');

  const play = document.querySelector('.playPauseButton');
  const stop = document.querySelector('.stopButton');
  const reward = document.querySelector('.rewardButton');
  const forward = document.querySelector('.forwardButton');

  const timerWrapper = document.querySelector('.timer');
  const timer = document.querySelector('.timer span');
  const timerBar = document.querySelector('.timer div');

  // remove the default browser controls on the video, and make our custom controls visible.
  video.removeAttribute('controls');
  controls.style.visibility = 'visible';

  // =======================================
  // === Play and pause of the the video ===

  const playPauseVideo = () => {
    // Tells whether the media element is paused. Return true if is paused. "u" is the icon "pause" of "heydings font"
    // The "play" method launch the video
    if(video.paused) {
      play.setAttribute('data-icon','u');
      video.play();
    } else {
      // On the second click, the button will be alternated again
      play.setAttribute('data-icon', 'P');
      video.pause();
    }
  }

  play.addEventListener('click', playPauseVideo);

  // =========================
  // === Stop of the video ===

  // In case of click on the stop button or on the video itself or when the video has ended.
  // Stop method doesn't exist so we pause the video and the time to 0. Then we reset the icon to play.
  const stopVideo = () => {
    video.pause();
    video.currentTime = 0;
    play.setAttribute('data-icon', 'P');
  }

  stop.addEventListener('click', stopVideo);
  video.addEventListener('ended', stopVideo);
  video.addEventListener('click', playPauseVideo);

  // ===========================
  // === Update elapsed time ===

  const setTime = () => {
    let minutes = Math.floor(video.currentTime / 60);
    let seconds = Math.floor(video.currentTime - minutes * 60);
    let minuteValue;
    let secondValue;

    if(minutes < 10) {
      minuteValue = `0${minutes}`;
    } else {
      minuteValue = minutes;
    }

    if(seconds < 10) {
      secondValue = `0${seconds}`;
    } else {
      secondValue = seconds;
    }

    let videoTime = `${minuteValue} : ${secondValue}`;
    timer.textContent = videoTime;

    let progressBarLength = timerWrapper.clientWidth * (video.currentTime / video.duration);
    timerBar.style.width = `${progressBarLength}px`;
}

video.addEventListener('timeupdate', setTime);

}
