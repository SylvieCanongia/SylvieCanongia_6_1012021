const manageMediaControls = () => {
  const video = document.querySelector("video.video");

  const controls = document.querySelector(".controls");

  const play = document.querySelector(".playPauseButton");
  const stop = document.querySelector(".stopButton");
  const reward = document.querySelector(".rewardButton");
  const forward = document.querySelector(".forwardButton");

  const timerWrapper = document.querySelector(".timer");
  const timer = document.querySelector(".timer span");
  const timerBar = document.querySelector(".timer div");

  // remove the default browser controls on the video, and make our custom controls visible.
  video.removeAttribute("controls");
  controls.style.visibility = "visible";

  // =======================================
  // === Play and pause of the the video ===

  const playPauseVideo = () => {
    // Tells whether the media element is paused. Return true if is paused. "u" is the icon "pause" of "heydings font"
    // The "play" method launch the video
    if (video.paused) {
      play.setAttribute("data-icon", "u");
      video.play();
    } else {
      // On the second click, the button will be alternated again
      play.setAttribute("data-icon", "P");
      video.pause();
    }
  };

  play.addEventListener("click", playPauseVideo);

  // =========================
  // === Stop of the video ===

  // In case of click on the stop button or on the video itself or when the video has ended.
  // Stop method doesn't exist so we pause the video and the time to 0. Then we reset the icon to play.
  const stopVideo = () => {
    video.pause();
    video.currentTime = 0;
    play.setAttribute("data-icon", "P");
  };

  stop.addEventListener("click", stopVideo);
  video.addEventListener("ended", stopVideo);
  video.addEventListener("click", playPauseVideo);

  // ===========================
  // === Update elapsed time ===

  const setTime = () => {
    let minutes = Math.floor(video.currentTime / 60);
    let seconds = Math.floor(video.currentTime - minutes * 60);
    let minuteValue;
    let secondValue;

    if (minutes < 10) {
      minuteValue = `0${minutes}`;
    } else {
      minuteValue = minutes;
    }

    if (seconds < 10) {
      secondValue = `0${seconds}`;
    } else {
      secondValue = seconds;
    }

    let videoTime = `${minuteValue} : ${secondValue}`;
    timer.textContent = videoTime;

    let progressBarLength =
      timerWrapper.clientWidth * (video.currentTime / video.duration);
    timerBar.style.width = `${progressBarLength}px`;
  };

  video.addEventListener("timeupdate", setTime);

  // === Backward and forward

  let intervalForward;
  let intervalReward;

  const videoBackward = () => {
    // reset class active and interval on forward to avoid conflict if reward is clicked
    clearInterval(intervalForward);
    forward.classList.remove("active");

    if (reward.classList.contains("active")) {
      // if 'active' already exists so the reward button has already been pressed
      // we reset the interval defined on the button when pressed, remove the 'active' class and launch the video
      reward.classList.remove("active");
      clearInterval(intervalReward);
      video.play();
    } else {
      // else we add the 'active' class and pause the video.
      reward.classList.add("active");
      video.pause();
      // windBackward is called every 800 ms
      intervalReward = setInterval(windBackward, 800);
    }
  };

  const videoForward = () => {
    clearInterval(intervalReward);
    reward.classList.remove("active");

    if (forward.classList.contains("active")) {
      forward.classList.remove("active");
      clearInterval(intervalForward);
      video.play();
    } else {
      forward.classList.add("active");
      video.pause();
      intervalForward = setInterval(windForward, 800);
    }
  };

  // executed every 800ms
  function windBackward() {
    // if the current playing time of the video is <= 3s form the begining
    // we stop the video, remove the 'active' class and reset the intervalReward to avoid infinite rewind
    if (video.currentTime <= 3) {
      reward.classList.remove("active");
      clearInterval(intervalReward);
      stopVideo();
    } else {
      // we go back 3 seconds
      video.currentTime -= 3;
    }
  }

  function windForward() {
    // if the current playing time of the video is <= 3s form the end
    if (video.currentTime >= video.duration - 3) {
      forward.classList.remove("active");
      clearInterval(intervalForward);
      stopVideo();
    } else {
      video.currentTime += 3;
    }
  }

  reward.addEventListener("click", videoBackward);
  forward.addEventListener("click", videoForward);
};
